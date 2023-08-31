<template>
  <el-tooltip
    class="box-item"
    effect="dark"
    :content="props.content"
    placement="top"
    :visible="props.visible"
  >
    <div></div>
  </el-tooltip>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default() {
        return "";
      },
    },
    visible: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
};
</script>

<style>
</style>
