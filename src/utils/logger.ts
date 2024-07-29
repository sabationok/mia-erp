type ConsoleType = typeof console;

type LogType = keyof Pick<ConsoleType, 'error' | 'debug' | 'log' | 'warn'>;
export class ClientLogger {
  private _ctx: string = ClientLogger.name;
  private _prefix?: string = '';
  private _fullPrefix = `[${this._ctx}]`.padEnd(12, ' ') + (this._prefix ? `[${this._prefix}]`.padEnd(10, ' ') : '');
  constructor(ctx: string, prefix?: string) {
    this._ctx = ctx;
    this._prefix = prefix;
    this._fullPrefix = `[${this._ctx}]`.padEnd(12, ' ') + (this._prefix ? `[${this._prefix}]`.padEnd(10, ' ') : '');
  }

  setPrefix(pr: string) {
    this._prefix = pr;
  }

  get error(): ConsoleType['error'] {
    return (...args) => console.error(`${this._getLogType('error')}`, ...args);
  }

  get warn(): ConsoleType['warn'] {
    return (...args) => console.warn(`${this._getLogType('warn')}`, ...args);
  }

  get debug(): ConsoleType['debug'] {
    return (...args) => console.debug(`${this._getLogType('debug')}`, ...args);
  }

  get log(): ConsoleType['log'] {
    return (...args) => console.log(`${this._getLogType('log')}`, ...args);
  }

  private _getLogType = (type: LogType) => `[${type.toUpperCase()}]`.padEnd(10, ' ') + this._fullPrefix;
}

// const colors = {
//   Reset: '\x1b[0m',
//   Bright: '\x1b[1m',
//   Dim: '\x1b[2m',
//   Underscore: '\x1b[4m',
//   Blink: '\x1b[5m',
//   Reverse: '\x1b[7m',
//   Hidden: '\x1b[8m',
//
//   FgBlack: '\x1b[30m',
//   FgRed: '\x1b[31m',
//   FgGreen: '\x1b[32m',
//   FgYellow: '\x1b[33m',
//   FgBlue: '\x1b[34m',
//   FgMagenta: '\x1b[35m',
//   FgCyan: '\x1b[36m',
//   FgWhite: '\x1b[37m',
//   FgGray: '\x1b[90m',
//
//   BgBlack: '\x1b[40m',
//   BgRed: '\x1b[41m',
//   BgGreen: '\x1b[42m',
//   BgYellow: '\x1b[43m',
//   BgBlue: '\x1b[44m',
//   BgMagenta: '\x1b[45m',
//   BgCyan: '\x1b[46m',
//   BgWhite: '\x1b[47m',
//   BgGray: '\x1b[100m',
//   reset: '\x1b[0m',
//   red: '\x1b[31m',
//   green: '\x1b[32m',
//   yellow: '\x1b[33m',
//   blue: '\x1b[34m',
//   bold: '\x1b[1m',
// };
//
// function format(key: keyof typeof colors, ...args: any[]) {}

// const logStart = (name: string) => {
//   const start = Date.now();
//   _logger.log('[START]', `[${name}]`);
//
//   return () => {
//     _logger.log('[END]', `[${name}]`, Date.now(), start);
//   };
// };
