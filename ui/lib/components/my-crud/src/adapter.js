import config from '$ui/config'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const {page, limit} = config.keys
const defaultMethods = ['fetch', 'add', 'update', 'remove', 'get', 'batch']

function fetchAdapter(name, vm) {
  return query => {
    const pageValue = query.page
    const limitValue = query.limit
    delete query.page
    delete query.limit
    return vm[`fetch${name}`]({
      data: {
        ...query,
        [page]: pageValue,
        [limit]: limitValue
      }
    })
  }
}

function getAdapter(name, vm) {
  return ({row}) => {
    return vm[`get${name}`]({
      id: row.id
    })
  }
}

function updateAdapter(name, vm) {
  return ({row, index}) => {
    return vm[`update${name}`]({
      data: row,
      index
    })
  }
}

function addAdapter(name, vm) {
  return ({row, index}) => {
    return vm[`add${name}`]({
      data: row,
      index
    })
  }
}

function removeAdapter(name, vm) {
  return ({row, index}) => {
    return vm[`remove${name}`]({
      id: row.id,
      index
    })
  }
}

function batchAdapter(name, vm) {
  return ({rows, indexes}) => {
    return vm[`batch${name}`]({
      data: rows,
      indexes
    })
  }
}

/**
 *
 * @param name
 * @param methods
 * @return {Object}
 *
 * @example
 *
 * return MyCrud.adapter.call(this, 'user', ['fetch', 'add', 'update', 'remove', 'get', 'batch'])
 */
export default function (name, methods) {
  const actions = methods || defaultMethods
  const cameName = upperFirst(camelCase(name))
  const result = {}
  const map = {
    get: getAdapter,
    fetch: fetchAdapter,
    add: addAdapter,
    update: updateAdapter,
    remove: removeAdapter,
    batch: batchAdapter
  }

  actions.forEach(method => {
    result[method] = map[method](cameName, this)
  })
  return Object.freeze(result)
}
