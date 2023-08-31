<template>

  <my-chart v-bind="$attrs" v-on="$listeners" :theme="theme" :options="chartOptions"  ></my-chart>

</template>

<script>
/*
参考案例： 立体圆柱Charts
https://www.makeapie.com/editor.html?c=xvh81yeAKa
*/
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pictorialBar'
// import echarts from 'echarts/lib/echarts'
import {LinearGradient} from 'echarts/lib/util/graphic'
import {colorData} from '$ui/utils/color'
import setExtend from '$ui/charts/utils/extend'
export default {
  props: {
    theme: {
      type: String,
      default: 'dark'
    },
    data: {
      type: Object,
      default: () => {
        return {
          xData: [],
          yData: []
        }
      }
    },
    type: {
      type: String,
      default: 'circle',
      validator: function (t) {
        return ['circle', 'diamond'].includes(t)
      }
    },
    color: {
      type: String,
      default: '#37A2DA',
      validator: function(t) {
        return !!colorData(t)
      }
    },
    topColor: {
      type: String
    },
    bottomColor: {
      type: String
    },
    linearDegree: {
      type: Array,
      default: () => { return [0.9, 0.1] }
    },
    barWidth: {
      type: Number,
      default: 40
    },
    track: {
      type: Boolean | Number,
      default: false
    },
    bed: {
      type: Boolean,
      default: true
    },
    extend: {
      type: Object
    }
  },

  data() { 
    return {}
  },
  computed: {
    colorMap() {
      return colorData(this.color)
    },
    topLabelColor() {
      if (this.topColor) {
        return this.topColor
      } else {
        return this.colorMap.hex
      }
    },
    bottomLabelColor() {
      if (this.bottomColor) {
        return this.bottomColor
      } else {
        return this.colorMap.hex
      }
    },
    chartOptions() {
      const opts = {  
        tooltip: {
          show: true 
        },
        animation: false,
        xAxis: [
          {
            type: 'category',
            data: this.data.xData,
            axisTick: {
              alignWithLabel: true
            },
            nameTextStyle: {
              color: '#82b0ec'
            },
            axisLine: { // 隐藏横坐标
              show: false 
            },
            axisLabel: {
              textStyle: {
                color: this.bottomLabelColor
              },
              margin: 30
            }
          }
        ],
        yAxis: [
          {
            show: false
          }
        ],
        series: [
          // ============上下顶底椭圆==============
          {
            name: '',
            type: 'pictorialBar',
            symbol: this.type,
            symbolSize: [this.barWidth, 10],
            symbolOffset: [0, -6], // 上部椭圆
            symbolPosition: 'end',
            z: 12, 
            label: {
              normal: {
                show: true,
                position: 'top',
                // "formatter": "{c}%"
                fontSize: 15,
                fontWeight: 'bold',
                color: this.topLabelColor // '顶部文字颜色'
              }
            },
            color: this.colorMap.hex, // 顶部颜色
            data: this.data.yData
          },
          {
            name: '',
            type: 'pictorialBar',
            symbol: this.type,
            symbolSize: [this.barWidth, 10],
            symbolOffset: [0, 7], // 下部椭圆
            // "barWidth": "20",
            z: 12,
            color: this.colorMap.hex,
            data: this.data.yData
          },
          // ============底座series===========
          ...this.bedSeries,
          // ============柱身 series===========
          {
            type: 'bar',
            // silent: true,
            barWidth: `${this.barWidth}`,
            barGap: '10%', // Make series be overlap
            barCategoryGap: '10%',
            itemStyle: {
              normal: {
                color: new LinearGradient(0, 0, 0, 0.9, [
                    {
                        offset: 0,
                        color: `rgba(${this.colorMap._rgb}, 0.9)`
                    },
                    {
                        offset: 1,
                        color: `rgba(${this.colorMap._rgb}, 0.4)` // '#0B3147'
                    }
                ]),
                opacity: 0.8
              }
            },
            data: this.data.yData
          },
          // ===========track series==========
          ...this.trackSeries
        ]
      }
      setExtend(opts, this.extend)
      return opts
    },
    trackData() {
      if (!this.track) {
        return null
      } else {
        const maxData = this.data.yData.concat([]).sort((a, b) => { return b - a })[0]
        if (typeof this.track === 'boolean') {
          return this.data.yData.map((item) => {
            return maxData
          })
        } else {
          const max = Math.max(this.track, maxData)
          return this.data.yData.map((item) => {
            return max
          })
        }
      }  
    },
    // track series数据
    trackSeries() {
      if (this.trackData) {
        return [
          {  
            type: 'bar',
            barWidth: `${this.barWidth}`,
            barGap: '-100%', // Make series be overlap 
            itemStyle: {
              normal: {
                color: `rgba(${this.colorMap._rgb}, 0.2)`
              }
            },
            tooltip: {
              formatter: '总量: {c}' 
            },
            zlevel: -1,
            data: this.trackData
          },
          { 
            type: 'pictorialBar',
            symbol: this.type,
            symbolSize: [this.barWidth, 10],
            symbolOffset: [0, '-50%'], // 上部椭圆
            symbolPosition: 'end',
            tooltip: {
              formatter: '总量: {c}' 
            },
            z: -1,  
            color: `rgba(${this.colorMap._rgb},0.3)`, // 顶部颜色
            data: this.trackData
          }
        ]
      } else {
        return []
      }
    },
    // 底座series数据
    bedSeries() {
      if (this.bed) {
        return [
          {
            name: '',
            type: 'pictorialBar',
            symbol: this.type,
            symbolSize: (d) => {
              return d > 0 ? [(this.barWidth + 10), 15] : [0, 0]
            },
            symbolOffset: [0, 12], // 下部内环
            z: 10,
            itemStyle: {
              normal: {
                color: 'transparent',
                borderColor: this.colorMap.hex, // '内边框颜色',
                borderType: 'solid',
                borderWidth: 1
              }
            },
            data: this.data.yData
          },
          {
            name: '',
            type: 'pictorialBar',
            symbol: this.type,
            symbolSize: [this.barWidth + 20, 20],
            symbolOffset: [0, 18], // 下部外环
            z: 10,
            itemStyle: {
              normal: {
                color: 'transparent',
                borderColor: this.colorMap.hex, // '#19465D', // '外边框颜色',
                borderType: 'solid',
                borderWidth: 2
              }
            },
            data: this.data.yData
          }
        ]
      } else {
        return []
      }
    }
    
  }
}

</script>