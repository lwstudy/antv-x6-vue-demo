# antv-x6-vue-demo
- Vue实现Antv X6中的示例，以及一些开发场景
> 使用脚手架（自动生成接口、路由）实现一些x6在vue2中的实例写法
已实现ER、 BPMN、 UML、 思维导图、 自定义功能


#### 介绍
antv/X6学习与实例


### ER图---完善为db数据库图表
![avatar](/img/dber.jpg)
### ER图---er图增加布局等
![avatar](/img/laydber.jpg)
### ERV2图---x6-V2.x 
- 增加tooltip
![avatar](/img/dber-v2(tooltip).jpg)
- 增加右键菜单
![avatar](/img/dber-v2(rightmenu).jpg)
- 全屏处理
![avatar](/img/dber-v2(full).jpg)
- 一对多自定义连线
![avatar](/img/dber-v2(1...n).jpg)
- 画布移动与节点选择切换
- 大数据量demo测试（配合可视化区域内节点可以在3000个节点时依然能够操作）
- 仅加载可视化区域内的节点
### BPMN图---实现当前节点和通过节点的高亮，以及驳回边的智能处理
![avatar](/img/bpmn.png)
### 拖拽绘制BPMN图（Stencil基于dnd拖拽封装的插件实现UI组件）
![avatar](/img/bpmn.png)
### UML图
![avatar](/img/uml.jpg)
### 思维导图
![avatar](/img/swdt.jpg)
### 自定义流程图（vue-shape）
![avatar](/img/home.jpg)
### 自定义散点图（vue-shape）
![avatar](/img/points.jpg)
### 散点关系图谱（vue-shape）
![avatar](/img/tech.jpg)
### circle关系图谱（内置shape）
![avatar](/img/circle.jpg)
## 项目安装启动
```
npm install
# 或者yarn
```

### 编译运行开发环境
```
npm run serve
```

### 编译部署生产环境
```
npm run build
```

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


#### 特技

1.  使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
