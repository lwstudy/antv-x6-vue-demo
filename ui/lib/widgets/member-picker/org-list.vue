<template>
  
  <div class="org-list-layout" v-loading="!tree.length">
    
    <div class="title" v-if="tree.length === 1" @click="handleDown(tree[0])">
      <i class="el-icon-arrow-left"></i> {{tree[0][orgPropMap.name]}}
    </div>
    <div class="title" v-else @click="resetOrgList">
      <i class="el-icon-arrow-left"></i> 回到顶级
    </div>
     
    <el-breadcrumb class="path-warp" v-if="paths.length > 0"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item
        v-for="item in paths"
        :key="item[orgPropMap.id]"
        @click.native="handleDown(item)"
        >{{ item[orgPropMap.name] }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    
    
    <my-header
      v-show="currentOrgChildren.length"
      title="下属部门"
      icon="el-icon-menu"
      theme="bg-right"
      size="small"
      style="margin-bottom: 3px;"
    ></my-header>
    <div class="org-list is-flex" v-loading="userLoading"> 
      <div class="department" v-show="currentOrgChildren.length">
        <div
          :class="{'item': true, 'selected': currentOrg && item[orgPropMap.id] === currentOrg[orgPropMap.id]}"
          v-for="item in currentOrgChildren"
          :key="item[orgPropMap.id]" 
        >
          <i class="el-icon-folder"></i>
          <div class="name-warp" :title="item[orgPropMap.name]">
            <span @click="loadUserClick(item)">{{ item[orgPropMap.name] }}</span>
          </div>
          <span 
            :class="{
              'down': true, 
              'active': (item[orgPropMap.children] && item[orgPropMap.children].length) || loadOrgChildren
            }" 
            @click="handleDown(item)"
          > <i class="el-icon-s-custom" ></i> 下级 
          </span>
        </div>
      </div> 
    </div>
    <!-- ========================== -->
    <my-header
      title="单位人员"
      icon="el-icon-menu"
      theme="bg-right"
      size="small"
      style="margin-bottom: 3px;"
    >
    </my-header>
    <div class="personnel" v-show="users.length"  v-loading="userLoading">
      <div
        class="item user"
        v-for="item in users"
        :key="item.id"
        @click="select(item, $event)"
        :title="item.address"
      >
        <el-checkbox v-if="multiple" name="check" v-model="item._isSelect">
          <i
            class="el-icon-s-custom"
            v-if="!item.src"
            style="font-size: 28px"
          ></i>
          <my-avatar v-if="item.src" :src="item.src"></my-avatar>
          {{ item[personPropMap.label] }}
        </el-checkbox>
        <span v-else>
          <i class="el-icon-s-custom" v-if="!item.src"></i>
          <my-avatar v-if="item.src" :src="item.src"></my-avatar>
          {{ item[personPropMap.label] }}
        </span>
      </div>
    </div>
  </div> 
   
</template>

<script>
  import {findPath} from '$ui/utils/tree' // , create

  export default {
    props: {
      multiple: {
        type: Boolean,
        default: true
      },
      loadOrg: Function,
      loadOrgChildren: Function,
      loadUser: Function,
      personPropMap: Object,
      orgPropMap: {
        type: Object,
        default: () => {
          return {
            name: 'label',
            id: 'id',
            children: 'children',
            parentId: 'parentId'
          }
        }
      }
    },
    data() {
      return {
        rootId: '2',
       
        currentOrg: null,
        currentOrgChildren: [],
        selectOrg: null,
        tree: [],
        paths: [],

        users: [],
        userLoading: false
      }
    },
    computed: {
      // currentOrgList() { 
      //   return this.currentOrg.children
      // }
    },
    methods: {
      init() {
        if (!this.loadOrg) {
          throw new Error('loadOrg函数缺失')
        }
        this.loadOrg().then((res) => { 
          this.tree = res
          if (this.tree.length === 1) {
            const target = this.tree[0]
            this.handleDown(target)
          } else {
            // 当组织树存在多个顶部层级时
            this.currentOrgChildren = [...this.tree]
          } 
        })  
      },
      // 多个一级菜单时 重置回到顶部的功能
      resetOrgList() {
        this.currentOrg = null
        this.paths = []
        this.currentOrgChildren = [...this.tree]
      },
      loadUserClick(org) {
        if (!this.loadUser) {
          throw new Error('loadUser函数缺失')
        }
        this.currentOrg = org
         this.paths = findPath(this.tree, n => n[this.orgPropMap.id] === org[this.orgPropMap.id])
        this.userLoading = true
        this.loadUser(org).then((res) => {
          this.userLoading = false
          this.users = res 
          // console.log(res, '-------------user')
          // 没有部门人员， 如有下一级，自动跳转下一级
          if (!res.length && (org[this.orgPropMap.children] && org[this.orgPropMap.children].length)) {
            this.handleDown(org) 
          }
        })
      },
       
      handleDown(item) {
        this.currentOrg = item
        if (this.loadOrgChildren) {
          this.loadOrgChildren(item).then((res) => {
            this.currentOrgChildren = res
          })
        } else { 
          this.currentOrgChildren = this.currentOrg[this.orgPropMap.children]
        }
        
        this.paths = findPath(this.tree, n => n[this.orgPropMap.id] === item[this.orgPropMap.id])
        this.users = []
        if (this.isAutoLoad) {
          this.loadUser(item)
        }
      },
      select(item, evt) {
        if (this.multiple) {
          if (typeof evt.target.checked !== 'undefined') {
            this.$emit('select', item, evt.target.checked)
          }
        } else {
          this.$emit('select', item, true)
        }
      },
      removeSelect(person) {
        this.users = this.users.map(item => {
          if(item[this.personPropMap.id] === person[this.personPropMap.id]) {
            item._isSelect = false
          }
          return item
        })
      }
    },
    created() {
      this.init()
    }
  }
</script>

<style lang="scss" scoped>
@import "~@/style/_vars.scss";

.org-list-layout {
  height: 100%;
  display: flex;
  flex-flow: column;
  & > div{
    width: 100%;
  }
  .is-flex{
    flex: 1;
  }
  .is-auto{
    flex: 0 0 auto;
  }
  .title{
    padding: 0 10px;
    line-height: 42px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    border-bottom: 1px solid #ebeef5;
  }
  /deep/ .path-warp{
    &.el-breadcrumb {
      padding: 8px 0px 8px 10px; 
      .el-breadcrumb__item {
        cursor: pointer;
        .el-breadcrumb__inner {
          cursor: pointer;
          &:hover {
            color: $blue-8;
          }
        }
        &:last-child {
          .el-breadcrumb__inner {
            &:hover {
              color: inherit; //#606266;
            }
          }
        }
      }
    }
  }
  .org-list{
    position: relative; 
    .department {
      position: absolute;
      top: 0px;
      bottom: 0;
      width: 100%;
      padding: 0;
      height: 100%;
      overflow: auto;
    } 
  }
  .personnel{
    height: 40%;
    overflow: auto;  
  }
}
 
 
 
.item {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  border-radius: 4px; // $--border-radius-base;
  
  // /deep/ .el-checkbox__label {
  // max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &.user {
    i {
      color: $blue-5;
    }
  }
  // }
  .name-warp {
    flex: 1;
    width: 0;
    margin-left: 5px;
    overflow: hidden;
    height: 40px;
    line-height: 40px;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 700;
    span{
      cursor: pointer;
    }
    
  }

  &:hover, &.selected {
    background: $blue-9; // $--color-primary-light-9;
  }

  .down { 
    color: #ebeef5;
    border-left: 1px solid $blue-8;
    line-height: 20px;
    padding-left: 10px; 
    cursor: pointer;
    pointer-events:none;
    &.active{
      color: $blue-5;
      pointer-events:auto;
    }
  }
}


</style>
