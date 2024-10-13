export interface IUploadFilesUseCase {
  invoke(files: Express.Multer.File[]): Promise<void>
}
