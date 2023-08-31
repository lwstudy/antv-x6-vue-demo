<template>
  <div class="content">
    <div class="app-stencil" ref="stencilContainer">
    </div>
    <div class="app-content" ref="containerRef">
    </div>
  </div>
</template>

<script>
import { Graph, Path } from '@antv/x6'
import Hierarchy from '@antv/hierarchy'




export default {
  name: 'thinking',
  mounted () {
    this.init();
  },
  methods: {
    init() {
        // 中心主题或分支主题
        Graph.registerNode(
        'topic',
        {
            inherit: 'rect',
            markup: [
            {
                tagName: 'rect',
                selector: 'body'
            },
            {
                tagName: 'image',
                selector: 'img'
            },
            {
                tagName: 'text',
                selector: 'label'
            }
            ],
            attrs: {
            body: {
                rx: 6,
                ry: 6,
                stroke: '#5F95FF',
                fill: '#EFF4FF',
                strokeWidth: 1
            },
            img: {
                ref: 'body',
                refX: '100%',
                refY: '50%',
                refY2: -8,
                width: 16,
                height: 16,
                'xlink:href':
                'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SYCuQ6HHs5cAAAAAAAAAAAAAARQnAQ',
                event: 'add:topic',
                class: 'topic-image'
            },
            label: {
                fontSize: 14,
                fill: '#262626'
            }
            }
        },
        true
        )

        // 子主题
        Graph.registerNode(
        'topic-child',
        {
            inherit: 'rect',
            markup: [
            {
                tagName: 'rect',
                selector: 'body'
            },
            {
                tagName: 'text',
                selector: 'label'
            },
            {
                tagName: 'path',
                selector: 'line'
            }
            ],
            attrs: {
            body: {
                fill: '#ffffff',
                strokeWidth: 0,
                stroke: '#5F95FF'
            },
            label: {
                fontSize: 14,
                fill: '#262626',
                textVerticalAnchor: 'bottom'
            },
            line: {
                stroke: '#5F95FF',
                strokeWidth: 2,
                d: 'M 0 15 L 60 15'
            }
            }
        },
        true
        )

        // 连接器
        Graph.registerConnector(
        'mindmap',
        (sourcePoint, targetPoint, routerPoints, options) => {
            const midX = sourcePoint.x + 10
            const midY = sourcePoint.y
            const ctrX = (targetPoint.x - midX) / 5 + midX
            const ctrY = targetPoint.y
            const pathData = `
            M ${sourcePoint.x} ${sourcePoint.y}
            L ${midX} ${midY}
            Q ${ctrX} ${ctrY} ${targetPoint.x} ${targetPoint.y}
            `
            return options.raw ? Path.parse(pathData) : pathData
        },
        true
        )

        // 边
        Graph.registerEdge(
        'mindmap-edge',
        {
            inherit: 'edge',
            connector: {
            name: 'mindmap'
            },
            attrs: {
            line: {
                targetMarker: '',
                stroke: '#A2B1C3',
                strokeWidth: 2
            }
            },
            zIndex: 0
        },
        true
        )
        const data = {
        id: '1',
        type: 'topic',
        label: '中心主题',
        width: 160,
        height: 50,
        children: [
            {
            id: '1-1',
            type: 'topic-branch',
            label: '分支主题1',
            width: 100,
            height: 40,
            children: [
                {
                id: '1-1-1',
                type: 'topic-child',
                label: '子主题1',
                width: 60,
                height: 30
                },
                {
                id: '1-1-2',
                type: 'topic-child',
                label: '子主题2',
                width: 60,
                height: 30
                }
            ]
            },
            {
            id: '1-2',
            type: 'topic-branch',
            label: '分支主题2',
            width: 100,
            height: 40
            }
        ]
        }

        const containerRef = this.$refs.containerRef
        const graph = new Graph({
        container: containerRef,
        connecting: {
            connectionPoint: 'anchor'
        },
        selecting: {
            enabled: true
        },
        keyboard: {
            enabled: true
        }
        })


        const render = () => {
            console.log('render');
            const result = Hierarchy.mindmap(data, {
                direction: 'H',
                getHeight(d) {
                return d.height
                },
                getWidth(d) {
                return d.width
                },
                getHGap() {
                return 40
                },
                getVGap() {
                return 20
                },
                getSide: () => {
                return 'right'
                }
            })
            const cells = []
            const traverse = (hierarchyItem) => {
                if (hierarchyItem) {
                const { data, children } = hierarchyItem
                cells.push(
                    graph.createNode({
                    id: data.id,
                    shape: data.type === 'topic-child' ? 'topic-child' : 'topic',
                    x: hierarchyItem.x,
                    y: hierarchyItem.y,
                    width: data.width,
                    height: data.height,
                    label: data.label,
                    type: data.type
                    })
                )
                if (children) {
                    children.forEach((item) => {
                    const { id, data } = item
                    cells.push(
                        graph.createEdge({
                        shape: 'mindmap-edge',
                        source: {
                            cell: hierarchyItem.id,
                            anchor:
                            data.type === 'topic-child'
                                ? {
                                    name: 'right',
                                    args: {
                                    dx: -16
                                    }
                                }
                                : {
                                    name: 'center',
                                    args: {
                                    dx: '25%'
                                    }
                                }
                        },
                        target: {
                            cell: id,
                            anchor: {
                            name: 'left'
                            }
                        }
                        })
                    )
                    traverse(item)
                    })
                }
                }
            }
            traverse(result)
            graph.resetCells(cells)
            graph.centerContent()
        }

        const findItem = (
            obj,
            id
            ) => {
            if (obj.id === id) {
                return {
                parent: null,
                node: obj
                }
            }
            const { children } = obj
            if (children) {
                for (let i = 0, len = children.length; i < len; i++) {
                const res = findItem(children[i], id)
                if (res) {
                    return {
                    parent: res.parent || obj,
                    node: res.node
                    }
                }
                }
            }
            return null
        }

        const addChildNode = (id, type) => {
            const res = findItem(data, id)
            const dataItem = res?.node
            if (dataItem) {
                let item = null
                const length = dataItem.children ? dataItem.children.length : 0
                if (type === 'topic') {
                item = {
                    id: `${id}-${length + 1}`,
                    type: 'topic-branch',
                    label: `分支主题${length + 1}`,
                    width: 100,
                    height: 40
                }
                } else if (type === 'topic-branch') {
                item = {
                    id: `${id}-${length + 1}`,
                    type: 'topic-child',
                    label: `子主题${length + 1}`,
                    width: 60,
                    height: 30
                }
                }
                if (item) {
                if (dataItem.children) {
                    dataItem.children.push(item)
                } else {
                    dataItem.children = [item]
                }
                return item
                }
            }
            return null
        }

        const removeNode = (id) => {
            const res = findItem(data, id)
            const dataItem = res?.parent
            if (dataItem && dataItem.children) {
                const { children } = dataItem
                const index = children.findIndex((item) => item.id === id)
                return children.splice(index, 1)
            }
            return null
        }

        graph.on('add:topic', ({ node }) => {
        const { id } = node
        const type = node.prop('type')
        if (addChildNode(id, type)) {
            console.log('addc');
            render()
        }
        })
        graph.bindKey(['backspace', 'delete'], () => {
        const selectedNodes = graph.getSelectedCells().filter((item) => item.isNode())
        if (selectedNodes.length) {
            const { id } = selectedNodes[0]
            if (removeNode(id)) {
            render()
            }
        }
        })

        graph.bindKey('tab', (e) => {
        e.preventDefault()
        const selectedNodes = graph.getSelectedCells().filter((item) => item.isNode())
        if (selectedNodes.length) {
            const node = selectedNodes[0]
            const type = node.prop('type')
            if (addChildNode(node.id, type)) {
            render()
            }
        }
        })
        // 渲染
        render()
    }

  }
}

</script>


<style scoped>

.content {
  font-family: sans-serif;
  display: flex;
}

.app-stencil {
  width: 250px;
  border: 1px solid #f0f0f0;
  position: relative;
}

.app-content {
  flex: 1;
  height: 520px;
  margin-left: 8px;
  margin-right: 8px;
  box-shadow: 0 0 10px 1px #e9e9e9;
}

.x6-graph-scroller {
  border: 1px solid #f0f0f0;
  margin-left: -1px;
}
.topic-image {
    visibility: hidden;
    cursor: pointer;
  }
  .x6-node:hover .topic-image {
    visibility: visible;
  }
  .x6-node-selected rect {
    stroke-width: 2px;
  }
</style>
