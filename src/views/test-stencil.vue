<template>

  <div class="content">
    <div class="app-stencil" ref="stencilContainer">
    </div>
    <div class="app-content" ref="container">
    </div>
  </div>

</template>

<script>
import { Graph, Shape } from '@antv/x6';
import { Stencil } from '@antv/x6-plugin-stencil'


const { Rect, Circle } = Shape

export default {
  name: "index",
  mounted () {
    this.init();
  },
  methods: {
    init(){
      const graph = new Graph({
        container: this.$refs.container,
        grid: true,
        snapline: {
          enabled: true,
          sharp: true,
        },
        scroller: {
          enabled: true,
          pageVisible: false,
          pageBreak: false,
          pannable: true,
        },
      })

      const source = graph.addNode({
        x: 130,
        y: 30,
        width: 100,
        height: 40,
        attrs: {
          label: {
            text: 'Hello',
            fill: '#6a6c8a',
          },
          body: {
            stroke: '#31d0c6',
          },
        },
      })
      const target = graph.addNode({
        x: 320,
        y: 240,
        width: 100,
        height: 40,
        attrs: {
          label: {
            text: 'World',
            fill: '#6a6c8a',
          },
          body: {
            stroke: '#31d0c6',
          },
        },
      })

      graph.addEdge({ source, target })

      graph.centerContent()

      const stencil = new Stencil({
        title: 'Components',
        target: graph,
        search: true,
        collapsable: true,
        stencilGraphWidth: 200,
        stencilGraphHeight: 180,
        groups: [
          {
            name: 'group1',
            title: 'Group(Collapsable)',
          },
          {
            name: 'group2',
            title: 'Group',
            collapsable: false,
          },
        ],
      })


      this.$refs.stencilContainer.appendChild(stencil.container)

      const r = new Rect({
        width: 70,
        height: 40,
        attrs: {
          rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6 },
          text: { text: 'rect', fill: 'white' },
        },
      })

      const c = new Circle({
        width: 60,
        height: 60,
        attrs: {
          circle: { fill: '#FE854F', strokeWidth: 6, stroke: '#4B4A67' },
          text: { text: 'ellipse', fill: 'white' },
        },
      })

      const c2 = new Circle({
        width: 60,
        height: 60,
        attrs: {
          circle: { fill: '#4B4A67', 'stroke-width': 6, stroke: '#FE854F' },
          text: { text: 'ellipse', fill: 'white' },
        },
      })

      const r2 = new Rect({
        width: 70,
        height: 40,
        attrs: {
          rect: { fill: '#4B4A67', stroke: '#31D0C6', strokeWidth: 6 },
          text: { text: 'rect', fill: 'white' },
        },
      })

      const r3 = new Rect({
        width: 70,
        height: 40,
        attrs: {
          rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6 },
          text: { text: 'rect', fill: 'white' },
        },
      })

      const c3 = new Circle({
        width: 60,
        height: 60,
        attrs: {
          circle: { fill: '#FE854F', strokeWidth: 6, stroke: '#4B4A67' },
          text: { text: 'ellipse', fill: 'white' },
        },
      })

      stencil.load([r, c, c2, r2.clone()], 'group1')
      stencil.load([c2.clone(), r2, r3, c3], 'group2')
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
