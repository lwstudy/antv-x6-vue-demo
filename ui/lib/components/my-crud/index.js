import {install} from '$ui/utils/helper'
import Module from './src/Crud'
import adapter from './src/adapter'

Module.adapter = adapter

export default install(Module)
