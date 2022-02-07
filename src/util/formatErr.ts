export default (err: any) => {
  return {
    error: {
      message: err.message,
      code: err.code,
    },
  }
}

