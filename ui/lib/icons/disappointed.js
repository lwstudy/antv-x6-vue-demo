
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M955.626708 416.337368c30.288169-12.994924 37.985162-52.4795 14.594299-75.870363L727.715736 97.961734c-65.274502-65.274502-151.440843-97.961734-237.507224-97.961734s-172.232722 32.687232-237.507223 97.961734c-65.274502 65.274502-97.961734 151.440843-97.961734 237.507223 0 2.998829 0 5.997657 0.099961 8.896525-3.898477 3.398672-6.897306 7.796954-8.796564 12.994924-13.894572 38.285045-23.390863 78.269426-28.28895 118.653651-7.796954 63.675127-3.898477 126.95041 11.395549 187.926591 12.795002 50.980086 33.58688 99.66107 61.675908 144.543538 22.991019 36.68567 50.980086 71.172198 83.367434 102.459976 51.37993 49.780554 101.560328 79.76884 126.850449 93.263569 4.798126 2.499024 9.896134 3.798516 14.994143 3.798517 11.49551 0 22.491214-6.197579 28.28895-16.993362 8.296759-15.593909 2.399063-34.986333-13.194846-43.283093C386.449043 924.039047 237.407263 832.374854 191.125342 648.34674c-13.694651-54.378758-15.69387-105.358844-11.49551-150.441234 0.699727-7.896915 11.295588-9.996095 14.994143-3.09879 15.094104 28.089028 34.486529 54.478719 58.077314 78.069504l242.505271 242.505272c23.290902 23.290902 62.875439 15.69387 75.870363-14.594299l77.469738-180.829364 98.861383 6.897306c19.392425 1.399453 35.486138-14.794221 34.186646-34.186646l-6.897306-98.861382 180.929324-77.469739z m-185.627489 9.996095l-41.383834 17.693089c-12.495119 5.397891-20.292073 18.092932-19.292464 31.587661l3.098789 44.882468 2.798907 39.984381-39.984381-2.798907-44.882468-3.098789c-13.59469-0.899649-26.289731 6.797345-31.587661 19.292464l-17.693089 41.383834L522.395939 752.106209 297.883639 527.69387c-25.789926-25.789926-45.782116-55.978134-59.376806-89.664975-13.194846-32.587271-19.792269-67.17376-19.792268-102.559938 0-35.486138 6.697384-69.972667 19.792268-102.559937 13.59469-33.686841 33.58688-63.875049 59.376806-89.664975 25.789926-25.789926 55.978134-45.782116 89.664975-59.376806 32.587271-13.194846 67.17376-19.89223 102.559937-19.892229 35.486138 0 69.972667 6.697384 102.559938 19.892229 33.686841 13.59469 63.875049 33.58688 89.664974 59.376806l45.282312 45.282312 27.589223 27.589223L906.845763 367.656384l-136.846544 58.677079zM543.987505 1008.006248c-6.197579 0-12.495119-1.799297-17.992972-5.597814-14.594299-9.996095-18.292854-29.888325-8.39672-44.482624 36.885592-53.978914 82.767669-99.761031 136.34674-136.346739 65.574385-44.682546 142.144475-74.171027 221.513471-85.166732 17.493167-2.399063 33.686841 9.796173 36.085904 27.28934 2.399063 17.493167-9.796173 33.686841-27.28934 36.085904-69.672784 9.696212-136.846544 35.586099-194.324092 74.770793-46.981648 31.987505-87.265912 72.271769-119.5533 119.553299-6.197579 8.996486-16.193674 13.894572-26.389691 13.894573zM272.093713 992.012495c-6.797345 0-13.694651-2.199141-19.492385-6.597423-31.987505-24.490433-67.073799-44.582585-104.459196-59.676689-38.185084-15.393987-78.369387-25.490043-119.353378-29.888324C11.195627 893.9508-1.499414 878.256931 0.399844 860.663803c1.899258-17.593128 17.593128-30.288169 35.186255-28.38891 46.881687 4.998048 92.863725 16.493557 136.546662 34.086685 42.683327 17.193284 82.86763 40.184303 119.453338 68.27333 13.994533 10.795783 16.693479 30.787973 5.897696 44.882468-6.29754 8.196798-15.793831 12.495119-25.390082 12.495119z"/>
    </svg>
  )
}

Vue.component('icon-disappointed', Icon)
export default Icon

