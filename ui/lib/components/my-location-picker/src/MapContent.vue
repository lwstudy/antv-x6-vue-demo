<template>
  <MyMap v-bind="mapProps"
         ref="map"
         @ready="handleReady"
         @pointermove="handleMove"
         @click="handleClick"
         @contextmenu.native.stop.prevent="handleExit">
    <Tool :pin="pin" :active="active" @click.native="active=true"></Tool>
    <Tip v-if="active" :coordinate="mouseCoordinate" :pin="pin"></Tip>

    <MyMapHtml v-for="(item, index) in currentMarkers"
               :key="`tip${index}`"
               class="my-location-picker__tooltip"
               positioning="center-center"
               :offset="[2, -50]"
               :position="item">
      {{item}}
      <i class="my-location-picker__delete el-icon-delete" @click="handleRemove(index)"></i>
    </MyMapHtml>

    <MyMapImage v-for="(item, index) in currentMarkers"
                :key="`marker${index}`"
                :coordinate="item"
                :scale="0.8"
                :src="pin"
                :offset="[-16,0]"
                :size="[80, 80]">
    </MyMapImage>
    <slot></slot>
  </MyMap>
</template>

<script>
  import {MyMap, MyMapHtml, MyMapImage} from '$ui/map'

  import Tool from './Tool'
  import Tip from './Tip'


  export default {
    components: {
      MyMap,
      MyMapHtml,
      MyMapImage,
      Tip,
      Tool
    },
    props: {
      map: Object,
      pin: String,
      multiple: Boolean,
      markers: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        mouseCoordinate: null,
        active: false,
        currentMarkers: []
      }
    },
    computed: {
      mapProps() {
        return {
          height: '100%',
          ...this.map
        }
      }
    },
    watch: {
      markers: {
        immediate: true,
        handler(val) {
          this.currentMarkers = val
        }
      }
    },
    methods: {
      handleMove(e) {
        if (!this.active) return
        this.mouseCoordinate = e.coordinate
      },
      handleClick(e) {
        if (!this.active) return
        if (this.multiple) {
          this.currentMarkers.push(e.coordinate)
        } else {
          this.currentMarkers = [e.coordinate]
        }
        this.active = false
        this.mouseCoordinate = null
      },
      handleExit() {
        this.active = false
      },
      handleRemove(index) {
        const markers = this.currentMarkers.slice(0)
        this.currentMarkers = []
        markers.splice(index, 1)
        this.$nextTick(() => {
          this.currentMarkers = markers
        })
      },
      handleReady() {
        const marker = this.currentMarkers[0]
        if (marker) {
          this.$refs.map.moveTo(marker)
        } else {
          this.active = true
        }
      }
    }
  }
</script>


