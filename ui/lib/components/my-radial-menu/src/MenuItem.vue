<template>
  <g :transform="transform"
     class="my-radial-menu__sector"
     :class="classes"
     :data-id="item ? item.id : null"
     :data-index="index"
     @click="handleClick">
    <path :d="path"></path>
    <text v-if="label"
          text-anchor="middle"
          font-size="38%"
          :transform="label.transform"
          :x="label.x"
          :y="label.y">{{label.text}}
    </text>
    <g v-if="icon"
       class="my-radial-menu__icon"
       :transform="icon.transform">
      <componenet :is="icon.name"
                  width="10"
                  height="10"
                  :x="icon.x"
                  :y="icon.y"></componenet>
    </g>
  </g>
</template>

<script>
  import {numberToString, getDegreePos, pointToString} from './utils'
  import '$ui/icons/alarm'

  export default {
    inject: ['radialMenu'],
    props: {
      scale: Number,
      item: Object,
      index: Number,
      startAngle: Number,
      endAngle: Number,
      radius: Number,
      innerRadius: Number,
      selected: Boolean
    },
    computed: {
      classes() {
        return {
          'is-selected': this.selected,
          'is-enabled': this.item,
          'is-dummy': !this.item
        }
      },
      centerPoint() {
        return this.getSectorCenter(this.startAngle, this.endAngle)
      },
      translate() {
        const {x, y} = this.centerPoint
        return {
          x: numberToString((1 - this.scale) * x),
          y: numberToString((1 - this.scale) * y)
        }
      },
      transform() {
        const {x, y} = this.translate
        return `translate(${x} ${y}) scale(${this.scale})`
      },
      path() {
        const {startAngle, endAngle, radius, scale, innerRadius} = this
        const initPoint = getDegreePos(startAngle, radius)
        let path = 'M' + pointToString(initPoint)

        const radiusAfterScale = radius * (1 / scale)
        path += 'A' + radiusAfterScale + ' ' + radiusAfterScale + ' 0 0 0' + pointToString(getDegreePos(endAngle, radius))
        path += 'L' + pointToString(getDegreePos(endAngle, innerRadius))

        const radiusDiff = radius - innerRadius
        const radiusDelta = (radiusDiff - (radiusDiff * scale)) / 2
        const innerCalcRadius = (innerRadius + radiusDelta) * (1 / scale)
        path += 'A' + innerCalcRadius + ' ' + innerCalcRadius + ' 0 0 1 ' + pointToString(getDegreePos(startAngle, innerRadius))
        path += 'Z'
        return path;
      },
      label() {
        const {x, y} = this.centerPoint
        const text = this.item?.label
        const icon = this.item?.icon
        return text
          ? {
            x: numberToString(x),
            y: numberToString(y),
            text,
            transform: icon ? 'translate(0,8)' : 'translate(0,2)'
          }
          : null
      },
      icon() {
        const {x, y} = this.centerPoint
        const text = this.item?.label
        const icon = this.item?.icon
        return icon
          ? {
            x: numberToString(x),
            y: numberToString(y),
            name: icon,
            transform: text ? 'translate(-5,-8)' : 'translate(-5,-5)'
          }
          : null
      }
    },
    methods: {
      getSectorCenter(startAngleDeg, endAngleDeg) {
        const {radius, innerRadius} = this
        const deg = (startAngleDeg + endAngleDeg) / 2
        const length = innerRadius + (radius - innerRadius) / 2
        return getDegreePos(deg, length)
      },
      handleClick() {
        this.$emit('click', this.item, this.index)
      }
    }
  }
</script>
