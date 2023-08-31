
import { cloneDeep } from "$ui/utils/util";
import { Graph, ObjectExt, Shape, FunctionExt, DataUri } from "@antv/x6";

// 三角三叉
const triangle_path_d =
  "M30.8,-0.5 L16.5,8.3 L16.5,-9.1 L30.8,-0.5 Z M40.5,-0.5 A4,4 0 0 1 31.5,-0.5 A4,4 0 0 1 40.5,-0.5 M16.7,-5.5 0.999,-5.5 M16.9,4.5 L0.899,4.6 M16.9,-0.5 L0.899,-0.5";


// 五种箭头图片
// 0   0,1
const marker_1 = {
  tagName: "image",
  "xlink:href":
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAASCAYAAAAkAezhAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALmSURBVEhLxVfPaxNREJ63u2kotMWqhaIHf3QNmouCB08VxYsnEYp6F2NCgv0PbIP+AUJLStqKnrUUxJsHUejJm16qtKknPdWmpemvNNkdv3m7CQiNTd9W/OBl5s3Me/kyb3bfRNEh4myxeMMi7x4pGsT0ZGCln8Q055P96nsm8z60RcahEB94XnCVr6aJ+Vpo2htKfWSLU0sPcqXQYgwrlMZITE8MKk99CkjzMjIxYrF9qaNO3TJEF5v4JEZiZU243BiRMq4zLaSJj2KrWarW75eGh9dD9x9wx8Z6KO68QOwQYsts85UomY9E3J2a+BBkWs2W0tk7MHHgaQnlTk7MaPIom9LD7PXQfmAYl4o8iI3ykEzDtB9pAQexQdnoPQxhTFy/PQBFarxVeewFiZU1otvKv6uNBmiWyumXz4702MdqW2tr9VK5XKN83g9de8KdLHyFOC8P30Im8yWwtodEsXjRV95nqN+2yLl8vHNd/druYWtzk53eXnYqFe7o7+fO1VXuTiS4b3mZZ+bnmUZHGSWmT7ZJ/NxkoQbhBDMNIS62GiJrCKxrXWm9xkxnMLflzTGfy21AbxvJQqFr16EK1IpS9AMFdCHwtAdW1s1GqcjPkI2EQBW6Bym+OEYXiPZC9mGcQOApfJELm415dDBt43MDKdyE3MLAXO1AVuHchZTkSdKEkySTiX3krxXyeSuZTDrOzk5sfWUl5th2LBaPO9gtZlE1hsN5hz0GopZKKZ07ULYbaE18H7jFwhRWp7DByGI69zQ0twWU5WOc6hM8pFOL6Ww6NB8Ixm8V6T1E4twe6culTUisrBHdY+u1NhrAmLhumHCJ4ND6ghuxrdNTQSzWYG2UpsuYuEAaJpAoQxuSG/FvmRdf89aUK1+vNYdxjTcgDZPv0xsQQr8iTZYaV2y/dTxvSfx12x5g5d0KygOZBmnLotsLqeyc3sAQkYkL/kdbeyjEG5DeQ65xZPcqpv/wjwTRb07mPGKRCfliAAAAAElFTkSuQmCC",
  width: 25,
  height: 25,
  x: -3,
  y: -12.5,
};
// 0-N    0,n
const marker_2 = {
  tagName: "image",
  "xlink:href":
    "data:image/png;base64,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",
  width: 25,
  height: 25,
  x: -3,
  y: -13,
};
// 1    十字---1,1
const marker_3 = {
  tagName: "image",
  "xlink:href":
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAYCAYAAADtaU2/AAAAAXNSR0IArs4c6QAAAchJREFUSEvFlsFKw0AQhv9NkyZtrFKhitqDB4vgwYsvIL6DfYQuuOIz5C54EFuJHgSPfQj1BQRPHrrepFrtIWJJY9K0K1tr7NUI656GYXY+/pnd2SX4p0XSctfPT3eEEFrr6fUKjjP6bZ7U4IpbDwBYIhxaDwcHoUrwBwDTKJbM+2o1Ugg+CQGSnYWevaV0oA581gghxD+A3bosr7Hy3DVuHCdWp9ity/LqvFjSUa0OFYIbMSAy/LmbUX2dpEqN1/Y0ECLUKT5rjCAE4ZSlmgVk+/pa77VaJCgWkwRRp5PYcaEwtmPP+/KVyxh5HrER+1JpzvILwCLiXi/ZM7SsH9v3CeaBkW8mPs0OBam49RcAC78t1R/j2xL8CEIWIOS4ne6VtJPWfRvTvcyPeytEH0ng9/5x2FTsJBeZ+AR5StUfOI5WWSrJwzXklOlp1KcC7zabmTuvK4dGzCkzlIHlgWy37uUAGXDKssrAW65rvCOOABFxum8qA280m9mB15VvcMgps5SB146PTWJm5Hv8wSnLKQOvXlxYRtSXP5CAU5ZXBi4fHeVytinvb59TZisDL7tu/mtkwuc1NqMMvHl5aAdB/m2ieC4N+BN64bzhAb3H7AAAAABJRU5ErkJggg==",
  width: 20,
  height: 12,
  x: -4,
  y: -6.5,
};
// 1-n   三叉+杠   1,n
const marker_4 = {
  tagName: "image",
  "xlink:href":
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAoCAYAAACWwljjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAVWSURBVFhHzVhtbBRFGJ7Z7bVCWklFTCvGGHt3lSsEkfhDJcaGH340GBMFNWpCxOu2d22pyA+0KZxoIDUSa3tfe9BE/COp/DEYfhA/SmIMiVZMwMp9UDQaW2njYRtKr7e74zO7249rr1/Xu9YnmZt5Z9+beeZ9331nZsn/Fltl2WI2VxSU/3Ayw0Tp1gg5J+bd9m54z55h/ekKQOA/QwJ7AmQcYPeWpiTC1pD3NXTrZJcbE5NaA4EtRGTtlLHHzK7v8LQ+Wu3+2ZSXBdOtQO2hwKuMsRZCWCkjRBWoII8It5r/fGPfP6ZOTpHWLda2ttvJKvEg1UgDRB7sg4TRpmj/9RPE44F3c4c548QabHNQKrahuZ3LjJFuItK6mNN1gcu5wIIC1xr0vUApOwb1eyFqhJFPFTF54Jqz8W9DI3PYZd8PqAq0hPpwrKEhob9l8yFW4z59k1g2EErfhziGZezO0yxhW8i3Fy7MM7QyA+K0AmWTUlSkG2dBhDj+kqSRaLWrmRF1I8QzKGswWqut9K6LZbKvUlfKDDqRvOFh8FoEoXHEpIarUcn9LBXEKowVxRo3CpR+bZX9p6zHj99jqi0CqVGzaELjiDhrzrKEsokS1kSYNoL6RaolrthD/rcdnZ35ptoCwHRG+SUlmVloKngQRqS6I5pCN1BGOgkVViOHHUnGBy/bg95nTLV5YBBaFY/rhFLttUSUI5aQpNrRrDB6yBlqoY2R1129pjwDNtk3hsqy3u6wdFVWKkuy0HSEJfe30b6BBxmhb0L8F2UHS7JfMOnhu2V5ta40G86f16usEtLh8SgxydWqCMly2P8T9PB4ai6kSo8tFHhe10mF7qUuhyP7LksHa9D7CCW0HTNtNbu+ghkaok73r1yA9RRUIiwr8m0p54R0eDyCrXSdE+tHYmV3oicJc7Txs5emjN6ALCDHCUi8RoRnHSz9uPZQaC2jynvYE51QEEGwD8oleERnELLKvkFUxYaUgsnBqdmcZcLFYuogTBMeitXWXpwa1GCsB/n0wv9nFE5kNjJY3UTB+FMKP66kK6mgyYRe6QIH/Gy2CDl0iA+UCmOiJcEeCKxngvoBBnsZIp/7N5T7UBi2I33+9KvNMvhWMhYf2IfJmiAWYmUjWGDLGiZ+OESUm+jTQIh7SHdJTmGT/VV8KwGZoxALYYLTapI5YtWuw919faOG1qT1c0bo/mDQhhzzJbzBiw2TXhYEYTsuDTuv1dX9bqqZmIyGrBNy+HyFOAUeFal6CWIVproBqzRG+65vCTtrvzG0DOx08JuXjtxYyBoKvJLMI2GMfgDFgizRQSyqHVb5mG8pptoEBnp6ZhDKSlDzOx0VNH4Z2KZ3MHJBJVp9b039j7o8C/iNGUGNIzEdQ2Is4H1LstADJ71rbSF/gAgaP6hvwzL7sW/tjta4H52PTArYZFrKjFBnp2iX/W51lESQKGsopSrIHCMJtTwiuU5CY8IFc+FWcbHpoSW8Zbag93FbfLCbEebFQHeg6xxl6uaY5N6PE+SQobUwjPXDoDoyIMQP8Mgpn8HfXTDAZnT1CoL4HBLakxGp/oqhtTiMX30w3sIJ4VpdYJe97/ADPP74El4DnmWbk/kDFWFnzRemWobg6YhiU6cT3w3mfMusJ3w7qEo/ApEyvpcxjX3OVLL/qtv9h6mSdaQlVO73l6sia8XDp7gMe14igtAQc9bCXblFCqHyjpYiTSlqxl63F4/yQSQOnx6MFK8LkF27VFMtpxgnNOO7EPJJByViU0SS+MFt2aATKgv5nxYYO8vbIPM9btr1MUn6icsrBhxhT9lX8NuiAUL+A/y1AFnxSfcQAAAAAElFTkSuQmCC",
  width: 20,
  height: 20,
  x: -6,
  y: -10.5,
};

// 逻辑模型多对多 1对N  三角圆
const marker_mul_1 = {
  tagName: "image",
  "xlink:href":
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAATCAYAAADiQ08DAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJgSURBVEhLvZY/aBNRHMd/73KCiIoi1j9BDZhL0lZcMnUTwdGxLnG0ObwDlzo6nG4OdcpdcncVoTqVTk5OVnBycHAJ9VIxQ4lotEqhqEnufv7e9RGwTST0XfzAce/9fj/effn9eRzIkPPsJiAysR0LinjvC0S4oHlOlPOcJWFKHCmBnIZuMkA4qLk25mvOTWFODGmBnEA3bpQ+tVOo4EOe0SnXPS9c0iQikGNZVhSUzfQBTGW6LGzmXLtFtpHPz3qV6UK1mhHbPlINzssal3gAea9aijB6Rl9YaZTNWWHeA2X8HSJepo6uk5wjZDpHz8K6bt6NA2TgAsVyKDnXWeJx9L4lTH2yrr1BAlfEtk/WdT7nvOojsd0/owiMoauISt7k8dOLdpabLvn+Kdp3Yv8ASHx8dmI9+E8Yw0A3MyqoZzshvNc8+8vvqHOf7PMiYhCB5tuTbOQsDGFYDw6jsFi7Hobhc1q2GVPmg/Ltpzuev9G8yhu6vu6MbUh2U3TdQ1vQ26Sh+ZlutU+20hMzdNE/aZSNuOS74SWmQWH/pcRazXlB4rZTDK7SRB9/ZVm9YM54TdN7sVCrzYiwPlnP9hiDj3w91gzmXWc2Alymjz2mO3LPFF9ZXVU3gnqXDlgDptyDCI8iwwoD9quhGyd4zFgETi3bh7vfYZOWW6WyMWExFu14BqP5lWuAio6A24Dqg3Vd/yBccgwaMPpxeMntBd8pCpMUifUg/1GIBSPUeVbX5oy3wiWFdIlDUI+p0PtKqfxGE3mG33nCnQjSGUxB7wdTWJGydjppcdJQvy2I5ZgA+AMw8Ptppp1X4gAAAABJRU5ErkJggg==",
  width: 30,
  height: 30,
  x: 0,
  y: -15,
};

// 逻辑模型多对多 N对N  三叉三角圆 
const marker_mul_N = {
  tagName: "image",
  "xlink:href":
    "data:image/png;base64,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",
  width: 30,
  height: 30,
  x: 0,
  y: -15,
};
// arrow
const markerArrow = {
  tagName: "image",
  "xlink:href":
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHsSURBVEhL7ZVNSxtBGMefmc17UBOUlCjFaFIKe/XL9OKhh9jSFgRBLKVivkEgJiSph5z7XdqrJz335kJLtckm8/Q/yc6KmNLNew7+4Mmzz2yY+Q2zM0OTUqhUovlm/YNXTh3p5ZHJtUqxvljUuhakzr3mqSO8HBgtZrUzRSH4BOXWoJXo6s37kfsKQuBO78UIYuyLGRYmmGu1YmH3rsg8XMwwd8G+WOf3AZPQS7k5aP03cxMcVcwwc0FfTECMg4sZpiZYKkmybbHnOP0TRgzE/kBMjSWm8cx+4BtFp9hGg+NLMDIKgX4lfvH48P2QrMMHxTcZVSpMpNaYOeG1j0sWXT5DziA2EOsYII2cwkiryCt4n0TW48QQUQTGphDCCGJOpBBdhIui5xvnyuWUlYgcoeEQpe5wJLpdyoqIy5YllXQ7HLZS6lenwyHLUrLd5ghy6PaWb3RO/+RE0lZxx+Hv6bSiy0vG0mqxR/iChq1qdT0eoWPMBddXf8aBmPsxk6/XM0KqjxB9i3/Fvebh4Fq5Oninl2nq/HfW281mNkzdT3gsIvR385hFChrytdpzGeLPOB9fo9Qf9z3LIGh4eXGx01PuKTbcPkq9A5dL0LDbaLyQsneGO/qVEELOSnBiCo2GXfhS++qVTywZRH8BscyjjJ6bHIAAAAAASUVORK5CYII=",
  width: 20,
  height: 20,
  x: -2,
  y: -9.5,
};
// 概念模型 一对一到多对多
const marker = {
  '1': marker_1,
  '2': marker_2,
  '3': marker_3,
  '4': marker_4
}

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


function registerErPortPosition() {
  return Graph.registerPortLayout(
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
}

function register() {
  conceptRect()
  logicRect()
  physicsRect()
}


function conceptRect() {
  Graph.registerNode(
    "concept-rect",
    {
      inherit: "rect",
      markup: [
        {
          tagName: "rect",
          selector: "body",
        },
        {
          tagName: "rect",
          selector: "line-rect",
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
          fill: "#FFFFFF",
          magnet: true,
          rx: 2,
          ry: 2,
        },
        "top-rect": {
          fill: "#249995",
          magnet: true,
          strokeWidth: 0.5,
          width: NODE_WIDTH,
          height: 5,
          refY: -5,
        },
        label: {
          fontWeight: "bold",
          fill: "#333333",
          fontSize: 12,
          refX: 80,
          refY: 12,
          textWrap: {
            width: NODE_WIDTH-5,
            height: 20,
            ellipsis: true,
          },
        },

      },
    },
    true
  );
}

function logicRect() {
  Graph.registerNode(
    "logic-rect",
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
        }
      ],
      attrs: {
        rect: {
          strokeWidth: 1,
          stroke: "#249995",
          fill: "#249995",
          magnet: true,
          rx: 2,
          ry: 2,
        },
        label: {
          fontWeight: "bold",
          fill: "#ffffff",
          fontSize: 12,
          refX: 80,
          refY: 12
        }
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
                selector: "columnsCode",
              },
              {
                tagName: "text",
                selector: "dataType",
              },
              {
                tagName: "image",
                selector: "primaryKey",
              },
              {
                tagName: "text",
                selector: "indexKeyCode",
              },
            ],
            attrs: {
              portBody: {
                width: NODE_WIDTH,
                height: LINE_HEIGHT+0.3,
                strokeWidth: 2,
                fill: "#F2F7FA",
              },
              columnsCode: {
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
              // 索引
              indexKeyCode: {
                ref: "portBody",
                refX: 6,
                refY: 6,
                fill: "red",
                fontSize: 10,
              }
            },
            position: "erPortPosition",
          },
        },
      },
    },
    true
  );
}

function physicsRect() {
  Graph.registerNode(
    "physics-rect",
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
          magnet: true,
          rx: 2,
          ry: 2,
        },
        label: {
          fontWeight: "bold",
          fill: "#ffffff",
          fontSize: 12,
          refX: 80,
          refY: 12,
          textWrap: {
            width: NODE_WIDTH-5,
            height: 20,
            ellipsis: true,
          },
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
                selector: "columnsCode",
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
                height: LINE_HEIGHT+0.3,
                strokeWidth: 2,
                fill: "#F2F7FA",
                zIndex: -1,
              },
              columnsCode: {
                ref: "portBody",
                refX: 6,
                refY: 6,
                fill: "#5F95FF",
                fontSize: 10,
                event: "node:port-contextmenu",
                textWrap: {
                  width: 50,
                  height: 20,
                  ellipsis: true,
                },
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
}


export default {
  registerErPortPosition,
  register
}
