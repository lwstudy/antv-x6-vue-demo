<template>
  <div class="content">
    <div class="app-stencil" ref="stencilContainer"></div>
    <div class="app-content" ref="containerRef"></div>
  </div>
</template>

<script>
import { Graph } from '@antv/x6'
import BpmnJson from '../data/bpmn.json'


export default {
  name: 'bpmn',
  data() {
    return {
      graph: ''
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {

      Graph.registerNode(
        'event',
        {
          inherit: 'circle',
          attrs: {
            body: {
              strokeWidth: 2,
              stroke: '#5F95FF',
              fill: '#FFF'
            }
          }
        },
        true
      )

      Graph.registerNode(
        'activity',
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
              x: 6,
              y: 6,
              width: 16,
              height: 16,
              'xlink:href':
                'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*pwLpRr7QPGwAAAAAAAAAAAAAARQnAQ'
            },
            label: {
              fontSize: 12,
              fill: '#262626'
            }
          }
        },
        true
      )

      Graph.registerNode(
        'gateway',
        {
          inherit: 'polygon',
          attrs: {
            body: {
              refPoints: '0,10 10,0 20,10 10,20',
              strokeWidth: 2,
              stroke: '#5F95FF',
              fill: '#EFF4FF'
            },
            label: {
              text: '+',
              fontSize: 40,
              fill: '#5F95FF'
            }
          }
        },
        true
      )

      Graph.registerEdge(
        'bpmn-edge',
        {
          inherit: 'edge',
          attrs: {
            line: {
              stroke: '#A2B1C3',
              strokeWidth: 2
            }
          }
        },
        true
      )

      const containerRef = this.$refs.containerRef
      const graph = new Graph({
        container: containerRef,
        connecting: {
          router: 'orth'
        },
        // 不允许移动节点和边
        interacting: false
      })
      console.log('BpmnJson', BpmnJson);
      const obstacles = []
      let edge;
      const update = () => {
        const edgeView = graph.findViewByCell(edge)
        edgeView.update()
      }

      BpmnJson.forEach((item) => {
        if (item.shape === 'bpmn-edge') {
          // 驳回边处理【自动避开路径上的其他节点】
          if (item.id === '17') {
            edge = Object.assign(graph.addEdge(item), {
              router: {
                name: 'manhattan',
                args: {
                  startDirections: ['top'],
                  endDirections: ['top']
                }
              }
            })
          } else if (item.pass) {
            // 通过的边处理
            edge = Object.assign(graph.addEdge(item), {
              attrs: {
                line: {
                  stroke: '#0ff',
                  strokeWidth: 2
                }
              }
            })
            console.log('edge', edge);
          } else {
            graph.addEdge(item)
          }
        } else {
          let obstacle;
          if (item.pass) {
            // 通过的节点处理
            obstacle = Object.assign(graph.addNode(item), {
              attrs: {
                body: {
                  stroke: '#0ff'
                }
              }
            })
            console.log('obstacle', obstacle);
          }else if(item.current) {
            // 当前节点处理
            obstacle = Object.assign(graph.addNode(item), {
              attrs: {
                body: {
                  stroke: 'red'
                }
              }
            })
          }else {
            obstacle = graph.addNode(item)
          }

          obstacles.push(obstacle)
          obstacles.forEach((obstacle) => obstacle.on('change:position', update))

        }
      })

      graph.zoomToFit({ padding: 10, maxScale: 1 })
      update()
      this.graph = graph


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
</style>
