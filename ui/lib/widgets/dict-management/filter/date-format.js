import date from '$ui/utils/date';
// 后端返回的时间格式可能各种各样，留着备用
export function dateFormat(val, fromFormat, toFormat) {
    // 为空时显示-
    if (!val) {
        return '-';
    }
    if (fromFormat === 'timestamp') {
        // 时间戳格式
        return date(new Date(val), toFormat);
    } else if (fromFormat === 'hhmmss') {
        const h = val.slice(0, 2);
        const m = val.slice(2, 4);
        const s = val.slice(4, 6);
        return [h, m, s].join(':');
    } else if (fromFormat === 'hhmm') {
        const h = val.slice(0, 2);
        const m = val.slice(2, 4);
        return [h, m].join(':');
    } else if (fromFormat === 'yyyyMMddhhmmss') {
        const y = val.slice(0, 4);
        const M = val.slice(4, 6);
        const d = val.slice(6, 8);
        const h = val.slice(8, 10);
        const m = val.slice(10, 12);
        const s = val.slice(12, 14);
        return date(
            new Date(y, parseInt(M) - 1, d, h, m, s),
            toFormat
        );
    } else if (fromFormat === 'yyyyMMdd') {
        // yyyyMMdd 格式转yyyy-MM-dd格式
        const y = val.slice(0, 4);
        const m = parseInt(val.slice(4, 6)) - 1;
        const d = val.slice(6, 8);
        return date(new Date(y, m, d), toFormat);
    } else {
        return date(val, toFormat);
    }
}

// 时间戳基线校准
// const timeOffset = 1000 * 60 * 60 * 8
const timeOffset = 0
/**
 *  时间戳转日期字符串
 * @param {*} val 时间值，时间戳
 * @param {*} toFormat 目标格式 'yyyy-MM-dd hh:mm:ss'|其它
 */
export function stampToDate(val, toFormat = 'yyyy-MM-dd hh:mm:ss') {
    const num = parseInt(val)
    const timestamp = num * 1000 - timeOffset
    return dateFormat(timestamp, 'timestamp', toFormat)
}
/**
 * 日期（字符串yyyy-MM-dd）转时间戳
 * @param {*} val 时间值
 */
export function dateToStamp(val, type) {
    const dateObj = dateFormat(val, null, null) || new Date()
    if(type === 'start') {
        dateObj.setHours(0, 0, 0, 0)
    } else if(type === 'end') {
        dateObj.setHours(23, 59, 59, 999)
    }
    return Math.floor((dateObj.getTime() + timeOffset) / 1000)
}
// console.log('test=======', dateToStamp('1970-01-01 01:00:00'));