/**
 * Excel 文件读写模块
 * @module $ui/utils/excel
 */

import XLSX from 'xlsx';

function setAutoWidth(ws, data) {
  /* set worksheet max width per col */
  const colWidth = data.map(row => row.map(val => {
    /* if null/undefined */
    if (val === null) {
      return {wch: 10};
      /* if chinese */
    } else if (val.toString().charCodeAt(0) > 255) {
      return {wch: val.toString().length * 2};
    } else {
      return {wch: val.toString().length};
    }
  }))
  /* start in the first row */
  const result = colWidth[0];
  for (let i = 1; i < colWidth.length; i++) {
    for (let j = 0; j < colWidth[i].length; j++) {
      if (result[j].wch < colWidth[i][j].wch) {
        result[j].wch = colWidth[i][j].wch;
      }
    }
  }
  ws['!cols'] = result;
}

function jsonToArray(key, jsonData) {
  return jsonData.map(v => key.map(j => {
    return v[j]
  }));
}

// fix data,return string
function fixData(data) {
  let o = ''
  let l = 0
  const w = 10240
  for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
  return o
}


// get head from excel file,return array
function getHeaderRow(sheet) {
  const headers = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  let C
  const R = range.s.r
  /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
    const cell = sheet[XLSX.utils.encode_cell({c: C, r: R})]
    /* find the cell in the first row */
    let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}

/**
 * 导出文件
 * @param {array} key 列标识数组
 * @param {array} title 列文本数组
 * @param {array} data 行数据
 * @param {string} fileName 导出文件名，不含扩展名
 * @param {boolean} autoWidth 是否设置自动列宽度
 * @return {Promise<any>}
 */
export const write = ({key, data, title, fileName, autoWidth}) => {
  return new Promise(resolve => {
    const wb = XLSX.utils.book_new();
    const arr = jsonToArray(key, data);
    arr.unshift(title);
    const ws = XLSX.utils.aoa_to_sheet(arr);
    if (autoWidth) {
      setAutoWidth(ws, arr);
    }
    XLSX.utils.book_append_sheet(wb, ws, fileName);
    XLSX.writeFile(wb, fileName + '.xlsx');
    resolve()
  })
}

// 获取table的行数据
function addTableRow(obj, arr) {
  Array.prototype.forEach.call(obj.rows, r => {
    const row = [];
    Array.prototype.forEach.call(r.cells, c => {
      row.push(c.innerText + '\x0a')
    })
    arr.push(row)
  })
  return arr;
}

// 判断是el-table的表格还是 table标签，并获取行数据
function getTableData(table) {
  if(!table) {
    throw new Error('表格类型错误')
  }
  let arr = [];
  const headerEl = table.querySelector('.el-table__header');
  const bodyEl = table.querySelector('.el-table__body');
  if(headerEl && bodyEl) {
    arr = addTableRow(headerEl, arr)
    arr = addTableRow(bodyEl, arr)
  } else if(table instanceof HTMLElement && table.tagName === 'TABLE') {
    arr = addTableRow(table, arr)
  } else {
    throw new Error('表格类型错误')
  }
  return arr;
}

/**
 *
 * @param {Array|Object} tables 表格数组或者对象， 必须是table标签或者el-table的 $el
 * @param {Array|String} sheetNames 表名数组或字符串
 * @param {String} fileName 文件名
 * @param {autoWidth} autoWidth = true
 */
export const writeFromTable = ({tables, sheetNames, fileName, autoWidth = true}) => {
  return new Promise((resolve) => {
    const wb = XLSX.utils.book_new();
    // 可以传数组（生成多表excel文件)或对象（单表excel文件)
    if(tables instanceof Array && sheetNames instanceof Array) {
      tables.forEach((table, idx) => {
        const arr = getTableData(table);
        const ws = XLSX.utils.aoa_to_sheet(arr)
        if(autoWidth) {
          setAutoWidth(ws, arr)
        }
        XLSX.utils.book_append_sheet(wb, ws, sheetNames[idx])
      })
    } else {
      const arr = getTableData(tables);
      const ws = XLSX.utils.aoa_to_sheet(arr)
      if(autoWidth) {
        setAutoWidth(ws, arr)
      }
      XLSX.utils.book_append_sheet(wb, ws, sheetNames)
    }
    XLSX.writeFile(wb, fileName + '.xlsx');
    resolve()
  })
}
/**
 * 文件转换成JSON数据
 * @param {Object|String} data 文件流
 * @param {String} type 数据类型 array 或 base64
 * @return {{header: Array, results: any[] | * | any[][]}}
 */
export const read = (data, type) => {
  /* if type == 'base64' must fix data first */
  let workbook
  if (type === 'base64') {
    const fixedData = fixData(data)
    workbook = XLSX.read(btoa(fixedData), {type: 'base64'})
  } else {
    workbook = XLSX.read(data, {type: type});
  }
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const header = getHeaderRow(worksheet);
  const results = XLSX.utils.sheet_to_json(worksheet);
  return {header, results};
}

/**
 * 读取文件
 * @param {Object} file 文件框响应的文件对象
 * @param {object} options 参数选项，可侦听回调函数，如：onloadstart / onprogress / onerror / onload
 * @return {Promise<any>}
 */
export function reader(file, options = {}) {
  const reader = new FileReader()
  reader.readAsArrayBuffer(file)
  return new Promise((resolve, reject) => {
    const opt = {
      ...options,
      onerror(e) {
        options.onerror && options.onerror(e)
        reject(e)
      },
      onload(e) {
        const reuslt = e.target.result
        options.onload && options.onload(reuslt)
        resolve(reuslt)
      }
    }
    Object.keys(opt).forEach(key => {
      reader[key] = opt[key]
    })
  })
  
}

// ============== 以下为复杂表头输出函数集合 =============================
const getHeader = function(headers, excelHeader, deep, perOffset) {
  let offset = 0;
  let cur = excelHeader[deep];
  if (!cur) {
    cur = excelHeader[deep] = [];
  }
  pushUndefined(cur, perOffset - cur.length);
  for (let i = 0; i < headers.length; i++) {
    const head = headers[i];
    cur.push(head.name);
    // head.hasOwnProperty('child')
    if (head.child && Array.isArray(head.child) && head.child.length > 0) {
      const childOffset = getHeader(
        head.child,
        excelHeader,
        deep + 1,
        cur.length - 1
      );
      pushNull(cur, childOffset - 1);
      offset += childOffset;
    } else {
      offset++;
    }
  }
  return offset;
};
const pushUndefined = function(arr, count) {
  for (let i = 0; i < count; i++) {
    arr.push(undefined);
  }
};
const pushNull = function(arr, count) {
  for (let i = 0; i < count; i++) {
    arr.push(null);
  }
};
const fillNull = function(arr) {
  const max = Math.max(...arr.map(a => a.length));
  arr.filter(e => e.length < max).forEach(e => pushNull(e, max - e.length));
};
const extractData = function(selectionData, revealList) {
  const headerList = [];
  flat(revealList, headerList);
  // 结果集
  const result = [];
  selectionData.forEach(row => {
    const rowData = [];
    headerList.forEach(prop => {
      let value = null;
      if (typeof prop === 'function') {
        value = prop(row);
      } else {
        value = row[prop];
      }
      value = value === null || value === undefined ? '' : value;
      rowData.push(value);
    });
    result.push(rowData);
  });
  return result;
};
const flat = function(revealList, result) {
  revealList.forEach(e => {
    if (e.child) {
      flat(e.child, result);
    } else if (e.exeFun) {
      result.push(e.exeFun);
    } else if (e.prop) {
      result.push(e.prop);
    }
  });
};
const doMerges = function(arr) {
  // 要么横向合并 要么纵向合并
  const deep = arr.length;
  const merges = [];
  for (let y = 0; y < deep; y++) {
    // 先处理横向合并
    const row = arr[y];
    let colSpan = 0;
    for (let x = 0; x < row.length; x++) {
      if (row[x] === null) {
        colSpan++;
        if (x + 1 === row.length && (colSpan > 0 && x > colSpan)) {
          merges.push({ s: { r: y, c: x - colSpan }, e: { r: y, c: x } });
        }
      } else if (colSpan > 0 && x > colSpan) {
        merges.push({ s: { r: y, c: x - colSpan - 1 }, e: { r: y, c: x - 1 } });
        colSpan = 0;
      } else {
        colSpan = 0;
      }
    }
  }
  // 再处理纵向合并
  const colLength = arr[0].length;
  for (let x = 0; x < colLength; x++) {
    let rowSpan = 0;
    for (let y = 0; y < deep; y++) {
      if (arr[y][x] != null) {
        rowSpan = 0;
      } else {
        rowSpan++;
      }
    }
    if (rowSpan > 0) {
      merges.push({
        s: { r: deep - rowSpan - 1, c: x },
        e: { r: deep - 1, c: x }
      });
    }
  }
  return merges;
};
const aoaToSheet = function(data) {
  const ws = {};
  const range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
  for (let R = 0; R !== data.length; ++R) {
    for (let C = 0; C !== data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      /// 这里生成cell的时候，使用上面定义的默认样式
      const cell = {
        v: data[R][C],
        s: {
          font: { name: '宋体', sz: 11, color: { auto: 1 } },
          border: {
            color: { auto: 1 }
          },
          alignment: {
            /// 自动换行
            wrapText: 1,
            // 居中
            horizontal: 'center',
            vertical: 'center',
            indent: 0
          }
        }
      };
      if (cell.v == null) continue;
      const cellRef = XLSX.utils.encode_cell({ c: C, r: R });
      if (typeof cell.v === 'number') cell.t = 'n';
      else if (typeof cell.v === 'boolean') cell.t = 'b';
      // 类型处理
      // else if (cell.v instanceof Date) {
      //   cell.t = 'n'; cell.z = XLSX.SSF._table[14];
      //   cell.v = this.dateNum(cell.v);
      // }
      else cell.t = 's';
      ws[cellRef] = cell;
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
};
const s2ab = function(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
};
const openDownloadXLSXDialog = function(url, saveName) {
  if (typeof url === 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url); // 创建blob地址
  }
  const aLink = document.createElement('a');
  aLink.href = url;
  aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
  let event;
  if (window.MouseEvent) event = new MouseEvent('click');
  else {
    event = document.createEvent('MouseEvents');
    event.initMouseEvent(
      'click',
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
  }
  aLink.dispatchEvent(event);
};

/**
 * 读取文件
 * @param {String} docName 输出文件名称
 * @param {Array} rowData 行数据
 * @param {Array} colData 表头列数据 {name: '表头名', prop: '字段名', child: []}
 * cloData = [ { name: '姓名', prop: 'name' }, { name: '专业技能', child: [ { name: '前端', child: [ { name: 'JavaScript', prop: 'js' } ] } ] } ]
 */
const complexTableExport = function(docName, rowData, colData) {
  const sheetName = docName; // '多级表头excel'
  const excelHeader = []; // [[], []]; // , [] 
  getHeader(colData, excelHeader, 0, 0);
  fillNull(excelHeader);
  const merges = doMerges(excelHeader);
  const dataList = extractData(rowData, colData);
  excelHeader.push(...dataList);
  const ws = aoaToSheet(excelHeader);
  ws['!merges'] = merges;
  const workbook = {
    SheetNames: [sheetName],
    Sheets: {}
  };
  workbook.Sheets[sheetName] = ws;
  // excel样式
  const wopts = {
    bookType: 'xlsx',
    bookSST: true,
    type: 'binary',
    cellStyles: true
  };
  const wbout = XLSX.write(workbook, wopts);
  const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
  openDownloadXLSXDialog(blob, sheetName + '.xlsx');
}; 

// ===========================================


export default { write, writeFromTable, read, reader, complexTableExport }
