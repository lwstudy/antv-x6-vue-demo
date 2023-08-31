<template>
  <div
    class="person-picker"
  
  >
    <el-row class="wrapper">
      <el-col :span="showOrgList ? 12 : 24" class="input-col">
        <input-area
          :person-prop-map="personPropMap"
          ref="input"
          @cancel="handleClosed"
          @cancelSelect="handCancelSelect"
          :multiple="multiple"
          @submit="handleSubmit"
          v-bind="$attrs"
        ></input-area>
      </el-col>
      <el-col :span="12">
        <org-list
          ref="orgList"
          v-if="showOrgList"
          @select="handleListSelect" 
          v-bind="$attrs"
          :person-prop-map="personPropMap"
          :multiple="multiple"
        ></org-list>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import InputArea from './input-area'
import OrgList from './org-list'

export default {
  components: {
    InputArea,
    OrgList
  },
  /*
  submitBtn 控制是否显示提交、取消按钮 ，默认true
  personPropMap：接口返回人员列表字段映射
  multiple: 是否多选
  showOrgList: 是否结合部门进行查询（显示右侧部门列表）
  searchPerson: 通过搜索异步查询人员函数，必传，参数keyword, 返回 输出人员列表的 Promise对象 
  loadOrg: 异步获取初始部门树的函数，必传，返回 输出组织架构树 的 Promise对象
  loadOrgChildren: 异步获取各个子部门树的函数（用于懒加载），选传，返回 输出 子级部门 的 Promise对象
  loadUser: 根据部门信息异步获取部门成员的函数，必传，返回 输出 部门成员数组 的 Promise对象,
  orgPropMap：接口返回部门数据字段映射
  */
  props: {
    multiple: {
      type: Boolean,
      default: true
    },
    showOrgList: {
      type: Boolean,
      default: true
    },
    personPropMap: {
      type: Object,
      default: () => {
        return {
          label: 'name',
          id: 'id',
          cardNo: 'cardNo'
        }
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    // 响应右边部门人员列表的选中与取消 （同步修改输入框内的currentItems数据）
    handleListSelect(item, isAdd) {
      if (isAdd) { 
        this.$refs.input.handleSelect(item)
      } else { 
        this.$refs.input.removeItem(item)
      }
    },
    // 响应输入框删除选中人员操作（同步右边部门人员菜单取消选中）
    handCancelSelect(item) {
      this.$refs.orgList.removeSelect(item)
    },
    // 点击提交按钮 获取当前人员和部门
    handleSubmit(items) {
      let paths = []
      if (this.$refs.orgList) {
        paths = JSON.parse(JSON.stringify(this.$refs.orgList.paths))
      }
      this.$emit('submit', items, paths)
    },
    // 点击取消按钮
    handleClosed() {
      // 清空右侧列表选中
      this.$refs.orgList && this.$refs.orgList.users.forEach((item) => {
        item._isSelect = false
      })
      this.$emit('close')
    },
    // 通过API获取选中人员
    getSelctPersons() {
      const result = this.$refs.input.currentItems
      return JSON.parse(JSON.stringify(result))
    },
    // 通过API获取选中部门
    getSelectDept() {
      const paths = this.$refs.orgList ? JSON.parse(JSON.stringify(this.$refs.orgList.paths)) : []
      return paths
    } 
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/_vars.scss";
.person-picker {
  height: 100%; 
  width: 100%;
  box-sizing: border-box;
  * {
    box-sizing: border-box;
  }
  /deep/ .wrapper {
    height: 100%;
    .el-col {
      box-sizing: border-box;
      height: 100%;
    }
  }

  .input-col {
    border-right: 1px solid $blue-8;
  }
}
</style>
