import moduleInit from './dict-module' 
import * as dictOpts from './dict-opts'
import * as filter from './filter/index'
import * as dateFilter from './filter/date-format'

const dictManage = {
  moduleInit,
  ...dictOpts,
  ...filter,
  ...dateFilter
}

export const dictModuleInit = dictManage.moduleInit
export const getOptionsMap = dictManage.getOptionsMap
export const findLevel = dictManage.findLevel
export const findPathInOpts = dictManage.findPathInOpts
export const getOptionMap = dictManage.getOptionMap

export const addFormatFilter = dictManage.addFormatFilter
export const formatFilterInit = dictManage.formatFilterInit
export const formatFilter = dictManage.formatFilter

export const dateFormat = dictManage.dateFormat
export const stampToDate = dictManage.stampToDate
export const dateToStamp = dictManage.dateToStamp