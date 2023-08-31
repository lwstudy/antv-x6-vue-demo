<template>
  <div class="html-basic-app">
    <div class="app-content" ref="containerRef"></div>
  </div>
</template>

<script>
import { Graph, Shape } from "@antv/x6";

export default {
  data() {
    return {};
  },
  mounted() {
    Shape.HTML.register({
      shape: "custom-html",
      width: 160,
      height: 80,
      html() {
        const div = document.createElement("div");
        div.className = "custom-html";
        return div;
      },
    });

    const containerRef = this.$refs.containerRef;
    const graph = new Graph({
      container: containerRef,
      background: {
        color: "#F2F7FA",
      },
    });

    graph.addNode({
      shape: "custom-html",
      x: 60,
      y: 100,
    });
  },
};
</script>

<style lang="scss">
.html-basic-app {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0;
  font-family: sans-serif;

  .app-content {
    flex: 1;
    height: 100%;
    margin-right: 8px;
    margin-left: 8px;
    box-shadow: 0 0 10px 1px #e9e9e9;
  }

  .custom-html {
    width: 100%;
    height: 100%;
    background: #333232;
    border-radius: 1em;
    box-shadow: 0 0.125em 0.3125em red, 0 0.02125em 0.06125em red;
    perspective: 600px;

    &::before {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 50%;
      background: #333232 linear-gradient(180deg, red 50%, red);
      border-radius: 0 0 1em 1em;
      transform: rotateX(180deg);
      transform-origin: center top;
      transition: 0.7s ease-in-out transform;
      content: " ";
    }

    &:hover::before {
      transform: rotateX(0);
    }
  }
}
</style>
