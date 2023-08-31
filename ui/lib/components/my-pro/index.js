import {install} from '$ui/utils/helper'
import Module from './src/Pro'
import Breadcrumb from './src/Breadcrumb'

Module.Breadcrumb = Breadcrumb
export default install(Module)
