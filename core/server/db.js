/**
 * 文件数据库操作类
 * @author 陈华春
 */
const fs = require('fs')
const utils = require('../utils')
const constant = require('../constant')
const dbPath = utils.resolve(constant.dbDir)

const loadFile = function (file) {
  if (!fs.existsSync(file)) {
    utils.writeFile(file, '{}')
  }
  return JSON.parse(fs.readFileSync(file, 'utf-8'))
}

const saveFile = function (path, model) {
  utils.writeFile(path, JSON.stringify(model))
}

class DB {
  constructor(name) {
    this.name = name;
    this.file = utils.join(dbPath, `${name}.json`);
    this.data = loadFile(this.file)
  }

  get(id) {
    return this.data[id]
  }

  add(model) {
    const id = utils.uid()
    model._id = id;
    model._time = new Date().toLocaleString()
    this.data[id] = model
    utils.writeFile(this.file, this.data)
    return id
  }

  update(id, model) {
    const m = this.data[id];
    if (m) {
      model._time = new Date().toLocaleString()
      this.data[id] = model
    }
    saveFile(this.file, this.data)
  }

  remove(id) {
    const m = this.data[id];
    if (m) {
      delete this.data[id];
    }
    saveFile(this.file, this.data)
  }

  list() {
    return Object.keys(this.data).map(key => this.data[key])
  }

  clear() {
    this.data = {}
    saveFile(this.file, this.data)
  }

  drop() {
    this.data = null
    fs.unlinkSync(this.file)
  }

  destroy() {
    this.data = null
  }
}


DB.getFiles = function () {
  const files = fs.readdirSync(dbPath) || []
  return files.map(file => {
    return new DB(file.replace('.json', ''))
  })
}

DB.create = function (name) {
  return new DB(name)
}

module.exports = DB
