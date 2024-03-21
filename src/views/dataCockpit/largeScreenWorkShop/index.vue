<template>
  <div class="workshop-production">
    <WorkShopHeader :chart-data="info" />
    <div class="workshop-main fb">
      <div class="workshop-main-left">
        <div class="workshop-main-left-top">
          <!--车间总体-->
          <WorkshopOverall :chart-data="workshopData" />
        </div>
        <div class="workshop-main-left-footer ">
          <!--销量趋势图-->
          <SalesTrendChart :chart-data="monthlySalesTrendChartData" :info-data="info" />
          <!--产能趋势图-->
          <CapacityTrendChart :chart-data="monthlyPrdCapacityTrendChartData" :info-data="info" />
        </div>
        <!-- <div class="workshop-main-left-footer ">
          <DeviceAcquisitionRateChart />
        </div> -->
      </div>
      <div class="workshop-main-center">
        <div class="workshop-main-center-top" />
        <div class="workshop-main-center-footer" />
      </div>
      <div class="workshop-main-right">
        <div class="workshop-main-right-top">
          <!--采集设备占比-->
          <PercentageEquipmentChart :chart-data="deviceWorkData" />
          <!--设备在线占比-->
          <EquipmentOnlineShareChart :chart-data="deviceStatusData" />
        </div>
        <div class="workshop-main-right-content">
          <!--设备运行实时监测-->
          <EquipmentOperationMonitoring :chart-data="workDeviceData" />
        </div>
        <!-- <div class="workshop-main-right-footer">
          <EquipmentOperatingRate />
        </div> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.workshop-production {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  max-height: 100%;
  background-image: url('~@/assets/images/largeScreen/largeScreenBg.png');
  background-size: 100% 100%;
  background-position: center center;
  overflow: hidden;

  .workshop-main {
    flex: 1;
    padding: vh(20) vw(20);
    overflow: hidden;

    &-left {
      width: vw(930);
      height: 100%;
      margin-right: vw(20);

      &-footer {
        display: flex;
        justify-content: space-between;
      }

    }

    &-right {
      width: vw(930);
      height: 100%;

      &-top {
        display: flex;
        justify-content: space-between;
      }

    }

    .title {
      font-size: vw(16);
    }

    .title-info {
      color: green;
    }
  }
}
</style>

<script>
import WorkShopHeader from './WorkShopHeader'
import PercentageEquipmentChart from './components/PercentageEquipmentChart'
import SalesTrendChart from './components/SalesTrendChart'
// import DeviceAcquisitionRateChart from './components/DeviceAcquisitionRateChart'
import WorkshopOverall from './components/WorkshopOverall'
import EquipmentOperationMonitoring from './components/EquipmentOperationMonitoring'
import EquipmentOnlineShareChart from './components/EquipmentOnlineShareChart'
import CapacityTrendChart from './components/CapacityTrendChart'
// import EquipmentOperatingRate from './components/EquipmentOperatingRate'

// 接口
import {
  queryWorkType,
  queryWorkDevice,
  // queryYearData, // 获取年度销售和年度生产统计
  queryPlanData// 获取各个车间的月度计划
} from '@/api/dataCockpit/largeScreenWorkshop'
import {
  queryDeviceStatus,
  // listStartWorkThreeSection, // 获取开工人数
  listRealTimeYearYield, // 获取当日计划量、当日生产量、完成率
  listSectionYearYield, // 获取年累计产量
  querySalesVolumeChart, // 获取车间销量趋势图
  listYieldByMonth, // 获取产能趋势图
  // queryBatterySale, // 获取月度销量
  listMonthYield// 获取本月生产量
} from '@/api/dataCockpit/largeScreen'
import {
  queryYearYield, // 获取年良品率
  queryMonthYield// 获取月良品率
} from '@/api/dataCockpit/dataAcquisition'
import dayjs from 'dayjs'

export default {
  name: 'IndexVue',
  components: {
    WorkShopHeader,
    PercentageEquipmentChart,
    SalesTrendChart,
    // DeviceAcquisitionRateChart,
    WorkshopOverall,
    EquipmentOperationMonitoring,
    EquipmentOnlineShareChart,
    CapacityTrendChart
    // EquipmentOperatingRate
  },
  data() {
    return {
      info: {
        name: '',
        status: ''
      },
      // 采集设备占比
      deviceWorkData: [],
      // 设备在线占比
      deviceStatusData: {},
      // 车间总体
      workshopData: {
        day: {
          thatTimePlannedQuantity: 0, // 当日计划量
          thatTimeProductionVolume: 0, // 当日生产量
          percentage: 0// 完成率
        },
        month: {
          taperData: 0, // 本月销量
          thatMonthProductionVolume: 0, // 本月产量
          monthYieldRate: 0// 月良品率
        },
        year: {
          salesVolume: 0, // 累计销量
          WorkshopYearNum: 0, // 年累计产量
          yieldRate: 0// 良品率
        }
      },
      // 销量趋势图
      monthlySalesTrendChartData: {
        time: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月'
        ],
        value: {
          sales: [0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0],
          production: [0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0]
        }
      },
      // 产能趋势图
      monthlyPrdCapacityTrendChartData: {
        time: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月'
        ],
        value: {
          plan: [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0],
          production: [0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0]
        }
      },
      // 设备运行实时监测
      workDeviceData: []

    }
  },
  created() {
    const params = this.$route.query
    this.info.name = params.name
    this.info.status = params.status
    this.initData()
  },
  methods: {
    initData() {
      this.queryWorkType()
      this.queryDeviceStatus()
      this.listRealTimeYearYield()
      this.listSectionYearYield()
      this.queryYearYield()
      this.querySalesVolumeChart()
      this.listYieldByMonth({
        year: '2024'
      })
      this.queryWorkDevice()
      // this.queryBatterySale()
      this.listMonthYield()
      this.queryMonthYield()
      // this.queryYearData()
      this.queryPlanData()
    },
    // 获取采集设备占比
    queryWorkType() {
      queryWorkType({ 'workshop': this.info.name }).then(res => {
        if (res && Number(res.code) === 200) {
          this.deviceWorkData = res.resultList
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      }).catch(err => {
        console.log(err, 'err')
      })
    },
    // 获取设备在线占比
    queryDeviceStatus() {
      queryDeviceStatus({ workshop: this.info.name }).then(res => {
        if (res && Number(res.code) === 200) {
          this.deviceStatusData = res.statusList[this.info.name]
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      }).catch(err => {
        console.log(err, 'err')
      })
    },
    // 获取车间人数
    // listStartWorkThreeSection(params) {
    //   listStartWorkThreeSection(params).then(res => {
    //     if (Number(res.code) === 0) {
    //       switch (this.info.name) {
    //         case '极板车间':
    //           this.workshopData.startWorkNum = res.data.jb
    //           break
    //         case '装配车间':
    //           this.workshopData.startWorkNum = res.data.zp
    //           break
    //         case '充电车间':
    //           this.workshopData.startWorkNum = res.data.cd
    //           break
    //         default:
    //           this.workshopData.startWorkNum = 0
    //           break
    //       }
    //     } else {
    //       this.$message({
    //         message: res.msg,
    //         type: 'warning'
    //       })
    //     }
    //   }).catch(err => {
    //     console.log(err, 'err')
    //   })
    // },
    // 获取当日生产概况
    listRealTimeYearYield() {
      listRealTimeYearYield().then(res => {
        if (Number(res.code) === 0) {
          switch (this.info.name) {
            case '极板车间':
              this.workshopData.day.thatTimePlannedQuantity = res.data.polarPlateWorkshop.thatTimePlannedQuantity
              this.workshopData.day.thatTimeProductionVolume = res.data.polarPlateWorkshop.thatTimeProductionVolume
              this.workshopData.day.percentage = (res.data.polarPlateWorkshop.thatTimeProductionVolume && res.data.polarPlateWorkshop.thatTimeProductionVolume !== 0) ? (Number(res.data.polarPlateWorkshop.thatTimeProductionVolume) / Number(res.data.polarPlateWorkshop.thatTimePlannedQuantity)) * 100 : 0.00
              break
            case '装配车间':
              this.workshopData.day.thatTimePlannedQuantity = res.data.assemblyShop.thatTimePlannedQuantity
              this.workshopData.day.thatTimeProductionVolume = res.data.assemblyShop.thatTimeProductionVolume
              this.workshopData.day.percentage = (res.data.assemblyShop.thatTimeProductionVolume && res.data.assemblyShop.thatTimeProductionVolume !== 0) ? (Number(res.data.assemblyShop.thatTimeProductionVolume) / Number(res.data.assemblyShop.thatTimePlannedQuantity)) * 100 : 0.00
              break
            case '充电车间':
              this.workshopData.day.thatTimePlannedQuantity = res.data.chargingWorkshop.thatTimePlannedQuantity
              this.workshopData.day.thatTimeProductionVolume = res.data.chargingWorkshop.thatTimeProductionVolume
              this.workshopData.day.percentage = (res.data.chargingWorkshop.thatTimeProductionVolume && res.data.chargingWorkshop.thatTimeProductionVolume !== 0) ? (Number(res.data.chargingWorkshop.thatTimeProductionVolume) / Number(res.data.chargingWorkshop.thatTimePlannedQuantity)) * 100 : 0.00
              break
            default:
              this.workshopData.day.thatTimePlannedQuantity = 0
              this.workshopData.day.thatTimeProductionVolume = 0
              this.workshopData.day.percentage = 0.00
              break
          }
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      }).catch(err => {
        console.log(err, 'err')
      })
    },
    // 获取三大段年产量
    listSectionYearYield() {
      listSectionYearYield().then(res => {
        if (Number(res.code) === 0) {
          switch (this.info.name) {
            case '极板车间':
              this.workshopData.year.WorkshopYearNum = res.data.targetArr.filter(item => item.name === '极板车间产量')[0].value
              break
            case '装配车间':
              this.workshopData.year.WorkshopYearNum = res.data.targetArr.filter(item => item.name === '装配车间产量')[0].value
              break
            case '充电车间':
              this.workshopData.year.WorkshopYearNum = res.data.targetArr.filter(item => item.name === '充电车间产量')[0].value
              break
            default:
              this.workshopData.year.WorkshopYearNum = 0
              break
          }
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      }).catch(err => {
        console.log(err, 'err')
      })
    },
    // 获取年度三大段车间良品率
    queryYearYield() {
      queryYearYield().then(res => {
        if (Number(res.code) === 0) {
          switch (this.info.name) {
            case '极板车间':
              this.workshopData.year.yieldRate = res.data.polarPlateYearYieldRate
              break
            case '装配车间':
              this.workshopData.year.yieldRate = res.data.assemblyYearYieldRate
              break
            case '充电车间':
              this.workshopData.year.yieldRate = res.data.chargingYearYieldRate
              break
            default:
              this.workshopData.year.yieldRate = 0
              break
          }
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      }).catch(err => {
        console.log(err, 'err')
      })
    },
    // 获取月度销量趋势图
    querySalesVolumeChart() {
      querySalesVolumeChart().then(res => {
        if (Number(res.code) === 0) {
          this.monthlySalesTrendChartData.time = res.data.time
          const data1 = res.data.monthlySalesVolume.extremeEditionSales
          const data2 = res.data.monthlySalesVolume.assemblingBatteries
          const data3 = res.data.monthlySalesVolume.batterySales
          switch (this.info.name) {
            case '极板车间':
              this.monthlySalesTrendChartData.value.sales = data1
              this.workshopData.month.taperData = data1[dayjs().month()]
              if (Array.isArray(data1)) {
                let sum = 0
                data1.reduce(function(pre, curr) {
                  sum = pre + curr
                  return sum
                })
                this.workshopData.year.salesVolume = sum * 10000
              }
              break
            case '装配车间':
              // this.monthlySalesTrendChartData.value = res.data.monthlySalesVolume.assemblingBatteries
              this.monthlySalesTrendChartData.value.sales = data2
              this.workshopData.month.taperData = data2[dayjs().month()]
              if (Array.isArray(data2)) {
                let sum = 0
                data2.reduce(function(pre, curr) {
                  sum = pre + curr
                  return sum
                })
                this.workshopData.year.salesVolume = sum * 10000
              }
              break
            case '充电车间':
              // this.monthlySalesTrendChartData.value = res.data.monthlySalesVolume.batterySales
              this.monthlySalesTrendChartData.value.sales = data3
              this.workshopData.month.taperData = data3[dayjs().month()]
              if (Array.isArray(data3)) {
                let sum = 0
                data3.reduce(function(pre, curr) {
                  sum = pre + curr
                  return sum
                })
                this.workshopData.year.salesVolume = sum * 10000
              }
              break
            default:
              this.workshopData.month.taperData = 0
              this.monthlySalesTrendChartData.value.sales = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              break
          }
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      })
    },
    // 月度产能趋势图
    listYieldByMonth(params) {
      const nowMonth = this.$dayjs().format('M')
      listYieldByMonth(params).then(res => {
        if (Number(res.code) === 0) {
          const assemblyOutput = []
          // const assemblyOutputTotal = 0
          const chargingOutput = []
          // const achargingOutputTotal = 0
          const plateYield = []
          // const plateYieldTotal = 0
          for (const i of Object.values(res.data['装配产量'])) {
            assemblyOutput.push(i)
          }
          for (const i of Object.values(res.data['充电产量'])) {
            chargingOutput.push(i)
          }
          for (const i of Object.values(res.data['极板产量'])) {
            plateYield.push(i)
          }
          const assemblyOutputSplit1 = assemblyOutput.slice(0, nowMonth)
          const assemblyOutputSplit2 = assemblyOutput.slice(nowMonth, assemblyOutput.length).map(item => 0)
          const newAssemblyOutput = [...assemblyOutputSplit1, ...assemblyOutputSplit2]

          const chargingOutputSplit1 = chargingOutput.slice(0, nowMonth)
          const chargingOutputSplit2 = chargingOutput.slice(nowMonth, chargingOutput.length).map(item => 0)
          const newChargingOutput = [...chargingOutputSplit1, ...chargingOutputSplit2]

          const plateYieldSplit1 = plateYield.slice(0, nowMonth)
          const plateYieldSplit2 = plateYield.slice(nowMonth, plateYield.length).map(item => 0)
          const newPlateYield = [...plateYieldSplit1, ...plateYieldSplit2]

          const plateYield1 = newPlateYield.map(item => {
            return (Number(item) / 10000 / 54).toFixed(2)
          })
          const assemblyOutput1 = newAssemblyOutput.map(item => {
            return (Number(item) / 10000).toFixed(2)
          })
          const chargingOutput1 = newChargingOutput.map(item => {
            return (Number(item) / 10000).toFixed(2)
          })
          switch (this.info.name) {
            case '极板车间':
              this.monthlyPrdCapacityTrendChartData.value.production = newPlateYield
              this.monthlySalesTrendChartData.value.production = plateYield1
              break
            case '装配车间':
              this.monthlyPrdCapacityTrendChartData.value.production = newAssemblyOutput
              this.monthlySalesTrendChartData.value.production = assemblyOutput1
              break
            case '充电车间':
              this.monthlyPrdCapacityTrendChartData.value.production = newChargingOutput
              this.monthlySalesTrendChartData.value.production = chargingOutput1
              break
            default:
              this.monthlyPrdCapacityTrendChartData.value.production = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              this.monthlySalesTrendChartData.value.production = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              break
          }
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      }).catch(err => {
        console.log(err, 'err')
      })
    },
    // 设备运行实时监测
    queryWorkDevice() {
      queryWorkDevice({ 'workshop': this.info.name }).then(res => {
        if (res && Number(res.code) === 200) {
          this.workDeviceData = res.deviceList || []
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      }).catch(err => {
        console.log(err, 'err')
      })
    },

    // 获取月度销量
    // queryBatterySale () {
    //   queryBatterySale().then(res => {
    //     if (Number(res.code) === 0) {
    //       const index = res.data.xAxisData ? res.data.xAxisData.indexOf(this.info.name === '极板车间' ? '极板销量' : this.info.name === '充电车间' ? '电池销量' : '装配电池') : -1
    //       const value = res.data.taperData[index] || 0
    //       this.workshopData.month.taperData = value
    //     } else {
    //       this.$message({
    //         message: res.msg,
    //         type: 'warning'
    //       })
    //     }
    //   }).catch(err => {
    //     console.log(err, 'err')
    //   })
    // },

    // 获取月度生产量
    listMonthYield() {
      listMonthYield().then(res => {
        if (Number(res.code) === 0) {
          switch (this.info.name) {
            case '极板车间':
              this.workshopData.month.thatMonthProductionVolume = res.data.polarPlateWorkshop.thatTimeProductionVolume
              break
            case '装配车间':
              this.workshopData.month.thatMonthProductionVolume = res.data.assemblyShop.thatTimeProductionVolume
              break
            case '充电车间':
              this.workshopData.month.thatMonthProductionVolume = res.data.chargingWorkshop.thatTimeProductionVolume
              break
            default:
              this.workshopData.month.thatMonthProductionVolume = 0
              break
          }
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      }).catch(err => {
        console.log(err, 'err')
      })
    },

    // 获取月度良品率
    queryMonthYield() {
      queryMonthYield().then(res => {
        if (Number(res.code) === 0) {
          switch (this.info.name) {
            case '极板车间':
              this.workshopData.month.monthYieldRate = res.data.polarPlateMonthYieldRate
              break
            case '装配车间':
              this.workshopData.month.monthYieldRate = res.data.assemblyMonthYieldRate
              break
            case '充电车间':
              this.workshopData.month.monthYieldRate = res.data.chargingMonthYieldRate
              break
            default:
              this.workshopData.month.monthYieldRate = 0
              break
          }
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      }).catch(err => {
        console.log(err, 'err')
      })
    },

    // 年度销售和年度生产统计
    // queryYearData () {
    //   queryYearData({ 'workshop': this.info.name }).then(res => {
    //     if (res && Number(res.code) === 200) {
    //       // this.workshopData.year.salesVolume = res.resultList[0].totalSale || 0
    //       // this.workshopData.year.WorkshopYearNum = res.resultList[0].totalProduction || 0
    //     } else {
    //       this.$message({
    //         message: res.msg,
    //         type: 'warning'
    //       })
    //     }
    //   }).catch(err => {
    //     console.log(err, 'err')
    //   })
    // },

    // 车间的月度计划
    queryPlanData() {
      queryPlanData({ 'workshop': this.info.name }).then(res => {
        if (res && Number(res.code) === 200) {
          this.monthlyPrdCapacityTrendChartData.value.plan = res.resultList[0].yData || []
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      }).catch(err => {
        console.log(err, 'err')
      })
    }
  }
}

</script>
