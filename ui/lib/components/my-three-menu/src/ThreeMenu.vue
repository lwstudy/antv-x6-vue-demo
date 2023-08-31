<template>
  <div class="my-three-menu" :style="styles">
    <div class="my-three-menu__container" ref="container">
      <div
        v-for="(item, idx) in this.elements"
        :key="idx"
        class="my-three-menu__item"
        style="display: none"
        :data-index="idx"
      >
        <slot name="item" :item="item"></slot>
      </div>
    </div>
    <slot></slot>
    <div class="my-three-menu__menu">
      <div class="table my-three-menu__button" ref="table" v-if="showTab" @click="transLayout('table')">
        <MyIcon :name="'icon-all-fill'" svg></MyIcon>
      </div>
      <div class="sphere my-three-menu__button" ref="sphere" v-if="showTab"  @click="transLayout('sphere')">
        <MyIcon :name="'icon-network'" svg></MyIcon>
      </div>
      <div class="helix my-three-menu__button" ref="helix" v-if="showTab"  @click="transLayout('helix')">
        <MyIcon :name="'icon-odbc'" svg></MyIcon>
      </div>
      <div class="grid my-three-menu__button" ref="grid" v-if="showTab"  @click="transLayout('grid')">
        <MyIcon :name="'icon-copy-rect-fill'" svg></MyIcon>
      </div>
      <div
      v-if="showTab && currLayout === 'grid'"
        :class="['prev', 'my-three-menu__button', { disabled: gridIndex === 0 }]"
        ref="prev"
        @click="jumpPrev()"
      >
        <MyIcon :name="'icon-mono-left-fill'" svg></MyIcon>
      </div>
      <div
      v-if="showTab && currLayout === 'grid'"
        :class="['next', 'my-three-menu__button', { disabled: gridIndex === gridLayerCount - 1 }]"
        ref="next"
        @click="jumpNext()"
      >
        <MyIcon :name="'icon-mono-right-fill'" svg></MyIcon>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * 3D菜单
   * @author 李国师 chester
   * @module $ui/components/my-three-menu
   */
  import {addResizeListener, removeResizeListener} from 'element-ui/lib/utils/resize-event'
import * as THREE from 'three'
import MyIcon from '../../my-icon/src/Icon'
import '$ui/icons/mono-left-fill.js'
import '$ui/icons/mono-right-fill.js'
import '$ui/icons/odbc.js'
import '$ui/icons/all-fill.js'
import '$ui/icons/network.js'
import '$ui/icons/copy-rect-fill.js'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {
  CSS3DObject,
  CSS3DRenderer
} from 'three/examples/jsm/renderers/CSS3DRenderer'
import { cloneDeep } from '$ui/utils/util'
const defaultOption = {
        camera: {
        //   deep: 2000
        },
        table: {
          // x: 0,
          // y: 0,
        //   column: 10
        },
        sphere: {
        //   radius: 600
        },
        helix: {
        //   y: 50, // 圆柱的y坐标偏移
        //   radius: 800, // 圆柱的半径
        //   dy: 10 // 圆柱的层高
        },
        grid: {
        //   row: 3,
        //   column: 3,
        //   deep: 0,
        //   layerSpace: 200,
        //   x: -100,
        //   y: 400
        }
      }
  /**
   * 插槽
   * @member slots
   * @property {string} default 默认插槽，定义其它内容
   * @property {string} item 卡片插槽，定义其它内容
   */
export default {
  name: 'MyThreeMenu',
  components: {
    MyIcon
  },
      /**
     * 属性参数
     * @member props
     * @property {Array} [list] 卡片列表
     * @property {string} [width] 画布宽
     * @property {string} [height] 画布高
     * @property {number} [itemWidth] 卡片宽
     * @property {number} [itemHeight] 卡片高
     * @property {number} [itemSpace] 卡片边距
     * @property {string} [defaultLayout] 默认布局
     * @property {boolean} [showTab] 显示菜单
     * @property {boolean} [play] 是否自动播放
     * @property {number} [playDuration] 播放等待时长(ms)
     * @property {number} [transformDuration] 变换时长(ms)
     * @property {object} [options] 布局配置
     * @property {object} [options.camera] 摄像机配置
     * @property {number} [options.camera.deep] 默认摄像相机深度
     * @property {number} [options.camera.minDistance] 最近摄像相机深度
     * @property {number} [options.camera.maxDistance] 最远摄像相机深度
     * @property {number} [options.camera.minZoom] 最小缩放
     * @property {number} [options.camera.maxZoom] 最大缩放
     * @property {number} [options.camera.minPolarAngle] 垂直最小旋转角度
     * @property {number} [options.camera.maxPolarAngle] 垂直最大旋转角度
     * @property {number} [options.camera.minAzimuthAngle] 水平最小旋转角度
     * @property {number} [options.camera.maxAzimuthAngle] 水平最大旋转角度
     * @property {boolean} [options.camera.enableZoom] 是否可缩放
     * @property {boolean} [options.camera.enableRotate] 是否可旋转
     * @property {boolean} [options.camera.enablePan] 是否可鼠标右键拖动
     * @property {object} [options.table] 表格布局配置
     * @property {number} [options.table.x] x偏移
     * @property {number} [options.table.y] y偏移
     * @property {number} [options.table.column] 列数
     * @property {object} [options.sphere] 圆球布局配置
     * @property {number} [options.sphere.radius] 圆球半径
     * @property {number} [options.sphere.x] 圆球x偏移
     * @property {number} [options.sphere.y] 圆球y偏移
     * @property {object} [options.helix] 圆柱布局配置
     * @property {number} [options.helix.x] 圆柱x偏移
     * @property {number} [options.helix.y] 圆柱y偏移
     * @property {number} [options.helix.radius] 圆柱半径
     * @property {number} [options.helix.dy] 圆柱卡片高度差
     * @property {object} [options.grid] 网格布局配置
     * @property {number} [options.grid.x] 网格x偏移
     * @property {number} [options.grid.y] 网格y偏移
     * @property {number} [options.grid.row] 网格行数
     * @property {number} [options.grid.column] 网格列数
     * @property {number} [options.grid.layerSpace] 网格层距
     **/
  props: {
    list: {
      type: Array,
      default() {
        return []
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
    itemWidth: {
        type: Number,
        default: 200
    },
      itemHeight: {
          type: Number,
          default: 150
      },
      itemSpace: {
          type: Number,
          default: 5
      },
      defaultLayout: {
          type: String,
          default: 'table',
          validator: (val) => {
              return ['table', 'helix', 'sphere', 'grid'].includes(val)
          }
      },
      showTab: {
          type: Boolean,
          default: true
      },
      options: {
          type: Object,
          default() {
              return defaultOption
          }
      },
      play: Boolean,
      playDuration: {
          type: Number,
          default: 6000
      },
      transformDuration: {
          type: Number,
          default: 1000
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
  watch: {
      play(val) {
          if(val) {
              this.playCamera()
          } else if(!val && this.playTimeout) {
              clearTimeout(this.playTimeout)
          }
      },
      options: {
          deep: true,
          handler(val) {
               this.layoutOption = Object.assign({}, defaultOption, this.options)
          }
      }
  },
  data() {
    return {
    // 组件内部变量
      screenWidth: 400,
      screenHeight: 100,
      objects: [],
      targets: { table: [], sphere: [], helix: [], grid: [] },
      camera: null,
      scene: null,
      renderer: null,
      controls: null,
      elements: [],
      column: 1,
      gridIndex: 0,
      gridLayerCount: 0,
      playTimeout: null,
      loopTimeout: null,
      playIndex: 0,
      currLayout: '',
      tweenGroup: [],
      layoutOption: {},
      angle: 0
    }
  },
  methods: {
    init() {
      this.layoutOption = Object.assign({}, defaultOption, this.options)
      this.camera = new THREE.PerspectiveCamera(
        40,
        this.screenWidth / this.screenHeight,
        1,
        10000
      )
      this.camera.position.z =
        this.layoutOption.camera.deep !== undefined
          ? this.layoutOption.camera.deep
          : (this.itemHeight + this.itemSpace) * this.column + 500

      this.scene = new THREE.Scene()
        const vector = new THREE.Vector3()
      // table
      this.initTable(vector)
      // sphere
      this.initSphere(vector)
      // helix
      this.initHelix(vector)
      // grid
       const gridColumn = Math.ceil(Math.pow(this.objects.length, 1 / 3))
      this.initGrid(vector, gridColumn)

      this.renderer = new CSS3DRenderer()
      this.renderer.setSize(this.screenWidth, this.screenHeight)
      this.$refs.container.appendChild(this.renderer.domElement)
     const defaultMaxDistance = 1500 * Math.floor(this.objects.length / (gridColumn * gridColumn)) +
        (this.itemHeight + this.itemSpace) * this.column * 1.5 +
        500
      this.setControl(defaultMaxDistance)
      this.transform(this.defaultLayout, this.transformDuration)
      window.addEventListener('resize', this.onWindowResize, false)
      this.$el.addEventListener('click', this.handleLoop, false)
      if(this.play) {
          this.playCamera()
      }
        addResizeListener(this.$el, this.setScreenSize)
       this.setScreenSize()
    },
    setControl(defaultMaxDistance) {
        this.controls = new OrbitControls(
        this.camera,
        this.renderer.domElement
      )
     
      const _cameraOption = cloneDeep(this.layoutOption.camera || {})
      if(_cameraOption.minPolarAngle !== undefined) {
        _cameraOption.minPolarAngle = _cameraOption.minPolarAngle * Math.PI / 180
      }
      if(_cameraOption.maxPolarAngle !== undefined) {
        _cameraOption.maxPolarAngle = _cameraOption.maxPolarAngle * Math.PI / 180
      }
      if(_cameraOption.minAzimuthAngle !== undefined) {
        _cameraOption.minAzimuthAngle = _cameraOption.minAzimuthAngle * Math.PI / 180
      }
      if(_cameraOption.maxAzimuthAngle !== undefined) {
        _cameraOption.maxAzimuthAngle = _cameraOption.maxAzimuthAngle * Math.PI / 180
      }
      delete _cameraOption.deep
      const cameraOption = Object.assign({}, {
        minDistance: 100,
        maxDistance: defaultMaxDistance,
        minZoom: 0,
        maxZoom: Infinity,
        minPolarAngle: 0,
        maxPolarAngle: Math.PI,
        minAzimuthAngle: -Infinity,
        maxAzimuthAngle: Infinity,
        enableZoom: true,
        enableRotate: true,
        enablePan: true
      }, _cameraOption)
      for(const name in cameraOption) {
        this.controls[name] = cameraOption[name]
      }
      this.controls.addEventListener('change', this.listRender)
    },
    initTable(vector) {
         const tableCol =
        this.layoutOption.table.column !== undefined
          ? this.layoutOption.table.column
          : this.column
      const tableRow = Math.ceil(this.elements.length / tableCol)
      const tableWidth = (this.itemWidth + this.itemSpace) * tableCol
      const tableHeight = (this.itemHeight + this.itemSpace) * tableRow
      const tableX =
        this.layoutOption.table.y !== undefined ? this.layoutOption.table.x : 0
      const tableY =
        this.layoutOption.table.y !== undefined ? this.layoutOption.table.y : 0
      for (let i = 0; i < this.elements.length; i++) {
        const element = this.$el.querySelector(
          `.my-three-menu__item[data-index="${i}"]`
        )
        const objectCSS = new CSS3DObject(element)
        objectCSS.position.x = Math.random() * 4000 - 2000
        objectCSS.position.y = Math.random() * 4000 - 2000
        objectCSS.position.z = Math.random() * 4000 - 2000
        this.scene.add(objectCSS)
        this.objects.push(objectCSS)
        const object = new THREE.Object3D()
        const dx = Math.floor(i % tableCol)
        const dy = Math.floor(i / tableCol)
        object.position.x =
          dx * (this.itemWidth + this.itemSpace) -
          (tableWidth - this.itemWidth) / 2 +
          tableX
        object.position.y =
          -dy * (this.itemHeight + this.itemSpace) + tableHeight / 2 + tableY
        this.targets.table.push(object)
      }
    },
    initSphere(vector) {
         
      const sphereRadius =
        this.layoutOption.sphere.radius ||
        Math.sqrt(this.itemWidth * this.itemHeight * this.objects.length * 3 / (4 * Math.PI))
      for (let i = 0, l = this.objects.length; i < l; i++) {
        const phi = Math.acos(-1 + (2 * i) / l)
        const theta = Math.sqrt(l * Math.PI) * phi
        const object = new THREE.Object3D()

        object.position.setFromSphericalCoords(sphereRadius, phi, theta)
        vector.copy(object.position).multiplyScalar(2)

        object.lookAt(vector)
        const x = object.position.x + (this.layoutOption.sphere.x || 0)
        const y = object.position.y + (this.layoutOption.sphere.y || 0)
        const z = object.position.z
        object.position.set(x, y, z)
        this.targets.sphere.push(object)
      }
    },
    initHelix(vector) {
         const helixRadius =
        this.layoutOption.helix.radius || (this.itemWidth + this.itemSpace) * 4
      const length = 2 * Math.PI * helixRadius
      const count = length / (this.itemWidth + this.itemSpace)
      const offsetY =
        (Math.ceil(this.objects.length / count) *
          (this.itemHeight + this.itemSpace)) /
        2
      for (let i = 0, l = this.objects.length; i < l; i++) {
        let theta = i * 0.175 + Math.PI
        theta = (i * Math.PI * 2) / count + Math.PI
        const dy =
          this.layoutOption.helix.dy === undefined
            ? -((i * (this.itemHeight + this.itemSpace)) / count)
            : -i * this.layoutOption.helix.dy
        const y = dy + offsetY

        const object = new THREE.Object3D()

        object.position.setFromCylindricalCoords(helixRadius, theta, y)

        vector.x = object.position.x * 2
        vector.y = object.position.y
        vector.z = object.position.z * 2

        object.lookAt(vector)

        const tX = object.position.x + (this.layoutOption.helix.x || 0)
        const tY = object.position.y + (this.layoutOption.helix.y || 0)
        object.position.set(tX, tY, object.position.z)
        this.targets.helix.push(object)
      }

    },
    initGrid(vector, gridColumn) {
      const gridRow = this.layoutOption.grid.row || gridColumn
      const gridCol = this.layoutOption.grid.column || gridColumn
      this.gridLayerCount = Math.ceil(this.objects.length / (gridCol * gridRow))
      const gridOffsetXStatic =
        ((this.itemWidth + this.itemSpace) * (gridCol - 1)) / 2
      const gridOffsetYStatic =
        ((this.itemHeight + this.itemSpace) * (gridRow - 1)) / 2
      const gridOffsetX = -gridOffsetXStatic + (this.layoutOption.grid.x || 0)
      const gridOffsetY = gridOffsetYStatic + (this.layoutOption.grid.y || 0)
      const gridOffsetDeep =
        this.layoutOption.grid.deep !== undefined ? this.layoutOption.grid.deep : 800
      const layerSpace = this.layoutOption.grid.layerSpace || 800
      for (let i = 0; i < this.objects.length; i++) {
        const object = new THREE.Object3D()
        object.position.x = (i % gridCol) * (this.itemWidth + this.itemSpace) + gridOffsetX
        object.position.y = -(Math.floor(i / gridCol) % gridRow) * (this.itemHeight + this.itemSpace) + gridOffsetY
        object.position.z =
          -(Math.floor(i / (gridCol * gridRow))) * layerSpace +
          gridOffsetDeep
        this.targets.grid.push(object)
      }
    },
    handleLoop() {
        if(this.playTimeout) {
            clearTimeout(this.playTimeout)
        }
        if(this.loopTimeout) {
            clearTimeout(this.loopTimeout)
        }
        if(this.play) {
            this.loopTimeout = setTimeout(() => {
                this.playCamera()
            }, 10000)
        }
    },
    playCamera() {
       this.playTimeout = setInterval(() => {
           this.playIndex++
           this.playIndex = this.playIndex % 4
           const target = ['table', 'sphere', 'helix', 'grid'][this.playIndex]
           this.transform(target, this.transformDuration)
       }, this.playDuration) 
    },
    transLayout(name) {
        this.transform(name, this.transformDuration)
    },
    jumpPrev() {
         if (this.gridIndex !== 0) {
            this.gridIndex--
          }
          this.jumpLayer()
    },
    jumpNext() {
        if (this.gridIndex < this.gridLayerCount - 1) {
                    this.gridIndex++
          }
          this.jumpLayer()
    },
    jumpLayer() {
       const gridColumn = Math.ceil(Math.pow(this.objects.length, 1 / 3))
      const gridRow = this.layoutOption.grid.row || gridColumn
      const gridCol = this.layoutOption.grid.column || gridColumn
      this.gridLayerCount = Math.ceil(this.objects.length / (gridCol * gridRow))
      const gridOffsetXStatic =
        ((this.itemWidth + this.itemSpace) * (gridCol - 1)) / 2
      const gridOffsetYStatic =
        ((this.itemHeight + this.itemSpace) * (gridRow - 1)) / 2
      const gridOffsetX = -gridOffsetXStatic + (this.layoutOption.grid.x || 0)
      const gridOffsetY = gridOffsetYStatic + (this.layoutOption.grid.y || 0)
      const gridOffsetDeep =
        this.layoutOption.grid.deep !== undefined ? this.layoutOption.grid.deep : 800
      const layerSpace = this.layoutOption.grid.layerSpace || 800
      this.targets.grid = []
      for (let i = 0; i < this.objects.length; i++) {
        const object = new THREE.Object3D()
        const layerIndex = Math.floor(i / (gridCol * gridRow))
       object.position.x = (i % gridCol) * (this.itemWidth + this.itemSpace) + gridOffsetX
        if (layerIndex < this.gridIndex) {
          object.position.y = -10000
        } else {
          object.position.y =
            -(Math.floor(i / gridCol) % gridRow) *
              (this.itemHeight + this.itemSpace) +
            gridOffsetY
        }
        object.position.z =
          -(Math.floor(i / (gridCol * gridRow)) - this.gridIndex) *
            layerSpace +
          gridOffsetDeep
        this.targets.grid.push(object)
      }
      this.transform('grid', this.transformDuration)
    },
    transform(targetName, duration) {
        this.currLayout = targetName
        const targets = this.targets[targetName]
        this.removeAllTween()
      for (let i = 0; i < this.objects.length; i++) {
        const object = this.objects[i]
        const target = targets[i]

        const t1 = new TWEEN.Tween(object.position)
          .to(
            {
              x: target.position.x,
              y: target.position.y,
              z: target.position.z
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start()

        const t2 = new TWEEN.Tween(object.rotation)
          .to(
            {
              x: target.rotation.x,
              y: target.rotation.y,
              z: target.rotation.z
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start()
          this.tweenGroup.push(t1, t2)
      }

      const t3 = new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(this.listRender)
        .start()
        this.tweenGroup.push(t3)
    },
    removeAllTween() {
        if(this.tweenGroup.length !== 0) {
            for(let i = 0; i < this.tweenGroup.length; i++) {
              this.tweenGroup[i].stop()
            }
        }
        this.tweenGroup = []
    },
    onWindowResize() {
      this.camera.aspect = this.screenWidth / this.screenHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.screenWidth, this.screenHeight)
      this.listRender()
    },
    animate() {
        TWEEN.update()
        this.controls.update()
         this.renderer.render(this.scene, this.camera)
        requestAnimationFrame(this.animate)
    },
    listRender() {
        if(this.renderer) {
            this.renderer.render(this.scene, this.camera)
        }
    },
    setData() {
      const column = Math.ceil(Math.sqrt(this.list.length))
      this.column = column
      const elems = []
      for (let i = 0; i < this.list.length; i++) {
        const item = {
          ...this.list[i]
        }
        elems.push(item)
      }
      this.elements = elems
    },
    setScreenSize() {
        const rect = this.$el.getBoundingClientRect()
        this.screenWidth = rect.width
        this.screenHeight = rect.height
        if(this.renderer) {
            this.renderer.setSize(this.screenWidth, this.screenHeight)
        }
    },
    reset() {
        this.objects = []
        this.targets = { table: [], sphere: [], helix: [], grid: [] }
        this.camera = null
        this.scene = null
        this.renderer = null
        this.elements = []
        if(this.playTimeout) {
            clearTimeout(this.playTimeout)
        }
        if(this.loopTimeout) {
            clearTimeout(this.loopTimeout)
        }
        this.removeAllTween()
         this.$el.removeEventListener('click', this.handleLoop, false)
        removeResizeListener(this.$el, this.setScreenSize)
    }
  },
  created() {
    this.setData()
  },
  mounted() {
    this.init()
    this.animate()
  },
  beforeDestroy() {
      this.reset()
  }
}
</script>