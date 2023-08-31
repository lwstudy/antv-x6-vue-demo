
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M851.152799 883.502405C757.521045 977.134159 634.710559 1024 512 1024s-245.521045-46.865841-339.152799-140.497595C-14.516234 696.238898-14.516234 392.460315 172.847201 205.196807 266.478955 111.565053 389.289441 64.699212 512 64.699212c102.625199 0 205.250398 32.77611 290.887978 98.228404 5.29614 3.997087 12.890604 0.299781 12.890605-6.295412V79.188651c0-16.987618 6.69512-33.275746 18.68638-45.267006l31.576984-31.576984c4.996358-4.996358 13.690022-1.498907 13.690022 5.695848V224.582677c0 35.274289-28.679096 63.953386-63.953386 63.953386H600.235687c-7.094829 0-10.692207-8.593736-5.695848-13.690022l31.576984-31.576984c11.99126-11.99126 28.279388-18.68638 45.267006-18.68638h83.239329c7.694392 0 10.991988-9.792862 4.796504-14.389512-27.979606-20.78485-58.357465-37.872396-90.933721-51.062781C618.622285 138.945096 566.060596 128.652598 512 128.652598s-106.622285 10.292498-156.485941 30.477786c-51.562417 20.884778-97.828695 51.662345-137.49978 91.333429-39.671085 39.671085-70.448652 85.937362-91.333429 137.499779C106.59549 437.727321 96.302992 490.28901 96.302992 544.349606s10.292498 106.622285 30.477785 156.485941c20.884778 51.562417 51.562417 97.828695 91.33343 137.49978 39.671085 39.671085 85.937362 70.448652 137.499779 91.333429C405.377715 949.854043 457.939404 960.046614 512 960.046614s106.622285-10.292498 156.485941-30.477785c51.562417-20.884778 97.828695-51.562417 137.49978-91.333429 39.671085-39.671085 70.448652-85.937362 91.333429-137.49978C917.504437 650.971892 927.697008 598.410203 927.697008 544.349606s-10.292498-106.622285-30.477785-156.485941c-3.297596-8.0941-6.795047-16.088274-10.59228-23.98252-2.598106-5.29614 1.299053-11.391697 7.194756-11.391696h13.789949c27.579898 0 52.261908 17.687108 60.755716 43.967952 53.660888 165.979022 14.589366 355.241073-117.214565 487.045004z"/>
    </svg>
  )
}

Vue.component('icon-reset', Icon)
export default Icon
