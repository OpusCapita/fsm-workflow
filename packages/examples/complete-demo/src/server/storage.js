import { objectIdProp } from '../common';

class Storage {
  set(data) {
    Object.keys(data).forEach(key => {
      this[key] = data[key]
    })
  }

  get(key) {
    return this[key]
  }

  getObjectById(id) {
    return this.businessObjects.find(object => object[objectIdProp] === id)
  }

  updateObject(newObject) {
    this.businessObjects = this.businessObjects.map(
      object => object[objectIdProp] === newObject[objectIdProp] ? newObject : object
    )
  }
}

export default new Storage();
