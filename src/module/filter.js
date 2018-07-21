import is from 'is_js'
import _ from 'lodash'
import moment from 'moment'

//汎用
const YYYYMMDD = (value) => moment(value).format("YYYY/MM/DD")
const YYYYMMDDHHmm = (value) => moment(value).format("YYYY/MM/DD HH:mm")
const YYYYMMDDHHmmss = (value) => moment(value).format("YYYY/MM/DD HH:mm:ss")
const YYMMDD_YYYYMMDD = (value) => {
    var yy = (new Date()).getFullYear().toString().substring(0,2)
    return value ? moment(yy + value).format("YYYY/MM/DD") : null
}

//カンマ表示
const AddComma = (value) => (value || Number(value) === NaN) ? Number(value).toLocaleString() : value
const Flag = (value) => ( value === "1" || value ) ? "有り" : "無し"

export default {
    YYYYMMDD,
    YYMMDD_YYYYMMDD,
    YYYYMMDDHHmm,
    YYYYMMDDHHmmss,
    AddComma,
    Flag,
}