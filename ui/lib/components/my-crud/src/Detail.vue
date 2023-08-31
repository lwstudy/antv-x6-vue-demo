<template>
  <MyDetail v-bind="$attrs" border v-loading="loading">
    <MyDetailItem v-for="(value,key) in data"
                  :key="key"
                  :label="key">{{value}}
    </MyDetailItem>
  </MyDetail>
</template>

<script>
  import {MyDetail, MyDetailItem} from '$ui'

  export default {
    components: {
      MyDetail,
      MyDetailItem
    },
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      },
      loading: Boolean
    }
  }
</script>
