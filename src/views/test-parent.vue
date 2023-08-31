<template>
  <div class="antv-x6" id="dber">
    <div class="app-mini" ref="minimapContainer"></div>
    <div class="app-content" ref="containerRef"></div>
    <div class="operating">
      <el-tooltip class="item" effect="light" content="撤销" placement="bottom">
        <i
          class="el-icon-refresh-left"
          :class="{ opacity: !canUndo }"
          @click="undoFn"
        ></i>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="重做" placement="bottom">
        <i
          class="el-icon-refresh-right"
          :class="{ opacity: !canRedo }"
          @click="redoFn"
        ></i>
      </el-tooltip>
      <!-- <el-tooltip class="item" effect="light" content="放大" placement="bottom">
        <i class="el-icon-zoom-in" @click="zoomInFn"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="缩小" placement="bottom">
        <i
          class="el-icon-zoom-out"
          :class="{ opacity: !canZoomOut }"
          @click="zoomOutFn"
        ></i>
      </el-tooltip> -->
      <el-tooltip class="item" effect="light" content="全屏" placement="bottom">
        <i class="el-icon-full-screen" @click="toggle"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="清除" placement="bottom">
        <i class="el-icon-delete" @click="clearFn"></i>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="light"
        content="导出PNG"
        placement="bottom"
      >
        <i class="el-icon-picture-outline" @click="exportPNGFn"></i>
      </el-tooltip>
      <hr />
      <el-tooltip
        class="item"
        effect="light"
        content="网格布局"
        placement="bottom"
      >
        <i class="el-icon-rank" @click="layout"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="新增" placement="bottom">
        <el-button size="small" icon="el-icon-files" @click="addTable" />
      </el-tooltip>
      <el-input-number
        v-model="nodeNum"
        :min="10"
        :max="3000"
        label="描述文字"
      ></el-input-number>
    </div>
  </div>
</template>

<script>
import { Graph, Shape, FunctionExt, DataUri } from "@antv/x6";
import { cloneDeep, random } from "$ui/utils/util";
import { fullScreen, exitFullScreen, isFullScreen } from "$ui/utils/bom";
import Design from "@/utils/design";
import PRIMARYKEY from "@/assets/key.png";
import { GridLayout } from "@antv/layout";
import { MiniMap } from "@antv/x6-plugin-minimap";
import { Keyboard } from "@antv/x6-plugin-keyboard";
import { History } from "@antv/x6-plugin-history";
import { Selection } from "@antv/x6-plugin-selection";
// TODO:箭头记录
// 三叉箭头
// M17,0 L2,0  M25,0 A4,4 0 1 0 17,0 A4,4 0 1 0 25,0 Z  M2,-10 L17,0 L2,8
// 起点-圆
// M23,0.5 L16.5,0.5 M8,0.5 L1,0.5   M8,0.5 A4,4 0 0,1 16,0.5 A4,4 0 0,1 8,0.5
// 三角三叉-sourceMarker
// M30.8,-0.5 L16.5,8.3 L16.5,-9.1 L30.8,-0.5 Z M40.5,-0.5 A4,4 0 0 1 31.5,-0.5 A4,4 0 0 1 40.5,-0.5 M16.7,-5.5 0.999,-5.5 M16.9,4.5 L0.899,4.6 M16.9,-0.5 L0.899,-0.5
const LINE_HEIGHT = 24;
const NODE_WIDTH = 150;
const defaultColumnStyle = {
  id: "",
  label: "",
  ports: [],
  height: 24,
  width: 150,
  shape: "port-rect",
  position: {
    x: "",
    y: "",
  },
  attrs: {
    columnCode: { text: "" },
    dataType: { text: "" },
    primaryKey: {},
  },
  zIndex: 10,
};

const defaultTableStyle = {
  id: "",
  label: "",
  ports: [],
  height: 24,
  width: 150,
  shape: "er-rect",
  position: {
    x: "",
    y: "",
  },
  zIndex: 10,
};

export default {
  name: "er",
  data() {
    return {
      graph: null,
      data: [],
      selectCell: "",
      canRedo: false,
      canUndo: false,
      canZoomOut: true,
      showRight: false,
      isFullScreen: false,
      circularLayout: null,
      dagreLayout: null,
      gridLayout: null,
      forceLayout: null,
      count: 0,
      nodeNum: 10,
      canPanning: true,
      path_d:
        "M30.8,-0.5 L16.5,8.3 L16.5,-9.1 L30.8,-0.5 Z M40.5,-0.5 A4,4 0 0 1 31.5,-0.5 A4,4 0 0 1 40.5,-0.5 M16.7,-5.5 0.999,-5.5 M16.9,4.5 L0.899,4.6 M16.9,-0.5 L0.899,-0.5",
    };
  },
  watch: {
    nodeNum(e) {
      if (this.graph) {
        // this.loadNodes(e);
        this.loadTables(e);
        this.loadColumns(e);
      }
    },
  },
  mounted() {
    this.init();
  },
  updated() {
    const that = this;
    window.addEventListener("resize", function () {
      if (!isFullScreen()) {
        if (!isFullScreen()) {
          that.isFullScreen = false;
        }
      }
    });
  },
  methods: {
    init() {
      const that = this;
      Graph.registerPortLayout(
        "erPortPosition",
        (portsPositionArgs) => {
          return portsPositionArgs.map((_, index) => {
            return {
              position: {
                x: 0,
                y: (index + 1) * LINE_HEIGHT,
              },
              angle: 0,
            };
          });
        },
        true
      );

      Graph.registerNode("port-rect", {
        inherit: "rect",
        markup: [
          {
            tagName: "rect",
            selector: "portBody",
          },
          {
            tagName: "text",
            selector: "columnCode",
          },
          {
            tagName: "text",
            selector: "dataType",
          },
          {
            tagName: "image",
            selector: "primaryKey",
          },
        ],
        attrs: {
          portBody: {
            width: NODE_WIDTH,
            height: LINE_HEIGHT,
            strokeWidth: 1,
            fill: "#FFFFFF",
            // magnet: true,
            stroke: "#ccc",
          },
          columnCode: {
            ref: "portBody",
            refX: 15,
            refY: 12,
            fill: "#5F95FF",
            fontSize: 10,
            event: "node:port-contextmenu",
          },
          dataType: {
            ref: "portBody",
            refX: 70,
            refY: 12,
            fontSize: 10,
            event: "node:port-contextmenu",
          },
          primaryKey: {
            ref: "portBody",
            width: 16,
            height: 16,
            x: 130,
            y: 5,
            event: "node:port-contextmenu",
          },
        },
        position: "erPortPosition",
      });

      // 节点注册
      Graph.registerNode(
        "er-rect",
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
            rect: {
              strokeWidth: 1,
              stroke: "#249995",
              fill: "#249995",
              rx: 6,
              ry: 2,
            },
            label: {
              fontWeight: "bold",
              fill: "#FFFFFF",
              fontSize: 12,
            },
          },
          ports: {
            groups: {
              column: {
                markup: [
                  {
                    tagName: "rect",
                    selector: "portBody",
                  },
                  {
                    tagName: "text",
                    selector: "columnCode",
                  },
                  {
                    tagName: "text",
                    selector: "dataType",
                  },
                  {
                    tagName: "image",
                    selector: "primaryKey",
                  },
                ],
                attrs: {
                  portBody: {
                    width: NODE_WIDTH,
                    height: LINE_HEIGHT,
                    strokeWidth: 1,
                    fill: "#FFFFFF",
                    magnet: true,
                    stroke: "#ccc",
                    // rx: 6,
                    // ry: 2,
                  },
                  columnCode: {
                    ref: "portBody",
                    refX: 6,
                    refY: 6,
                    fill: "#5F95FF",
                    fontSize: 10,
                    event: "node:port-contextmenu",
                  },
                  dataType: {
                    ref: "portBody",
                    refX: 70,
                    refY: 6,
                    fontSize: 10,
                    event: "node:port-contextmenu",
                  },
                  primaryKey: {
                    ref: "portBody",
                    width: 16,
                    height: 16,
                    x: 130,
                    y: 5,
                    event: "node:port-contextmenu",
                  },
                },
                position: "erPortPosition",
              },
            },
          },
        },
        true
      );
      const containerRef = this.$refs.containerRef;
      const graph = new Graph({
        container: containerRef,
        virtual: true,
        background: {
          color: "#F2F7FA",
        },
        // sorting: "exact", // 节点和边视图的排序方式
        grid: {
          size: 10, // 网格大小 10px
          visible: true, // 绘制网格，默认绘制 dot 类型网格
          type: "doubleMesh",
          args: [
            {
              color: "#E7E8EA",
              thickness: 1,
            },
            {
              color: "#CBCED3",
              thickness: 1,
              factor: 5,
            },
          ],
        },
        // 是否启用画布平移能力
        panning: {
          enabled: that.canPanning,
          modifiers: ["alt"],
        },
        // Scroller 使画布具备滚动、平移、居中、缩放等能力
        scroller: {
          enabled: true,
          // pageVisible: true, // 是否分页
          // pageBreak: true, // 是否显示分页符
          autoResizeOptions: {
            minWidth: 1000,
            minHeight: 1000,
          },
        },
        // 鼠标滚轮的默认行为是滚动页面
        mousewheel: {
          enabled: true,
          // modifiers: ["ctrl", "meta"], // +按键为缩放
          minScale: 0.5,
          maxScale: 2,
        },
        snapline: true, // 对齐线
        connecting: {
          router: {
            name: "er",
            args: {
              offset: 25,
              direction: "H",
            },
          },
          snap: true, // 自动吸附
          allowBlank: false, // 是否允许连接到画布空白位置的点
          allowLoop: false, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点
          allowNode: false, // 是否允许边链接到节点（非节点上的链接桩）
          createEdge(e) {
            console.log("createEdge", that.path_d, e);
            return new Shape.Edge({
              attrs: {
                line: {
                  sourceMarker: {
                    tagName: "path",
                    // 自定义连接
                    d: that.path_d,
                    fill: "#fff",
                    stroke: "black",
                  },
                  strokeWidth: 2,
                },
              },
            });
          },
        },
        highlight: true,
        // 父节点
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
      const minimapContainer = this.$refs.minimapContainer;
      // 小地图
      graph.use(
        new MiniMap({
          container: minimapContainer,
        })
      );
      // 快捷键
      graph.use(
        new Keyboard({
          enabled: true,
        })
      );
      // 历史记录
      graph.use(
        new History({
          enabled: true,
        })
      );
      // 框选
      graph.use(
        new Selection({
          enabled: true,
          multiple: true,
          rubberband: true,
          movable: true,
          showNodeSelectionBox: true,
        })
      );

      /**
       * 布局设置
       */
      const gridLayout = new GridLayout({
        type: "grid",
        width: 738,
        height: 360,
        sortBy: "label",
        rows: 3,
        cols: 7,
        nodeSize: [100, 100],
      });
      this.gridLayout = gridLayout;

      this.data = [];
      const cells = [];

      graph.resetCells(cells);
      graph.zoomToFit({ padding: 110, maxScale: 1 });
      this.graph = graph;

      this.loadEvents(containerRef);
    },
    loadEvents(containerRef) {
      // 节点双击
      this.graph.on("node:dblclick", ({ node }) => {
        const data = node.store.data;
        console.log("n,d", data, this.circularLayout.layout(data));
        const { type, id } = data;
        // alert('节点双击')
        console.log("node:dbclick", node);
        if (type === "taskNode") {
          this.nodeId = id;
          this.showRight = true;
        } else {
          this.nodeId = "";
          this.showRight = false;
        }
      });
      // 连线双击
      this.graph.on("edge:dblclick", ({ edge }) => {
        const data = edge.store.data;
        const { type, id } = data;
        alert("连线双击");
        console.log("edge:dbclick", edge);
        if (type === "taskNode") {
          this.nodeId = id;
          this.showRight = true;
        } else {
          this.nodeId = "";
          this.showRight = false;
        }
      });
      this.graph.on("node:port:dblclick", (e) => {
        console.log("node:port:dblclick", e);
      });

      // 节点鼠标移入
      // this.graph.on(
      //   "node:mouseenter",
      //   FunctionExt.debounce(({ node }) => {
      //     // 添加删除
      //     node.addTools({
      //       name: "button-remove",
      //       args: {
      //         x: 0,
      //         y: 0,
      //         offset: { x: 140, y: 10 },
      //       },
      //     });
      //   }),
      //   500
      // );
      this.graph.on("node:port-contextmenu", ({ e }) => {
        console.log(
          "ports",
          e,
          e.currentTarget.parentElement.getAttribute("port")
        );
      });
      // 连接线鼠标移入
      // this.graph.on("edge:mouseenter", ({ edge }) => {
      //   edge.addTools([
      //     "source-arrowhead",
      //     "target-arrowhead",
      //     {
      //       name: "button-remove",
      //       args: {
      //         distance: "50%",
      //       },
      //     },
      //   ]);
      // });
      // 节点鼠标移出
      // this.graph.on("node:mouseleave", ({ node }) => {
      //   // 移除删除
      //   node.removeTools();
      // });
      // this.graph.on("edge:mouseleave", ({ edge }) => {
      //   edge.removeTools();
      // });
      this.graph.on("edge:connected", ({ isNew, edge }) => {
        console.log("connected", edge.source, edge.target);
        const { source, target } = edge;
        const link = { source, target };
        this.$emit("edgeConnected", link, "connect");
      });
    },
    loadColumns(num) {
      const nodes = [];
      for (let index = 0; index < num; index++) {
        const column = {
          id: `c${index}`,
          label: `c${index}` + "id",
          columnCode: `c${index}` + "id",
          dataType: "int",
          primaryKey: true,
        };
        const node = Object.assign(cloneDeep(defaultColumnStyle), column);
        node.position.x = random(0, index * 10);
        node.position.y = random(0, index * 10);
        node.attrs.columnCode.text = column.columnCode;
        node.attrs.dataType.text = column.dataType;
        node.attrs.primaryKey["xlink:href"] = column.primaryKey
          ? "https://antv-x6.gitee.io/icons/icon-144x144.png"
          : "";
        nodes.push(node);
      }
      const graph = this.graph;
      graph.addNodes(nodes);
    },
    loadTables(num) {
      const nodes = [];
      for (let index = 0; index < 2; index++) {
        const table = { id: `t${index}`, label: `test${index}` };
        const node = Object.assign(cloneDeep(defaultTableStyle), table);

        const locX = random(0, index * 10);
        const locY = random(0, index * 10);
        node.position.x = locX + 10;
        node.position.y = locY + 10;
        // nodes.push(node);
        const tableChild = this.graph.addNode(node)
        const parent = this.graph.addNode({
          x: locX,
          y: locY,
          width: 240,
          height: 160,
          zIndex: 1,
          label: `Parent${index}`,
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
        parent.addChild(tableChild)
        console.log("table", node);
      }
      // const graph = this.graph;
      // graph.addNodes(nodes);
    },
    loadNodes(num) {
      const nodes = [];
      for (let index = 0; index < num; index++) {
        const table = { id: `t${index}`, label: `test${index}` };
        const node = Object.assign(cloneDeep(defaultTableStyle), table);
        console.log("for-", index, node);
        node.position.x = random(0, index * 10);
        node.position.y = random(0, index * 10);

        const columns = [
          {
            id: `t${index}` + "c1",
            columnCode: `t${index}` + "id",
            dataType: "int",
            primaryKey: true,
          },
          {
            id: `t${index}` + "c2",
            columnCode: `t${index}` + "name",
            dataType: "varchar",
            primaryKey: false,
          },
          {
            id: `t${index}` + "c3",
            columnCode: `t${index}` + "test",
            dataType: "varchar",
            primaryKey: false,
          },
          {
            id: `t${index}` + "c4",
            columnCode: `t${index}` + "test",
            dataType: "varchar",
            primaryKey: false,
          },
          {
            id: `t${index}` + "c5",
            columnCode: `t${index}` + "test",
            dataType: "varchar",
            primaryKey: false,
          },
          {
            id: `t${index}` + "c6",
            columnCode: `t${index}` + "test",
            dataType: "varchar",
            primaryKey: false,
          },
        ];

        columns.forEach((e) => {
          const item = cloneDeep(defalitColumnsStyle);
          item.id = e.id;
          item.attrs.columnCode.text = e.columnCode;
          item.attrs.dataType.text = e.dataType;
          item.attrs.primaryKey["xlink:href"] = e.primaryKey
            ? "https://antv-x6.gitee.io/icons/icon-144x144.png"
            : "";
          node.ports.push(item);
        });
        nodes.push(node);
      }
      console.log("nodes", nodes);

      const graph = this.graph;
      graph.addNodes(nodes);
    },
    addTable() {
      const date = new Date().getTime();
      const table = { id: "tt1" + date, label: "test" + date };
      const node = Object.assign(defaultTableStyle, table);
      node.position.x = random(0, 500);
      node.position.y = random(0, 500);

      const columns = [
        {
          id: "c1" + date,
          columnCode: "id" + date,
          dataType: "int",
          primaryKey: true,
        },
        {
          id: "c2" + date,
          columnCode: "name" + date,
          dataType: "varchar",
          primaryKey: false,
        },
      ];

      columns.forEach((e) => {
        const item = cloneDeep(defalitColumnsStyle);
        item.id = e.id;
        item.attrs.columnCode.text = e.columnCode;
        item.attrs.dataType.text = e.dataType;
        item.attrs.primaryKey["xlink:href"] = e.primaryKey
          ? "https://antv-x6.gitee.io/icons/icon-144x144.png"
          : "";
        node.ports.push(item);
      });

      const graph = this.graph;
      graph.addNode(node);
      this.$emit("add");
    },
    // 放大
    zoomInFn() {
      this.graph.zoom(0.1);
      this.canZoomOut = true;
    },
    // 缩小
    zoomOutFn() {
      if (!this.canZoomOut) return;
      const Num = Number(this.graph.zoom().toFixed(1));

      if (Num > 0.1) {
        this.graph.zoom(-0.1);
      } else {
        this.canZoomOut = false;
      }
    },
    // 重做
    redoFn() {
      // if (!this.canRedo) return;
      this.graph.redo();
    },
    // 撤消
    undoFn() {
      // if (!this.canUndo) return;
      this.graph.undo();
    },
    // 重置
    resetFn() {
      this.graph.centerContent();
      this.graph.zoom(0);
    },
    toggle() {
      Design.toggle("dber", this, exitFullScreen, fullScreen);
      Design.toggle("dber1", this, exitFullScreen, fullScreen);
    },
    // 清除
    clearFn() {
      this.graph.clearCells();
    },
    // 导出PNG
    exportPNGFn() {
      // 网络路径引入的图片无法导出，无法通过html-to-image导出（error）
      this.graph.toPNG((dataUri) => {
        DataUri.downloadDataUri(dataUri, "dber.png");
      });
    },
    randomPosition(data) {
      const layoutScale = 0.9;
      const center = [0, 0];
      const width = window.innerWidth;
      const height = window.innerHeight;
      data.position.x = (Math.random() - 0.5) * layoutScale * width + center[0];
      data.position.y =
        (Math.random() - 0.5) * layoutScale * height + center[0];
      // data.position.x =
      return data;
    },
    gridPosition(nodes) {
      // const n = nodes.length
    },
    layout() {
      const cells = [];
      const edgesJSON = this.graph
        .toJSON()
        .cells.filter((e) => e.shape === "edge");
      const nodesJSON = this.graph.toJSON().cells.filter(
        (e) =>
          // e.shape === "port-rect" || e.shape === "er-rect" ||
          e.zIndex === 1
      );
      const data = { nodes: [], edges: edgesJSON };

      nodesJSON.forEach((item) => {
        item.x = item.position.x;
        item.y = item.position.y;
        item.width = item.size.width;
        item.height = item.size.height;
      });

      data.nodes = nodesJSON;
      const a = this.gridLayout.layout(data);
      const c = [...a.edges, ...a.nodes];
      c.forEach((item) => {
        if (item.shape === "edge") {
          cells.push(this.graph.createEdge(item));
        } else {
          cells.push(this.graph.createNode(item));
        }
      });
      this.graph.resetCells(cells);
      console.log(cells);
    },
  },
  // beforeDestroy() {
  //   this.graph.dispose()
  // }
};
</script>


<style lang="scss" scoped>
.antv-x6 {
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  .container {
    flex: 1;
  }
  .operating {
    position: absolute;
    z-index: 999;
    background-color: #ffffff;
    padding: 10px;
    box-shadow: 1px 1px 4px 0 #0a0a0a2e;
    i {
      font-size: 24px;
      cursor: pointer;
      margin: 0 10px;
      color: #515a6e;
      &:hover {
        color: #2d8cf0;
      }
      &.opacity {
        opacity: 0.5;
      }
    }
  }
}
.app-mini {
  position: fixed;
  z-index: 999;
  bottom: 20px;
  right: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.app-content {
  flex: 1;
  height: 100% !important;
  margin-left: 8px;
  margin-right: 8px;
  box-shadow: 0 0 10px 1px #e9e9e9;
}
/deep/.x6-graph-scroller {
  border: 1px solid #f0f0f0;
  margin-left: -1px;
  width: 100% !important;
  height: 100% !important;
}

// .x6-cell .x6-node,x6-port-column,
</style>
