
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M968.054634 567.945366c0 251.854049-204.200585 456.054634-456.054634 456.054634S55.945366 819.799415 55.945366 567.945366c0-171.63239 94.807415-321.086439 234.870634-398.910439 41.859122-23.277268 93.308878 6.893268 93.308878 54.746536v2.797269c0 22.877659-12.487805 43.757268-32.468293 54.946341-26.174439 14.685659-50.250927 32.867902-71.729951 54.446829-30.170537 30.170537-53.847415 65.336195-70.431219 104.398049-17.083317 40.360585-25.774829 83.318634-25.77483 127.675317 0 44.356683 8.691512 87.314732 25.77483 127.675317 16.483902 39.061854 40.260683 74.12761 70.431219 104.398049 30.170537 30.170537 65.336195 53.847415 104.398049 70.43122C424.685268 887.433366 467.643317 896.124878 512 896.124878s87.314732-8.691512 127.675317-25.774829c39.061854-16.483902 74.12761-40.260683 104.398049-70.43122 30.170537-30.170537 53.847415-65.236293 70.431219-104.398049 17.083317-40.360585 25.774829-83.318634 25.77483-127.675317 0-44.356683-8.691512-87.314732-25.77483-127.675317-16.483902-39.061854-40.260683-74.12761-70.431219-104.398048-21.578927-21.479024-45.555512-39.761171-71.729951-54.44683-19.980488-11.189073-32.468293-32.068683-32.468293-54.946341V223.781463c0-47.853268 51.449756-78.023805 93.308878-54.746536 140.06322 77.824 234.870634 227.278049 234.870634 398.910439zM575.937561 495.516098c0 35.165659-28.771902 63.937561-63.937561 63.937561s-63.937561-28.771902-63.937561-63.937561V63.937561c0-35.165659 28.771902-63.937561 63.937561-63.937561s63.937561 28.771902 63.937561 63.937561v431.578537z"/>
    </svg>
  )
}

Vue.component('icon-power-fill', Icon)
export default Icon

