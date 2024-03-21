
import request from '@/utils/request'

// 获取月度销量指标
export function queryBatterySale(params) {
  return request({
    url: 'tn/das/mas/public/largeScreen/queryBatterySale',
    method: 'get',
    params
  })
}

// 获取月度成本指标
export function monthlyCostTarget(params) {
  return request({
    url: 'tn/das/mas/public/largeScreen/monthlyCostTarget',
    method: 'get',
    params
  })
}

// 获取月度能耗指标
export function monthlyEnergyConsumption(params) {
  return request({
    url: 'tn/das/mas/public/largeScreen/monthlyEnergyConsumption',
    method: 'get',
    params
  })
}

// 获取月度销量趋势图
export function querySalesVolumeChart(params) {
  return request({
    url: 'tn/das/mas/public/largeScreen/querySalesVolumeChart',
    method: 'get',
    params
  })
}

// 获取当日物料计划达成排名
export function listMaterialRank(params) {
  return request({
    url: 'tn/das/mas/public/largeScreen/listMaterialRank',
    method: 'get',
    params
  })
}

// 获取三大段年产量
export function listSectionYearYield(params) {
  return request({
    url: 'tn/das/mas/public/largeScreen/listSectionYearYield',
    method: 'get',
    params
  })
}

// 获取三大段月计划产量、实际产量
export function listMonthYield(params) {
  return request({
    url: 'tn/das/mas/public/largeScreen/listMonthYield',
    method: 'get',
    params
  })
}

// 获取三大段当日计划产量、实际产量
export function listRealTimeYearYield(params) {
  return request({
    url: 'tn/das/mas/public/largeScreen/listRealTimeYearYield',
    method: 'get',
    params
  })
}

// 获取三大段开工人数
export function listStartWorkThreeSection(params) {
  return request({
    url: 'tn/das/mas/public/largeScreen/listStartWorkThreeSection',
    method: 'get',
    params
  })
}

// 查询装配车间库存物料
export function getAssembleInventory(params) {
  return request({
    url: 'tn/das/mas/public/largeScreen/getAssembleInventory',
    method: 'get',
    params
  })
}

// 查询极板车间库存物料
export function getPolarPlateInventory(params) {
  return request({
    url: 'tn/das/mas/public/largeScreen/getPolarPlateInventory',
    method: 'get',
    params
  })
}

// 三大段查询生产订单数
export function listProduceOrderNum(params) {
  return request({
    url: 'tn/das/mas/public/largeScreen/listProduceOrderNum',
    method: 'get',
    params
  })
}

// 月度产能趋势图
export function listYieldByMonth(params) {
  return request({
    url: 'tn/das/mas/public/largeScreen/listYieldByMonth',
    method: 'get',
    params
  })
}

// 生产订单达成监测
export function listProductionReach(params) {
  return request({
    url: 'tn/das/mas/public/largeScreen/listProductionReach',
    method: 'get',
    params
  })
}

// 2024.2.29 天能大屏修改
// 设备在线占比
export function queryDeviceStatus(params) {
  return request({
    url: 'tn2/tn/sendMessage/WEBSERVICE/queryDeviceStatus',
    method: 'post',
    data: { ...params }
  })
}
// 设备运行实时监测（生产中、停产中、获取中）
export function queryWorkType(params) {
  return request({
    url: 'tn2/tn/sendMessage/WEBSERVICE/queryWorkType',
    method: 'post',
    data: {
      params
    }
  })
}
// 车间生产状态
export function queryWorkStatus(params) {
  return request({
    url: 'tn2/tn/sendMessage/WEBSERVICE/queryWorkStatus',
    method: 'post',
    data: {
      params
    }
  })
}
