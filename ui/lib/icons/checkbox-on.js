
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1010.66849916 200.33218801v623.33562398c0 51.48752254-18.20140024 95.6196847-54.8535349 132.14715227-36.65213467 36.65213467-80.53496262 54.85353491-132.14715227 54.8535349H200.33218801c-51.48752254 0-95.6196847-18.20140024-132.14715227-54.8535349-36.65213467-36.77680182-54.85353491-80.65962974-54.8535349-132.14715227V200.33218801c0-51.48752254 18.20140024-95.6196847 54.8535349-132.14715227s80.53496262-54.85353491 132.14715227-54.8535349h623.33562398c51.48752254 0 95.6196847 18.20140024 132.14715227 54.8535349 36.65213467 36.65213467 54.85353491 80.65962974 54.8535349 132.14715227z"/>
    </svg>
  )
}

Vue.component('icon-checkbox-on', Icon)
export default Icon

