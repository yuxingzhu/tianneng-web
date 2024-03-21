import request from '@/utils/request'

// 获取采集设备占比饼图
export function queryWorkType(params) {
  return request({
    url: 'tn2/tn/sendMessage/WEBSERVICE/queryWorkType',
    method: 'post',
    data: { ...params }
  })
}
// 获取设备运行实时监测
export function queryWorkDevice(params) {
  return request({
    url: 'tn2/tn/sendMessage/WEBSERVICE/queryWorkDevice',
    method: 'post',
    data: { ...params }
  })
}

// 获取年度销售和生产统计
export function queryYearData(params) {
  return request({
    url: 'tn2/tn/sendMessage/WEBSERVICE/queryYearData',
    method: 'post',
    data: { ...params }
  })
}

// 获取车间的月度计划
export function queryPlanData(params) {
  return request({
    url: 'tn2/tn/sendMessage/WEBSERVICE/queryPlanData',
    method: 'post',
    data: { ...params }
  })
}
