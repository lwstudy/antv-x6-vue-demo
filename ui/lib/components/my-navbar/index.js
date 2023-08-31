import {install} from '$ui/utils/helper'
import Module from './src/Navbar'
import Action from './src/Action'
import IconAction from './src/IconAction'
import FullScreenAction from './src/FullScreenAction'
import UserAction from './src/UserAction'


Module.Action = Action
Module.IconAction = IconAction
Module.FullScreenAction = FullScreenAction
Module.UserAction = UserAction


export default install(Module)
