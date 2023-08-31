<template>
    <div class="my-particle"  :style="styles">
      <slot></slot>
    </div>
</template>
<script>
  /**
   * 粒子特效
   * @author 李国师 chester
   * @module $ui/components/my-particle
   */
    import {addResizeListener, removeResizeListener} from 'element-ui/lib/utils/resize-event'
  const defaultOptions = {
    maxNum: 200, // 粒子数量
    initSpeed: 50, // 每秒新增的粒子数
    radius: 1.5, // 粒子半径区间, 数字或数组
    speed: 0.5, // 运动速度最大值
    scaleSpeed: 0.01, // expand 或 shrink时有用，粒子放大速度
    direction: '', // 运动指向方向
    rebound: false, // 是否反弹
    hole: 50, // 黑洞半径
      // 字符串或数组, 数组时可在不同颜色循环变化 
        /*
         颜色变换数组
           [
              {
                  color: 'rgba(255,0,0,1)',
                  transitionTime: 1000, // 变换时长
                  duration: 5000   // 持续时间
              },
              {
                  color: 'rgba(0,255,0,1)',
                  transitionTime: 1000,
                  duration: 5000 
              }
          ]
        */
    color: 'rgba(0,188,212,0.9)'
  }
    /**
   * 插槽
   * @member slots
   * @property {string} default 默认插槽，定义其它内容
   */
    export default {
      name: 'MyParticle',
      /**
     * 属性参数
     * @member props
     * @property {object} [options] 粒子配置
     * @property {object} [options.maxNum] 粒子数量
     * @property {object} [options.initSpeed] 每秒新增的粒子数
     * @property {object} [options.radius] 粒子半径区间, 数字或数组
     * @property {object} [options.speed] 运动速度最大值
     * @property {object} [options.direction] 运动指向方向
     * @property {object} [options.rebound] 是否反弹
     * @property {object} [options.scaleSpeed] direction为expand 或 shrink时有用，粒子放大速度
     * @property {object} [options.hole] direction为expand 或 shrink时有用，黑洞半径
     * @property {string} [width] 画布宽
     * @property {string} [height] 画布高
     * @property {function} [handleParticle] 粒子属性处理方法
     * @property {function} [handleDraw] 粒子形状处理方法
     * @property {function} [initParticle] 粒子初始化方法
     * @property {string|Array} [color] 粒子颜色
     * @property {string} [color[].color] 粒子颜色
     * @property {number} [color[].duration] 颜色持续时间
     * @property {number} [color[].transitionTime] 颜色变换时间
     **/
      props: {
        options: {
          type: Object,
          default() {
            return {
            }
          }
        },
        width: {
          type: String,
          default: '100%'
        },
        height: {
          type: String,
          default: '400px'
        },
        handleParticle: {
          type: [Function]
        },
        handleDraw: {
          type: [Function]
        },
        initParticle: {
          type: [Function]
        }
      },
      watch: {
        options: {
          deep: true,
          handler() {
            this.reset()
          }
          }
      },
      computed: {
        styles() {
          return {
            width: this.width,
            height: this.height
          }
        }
      },
        data() {
            return {
                canvas: null,
                setArr: [],
                transColor: [],
                animateStop: false,
                drawOption: {},
                resetTimeout: null
            }
        },
        methods: {
            initOption() {
                let x, y, theta
                if(['shrink'].includes(this.drawOption.direction)) {
                    const offsetX = this.canvas.width * 0.5
                    const offsetY = this.canvas.height * 0.5
                    const ra = Math.max(offsetX, offsetY) - 100 + Math.random() * 100
                    theta = Math.random() * Math.PI * 2
                    x = offsetX + ra * Math.sin(theta)
                    y = offsetY + ra * Math.cos(theta)
                } else if(['expand'].includes(this.drawOption.direction)) { 
                    const ra = this.drawOption.hole + Math.random() * (this.drawOption.hole + 20)
                    theta = Math.random() * Math.PI * 2
                    x = this.canvas.width / 2 + ra * Math.cos(theta)
                    y = this.canvas.height / 2 + ra * Math.sin(theta)
                } else {
                    x = Math.ceil(Math.random() * this.canvas.width)
                    y = Math.ceil(Math.random() * this.canvas.height)
                }
                const speed = this.drawOption.speed
                let vX = 0, vY = 0
                    vX = (-speed + Math.random() * speed * 2) * 0.25
                    vY = -speed + Math.random() * speed * 2  
                if(this.drawOption.direction === 'bottom') {
                     vX = (-speed + Math.random() * speed * 2) * 0.25
                      vY = Math.random() * speed 
                } else if(this.drawOption.direction === 'top') {
                    vX = (-speed + Math.random() * speed * 2) * 0.25
                      vY = -Math.random() * speed   
                }else if(this.drawOption.direction === 'left') {
                      vX = -Math.random() * speed 
                      vY = (-speed + Math.random() * speed * 2) * 0.25  
                } else if(this.drawOption.direction === 'right') {
                      vX = Math.random() * speed   
                      vY = (-speed + Math.random() * speed * 2) * 0.25  
                } else if(this.drawOption.direction === 'shrink') {
                    const vR = Math.random() * speed
                     vY = -vR * Math.cos(theta)
                     vX = -vR * Math.sin(theta)
                } else if(this.drawOption.direction === 'expand') {
                     const vR = Math.random() * speed
                     vX = vR * Math.cos(theta)
                     vY = vR * Math.sin(theta)
                }
                let radius = 3
                if(this.drawOption.radius instanceof Array) {
                    radius = (this.drawOption.radius[0] || 0.5) + Math.ceil(Math.random() * ((this.drawOption.radius[1] || 2) - (this.drawOption.radius[0] || 0.5)))
                } else {
                    radius = 0.2 + Math.ceil(Math.random() * this.drawOption.radius)
                }
                let customObj = {}
                if(typeof this.initParticle === 'function') {
                  customObj = this.initParticle(this)
                }
                const obj = {
                    x,
                    y,
                    vX,
                    vY,
                    radius: radius,
                    color: '',
                    colorArr: [],
                    colorDelay: Math.floor(Math.random() * 1000),
                    ...customObj
                };
                return obj
            },
            setCanvas() {
                this.drawOption = Object.assign({}, defaultOptions, this.options)
                const canvas = document.createElement('canvas')
                this.canvas = canvas
                this.$el.appendChild(canvas)
                this.cxt = canvas.getContext('2d')
                 addResizeListener(this.$el, this.setScreenSize)
                 this.setScreenSize()
                this.reset()
            },
            setScreenSize() {
               const rect = this.$el.getBoundingClientRect()
                 this.canvas.width = rect.width
                this.canvas.height = rect.height
            },
            reset() {
              if(this.resetTimeout) {
                clearTimeout(this.resetTimeout)
              }
              this.resetTimeout = setTimeout(() => {
                this.animateStop = true
                  this.drawOption = Object.assign({}, defaultOptions, this.options)
                this.setArr = []
                if(this.drawOption.color instanceof Array) {
                      this.transColor = this.drawOption.color.map(r => {
                          const reg = /rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?((\d)|(\d(?:\.\d{1,5}?)))\))?/
                          const cMatch = r.color.match(reg)
                          const cArr = cMatch ? [parseFloat(cMatch[1]), parseFloat(cMatch[2]), parseFloat(cMatch[3]), parseFloat(typeof cMatch[4] === 'undefined' ? 1 : cMatch[4])] : ''
                          return {
                            ...r,
                            color: cArr 
                          }
                      })
                  }
                this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height)
                this.ballSet()
                this.animateStop = false
                this.ballDraw(this.cxt)
              }, 400)
            },
            ballSet () {
                const timer1 = setInterval(() => {
                    // 控制小球总数
                    if (this.setArr.length >= this.drawOption.maxNum) {
                        clearInterval(timer1);
                    }
                    const obj = this.initOption()
                    if (Math.abs(obj.vX) > 0.005 || Math.abs(obj.vY) > 0.005) { // 防止速度为0 ，不要静止的小球
                        this.setArr.push(obj);
                    }
                }, 1000 / this.drawOption.initSpeed); 
            },
            ballDraw (time) {
              if(this.animateStop) {
                return
              }
                // 绘制前要清空前一帧的画布
                this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height)
                
                this.setArr.forEach(item => {
                    // 遇到边界是否反弹
                    this.getPosition(item, time)
                    this.getColor(item, time)
                    if(typeof this.handleDraw !== 'function') {
                      this.drawParticle(this.cxt, item, time)
                    } else {
                      this.handleDraw(this.cxt, item, time)
                    }
                })
                  requestAnimationFrame(this.ballDraw)
            },
            drawParticle(cxt, item, time) {
                cxt.beginPath();
                cxt.fillStyle = item.color;
                cxt.arc(item.x, item.y, item.radius, 0, 2 * Math.PI);
                cxt.fill();
            },
            getColor(item, time) {
                if(typeof this.drawOption.color === 'string') {
                    item.color = this.drawOption.color
                } else {
                    if(typeof item.status === 'undefined' || item.colorDelay) {
                        item.colorDelay--
                        item.colorTime = time
                        item.status = 0
                        item.colorArr = this.transColor[item.status].color
                        item.color = `rgba(${item.colorArr[0]},${item.colorArr[1]},${item.colorArr[2]},${item.colorArr[3]})`
                    } else {
                        if(time - item.colorTime > this.transColor[item.status].duration) {
                            item.status++
                            item.status = item.status % this.transColor.length
                            item.colorTime = time
                        } else if((this.transColor[item.status].duration - (time - item.colorTime)) < this.transColor[item.status].transitionTime) {
                            const nextStatus = (item.status + 1) % this.transColor.length
                            const nextColorArr = this.transColor[nextStatus].color
                            this.approtchColor(item, nextColorArr, time)
                        } else {
                            item.colorArr = this.transColor[item.status].color
                            item.color = `rgba(${item.colorArr[0]},${item.colorArr[1]},${item.colorArr[2]},${item.colorArr[3]})`
                        }
                    }
                }
            },
            approtchColor(item, nextColorArr, time) {
                const ratio = ((time - item.colorTime) - (this.transColor[item.status].duration - this.transColor[item.status].transitionTime)) / this.transColor[item.status].transitionTime
                const r = item.colorArr[0] + (nextColorArr[0] - item.colorArr[0]) * ratio
                const g = item.colorArr[1] + (nextColorArr[1] - item.colorArr[1]) * ratio
                const b = item.colorArr[2] + (nextColorArr[2] - item.colorArr[2]) * ratio
                const a = item.colorArr[3] + (nextColorArr[3] - item.colorArr[3]) * ratio
                item.color = `rgba(${r}, ${g}, ${b}, ${a})`
            },
            getPosition(item, time) {
                if(this.handleParticle && typeof this.handleParticle === 'function') {
                    this.handleParticle(item, this.canvas, time)
                } else {
                  const speed = this.drawOption.speed
                    if(['shrink'].includes(this.drawOption.direction)) {
                        const dx = item.x - this.canvas.width / 2
                        const dy = item.y - this.canvas.height / 2
                        if(Math.sqrt(dx * dx + dy * dy) < this.drawOption.hole) {
                            if(this.drawOption.radius instanceof Array) {
                                item.radius = (this.drawOption.radius[0] || 0.5) + Math.ceil(Math.random() * ((this.drawOption.radius[1] || 2) - (this.drawOption.radius[0] || 0.5)))
                            } else {
                                item.radius = 0.3 + Math.ceil(Math.random() * this.drawOption.radius)
                            }
                            const offsetX = this.canvas.width * 0.5
                            const offsetY = this.canvas.height * 0.5
                            const ra = Math.max(offsetX, offsetY) - 100 + Math.random() * 100
                            const theta = Math.random() * Math.PI * 2
                            item.x = offsetX + ra * Math.sin(theta)
                            item.y = offsetY + ra * Math.cos(theta)
                            const vR = Math.random() * speed
                            item.vY = -vR * Math.cos(theta)
                            item.vX = -vR * Math.sin(theta)
                        }
                        item.radius -= Math.max(Math.abs(item.vY), Math.abs(item.vX)) * this.drawOption.scaleSpeed
                        item.radius = item.radius <= 0.1 ? 0.1 : item.radius
                    } else if(['expand'].includes(this.drawOption.direction)) {
                        if ((item.x + item.radius >= this.canvas.width) || (item.x - item.radius <= 0) ||
                        (item.y + item.radius >= this.canvas.height) || (item.y - item.radius <= 0)) {
                            if(this.drawOption.radius instanceof Array) {
                                item.radius = (this.drawOption.radius[0] || 0.5) + Math.ceil(Math.random() * ((this.drawOption.radius[1] || 2) - (this.drawOption.radius[0] || 0.5)))
                            } else {
                                item.radius = 0.3 + Math.ceil(Math.random() * this.drawOption.radius)
                            }
                            const ra = this.drawOption.hole + Math.random() * (this.drawOption.hole + 20)
                            const theta = Math.random() * Math.PI * 2
                            item.x = this.canvas.width / 2 + ra * Math.cos(theta)
                            item.y = this.canvas.height / 2 + ra * Math.sin(theta)
                            const vR = Math.random() * speed
                            item.vX = vR * Math.cos(theta)
                            item.vY = vR * Math.sin(theta)
                        }
                        item.radius += Math.max(Math.abs(item.vY), Math.abs(item.vX)) * this.drawOption.scaleSpeed
                    } else {
                        // 处理x坐标反弹
                        if ((item.x + item.radius >= this.canvas.width) || (item.x - item.radius <= 0)) { 
                            if(this.drawOption.rebound) {
                                item.vX *= -1
                            } else {
                                item.x = item.vX < 0 ? (this.canvas.width - item.radius) : item.radius
                            }
                        }
                        // 处理y坐标反弹
                        if ((item.y + item.radius >= this.canvas.height) || (item.y - item.radius <= 0)) { 
                            if(this.drawOption.rebound) {
                                item.vY *= -1
                            } else {
                                item.y = item.vY < 0 ? (this.canvas.height - item.radius) : item.radius
                            }
                        }
                    }
                    item.x += item.vX;
                    item.y += item.vY;
                }
                return item
            }
        },
        mounted() {
          this.animateStop = true
            this.setCanvas()
        },
         beforeDestroy() {
           this.animateStop = true
            removeResizeListener(this.$el, this.setScreenSize)
         }
    }
</script>
<style type="text/scss" lang="scss" scoped>
</style>
