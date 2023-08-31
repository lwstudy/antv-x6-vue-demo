
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M877.36432 303.170394c-12.498779-59.59418-29.397129-108.489405-50.89503-146.885656-21.497901-38.39625-48.695245-69.293233-81.592032-92.990919-32.796797-23.497705-67.99336-40.096084-105.389708-49.395176C602.191192 4.699541 559.595352 0 512 0s-90.191192 4.699541-127.48755 14.098623C347.216092 23.297725 312.019529 39.996094 279.122742 63.493799c-32.796797 23.697686-59.994141 54.694659-81.592032 92.890929-21.597891 38.29626-38.496241 87.191485-50.89503 146.785666-12.298799 59.59418-18.598184 129.287374-18.598184 208.879601 0 79.692218 6.299385 149.185431 18.598184 208.879602 12.398789 59.49419 29.397129 108.489405 50.89503 146.785665 21.497901 38.39625 48.695245 69.193243 81.592032 92.890929 32.796797 23.597696 67.99336 40.096084 105.389708 49.395176 37.296358 9.199102 79.892198 13.998633 127.48755 13.998633s90.191192-4.599551 127.48755-13.998633c37.296358-9.199102 72.592911-25.69749 105.389708-49.395176 32.796797-23.697686 60.094131-54.594668 81.592032-92.890929 21.597891-38.29626 38.496241-87.191485 50.89503-146.785665S895.962504 591.642222 895.962504 512.049995c0-79.792208-6.199395-149.285421-18.598184-208.879601zM687.182892 732.928425l-0.399961 0.399961L542.996973 877.214335 506.300557 913.910751c-10.099014 10.099014-27.297334 2.899717-27.297335-11.298897V589.842398L354.415389 714.430231c-3.099697 3.099697-8.199199 3.099697-11.298896 0l-33.89669-33.896689c-3.099697-3.099697-3.099697-8.199199 0-11.298897l145.385802-145.385802c6.199395-6.199395 6.199395-16.398399 0-22.597793L309.119813 355.765257c-3.099697-3.099697-3.099697-8.199199 0-11.298896l33.896689-33.89669c3.099697-3.099697 8.199199-3.099697 11.298897 0L479.003222 435.057514V122.388048c0-14.298604 17.19832-21.39791 27.297335-11.298897L684.783127 291.971487c24.597598 24.897569 24.597598 64.893663 0.09999 89.791231L567.39459 501.25105c-6.099404 6.199395-6.099404 16.198418 0 22.397812l118.68841 120.788205c23.997656 24.397617 24.497608 63.493799 1.099892 88.491358zM627.688702 699.231716L542.996973 786.623181v-196.980763l84.691729 87.391465c6.099404 6.199395 6.099404 15.998438 0 22.197833zM627.688702 347.866029L542.996973 435.257494v-196.980763l84.691729 87.391465c6.099404 6.199395 6.099404 15.998438 0 22.197833z"/>
    </svg>
  )
}

Vue.component('icon-bluetooth-fill', Icon)
export default Icon

