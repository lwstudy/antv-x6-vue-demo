class UploadAdapter {
  constructor(loader, uploadFunc) {
    this.loader = loader
    this.uploadFunc = uploadFunc
  }
  
  upload() {
    const loader = this.loader
    return this.uploadFunc(loader)
  }
  
  abort() {
  }
}

export default UploadAdapter
