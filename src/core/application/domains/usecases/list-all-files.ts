import { _Object } from '@aws-sdk/client-s3'

export interface IListFilesUseCase {
  invoke(): Promise<_Object[]>
}
