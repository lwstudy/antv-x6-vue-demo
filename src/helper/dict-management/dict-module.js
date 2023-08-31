// --------------以下代码为定义字典加载方法-------
/* 
import axios from 'axios'
const getCommonDict = function (dictCode) {
  // 调接口获取字典方法 根据项目实际情况自行编写。
  return axios({
      url: '/assets/data/' + dictCode + '.json'
    }).then((res) => {
      if (res.data.code === 0) {
        return Promise.resolve(res.data.data)
      } else {
        return Promise.resolve([])
      }
    }).catch(() => {
      return Promise.resolve([])
    })
}
*/
// --------------以上代码为定义字典加载方法-------

// 全局formatFilter 的添加字典函数
// import { addFormatFilter } from '@/helper/filter';
// const dictModel = dictModelInit(getCommonDict, addFormatFilter)

const dictModuleInit = function(getCommonDict, addFormatFilter) {
  return {
    namespaced: true,
    state: {
      options: {},
      optionMap: {}
    },
    mutations: {
      setOptions(state, payload) {
        const obj = Object.assign({}, state.options, payload);
        state.options = obj;
      },
      setOptionMap(state, payload) {
        const obj = Object.assign({}, state.optionMap, payload);
        for (const name in payload) {
          addFormatFilter(name);
        }
        state.optionMap = obj;
      }
    },
    actions: {
      fetchDictByCode(context, { dictCode, custFetch }) {
        const fetchFn = custFetch ? custFetch(dictCode) : getCommonDict(dictCode) 
        return fetchFn.then(res => { 
          const arr = Array.isArray(res) && res.map(item => {
            return {
              ...item
              // value: item.dictCode || item.orgCode,
              // label: item.dictName || item.orgName,
              // id: item.dictCode || item.orgCode,
              // parentId: item.parentCode
            };
          }) || [];
          const obj = {},
            map = {};
          obj[dictCode] = arr;
          context.commit('setOptions', obj);
          arr.forEach(r => {
            map[r.value] = r;
          });
          
          context.commit('setOptionMap', { [dictCode]: map });
          return Promise.resolve(Object.freeze(arr));
        });
      }
    }
  };
} 

export default dictModuleInit
