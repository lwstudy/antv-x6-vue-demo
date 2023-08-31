<template>
  <div class="org-tree-warp">
    <div class="input-warp"  
    v-if="!remoteTreeFilter && (treePropsProxy['filter-node-method'] || treePropsProxy['filterNodeMethod'])">
      <el-input size="small" placeholder="请输入内容" v-model="query"  > </el-input>
    </div>
    <div class="input-warp" v-if="remoteTreeFilter">
      <el-input size="small" placeholder="远程查询部门" v-model="remoteQuery"  > 
        <el-button slot="append" icon="el-icon-search" @click="remoteQueryFilter"></el-button>
      </el-input>
    </div>
    <div class="tree-warp">
      <div class="inner" v-loading="loading">
        <el-tree class="org-tree is-line" v-if="treeInit" ref="tree"  
        v-bind="{...treePropsProxy}"  @node-click="handleNodeClick" @check-change="handleCheckChange"></el-tree>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.org-tree-warp{
  height: 100%;
  display: flex;
  flex-flow: column;
  .input-warp{
    flex: 0 0 auto;
    margin-bottom: 5px;
  }
  .tree-warp{
    flex:1;
    position: relative; 
    .inner{
      position: absolute;
      width: 100%;
      top: 0;
      bottom: 0;
      overflow: auto; 
      
      /deep/ .org-tree.el-tree {
        & > :nth-child(n+1) {
          display: inline-block;
          min-width: 100%;
        }
      } 
       
    }
  }
}
</style>
<script>
const DefaultTreeProps = {
  'check-strictly': true
}
export default {
  mixins: [],
  components: {}, 
  props: {
    // 异步获取初始部门树的函数，返回 输出组织架构树 的 Promise对象
    loadOrg: Function,
    // 懒加载获取部门数据
    lazyLoadOrg: Function,
    // 是否选择部门 （父组件接收传入）
    orgSelect: {
      type: Boolean,
      default: false
    },
    // 部门字段映射（父组件接收传入）
    orgPropMap: {
      type: Object
    },
    // 树组件传参
    treeProps: {
      type: Object,
      default: () => { 
        return {} 
      }
    },
    // 远程查询部门
    remoteTreeFilter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false, 
      treeData: [],
      // 部门查询文字
      query: '',
      // 自定义部门查询文字
      remoteQuery: '',
      treeInit: true
    }
  },
  computed: {
    // 整理el-tree组件的传参
    treePropsProxy() { 
      const props = {
        props: this.orgPropMap,
        ...{...DefaultTreeProps, ...this.treeProps},
        showCheckbox: this.orgSelect
      }
      props['node-key'] = props.props.id

      if (!this.lazyLoadOrg) {
        return {
          ...props,
          data: this.treeData
        }
      } else {
        return {
          ...props,
          load: this.lazyLoadOrg,
          lazy: true,
          data: this.treeData
        }
      }
      
    }
  },
  watch: {
    // 监听远程查询 文字 的变化
    remoteQuery(val) {
      if (this.remoteQueryTimer) {
        clearTimeout(this.remoteQueryTimer)
        this.remoteQueryTimer = null
      }
      this.remoteQueryTimer = setTimeout(() => {
         this.$emit('on-remoteQueryChange', val)
      }, 500)
    },

    // 本地树节点筛选触发
    query(val) { 
      this.$refs.tree.filter(val)
    } 
  },
  methods: {
    // 调用 数据加载函数
    loadOrgData() {
      return this.loadOrg().then((res) => {
        return Promise.resolve(res)
      })
    },
    // 树组件初始化（加载数据）
    init() {
      if (!this.loadOrg) {
        return
      }
      this.loading = true
      this.loadOrg().then((res) => {
        this.loading = false
        this.treeData = res 
      })  
    },
    // 树节点点击事件触发（刷新右侧人员列表）
    handleNodeClick(data, node) {
      this.$emit('on-orgClick', data, node)
    },
    // 树节点选择变化触发（更新部门选择数据）
    handleCheckChange(data, checked, indeterminate) { 
      const checkedDepts = this.$refs.tree.getCheckedNodes()  
      this.$emit('on-orgChecked', checkedDepts) 
    },
    // 派发远程查询事件
    remoteQueryFilter() {
      this.$emit('on-remoteQueryFilter', this.remoteQuery)
    },
    // 树组件刷新函数（外部调用）  
    refreshTree() {
      if (this.remoteTreeFilter) {
        this.treeData = []
        this.treeInit = false
        setTimeout(() => {
          this.treeInit = true
        }, 200)
      } else {
        this.init()
      }
    }
  },
  created() {},
  mounted() {
    this.init() 
  }
}
</script>