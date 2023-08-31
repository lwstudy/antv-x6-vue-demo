<template>
  <div ref="containerRef" style="min-width: 400px; min-height: 600px"></div>
</template>

<script>
import { Graph, ObjectExt} from "@antv/x6";
import UmlJson from "../data/uml.json";

export default {
  data() {
    return {};
  },
  mounted() {
    // #region 注册基础图形
    Graph.registerNode(
      "class",
      {
        inherit: "rect",
        markup: [
          {
            tagName: "rect",
            selector: "body",
          },
          {
            tagName: "rect",
            selector: "name-rect",
          },
          {
            tagName: "rect",
            selector: "attrs-rect",
          },
          {
            tagName: "rect",
            selector: "methods-rect",
          },
          {
            tagName: "text",
            selector: "name-text",
          },
          {
            tagName: "text",
            selector: "attrs-text",
          },
          {
            tagName: "text",
            selector: "methods-text",
          },
        ],
        attrs: {
          rect: {
            width: 160,
          },
          body: {
            stroke: "#fff",
          },
          "name-rect": {
            fill: "#5f95ff",
            stroke: "#fff",
            strokeWidth: 0.5,
          },
          "attrs-rect": {
            fill: "#eff4ff",
            stroke: "#fff",
            strokeWidth: 0.5,
          },
          "methods-rect": {
            fill: "#eff4ff",
            stroke: "#fff",
            strokeWidth: 0.5,
          },
          "name-text": {
            ref: "name-rect",
            refY: 0.5,
            refX: 0.5,
            textAnchor: "middle",
            fontWeight: "bold",
            fill: "#fff",
            fontSize: 12,
          },
          "attrs-text": {
            ref: "attrs-rect",
            refY: 0.5,
            refX: 5,
            textAnchor: "left",
            fill: "black",
            fontSize: 10,
          },
          "methods-text": {
            ref: "methods-rect",
            refY: 0.5,
            refX: 5,
            textAnchor: "left",
            fill: "black",
            fontSize: 10,
          },
        },
        propHooks(meta) {
          const { name, attributes, methods, ...others } = meta;

          if (!(name && attributes && methods)) {
            return meta;
          }

          const rects = [
            { type: "name", text: name },
            { type: "attrs", text: attributes },
            { type: "methods", text: methods },
          ];

          let offsetY = 0;
          rects.forEach((rect) => {
            const height = rect.text.length * 12 + 16;
            ObjectExt.setByPath(
              others,
              `attrs/${rect.type}-text/text`,
              rect.text.join("\n")
            );
            ObjectExt.setByPath(
              others,
              `attrs/${rect.type}-rect/height`,
              height
            );
            ObjectExt.setByPath(
              others,
              `attrs/${rect.type}-rect/transform`,
              "translate(0," + offsetY + ")"
            );
            offsetY += height;
          });

          others.size = { width: 160, height: offsetY };

          return others;
        },
      },
      true
    );

    const containerRef = this.$refs.containerRef;
    const graph = new Graph({
      container: containerRef,
      grid: true,
      embedding: {
        enabled: true,
        findParent({ node }) {
          const bbox = node.getBBox();
          return this.getNodes().filter((node) => {
            const data = node.getData();
            if (data && data.parent) {
              const targetBBox = node.getBBox();
              return bbox.isIntersectWithRect(targetBBox);
            }
            return false;
          });
        },
      },
      highlighting: {
        embedding: {
          name: "stroke",
          args: {
            padding: -1,
            attrs: {
              stroke: "#73d13d",
            },
          },
        },
      },
    });


    // custom-node
    const cells = [];
    UmlJson.forEach((item) => {
      if(item.shape === 'class') cells.push(graph.createNode(item));
    });
    graph.resetCells(cells);


    graph.addNode({
      x: 40,
      y: 140,
      width: 100,
      height: 50,
      label: "Child\n(1)",
      zIndex: 10,
      attrs: {
        body: {
          stroke: "none",
          fill: "#3199FF",
        },
        label: {
          fill: "#fff",
          fontSize: 12,
        },
      },
    });

    graph.addNode({
      x: 500,
      y: 100,
      width: 100,
      height: 50,
      label: "Child\n(2)",
      zIndex: 10,
      attrs: {
        body: {
          stroke: "none",
          fill: "#47C769",
        },
        label: {
          fill: "#fff",
          fontSize: 12,
        },
      },
    });

    graph.addNode({
      x: 200,
      y: 80,
      width: 240,
      height: 160,
      zIndex: 1,
      label: "Parent",
      attrs: {
        body: {
          fill: "#fffbe6",
          stroke: "#ffe7ba",
        },
        label: {
          fontSize: 12,
        },
      },
      data: {
        parent: true,
      },
    });

    graph.on("node:change:parent", ({ node }) => {
      node.attr({
        label: {
          text: "Child\n(embed)",
        },
      });
    });
  },
  methods: {},
};
</script>

<style>
</style>
