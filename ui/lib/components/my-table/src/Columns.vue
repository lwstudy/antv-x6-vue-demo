<script>
  import {TableColumn} from 'element-ui'

  export default {
    name: 'Columns',
    components: {
      TableColumn
    },
    props: {
      columns: Array
    },
    render() {
      const scopedSlots = {
        default: props => this.$scopedSlots.default(props),
        header: props => this.$scopedSlots.header(props)
      }
      const columns = this.columns.map((col, index) => {
        return (
          <TableColumn key={`${col.prop}_${col.type}_${index}`}
                       {
                         ...{
                           props: col,
                           scopedSlots: scopedSlots
                         }
                       }
          >
            {
              (col.children && col.children)
                ? (<Columns {
                              ...{
                                props: {
                                  columns: col.children
                                },
                                scopedSlots: scopedSlots
                              }
                            }></Columns>)
                : null
            }
          </TableColumn>
        )
      })
      return (<template>{columns}</template>)
    }
  }
</script>

