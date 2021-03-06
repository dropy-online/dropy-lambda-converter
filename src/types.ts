import { Handler } from 'aws-lambda';
import { S3 } from 'aws-sdk';

export interface Options {
  format?: string;
  pathname?: string | null;
  size?: number | null;
  quality?: number | null;
  density?: number | null;
  division?: number;
}

export interface QueryParams extends Options {
  key: string;
}

export enum AvailableType {
  'application/pdf' = 'pdf',
}

export type S3Object = {
  ContentType: string;
  Body: S3.Body;
};

export type PageDivision = number[][];

export type ConvertParams = { options: Options; key: string };

export type ConvertEvent = {
  item: number[];
  params: ConvertParams;
};

export type ConvertResult = {
  page: number;
  url: string;
};

export type ConvertResponse = {
  data: ConvertResult[];
};

export type ConvertHandler = Handler<ConvertEvent, void | ConvertResponse>;

export enum RequestErrors {
  UNDEFINED_QUERY_PARAMS = 'UNDEFINED_QUERY_PARAMS',
  UNDEFINED_FILE_TYPE = 'UNDEFINED_FILE_TYPE',
  UNSUPPORTED_FILE_TYPE = 'UNSUPPORTED_FILE_TYPE',
}

export enum S3Errors {
  FAILED_S3_GET_OBJECT = 'FAILED_S3_GET_OBJECT',
  FAILED_S3_PUT_OBJECT = 'FAILED_S3_PUT_OBJECT',
  FAILED_S3_DELETE_OBJECT = 'FAILED_S3_DELETE_OBJECT',
}

export enum ConvertErrors {
  UNDEFINED_CONVERT_PAYLOAD = 'UNDEFINED_CONVERT_PAYLOAD',
  FAILED_PARSE_PDF = 'FAILED_PDF_PARSING',
  FAILED_CONVERT_PAGE = 'FAILED_CONVERT_PAGE',
}

export type ErrorInfo = {
  code?: RequestErrors | S3Errors | ConvertErrors | string;
  message?: string | Error | null;
};

export type ErrorResponseBody = {
  status: 'error';
  error: ErrorInfo | string;
};

export type SuccessResponseBody = {
  status: 'succeded';
  data: ConvertResult[];
};

export type APIResponse = {
  headers: { [key: string]: string | boolean | number };
  statusCode: number;
  body: string;
};
