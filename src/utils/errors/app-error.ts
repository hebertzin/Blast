export class AppError extends Error {
  private code: number
  constructor(message: string, code: number) {
    super()
    this.message = message
    this.code = code
    this.name = 'AppError'
  }
}

export class FileNotFound extends Error {
  private code: number
  constructor(message: string, code: number) {
    super()
    this.message = message
    this.code = code
    this.name = 'FileNotFound'
  }
}

export class FileLengthError extends Error {
  private code: number
  constructor(message: string, code: number) {
    super()
    this.message = message
    this.code = code
    this.name = 'FileLengthError'
  }
}
