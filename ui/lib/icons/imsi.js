
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M960 160H261.6c-24.5 0-48.6 7.1-69.2 20.3L58.8 266.2C22.2 289.8 0 330.3 0 373.9V800c0 35.3 28.7 64 64 64h896c35.3 0 64-28.7 64-64V224c0-35.4-28.7-64-64-64z m0 624c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V373.9c0-21.8 11.1-42.1 29.4-53.8L227 234.2c10.3-6.6 22.3-10.2 34.6-10.2H944c8.8 0 16 7.2 16 16v544zM512 512h-32v192h32V512zM928 512h-32v192h32V512zM288 736h-32v32h32v-32zM352 736h-32v32h32v-32zM416 736h-32v32h32v-32zM480 736h-32v32h32v-32zM544 736h-32v32h32v-32zM608 736h-32v32h32v-32zM672 736h-32v32h32v-32zM736 736h-32v32h32v-32zM800 736h-32v32h32v-32zM864 736h-32v32h32v-32zM928 736h-32v32h32v-32zM704 512v192h-32V544h-32v160h-32V544h-32v160h-32V512zM768 544v64h96v96H736v-32h96v-32h-96V512h128v32z"/>
    </svg>
  )
}

Vue.component('icon-imsi', Icon)
export default Icon

