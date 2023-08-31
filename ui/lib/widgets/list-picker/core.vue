<template>
  <div class="list-picker-warp">
    <div class="filter-warp">
      <slot name="filter">
        <my-filter is-flex label-width="60px" @submit="filterSubmitHandle" :columns="1" size="mini">
          <my-input name="keyword" label="关键字" placeholder="请输入关键字进行查询" width="65%"></my-input> 
        </my-filter>
      </slot>
    </div>
    <div class="list-warp">
      <div class="inner">
        <my-list 
          v-if="styleMode === 'list'"
          ref="list"
          class="options-list" 
          v-bind="{...defaultListProps, ...$attrs}"
          :loader="loader"
        >  
          <template v-slot="{item}">
            <div :class="{'item-warp': true, 'is-select': definedSelected(item)}" @click="itemSelectHandle(item)">
              <div class="content">
                <slot name="option" :item="item">
                  {{item[optionsPropsMap.label]}}
                </slot> 
              </div>
              <div class="ctrl" >
                <el-button v-show="definedSelected(item)" type="danger" size="mini" @click.stop="removeItemSel(item)">取消</el-button>
              </div>
            </div>
          </template> 
        </my-list>

        <my-table 
          v-if="styleMode === 'table'"
          ref="list" 
          size="mini"
          v-bind="{pageSize: 20, border: true, ...tableProps}" 
          :columns="columns" 
          :loader="loader" 
          :fit="true"  
        >
          <template v-for="item in listColumn" v-slot:[item.prop]="scope"> 
            <slot name="column"  v-bind="scope">
              <span :key="item.prop" >{{scope.row[item.prop]}}</span>
            </slot>
          </template>

          <template v-slot:ctrl="{row}">
            <el-button type="text" 
            style="padding: 4px;"
            @click="itemSelectHandle(row)"
            :disabled="definedSelected(row)"
            v-if="!definedSelected(row)"
            >选择</el-button>

            <el-button type="danger" size="mini" 
            @click="removeItemSel(row)"
            v-show="definedSelected(row)"
            >去除</el-button>
          </template>
        </my-table>
      </div>
    </div>
    <div class="result-warp" v-show="isShowResult"> 
        选中:
        <el-tag 
          size="small"
          v-for="(item, index) in selectItems" 
          :key="`sel_${index}`"
          v-show="index < selItemShowMax"
          closable
          @close="removeItemSel(item)"
          >{{item[optionsPropsMap.label]}}</el-tag>

        <el-popover
          placement="top"
          width="300"
          trigger="hover"
        >
          <div>
            <el-tag 
              size="small"
              v-for="(item, index) in selectItems" 
              :key="`sel_${index}`"
              v-show="index >= selItemShowMax"
              closable
              @close="removeItemSel(item)"
               style="margin-bottom: 2px"
              >{{item[optionsPropsMap.label]}}</el-tag>
          </div>   
          <el-tag
            size="small"
            type="info" 
            key="total-item"
            v-show="selectItems.length > selItemShowMax"  
            slot="reference"
            style="margin-left: 5px;cursor:pointer"
          >+{{selectItems.length}}</el-tag> 
        </el-popover> 
    </div> 
    <div class="btn-warp"  v-show="isShowSubmit">
      <el-button type="primary" size="small" @click="submitClickHandle">确定</el-button>
      <el-button type="warning" size="small" @click="cancelClickHandle">取消选中</el-button>
    </div>
  </div>
</template>

<script>
const DefaultListProps = {
  fit: true,
  split: true, 
  border: true, 
  stripe: true, 
  pageSize: 10 
}
export default {
  mixins: [],
  components: {},
  props: {
    styleMode: {
      type: String,
      default: 'list'
    },
    listLoad: Function,
    optionsPropsMap: {
      type: Object,
      default: () => {
        return {
          label: 'name',
          id: 'id',
          value: 'id'
        }
      }
    },
    selItemShowMax: {
      type: Number,
      default: 5
    },
    // 是否显示结果
    isShowResult: {
      type: Boolean,
      default: true
    },
    // 是否显示确定取消按钮
    isShowSubmit: {
      type: Boolean,
      default: true
    },
    isMultiSel: {
      type: Boolean,
      default: true
    },
    // 表格组件其他传参
    tableProps: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 显示列表
    listColumn: {
      type: Array 
    }
  },
  data() {
    return {
      defaultListProps: DefaultListProps,
      filterQuery: {},
      currentPage: 1,
      selectItems: []
    }
  },
  computed: { 
    columns() {
      return [...this.listColumn, {prop: 'ctrl', label: '操作', fixed: 'right', width: 80}]
    }
  },
  methods: {
    loader(page, pageSize) {
      this.currentPage = page
      if (!this.listLoad) {
        return Promise.reslove({
          total: 0,
          list: []
        })
      } else {
        // 将 分页、部门、查询关键字 传入给函数使用
        return this.listLoad(page, pageSize, this.filterQuery).then((res) => {
          return Promise.resolve({
            total: res.total,
            list: res.list
          })
        })
      } 
    },
    itemSelectHandle(item) {
      if (this.isMultiSel) {
        const targetIndex = this._findTargetIndex(item)
        if (targetIndex < 0) {
          this.selectItems.push(item)
        }
      } else {
        this.selectItems = [item]
      }
      
    },
    removeItemSel(item) {
      const targetIndex = this._findTargetIndex(item)
      if (targetIndex >= 0) {
        this.selectItems.splice(targetIndex, 1)
      }
    },
    filterSubmitHandle(model) {
      this.filterQuery = model
      this.$refs.list.refresh(1)
    },
    definedSelected(option) {
      return this._findTargetIndex(option) >= 0
    },
    _findTargetIndex(option) {
      return this.selectItems.findIndex((item) => {
        return item[this.optionsPropsMap.id] === option[this.optionsPropsMap.id]
      })
    },
    // 取消按钮点击事件
    cancelClickHandle() { 
      this.clearSelectItems()
      this.$emit('on-cancel')
    },
    // 确定按钮点击事件
    submitClickHandle() { 
      this.$emit('on-submit', this.selectItems)
    },
    getSelectItems() {
      return this.selectItems
    },

    setSelectItems(items) {
      this.selectItems = items
    },

    clearSelectItems() {
      this.selectItems = []
    }
  },
  created() {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
.list-picker-warp{
  height:100%;
  box-sizing: border-box;
  display: flex;
  flex-flow: column; 
  * {
    box-sizing: border-box;
  }
  & > div {
    width: 100%
  }
  .filter-warp, .result-warp, .btn-warp, .header-warp{
    flex: 0 0 auto;
   
  }
  .list-warp{
    flex: 1;
    position: relative;
    margin-bottom: 5px;
    .inner{
      position: absolute;
      width: 100%;
      top: 0;
      bottom: 0;
      /deep/ .options-list{
        .my-list__item{
          padding: 0px;
          
          .item-warp{
            display:flex;
            flex-flow: row nowrap;
            align-items: center;
            padding: 4px;
            line-height: 1.6;
            cursor: pointer;
            &.is-select{
              background: #bae7ff;
              cursor:auto;
            }
            .content{
              flex: 1;
              width: 0;
              padding-right: 5px;
            }
            .ctrl{
              flex: 0 0 auto;
            }  
          }
        }
      }
    }
  }
  .result-warp{ 
    padding: 5px 0; 
    /deep/ .el-tag{
      margin-bottom: 2px;
    }
  }
  .btn-warp{
    text-align: right; 
  }
}
</style>