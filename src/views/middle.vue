<template>
  <div class="content">
    <div class="app-stencil" ref="stencilContainer"></div>
    <div class="app-content" ref="containerRef"></div>
  </div>
</template>

<script>
import { Graph, Path } from "@antv/x6";
import Hierarchy from "@antv/hierarchy";

export default {
  name: "md",
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 中心主题或分支主题
      Graph.registerNode(
        "topic",
        {
          inherit: "rect",
          markup: [
            {
              tagName: "rect",
              selector: "body",
            },
            {
              tagName: "text",
              selector: "label",
            },
          ],
          attrs: {
            body: {
              rx: 6,
              ry: 6,
              stroke: "#5F95FF",
              fill: "#EFF4FF",
              strokeWidth: 1,
            },
            label: {
              fontSize: 14,
              fill: "#262626",
            },
          },
        },
        true
      );

      // 子主题
      Graph.registerNode(
        "topic-child",
        {
          inherit: "rect",
          markup: [
            {
              tagName: "rect",
              selector: "body",
            },
            {
              tagName: "text",
              selector: "label",
            },
          ],
          attrs: {
            body: {
              rx: 6,
              ry: 6,
              fill: "#ffffff",
              strokeWidth: 0,
              stroke: "#5F95FF",
            },
            label: {
              fontSize: 14,
              fill: "#262626",
              textVerticalAnchor: "bottom",
            },
          },
        },
        true
      );

      // 边
      Graph.registerEdge(
        "mindmap-edge",
        {
          inherit: "edge",
          attrs: {
            line: {
              stroke: "#A2B1C3",
              strokeWidth: 2,
            },
          },
          zIndex: 0,
        },
        true
      );
      Graph.registerEdge(
        "arrow-edge",
        {
          inherit: "edge",
          attrs: {
            line: {
              stroke: "black",
              strokeWidth: 2,
            },
          },
          zIndex: 0,
        },
        true
      );
      const data = {
        id: "1",
        type: "topic",
        label: "中心主题",
        width: 160,
        height: 50,
        children: [
          {
            id: "1-1",
            type: "topic-branch",
            label: "分支主题1",
            width: 100,
            height: 40,
            children: [
              {
                id: "1-1-1",
                type: "topic-child",
                label: "子主题1",
                width: 60,
                height: 30,
              },
              {
                id: "1-1-2",
                type: "topic-child",
                label: "子主题2",
                width: 60,
                height: 30,
              },
            ],
          },
        ],
      };

      const containerRef = this.$refs.containerRef;
      const graph = new Graph({
        container: containerRef,
        connecting: {
          connectionPoint: "anchor",
        },
        selecting: {
          enabled: true,
        },
        keyboard: {
          enabled: true,
        },
      });

      const render = () => {
        console.log("render");
        const result = Hierarchy.mindmap(data, {
          direction: "H",
          getHeight(d) {
            return d.height;
          },
          getWidth(d) {
            return d.width;
          },
          getHGap() {
            return 40;
          },
          getVGap() {
            return 20;
          },
          getSide: () => {
            return "right";
          },
        });
        const cells = [];
        const traverse = (hierarchyItem) => {
          if (hierarchyItem) {
            const { data, children } = hierarchyItem;
            cells.push(
              graph.createNode({
                id: data.id,
                shape: data.type === "topic-child" ? "topic-child" : "topic",
                x: hierarchyItem.x,
                y: hierarchyItem.y,
                width: data.width,
                height: data.height,
                label: data.label,
                type: data.type,
              })
            );
            if (children) {
              children.forEach((item) => {
                const { id, data } = item;
                console.log("edge", item);
                const edge =
                  data.type === "topic-child"
                    ? graph.createEdge({
                        source: {
                          cell: hierarchyItem.id,
                        },
                        target: {
                          cell: id,
                        },
                        attrs: {
                          line: {
                            targetMarker: "",
                            stroke: "#A2B1C3",
                            strokeWidth: 2,
                          },
                        },
                      })
                    : graph.createEdge({
                        source: {
                          cell: hierarchyItem.id,
                        },
                        target: {
                          cell: 'md',
                        },
                      });

                cells.push(edge);
                traverse(item);
              });
            }
          }
        };
        traverse(result);
        graph.resetCells(cells);
        graph.centerContent();
      };
      // 渲染
      render();
      graph.addNode({
        shape: "path",
        id: 'md',
        x: 360,
        y: 70,
        width: 100,
        height: 80,
        label: "path",
        attrs: {
          body: {
            fill: "#efdbff",
            stroke: "#9254de",
            // 指定 d 属性，pathData 不随图形的大小缩放
            d: "M10 60 A40 40 0 0 1 90 60 Z",
          },
        },
      });
    },
  },
};
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
