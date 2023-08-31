 
const fetchEditOpt = function(dictCode, dictNames, custFetch) {
  return new Promise((resolve, reject) => {
    if (this.$store.state.dict.options[dictCode]) {
      // 已存在 
      const obj = dictNames.reduce((total, name) => {
        total[name] = this.$store.state.dict.options[dictCode]
        return total
      }, {}) 
      resolve(obj);
    } else {
      return this.$store
        .dispatch('dict/fetchDictByCode', { dictCode, custFetch })
        .then(res => {
          const obj = dictNames.reduce((total, name) => {
            total[name] = res
            return total
          }, {}) 
          resolve(obj);
        });
    }
  });
};
const _flatDictList = function(arr) {
  const fetchMap = {}
  const codeMap = arr.reduce((total, item) => {
    const custFetch = item.custFetch || null
    fetchMap[item.code] = custFetch
    if (total[item.code]) {
      total[item.code].push(item.name)
    } else {
      total[item.code] = [item.name]
    }
    return total
  }, {}) 
  const list = Object.entries(codeMap).map((entry) => {
    return {
      code: entry[0],
      names: entry[1],
      custFetch: fetchMap[entry[0]]
    }
  }) 
  return list
}
export const getOptionsMap = function(DictList) {
  const fetchActions = _flatDictList(DictList).map(item => {
    return fetchEditOpt.apply(this, [item.code, item.names, item.custFetch]);
  });

  return Promise.all(fetchActions).then(res => {
    const optMap = res.reduce((total, item) => {
      total = { ...total, ...item };
      return total;
    }, {});

    return Promise.resolve(optMap);
  });
};

export const findLevel = function(opts, id, arr) {
  // 递归获取完整层级选项数组
  for (let index = 0; index < opts.length; index++) {
    if (opts[index].id === id) {
      arr.unshift(opts[index].id);
      if (opts[index].parentId) {
        findLevel(opts, opts[index].parentId, arr);
      }
      break;
    }
  }
};


export const findPathInOpts = function(opts, id) {
  const arr = []
  findLevel(opts, id, arr)
  return arr
}


export const _getOptsMap = function(options) {
  const map = {};
  options.forEach(item => {
    map[item.value] = item;
  });
  return map;
};

export const getOptionMap = function(dictCode) {
  if (this.$store.state.dict.optionMap[dictCode]) {
    return this.$store.state.dict.optionMap[dictCode];
  } else {
    if (this.$store.state.dict.options[dictCode]) {
      const map = _getOptsMap(this.$store.state.dict.options[dictCode]);
      const playload = {};
      playload[dictCode] = map;
      this.$store.commit('dict/setOptionMap', playload);
      return map;
    } else {
      return {};
    }
  }
};
