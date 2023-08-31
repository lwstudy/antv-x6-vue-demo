import axios from 'axios'
// 全局formatFilter 的添加字典函数
import {addFormatFilter, dictModuleInit} from '@/helper/dict-management/index';

// const addFormatFilter = dictManage.addFormatFilter
// const dictModelInit = dictManage.dictModelInit

// 建议命名为“getCommonDict” 作为系统内常规获取字典的方法， 下面action中调用
const getCommonDict = function (dictCode) {
  // 调接口获取字典方法 根据项目实际情况自行编写。
  return axios({
      url: '/data/' + dictCode + '.json'
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

export default dictModuleInit(getCommonDict, addFormatFilter)