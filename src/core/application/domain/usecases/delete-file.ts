export interface IDeleteFileUseCase {
  invoke(file_id: string): Promise<void>
}
