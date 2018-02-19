class Storage {
  set(data) {
    Object.keys(data).forEach(key => {
      this[key] = data[key]
    })
  }

  get(key) {
    return this[key]
  }
}

export default new Storage();
