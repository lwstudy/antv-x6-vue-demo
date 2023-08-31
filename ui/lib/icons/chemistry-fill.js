
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M699.999793 0H324.000207c-2.199998 0-3.999996 1.799998-3.999995 3.999996v55.999938c0 2.199998 1.799998 3.999996 3.999995 3.999995h50.999944c2.199998 0 3.999996 1.799998 3.999996 3.999996v821.599093c0 73.499919 58.999935 134.199852 132.499854 134.399852 73.699919 0.3 133.499853-59.399934 133.499852-132.999853V67.999925c0-2.199998 1.799998-3.999996 3.999996-3.999996h50.999944c2.199998 0 3.999996-1.799998 3.999995-3.999995V3.999996c0-2.199998-1.799998-3.999996-3.999995-3.999996zM580.999924 612.699324c0 2.499997-2.499997 4.199995-4.799995 3.299996-9.29999-3.699996-19.199979-5.499994-28.999968-5.499994-8.69999 0-17.399981 1.399998-25.699971 4.299996-17.79998 6.099993-32.799964 18.39998-42.399954 34.699961-2.899997 4.999994-7.499992 6.599993-9.999989 7.099992s-7.299992 0.799999-11.899987-2.699997c-4.499995-3.299996-7.999991-7.599992-10.399988-12.499986-2.399997-4.799995-3.699996-10.199989-3.699996-15.799982V67.999925c0-2.199998 1.799998-3.999996 3.999996-3.999996h129.999856c2.199998 0 3.999996 1.799998 3.999996 3.999996v544.699399z"/>
    </svg>
  )
}

Vue.component('icon-chemistry-fill', Icon)
export default Icon

