<template>
  <div class="person-list-warp">
    <div class="input-warp" >
      <el-input size="small" placeholder="请输入姓名身份证和警号" v-model="query"  > 
        <el-button slot="append" icon="el-icon-search" @click="searchHandle"></el-button>
      </el-input>
    </div>
    <my-header v-show="selDeptLabel" :title="selDeptLabel" icon="el-icon-menu" size="small"  style="margin-bottom: 5px">
      <template v-slot:handle>
        <el-button type="text" size="small" @click="titleClick">重选部门</el-button>
      </template>
    </my-header>
    <div class="list-warp">
      <div class="inner">
        <my-table 
          ref="list" 
          size="mini"
          v-bind="{border: true, ...tableProps}" 
          :columns="columns" 
          :loader="listLoader" 
          :fit="true" 
          :auto="autoLoad"  
        >
          <template v-slot:ctrl="{row}">
            <el-button type="text" 
            style="padding: 4px;"
            @click="personSelHandle(row)"
            :disabled="defindSelDisable(row)"
            v-if="!defindSelDisable(row)"
            >选择</el-button>

            <el-button type="danger" size="mini" 
            @click="personSelDelHandle(row)"
            v-show="defindSelDisable(row)"
            >去除</el-button>
          </template>
        </my-table>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.person-list-warp{
  height: 100%;
  display: flex;
  flex-flow: column;
  .input-warp{
    flex: 0 0 auto;
    margin-bottom: 5px;
    padding: 0 5px 0 10px;
  }
  .list-warp{
    flex:1;
    position: relative; 
    .inner{
      position: absolute;
      width: 100%;
      top: 0;
      bottom: 0;
      overflow: auto; 
      padding: 0 5px 0 10px;
    }
  }
}
</style>
<script>
export default {
  mixins: [],
  components: {},
  props: {
    // 当前用于查询人员的部门名称（内部参数）
    selDeptLabel: String, 
    // 当前用于查询人员的部门数据（内部参数）
    deptData: {
      type: Object
    },
    // 是否默认自动加载人员
    autoLoad: {
      type: Boolean,
      default: false
    },
    // 表格组件其他传参
    tableProps: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 人员加载函数
    personLoad: {
      type: Function
    },
    // 人员显示列表
    listColumn: {
      type: Array,
      default: () => {
        return [
          { prop: 'name', label: '姓名' },
          { prop: 'cardNum', label: '身份证' },
          { prop: 'dept', label: '单位' }
        ]
      }
    },
    // 人员数据字段映射
    personPropMap: {
      type: Object
    },
    // 人员是否多选（父组件接收传入）
    isMultiPerson: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      query: '',
      searchQuery: '',
      currentPage: 1,
      selectPersons: []
    }
  },
  computed: {
    columns() {
      return [...this.listColumn, {prop: 'ctrl', label: '操作', fixed: 'right', width: 80}]
    }
  },
  watch: {
    selectPersons() {
      this.$emit('on-personSel', this.selectPersons)
    } 
  },
  methods: {
    // 搜索框确认按钮点击（根据搜索框字段变化刷新人员列表）
    searchHandle() {
      this.searchQuery = this.query
      this.$refs.list.refresh(1)
    },
    // 列表数据获取调用函数  
    listLoader(page, pageSize) {
      this.currentPage = page
      if (!this.personLoad) {
        return Promise.reslove({
          total: 0,
          list: []
        })
      } else {
        // 将 分页、部门、查询关键字 传入给函数使用
        return this.personLoad(page, pageSize, this.deptData, this.searchQuery).then((res) => {
          return Promise.resolve({
            total: res.total,
            list: res.list
          })
        })
      } 
    },
    // 部门标题点击，用于清空当前部门
    titleClick() {
      this.$emit('on-clearSelDept')
    },
    // 人员选择点击
    personSelHandle(row) {
      if (this.isMultiPerson) {
        this.selectPersons = this.selectPersons.concat([row])
      } else {
        this.selectPersons = [row]  
      } 
    },
    // 列表按钮删除点击
    personSelDelHandle(row) {
      const index = this._isSelectIndex(row)
      this.removePersonSel(index)
    },
    // 删除选中人员标签（按index）
    removePersonSel(index) {
      this.selectPersons.splice(index, 1)
    },

    defindSelDisable(row) {
      return this._isSelectIndex(row) >= 0 
    },
    // 判断是否已选中
    _isSelectIndex(row) {
      return this.selectPersons.findIndex((item) => {
        return item[this.personPropMap.id] === row[this.personPropMap.id]
      })
    }
  },
  created() {},
  mounted() {}
}
</script>