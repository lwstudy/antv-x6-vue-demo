<template>
  <div class="auto-complete">
    <div class="empty" v-if="items.length === 0">没有匹配到任何结果</div>
    <div
      class="item"
      v-for="item in items"
      :key="item.id"
      @click="select(item)"
    >
      <div class="name">
        <i class="el-icon-user"></i>
        {{ item[personPropMap.label] }}
      </div>
      <!-- <div class="dep">{{ item.address }}</div> -->
    </div>
  </div>
</template>

<script>

// import {getPersonByKeyword} from '$my/code/api/user'
export default {
  props: {
    keyword: {
      type: String,
      default: ''
    },
    searchPerson: Function,
    personPropMap: Object
  },
  data() {
    return {
      items: []
    }
  },
  watch: {
    keyword(val) {
      if (val) {
        this.load(val)
      }
    }
  },
  methods: {
    load(keyword) {
      this.items = []
      if (!this.searchPerson) {
        throw new Error('searchPerson函数缺失')
      }
      this.searchPerson(keyword).then((res) => {
        // console.log(res, '查询人员', this.personPropMap.name)
        this.items = res 
      }) 
    },
    select(item) {
      this.$emit('select', item)
    }
  }
}
</script>

<style lang="scss" scoped>
// @import '../../style/vars';
@import "~@/style/_vars.scss";

.auto-complete {
  max-height: 300px;
  overflow: auto;
}

.item {
  padding: 8px 15px;
  border-bottom: 1px solid $blue-9;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: $blue-9;
  }
}

.name {
  font-size: 16px;
}

.dep {
  color: $grey-primary;
  padding-left: 20px;
}

.empty {
  padding: 20px;
  text-align: center;
  font-size: 16px;
}
</style>
