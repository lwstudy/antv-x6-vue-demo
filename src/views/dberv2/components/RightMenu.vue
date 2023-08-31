<template>
  <div
    ref="rightMenu"
    v-show="visible"
    :style="{ left: left + 'px', top: top + 'px' }"
    class="rightMenu"
  >
    <div v-if="this.modelType === 3">
      <div class="item" @click="clickMenu('editTable', mark)">编辑表</div>
      <div class="item" @click="clickMenu('editCol', mark)">编辑列</div>
      <div class="item" @click="clickMenu('editIndex')">编辑索引</div>
      <div class="item" v-if="cellType === 'edge'" @click="clickMenu('editRelation')"
        >编辑引用</div
      >
    </div>
    <div v-if="this.modelType !== 3">
      <div class="item" @click="clickMenu('editTable', mark)">编辑实体</div>
      <div class="item" @click="clickMenu('editCol', mark)">编辑属性</div>
      <div class="item" @click="clickMenu('editKey')">编辑键</div
      ><div v-if="cellType === 'edge'" @click="clickMenu('editRelation')"
        >编辑关系</div
      >
    </div>

    <div class="item" @click="clickMenu('delete')">删除</div>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      // 显示控制
      type: Boolean,
      required: true,
    },
    position: {
      // 坐标轴位置
      type: Object,
      default: () => ({ clientX: 0, clientY: 0 }),
    },
    mark: {
      // 父组件传入的数据标识，用于操作数据
      type: [String, Number],
      default: "",
    },
    cellType: {
      type: String,
      default: "",
    },
    modelType: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      left: 0, // x轴坐标位置，默认为0,浮框显示时再计算位置
      top: 0, // y轴坐标位置，默认为0，浮框显示时再计算位置
      menu: {
        // 浮框菜单高宽信息
        width: 0,
        height: 0,
      },
    };
  },
  watch: {
    // 监听body点击以及鼠标滚轮事件
    visible(newVal) {
      if (newVal) {
        // 显示
        document.documentElement.addEventListener("click", this.closeMenu);
        document.documentElement.addEventListener("wheel", this.closeMenu);
      } else {
        // 隐藏
        document.documentElement.removeEventListener("click", this.closeMenu);
        document.documentElement.removeEventListener("wheel", this.closeMenu);
      }
    },
    position(newVal) {
      this.setPosition(newVal);
    },
  },
  methods: {
    // 设置位置信息
    async setPosition({ clientX, clientY }) {
      let positionX = clientX; // x轴坐标
      let positionY = clientY; // y轴坐标

      await this.$nextTick(); // dom更新后再获取ref

      this.getRightMenu(); // 获取浮框菜单高宽信息

      // 这里获取窗口屏幕高度不要使用 document.body 不等于 游览器窗口高度，会造成计算错误
      if (positionY + this.menu.height > window.innerHeight) {
        // y轴超出边界处理 （y轴上边距坐标+元素高度 > 窗口屏幕高度）
        positionY = document.documentElement.offsetHeight - this.menu.height;
      }
      if (positionX + this.menu.width > window.innerWidth) {
        // x轴超出边界处理（x轴左边距坐标+元素宽度 > 窗口屏幕宽度）
        positionX = document.documentElement.offsetWidth - this.menu.width;
      }
      this.left = positionX;
      this.top = positionY;
    },
    // 获取浮框菜单高宽信息
    getRightMenu() {
      console.log(this.$refs.rightMenu);
      this.menu.width = this.$refs.rightMenu.offsetWidth; // 选择器宽度（如果是vue组件要加上$el）
      this.menu.height = this.$refs.rightMenu.offsetHeight; // 选择器高度（如果是vue组件要加上$el）
    },
    // 关闭右键菜单浮框
    closeMenu() {
      this.$emit("update:visible", false);
      this.$emit("update:position", { clientX: 0, clientY: 0 });
      this.menu = {
        // 选择器高宽信息
        width: 0,
        height: 0,
      };
    },
    // 点击操作按钮
    clickMenu(target) {
      this.$emit(target, this.mark); // 传回事件名和数据标识

      // 点击后会自动关闭菜单，已在打开时绑定事件 document.documentElement.addEventListener('click', this.closeMenu)
    },
  },
};
</script>
<style lang="scss" scoped>
.rightMenu {
  display: flex;
  flex-direction: column;
  position: fixed;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 6px;
  padding: 5px;
  z-index: 9999;
  .item {
    border-bottom: 1px solid #ebeef5;
    padding: 10px 20px;
    text-align: center;
    cursor: pointer;
  }
  .item:hover {
    background: #eee;
  }
  .item:last-child {
    border-bottom: 0;
  }
}
</style>
