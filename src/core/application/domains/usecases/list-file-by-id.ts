import { File } from '../file'

export interface IListFileByIdUseCase {
  invoke(file_id: string): Promise<File>
}
