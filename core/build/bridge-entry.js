import Messager, {MESSAGE_TYPE} from '$ui/utils/messager'

const messager = new Messager({
  target: parent.window
})

messager.on(MESSAGE_TYPE, function (data) {
  messager.pass(data)
})

