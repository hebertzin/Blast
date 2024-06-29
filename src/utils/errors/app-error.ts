export class AppError extends Error {
  code: number
  constructor(message: string, code: number) {
    super()
    this.message = message
    this.code = code
    this.name = 'AppError'
  }
}

export class FileNotFound extends Error {
  code: number
  constructor(message: string, code: number) {
    super()
    this.message = message
    this.code = code
    this.name = 'FileNotFound'
  }
}

export class FileLengthError extends Error {
  code: number
  constructor(message: string, code: number) {
    super()
    this.message = message
    this.code = code
    this.name = 'FileLengthError'
  }
}
