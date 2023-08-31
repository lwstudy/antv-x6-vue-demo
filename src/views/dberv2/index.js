
import PortToolTip from "./components/PortToolTip.vue";
import RightMenu from "./components/RightMenu.vue";
import { Graph, Shape, DataUri } from "@antv/x6";
import { cloneDeep, random } from "$ui/utils/util";
import { fullScreen, exitFullScreen, isFullScreen } from "$ui/utils/bom";
import Design from "@/utils/design";
import { GridLayout, CircularLayout, DagreLayout } from "@antv/layout";
import { MiniMap } from "@antv/x6-plugin-minimap";
import { Keyboard } from "@antv/x6-plugin-keyboard";
import { History } from "@antv/x6-plugin-history";
import { Selection } from "@antv/x6-plugin-selection";

import Register from './register'

// 三叉箭头
const multi_path_d = 'M17,0 L2,0  M25,0 A4,4 0 1 0 17,0 A4,4 0 1 0 25,0 Z  M2,-10 L17,0 L2,8'
// 起点-圆
const one_path_d = 'M23,0.5 L16.5,0.5 M8,0.5 L1,0.5   M8,0.5 A4,4 0 0,1 16,0.5 A4,4 0 0,1 8,0.5'

const LINE_HEIGHT = 24;
const NODE_WIDTH = 150;
const defaultTableStyle = {
  id: "",
  label: "",
  ports: [],
  height: 24,
  width: 150,
  shape: "physics-rect",
  position: {
    x: "",
    y: "",
  },
};

const defaultLogicTableStyle = {
  id: "",
  label: "",
  ports: [],
  height: 24,
  width: 150,
  shape: "logic-rect",
  methods: '',
  position: {
    x: "",
    y: "",
  },
};

const defalitColumnsStyle = {
  id: "",
  group: "column",
  attrs: {
    columnsCode: { text: "" },
    dataType: { text: "" },
    primaryKey: {},
  },
};
export default {
  name: "er",
  components: { RightMenu, PortToolTip },
  props: {
    // 图像是否可操作
    disabled: {
      type: Boolean,
      default: false
    },
    // 节点新增
    addNode: {
      type: Boolean,
      default: false
    },
    // 模型类型
    modelType: {
      type: String,
      default: ''
    },
    // 关联类型
    connectType: {
      type: Boolean,
      default: false
    }
  },
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
      gridLayout: null,
      circularLayout: null,
      dagreLayout: null,
      nodeNum: 10,
      menu: {
        visible: false,
        position: {
          clientX: 0,
          clientY: 0,
        },
      },
      tooltip: {
        visible: false,
        position: {
          clientX: 0,
          clientY: 0,
        },
        content: {},
      },
      tags: [
        {
          id: 1,
          title: "标签1",
        },
        {
          id: 2,
          title: "标签2",
        },
      ],
      magnet: true,
      path_d:
        "M30.8,-0.5 L16.5,8.3 L16.5,-9.1 L30.8,-0.5 Z M40.5,-0.5 A4,4 0 0 1 31.5,-0.5 A4,4 0 0 1 40.5,-0.5 M16.7,-5.5 0.999,-5.5 M16.9,4.5 L0.899,4.6 M16.9,-0.5 L0.899,-0.5",
      tableList: []
    };
  },
  watch: {
    nodeNum(e) {
      if (this.graph) {
        this.loadNodes(e);
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
      // TODO:this.graph.centerContent()  将画布内容中心与视口中心对齐。
      const that = this;
      // port相对节点位置
      Register.registerErPortPosition()
      // 根据模型类型进行节点注册
      Register.register()

      const containerRef = this.$refs.containerRef;
      const graph = new Graph({
        container: containerRef,
        virtual: true,
        autoResize: true, // 适应全屏-可视化区域画布
        // 交互限制
        // interacting: function (cellView) {
        //   // 是否触发连线交互
        //   return {magnetConnectable: that.magnet}
        // },
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
          enabled: true,
          // modifiers: ["alt"],
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
                    d: one_path_d,
                    fill: "#fff",
                    stroke: "black",
                  },
                  targetMarker: {
                    tagName: "path",
                    // 自定义连接
                    d: multi_path_d,
                    fill: "#fff",
                    stroke: "black",
                    strokeWidth: 2,
                  },
                },
              },
            });
          }
        },
        highlight: true,
        // 高亮
        highlighting: {
          // 当连接桩可以被链接时，在连接桩外围渲染一个 2px 宽的红色矩形框
          magnetAvailable: {
            name: "stroke",
            args: {
              padding: 4,
              attrs: {
                strokeWidth: 2,
                stroke: "red",
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
          multiple: true, // 多选
          strict: true,
          rubberband: true, // 是否启用框选节点功能
          movable: true,
          showNodeSelectionBox: true, // 是否显示节点的选择框
          showEdgeSelectionBox: true, // 是否显示边的选择框
        })
      );

      /**
       * 布局设置
       */
      // 网格布局
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
      // 环形布局
      const circularLayout = new CircularLayout({
        type: "circular",
        center: [350, 250],
      });
      this.circularLayout = circularLayout;
      // 组织架构布局
      const dagreLayout = new DagreLayout({
        type: "dagre",
        rankdir: "LR",
        align: "UR",
        ranksep: 35,
        nodesep: 15,
      });
      this.dagreLayout = dagreLayout;


      this.data = [];
      const cells = [];

      graph.resetCells(cells);
      graph.zoomToFit({ padding: 110, maxScale: 1 });
      this.graph = graph;

      // // 监听历史版本
      this.graph.on("history:undo", ({ cmds, options }) => {
        console.log("history:undo", cmds, options);
      });
      this.loadEvents(containerRef);
    },
    loadEvents(containerRef) {
      // 点击空白---实体/表时新增节点
      // this.graph.on("blank:click", ({ e, x, y }) => {
      //   console.log("blank:click", e, x, y);

      // });
      // 节点右键菜单
      this.graph.on("node:contextmenu", ({ e, x, y, cell, view }) => {
        // console.log("node:contextmenu", e, x, y, cell, view);
        this.menu = {
          visible: true,
          mark: cell.id, // 把当前id传入
          position: {
            clientX: e.clientX,
            clientY: e.clientY,
          },
        };
      });
      // tooltip-node关闭
      this.graph.on("node:mouseleave", ({ e, x, y, cell, view }) => {
        // console.log("node:mouseleave", e, x, y, cell, view);
        this.tooltip = {
          visible: false,
        };
      });
      // tooltip-node开启
      this.graph.on("node:mouseenter", ({ e, x, y, cell, view, node }) => {
        // console.log("node:mouseenter", e, x, y, cell, view);
        const content = this.tableList.find((item) => item.id === node.id)
        content.type = 'table'
        this.tooltip = {
          visible: true,
          mark: cell.id, // 把当前id传入
          position: {
            clientX: e.clientX,
            clientY: e.clientY,
          },
          content,
        };
      });
      // tooltip-port关闭
      this.graph.on("node:port:mouseleave", ({ e, x, y, cell, view }) => {
        // console.log("node:port:mouseleave", e, x, y, cell, view);
        this.tooltip = {
          visible: false,
        };
      });
      // tooltip-port开启
      this.graph.on("node:port:mouseenter", ({ e, x, y, cell, view, node, port }) => {
        // console.log("node:port:mouseenter", e, x, y, cell, view, port);
        const table = this.tableList.find((item) => item.id === node.id)
        const content = table.columnsList.find((item) => item.id === port) || {};
        content.type = 'column'
        this.tooltip = {
          visible: true,
          mark: port, // 把当前id传入
          position: {
            clientX: e.clientX,
            clientY: e.clientY,
          },
          content,
        };
      });

      // 节点双击
      this.graph.on("node:dblclick", ({ node }) => {
        const data = node.store.data;
        const { type, id } = data;
        // alert('节点双击')
        // console.log("node:dbclick", node);
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
        // console.log("edge:dbclick", edge);
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
      this.graph.on("edge:connected", ({ isNew, edge }) => {
        // console.log("connected", edge.source, edge.target);
        const { source, target } = edge;
        const link = { source, target };
        this.$emit("edgeConnected", link, "connect");
      });
    },
    loadNodes(num) {
      this.tableList = []
      const nodes = [];
      for (let index = 0; index < num; index++) {
        const table = { id: `t${index}`, label: `test${index}`, tableCode: `test${index}`, columnsList: [] };
        const node = Object.assign(cloneDeep(defaultTableStyle), table);
        node.position.x = random(0, index * 10);
        node.position.y = random(0, index * 10);

        const columnsList = [
          {
            id: `t${index}` + "c1",
            columnsCode: `t${index}` + "id",
            dataType: "int",
            primaryKey: true,
          },
          {
            id: `t${index}` + "c2",
            columnsCode: `t${index}` + "name",
            dataType: "varchar",
            primaryKey: false,
          },
          {
            id: `t${index}` + "c3",
            columnsCode: `t${index}` + "c3",
            dataType: "varchar",
            primaryKey: false,
          },
          {
            id: `t${index}` + "c4",
            columnsCode: `t${index}` + "c4",
            dataType: "varchar",
            primaryKey: false,
          },
          {
            id: `t${index}` + "c5",
            columnsCode: `t${index}` + "c5",
            dataType: "varchar",
            primaryKey: false,
          },
          {
            id: `t${index}` + "c6",
            columnsCode: `t${index}` + "c6",
            dataType: "varchar",
            primaryKey: false,
          },
        ];
        table.columnsList = columnsList
        this.tableList.push(table)

        // 表高度
        node.height = (columnsList.length+1)*LINE_HEIGHT

        columnsList.forEach((e) => {
          const item = cloneDeep(defalitColumnsStyle);
          item.id = e.id;
          item.attrs.columnsCode.text = e.columnsCode;
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
          columnsCode: "id" + date,
          dataType: "int",
          primaryKey: true,
        },
        {
          id: "c2" + date,
          columnsCode: "name" + date,
          dataType: "varchar",
          primaryKey: false,
        },
      ];

      columns.forEach((e) => {
        const item = cloneDeep(defalitColumnsStyle);
        item.id = e.id;
        item.attrs.columnsCode.text = e.columnsCode;
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
    togglePanning() {
      this.graph.togglePanning();
      this.graph.toggleSelection()
    },
    layout() {
      const cells = [];
      const edgesJSON = this.graph
        .toJSON()
        .cells.filter((e) => e.shape === "edge");
      const nodesJSON = this.graph
        .toJSON()
        .cells.filter((e) => e.shape === "physics-rect");
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
    // 关闭当前
    close(id) {
      const index = this.tags.findIndex((item) => item.id === id);
      index !== -1 && this.tags.splice(index, 1);
    },
    // 关闭其他
    closeOther(id) {
      const index = this.tags.findIndex((item) => item.id === id);
      const currentItem = [this.tags[index]];
      this.tags = currentItem;
    },
    // 关闭所有
    closeAll() {
      this.tags = [];
    },
    // 将节点/边的中心与视口中心对齐。
    centerCell() {
      this.graph.centerCell()
    },
    // 选择节点/边
    select() {
      this.graph.select()
    }
  },
  beforeDestroy() {
    this.graph.dispose()
  }
};


