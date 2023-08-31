const { Graph, ToolsView, EdgeView } = require('@antv/x6');
const Vue = require('vue');
const Tooltip = require('./index.vue');

// Tooltip
class TooltipTool extends ToolsView.ToolItem {
  constructor(cellView, options) {
    super(cellView, options);
    this.knob = null;
    this.tooltipApp = null;
  }

  render() {
    if (!this.knob) {
      this.knob = ToolsView.createElement('div', false);
      this.knob.style.position = 'absolute';
      this.container.appendChild(this.knob);
    }
    return this;
  }

  toggleTooltip(visible) {
    let tooltip = this.options.tooltip; // 接收使用时传入的内容
    if (this.tooltipApp) {
      this.tooltipApp.unmount(this.knob);
      this.tooltipApp = null;
    }
    if (visible) {
      this.tooltipApp = new Vue({
        render: function (h) {
          return h(Tooltip, {
            props: {
              visible: visible,
              content: tooltip,
            },
          });
        },
      });
      this.tooltipApp.mount(this.knob);
    }
    console.log(this.tooltipApp);
  }

  onMosueEnter({ e }) {
    this.updatePosition(e);
    this.toggleTooltip(true);
  }

  onMouseLeave() {
    this.updatePosition();
    this.toggleTooltip(false);
  }

  onMouseMove() {
    this.updatePosition();
    this.toggleTooltip(false);
  }

  delegateEvents() {
    this.cellView.on('cell:mouseenter', this.onMosueEnter, this);
    this.cellView.on('cell:mouseleave', this.onMouseLeave, this);
    this.cellView.on('cell:mousemove', this.onMouseMove, this);
    return super.delegateEvents();
  }

  updatePosition(e) {
    const style = this.knob.style;
    if (e) {
      const p = this.graph.clientToGraph(e.clientX, e.clientY);
      style.display = 'block';
      style.left = `${p.x}px`;
      style.top = `${p.y}px`;
    } else {
      style.display = 'none';
      style.left = '-1000px';
      style.top = '-1000px';
    }
  }

  onRemove() {
    this.cellView.off('cell:mouseenter', this.onMosueEnter, this);
    this.cellView.off('cell:mouseleave', this.onMouseLeave, this);
    this.cellView.off('cell:mousemove', this.onMouseMove, this);
  }
}

TooltipTool.config({
  tagName: 'div',
  isSVGElement: false,
});

// 注册工具
Graph.registerEdgeTool('tooltip', TooltipTool, true);
Graph.registerNodeTool('tooltip', TooltipTool, true);
