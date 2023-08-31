<template>
  <div>
    <MyMapImage v-if="coordinate"
                :src="pin"
                :scale="0.8"
                :offset="[-16,0]"
                :size="[80, 80]"
                :coordinate="coordinate"></MyMapImage>
    <MyMapHtml v-if="coordinate"
               class="my-location-picker__tip"
               positioning="center-left"
               :offset="[15, 0]"
               :position="coordinate">点击左键标记位置，右键退出
    </MyMapHtml>
  </div>
</template>

<script>
  import {MyMapImage, MyMapHtml} from '$ui/map'

  export default {
    components: {
      MyMapImage,
      MyMapHtml
    },
    props: {
      coordinate: Array,
      pin: String
    }
  }
</script>
