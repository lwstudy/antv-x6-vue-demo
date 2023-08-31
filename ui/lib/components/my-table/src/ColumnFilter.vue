<template>
  <div class="my-table-column-filter">
    <el-popover
      placement="bottom"
      popper-class="my-table-column-filter__popper"
      trigger="click">
      <i slot="reference" class="my-table-column-filter__trigger el-icon-more"></i>
      <div v-if="checkboxList.length" >
        <el-checkbox-group v-model="currentValue">
          <el-checkbox v-for="(col,index) in checkboxList"
                      :key="col.prop||index"
                      :disabled="col.display==='always'"
                      :label="col.prop">{{col.label}}
          </el-checkbox>
        </el-checkbox-group>
        <slot v-if="filterConfirm">
          <div style="text-align:center" > 
            <el-button type="text" size="mini" :disabled="!isColChanged" 
            @click="filterConfirmClick">
              确定
              <span v-show="isColChanged">*</span>
            </el-button>
            <el-button type="text" size="mini" v-show="isColChanged"  @click="colChangeReset">还原</el-button>
          </div>
        </slot>
      </div>
      
      <div v-else>没有可显示的列</div>
    </el-popover>
  </div>
</template>

<script>
import {isEqual} from '$ui/utils/util'
export default {
  props: {
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: Array,
      default() {
        return []
      }
    },
    filterConfirm: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentValue: this.value || [],
      originValue: [...this.value || []]
    }
  },
  computed: {
    checkboxList() {
      return this.columns.filter(col => !!col.prop && !col.type)
    }, 
    isColChanged() {
      return !isEqual(this.originValue, this.currentValue)
    } 
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.currentValue = val
      }
    },
    currentValue(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    filterConfirmClick() {
      this.originValue = [...this.currentValue]
      this.$emit('column-change-confirm')
    },
    colChangeReset() {
      this.$emit('column-change-reset')
      // this.$parent.resetDisplayColumns()
    }
  }
}
</script>

