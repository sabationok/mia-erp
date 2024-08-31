import { ClientApi } from './client.api';
import { ApiAxiosResponse } from './api.types';
import { IBase } from '../types/utils.types';
import { HasBaseCmsConfigs } from '../types/cms.types';
import axios, { AxiosResponse } from 'axios';

type MimeTypeImage = `image/${'jpeg' | 'png' | 'webp' | string}`;
type MimeTypeVide = `video/${string}`;
export namespace FilesApi {
  export interface GetFileUploadLinkDto {
    mimeType?: MimeTypeImage | MimeTypeVide | string;
    type?: 'image' | 'video';
    fileName?: string;
  }
  export interface FileUploadLinkResponseData extends GetFileUploadLinkDto {
    url: string;
  }
  export interface UploadedFileByLinkData extends GetFileUploadLinkDto {
    url: string;
  }
  export interface SaveUploadedFileLinkDto extends GetFileUploadLinkDto, FileUploadLinkResponseData {
    offerId?: string;
    integrationId?: string;
  }

  export interface FileEntity extends IBase, GetFileUploadLinkDto, HasBaseCmsConfigs {
    src: string;
    sizes?: Omit<FileEntity, 'sizes'>[];
    offer?: IBase;
    cmsParams?: HasBaseCmsConfigs['cmsConfigs'];
  }
  export interface UploadFileByLinkDto {
    url?: string;
    file?: File;
  }

  export type UploadFileWithLinkDto = UploadFileByLinkDto & SaveUploadedFileLinkDto & GetFileUploadLinkDto;
  export class Client {
    private static _api = ClientApi.clientRef;
    private static _enps = ClientApi._endpoints.files;

    public static getUploadLink = (
      data?: GetFileUploadLinkDto
    ): Promise<ApiAxiosResponse<FileUploadLinkResponseData>> => {
      return this._api.post(this._enps.getUploadUrl(), data);
    };
    public static saveUploadedFileLink = (data?: SaveUploadedFileLinkDto): Promise<ApiAxiosResponse<FileEntity>> => {
      return this._api.post(this._enps.saveUploadedFileUrl(), data);
    };
    public static uploadFileByLink = (data?: UploadFileByLinkDto): Promise<AxiosResponse<string>> => {
      return axios.put(data?.url ?? '', data?.file, {
        headers: {
          'Content-Type': data?.file?.type,
        },
      });
    };
    public static uploadFile = async (
      { file, offerId, ...data }: Partial<UploadFileWithLinkDto> = {
        url: '',
        file: undefined,
      }
    ) => {
      const linkRes = await this.getUploadLink({ ...data });

      const uploadedFileRes = await this.uploadFileByLink({ ...linkRes.data.data, file });
      console.log('uploadedFileRes', ...Object.entries(uploadedFileRes.data));
      return this.saveUploadedFileLink({ offerId, url: uploadedFileRes.data });
    };
  }
}
