
import request from '@/utils/request'

// 获取数采数据1
export function queryDeviceInfo(params) {
  return request({
    url: 'xj/api/tn/v1/device/info',
    method: 'get',
    params
  })
}

// 获取年度三大段车间良品率
export function queryYearYield(params) {
  return request({
    url: 'xj/api/tn/v1/year/yield',
    method: 'get',
    params
  })
}

// 获取月度三大段车间良品率
export function queryMonthYield(params) {
  return request({
    url: 'xj/api/tn/v1/month/yield',
    method: 'get',
    params
  })
}

// 获取当日三大段车间良品率
export function queryNowYield(params) {
  return request({
    url: 'xj/api/tn/v1/now/yield',
    method: 'get',
    params
  })
}
