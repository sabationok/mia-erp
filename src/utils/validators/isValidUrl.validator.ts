import { isArray } from 'lodash';
import { HttpStatusCode } from 'axios';

type IsURLOptions = {
  require_protocol?: boolean;
  require_valid_protocol?: boolean;
  protocols?: ('https' | 'http' | 'ftp' | 'android-app' | 'ios-app' | string)[];
  require_host?: boolean;
  require_tld?: boolean;
  require_port?: boolean;
  allow_underscores?: boolean;
  host_whitelist?: (string | RegExp)[];
  host_blacklist?: (string | RegExp)[];
  origin_whitelist?: (string | RegExp)[];
  origin_blacklist?: (string | RegExp)[];
  allow_trailing_dot?: boolean;
  allow_protocol_relative_urls?: boolean;
  disallow_auth?: boolean;
  allow_fragments?: boolean;
  allow_query_components?: boolean;
  validate_length?: boolean;
};

const checks = new Map<
  keyof IsURLOptions | string,
  {
    exec: (
      key: keyof IsURLOptions,
      options: IsURLOptions,
      url: URL,
      originalUrl: string
    ) => boolean | undefined | string;
  }
>([
  [
    'require_protocol',
    {
      exec: (key, options, url) => {
        return options[key] ? !!url.protocol : true;
      },
    },
  ],
  [
    'require_valid_protocol',
    {
      exec: (key, options, url) =>
        options[key] && options.protocols && !options.protocols.includes(url.protocol.replace(':', '')),
    },
  ],
  [
    'require_host',
    {
      exec: (key, options, url) => options[key] && !url.hostname,
    },
  ],
  [
    'require_tld',
    {
      exec: (key, options, url) => options[key] && !url.hostname.split('.').slice(-1)[0],
    },
  ],
  [
    'require_port',
    {
      exec: (key, options, url) => options[key] && !url.port,
    },
  ],
  [
    'allow_underscores',
    {
      exec: (key, options, url) => !options[key] && url.hostname.includes('_'),
    },
  ],
  [
    'host_whitelist',
    {
      exec: (key, options, url) => {
        const val = options[key];
        return (
          isArray(val) && !val.some(host => (host instanceof RegExp ? host.test(url.hostname) : host === url.hostname))
        );
      },
    },
  ],
  [
    'host_blacklist',
    {
      exec: (key, options, url) => {
        const val = options[key];
        return (
          isArray(val) && val?.some(host => (host instanceof RegExp ? host.test(url.hostname) : host === url.hostname))
        );
      },
    },
  ],
  [
    'origin_whitelist',
    {
      exec: (key, options, url) => {
        const val = options[key];
        return (
          isArray(val) &&
          !val.some(origin => (origin instanceof RegExp ? origin.test(url.origin) : origin === url.origin))
        );
      },
    },
  ],
  [
    'origin_blacklist',
    {
      exec: (key, options, url) => {
        const val = options[key];
        return (
          isArray(val) &&
          val?.some(origin => (origin instanceof RegExp ? origin.test(url.origin) : origin === url.origin))
        );
      },
    },
  ],
  [
    'allow_trailing_dot',
    {
      exec: (key, options, url) => !options[key] && url.hostname.endsWith('.'),
    },
  ],
  [
    'allow_protocol_relative_urls',
    {
      exec: (key, options, url) => !options[key] && url.protocol === ':',
    },
  ],
  [
    'disallow_auth',
    {
      exec: (key, options, url) => options[key] && (url.username || url.password),
    },
  ],
  [
    'allow_fragments',
    {
      exec: (key, options, url) => !options[key] && url.hash,
    },
  ],
  [
    'allow_query_components',
    {
      exec: (key, options, url) => !options[key] && url.search,
    },
  ],
  [
    'validate_length',
    {
      exec: (key, options, _url, originalUrl) => options[key] && originalUrl.length > 2048,
    },
  ],
]);

export function isValidURL(url: string, options: IsURLOptions = {}): boolean {
  try {
    if (options?.require_protocol === false && !url.startsWith('http://') && !url.startsWith('https://')) {
      // Додати протокол HTTP за замовчуванням
      url = 'http://' + url;
    }
    const parsedUrl = new URL(url);

    for (const [key] of Object.entries(options)) {
      const check = checks.get(key);
      if (check) {
        const res = check.exec(key as keyof IsURLOptions, options, parsedUrl, url);

        if (!res) {
          new Error({
            statusCode: HttpStatusCode.BadRequest,
            message: 'Url validation error',
            reason: key,
          });
        }
      }
    }

    return true;
  } catch (err) {
    console.error('[ IS_VALID_URL ERROR ]', err, { url });
    return false;
  }
}
