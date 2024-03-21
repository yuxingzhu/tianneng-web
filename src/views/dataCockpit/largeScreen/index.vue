<template>
  <div class="large-screen-wrapper">
    <LargeScreenHeader :active="active" @changeActive="handleChangeActive" />
    <div v-if="active === true" class="large-screen-main fb">
      <div class="large-screen-main-left">
        <div class="large-screen-main-left-top fb">
          <!--月度生产概况-->
          <MonthlyProductionOverview :chart-data="monthlyProductionOverviewData" />
          <!--当日实时生产量监测-->
          <NowProductionMonitoring :chart-data="nowProductionMonitoringData" />
        </div>
        <div class="large-screen-main-left-content fb">
          <!--月度销量趋势图-->
          <MonthlySalesTrendChart :chart-data="monthlySalesTrendChartData" />
          <!--月度产能趋势图-->
          <MonthlyPrdCapacityTrendChart :chart-data="monthlyPrdCapacityTrendChartData" />
        </div>
        <div class="large-screen-main-left-footer fb">
          <!-- <DefectAnalysis /> -->
          <!--月度成本指标-->
          <MonthlyCostIndicators :chart-data="monthlyCostIndicatorsData" />
          <!--月度销量-->
          <MonthlySalesVolume :chart-data="monthlySalesVolumeData" />

        </div>
      </div>
      <div class="large-screen-main-right">
        <div class="large-screen-main-right-top">
          <!--三车间人数-->
          <DataAcquisitionIndicator :chart-data="workStatusData" />
        </div>
        <div class="large-screen-main-right-footer fb">
          <!--设备在线占比-->
          <EquipmentOnlineShareChart :chart-data="deviceStatusData" />
          <!--月度能耗达成-->
          <MonthlynergyConsumption :chart-data="monthlynergyConsumptionData" />
          <!--设备运行率-->
          <!-- <EquipmentOperatingRate /> -->
        </div>
      </div>
    </div>
    <div v-else class="large-screen-main fb">
      <div class="large-screen-main-first">
        <!--生产计划-->
        <ProductionPlanChart :chart-data="productionPlanChartData" />
        <!--装配车间库存-->
        <RawMaterialWarehouse :chart-data="rawMaterialWarehouseData" />
        <!--极板车间-->
        <PolarPlateWorkshopChart :chart-data="polarPlateWorkshopChartData" :device-data="deviceStatusData.trigger" />
      </div>
      <div class="large-screen-main-second">
        <!--中间圆球-->
        <ProductionIndicators :chart-data="productionIndicatorsData" />
        <!--装配车间-->
        <AssemblyShop :chart-data="assemblyShopData" :device-data="deviceStatusData.assembly" />
      </div>
      <div class="large-screen-main-third">
        <!--生产订单监测-->
        <ProductionOrderMonitor :chart-data="productionOrderMonitorData" />
        <!--极板车间库存-->
        <FinishedProductWarehouse :chart-data="finishedProductWarehouseData" />
        <!--充电车间-->
        <ChargingWorkshop :chart-data="chargingWorkshopData" :device-data="deviceStatusData.charge" />
      </div>
    </div>
  </div>
</template>

<script>
import LargeScreenHeader from './components/LargeScreenHeader'
import MonthlyProductionOverview from './components/MonthlyProductionOverview'
import NowProductionMonitoring from './components/NowProductionMonitoring'
import MonthlySalesVolume from './components/MonthlySalesVolume'
import MonthlynergyConsumption from './components/MonthlynergyConsumption'
// import DefectAnalysis from './components/DefectAnalysis'
import DataAcquisitionIndicator from './components/DataAcquisitionIndicator'
import MonthlyCostIndicators from './components/MonthlyCostIndicators'
import MonthlySalesTrendChart from './components/MonthlySalesTrendChart'
import MonthlyPrdCapacityTrendChart from './components/MonthlyPrdCapacityTrendChart'
import ProductionPlanChart from './components/ProductionPlanChart'
import RawMaterialWarehouse from './components/RawMaterialWarehouse'
import PolarPlateWorkshopChart from './components/PolarPlateWorkshopChart'
import ProductionIndicators from './components/ProductionIndicators'
import AssemblyShop from './components/AssemblyShop'
import ProductionOrderMonitor from './components/ProductionOrderMonitor'
import FinishedProductWarehouse from './components/FinishedProductWarehouse'
import ChargingWorkshop from './components/ChargingWorkshop'
import EquipmentOnlineShareChart from './components/EquipmentOnlineShareChart'
// import EquipmentOperatingRate from './components/EquipmentOperatingRate'

import {
  queryBatterySale, monthlyCostTarget,
  monthlyEnergyConsumption, querySalesVolumeChart,
  listMaterialRank, listSectionYearYield,
  listMonthYield, listRealTimeYearYield,
  listStartWorkThreeSection, listYieldByMonth,
  listProduceOrderNum, getAssembleInventory,
  getPolarPlateInventory, listProductionReach,
  queryDeviceStatus, queryWorkStatus
} from '@/api/dataCockpit/largeScreen'
import {
  queryDeviceInfo, queryYearYield,
  queryMonthYield, queryNowYield
} from '@/api/dataCockpit/dataAcquisition'

export default {
  name: 'LargeScreen',
  components: {
    LargeScreenHeader,
    MonthlyProductionOverview,
    NowProductionMonitoring,
    MonthlySalesVolume,
    MonthlynergyConsumption,
    // DefectAnalysis,
    DataAcquisitionIndicator,
    MonthlyCostIndicators,
    MonthlySalesTrendChart,
    MonthlyPrdCapacityTrendChart,
    ProductionPlanChart,
    RawMaterialWarehouse,
    PolarPlateWorkshopChart,
    ProductionIndicators,
    AssemblyShop,
    ProductionOrderMonitor,
    FinishedProductWarehouse,
    ChargingWorkshop,
    EquipmentOnlineShareChart
    // EquipmentOperatingRate
  },
  data() {
    return {
      active: true, // 整体概况组件为true，生产过程组件为false
      timer: null, // 定时器
      timer2: null, // 定时器
      // 月度销量指标
      monthlySalesVolumeData: {
        xAxisData: [
          '装配电池',
          '极板销量',
          '电池销量'
        ],
        taperData: [
          15,
          20,
          30
        ]
        // columnarData: [
        //   7,
        //   10,
        //   10
        // ]
      },
      // 月度成本指标
      monthlyCostIndicatorsData: [
        {
          title: '充电车间',
          value: 'chargingWorkshopCostIndicators',
          rateArr: [
            {
              'name': '充电-纸箱报废率',
              'value': 0
            },
            {
              'name': '充电-盖片报废率',
              'value': 0
            },
            {
              'name': '充电-泡沫报废率',
              'value': 0
            }
          ]
        },
        {
          title: '装配车间',
          value: 'assemblyShopCostIndicators',
          rateArr: [
            {
              'name': '装配-正极板报废率',
              'value': 0
            },
            {
              'name': '装配-负极板报废率',
              'value': 0
            },
            {
              'name': '装配-中盖报废率',
              'value': 0
            }
          ]
        },
        {
          title: '极板车间',
          value: 'polarPlateWorkshopCostIndicators',
          rateArr: [
            {
              'name': '极板-负合金铅渣率',
              'value': 0
            },
            {
              'name': '极板-正合金铅渣率',
              'value': 0
            },
            {
              'name': '极板-正铅膏利用率',
              'value': 0
            }
          ]
        }
      ],
      // 月度能耗指标
      monthlynergyConsumptionData: {
        stages: [
          { name: '涂片(含圈化)', max: 30, min: 0 },
          { name: '球磨', max: 1, min: 0 },
          { name: '装配车间', max: 1, min: 0 },
          { name: '充电车间', max: 50, min: 0 },
          { name: '空压机能耗', max: 130, min: 0 },
          { name: '连铸连轧', max: 30, min: 0 }
        ],
        scores: [
          {
            name: '月度能耗达成',
            value: [0, 0, 0, 0, 0, 0, 0, 0]
          }
        ]
      },
      // 月度销量趋势图
      monthlySalesTrendChartData: {
        'time': [
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
        'monthlySalesVolume': {
          'assemblingBatteries': [
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
            0
          ],
          'extremeEditionSales': [
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
            0
          ],
          'batterySales': [
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
            0
          ]
        }
      },
      // 当日物料计划达成排名
      productionPlanChartData: {
        materialList: [
          '装配电池/A6/6-EVF-32.2',
          '装配电池/储能/6-CNF-24I',
          '装配电池/E5/6-DZF-21.6'
        ],
        materialData: [
          {
            'name': '生产量',
            'type': 'bar',
            'data': [
              0,
              0,
              0
            ]
          },
          {
            'name': '计划量',
            'type': 'bar',
            'data': [
              0,
              0,
              0
            ]
          }
        ]
      },
      // 三大段年产量
      productionIndicatorsData: {
        polarPlateWorkshopYearNum: 0,
        assemblyShopYearNum: 0,
        chargingWorkshopYearNum: 0,

        polarPlateWorkshopYearRate: 0,
        assemblyShopYearRate: 0,
        chargingWorkshopYearRate: 0
      },
      // 月度生产概况
      monthlyProductionOverviewData: [
        // 充电车间
        {
          data: [
            {
              name: '月度计划量',
              value: '0'
            },
            {
              name: '月度生产量',
              value: '0'
            },
            {
              name: '良品率',
              value: '0'
            },
            {
              name: '完成率',
              value: '0'
            }
          ],
          title: '充电车间'
        },
        // 装配车间
        {
          data: [
            {
              name: '月度计划量',
              value: '0'
            },
            {
              name: '月度生产量',
              value: '0'
            },
            {
              name: '良品率',
              value: '0'
            },
            {
              name: '完成率',
              value: '0'
            }
          ],
          title: '装配车间'
        },
        // 极板车间
        {
          data: [
            {
              name: '月度计划量',
              value: '0'
            },
            {
              name: '月度生产量',
              value: '0'
            },
            {
              name: '良品率',
              value: '0'
            },
            {
              name: '完成率',
              value: '0'
            }
          ],
          title: '极板车间'
        }
      ],
      // 当日实时生产量监测
      nowProductionMonitoringData: [
        // 充电车间
        {
          data: [
            {
              name: '当日计划量',
              value: '0'
            },
            {
              name: '当日生产量',
              value: '0'
            },
            {
              name: '良品率',
              value: '0'
            },
            {
              name: '完成率',
              value: '0'
            }
          ],
          title: '充电车间'
        },
        // 装配车间
        {
          data: [
            {
              name: '当日计划量',
              value: '0'
            },
            {
              name: '当日生产量',
              value: '0'
            },
            {
              name: '良品率',
              value: '0'
            },
            {
              name: '完成率',
              value: '0'
            }
          ],
          title: '装配车间'
        },
        // 极板车间
        {
          data: [
            {
              name: '当日计划量',
              value: '0'
            },
            {
              name: '当日生产量',
              value: '0'
            },
            {
              name: '良品率',
              value: '0'
            },
            {
              name: '完成率',
              value: '0'
            }
          ],
          title: '极板车间'
        }
      ],
      // 数采数据
      dataAcquisitionIndicatorData: {
        'chargingWorkshopData': {
          'inLineEquipmentNum': 0,
          'offLineEquipmentNum': 0,
          'onlineRate': 0,
          'offlineRate': 0,
          'cd': 0
        },
        'polarPlateWorkshopData': {
          'inLineEquipmentNum': 0,
          'offLineEquipmentNum': 0,
          'onlineRate': 0,
          'offlineRate': 0,
          'jb': 0
        },
        'assemblyShopData': {
          'inLineEquipmentNum': 0,
          'offLineEquipmentNum': 0,
          'onlineRate': 0,
          'offlineRate': 0,
          'zp': 0
        }
      },
      // 极板车间表格数据
      polarPlateWorkshopChartData: {
        startWorkNumArr: [{
          startWorkNum: 0,
          inLineEquipmentNum: 0,
          offLineEquipmentNum: 0,
          onlineRate: 0
        }],
        proOrderNumArr: [{
          proOrderNum: 0,
          thatTimePlannedQuantity: 0,
          thatTimeProductionVolume: 0,
          yieldRate: 0
        }]
      },
      // 装配车间表格数据
      assemblyShopData: {
        startWorkNumArr: [{
          startWorkNum: 0,
          inLineEquipmentNum: 0,
          offLineEquipmentNum: 0,
          onlineRate: 0
        }],
        proOrderNumArr: [{
          proOrderNum: 0,
          thatTimePlannedQuantity: 0,
          thatTimeProductionVolume: 0,
          yieldRate: 0
        }]
      },
      // 充电车间表格数据
      chargingWorkshopData: {
        startWorkNumArr: [{
          startWorkNum: 0,
          inLineEquipmentNum: 0,
          offLineEquipmentNum: 0,
          onlineRate: 0
        }],
        proOrderNumArr: [{
          proOrderNum: 0,
          thatTimePlannedQuantity: 0,
          thatTimeProductionVolume: 0,
          yieldRate: 0
        }]
      },
      // 月度产能趋势图
      monthlyPrdCapacityTrendChartData: {
        'time': [
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
        monthlyPrdCapacity: {
          assemblyOutput: [
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
            0
          ],
          chargingOutput: [
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
            0
          ],
          plateYield: [
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
            0
          ]
        }
      },
      // 生产订单达成监测
      productionOrderMonitorData: {
        time: [
          '01-12',
          '01-13',
          '01-14',
          '01-15',
          '01-16',
          '01-17',
          '01-18',
          '01-19'
        ],
        materialNameList: [
          '充电电池/A6/6-EVF-45.2',
          '充电电池/储能/6-CNF-24I',
          '负涂片极板/L3/6-DZF-20(连铸连轧)'
        ],
        material1: [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        material2: [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        material3: [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      // 装配车间库存物料
      rawMaterialWarehouseData: [
        {
          name: '装配电池/储能/6-CNF-24I',
          value: 25
        },
        {
          name: '装配电池/A6+/6-DZF-20',
          value: 25
        },
        {
          name: '装配电池/A6/6-EVF-32.2',
          value: 25
        },
        {
          name: '装配电池/天能优+/6-DZF-20.5',
          value: 25
        }
      ],
      // 极板车间库存物料
      finishedProductWarehouseData: [
        {
          name: '正极板/精品/6-DZF-20J（连铸连扎）',
          value: 25
        },
        {
          name: '负极板/L3/6-DZF-20(连铸连轧)',
          value: 25
        },
        {
          name: '边负极板/L3/6-DZF-20(连铸连轧)',
          value: 25
        },
        {
          name: '正极板/A6/6-EVF-32.2/连铸连轧',
          value: 25
        }
      ],
      // 设备在线占比
      deviceStatusData: {
        trigger: {
          offline: '0%', online: '0%', onlineSize: 0, offlineSize: 0
        },
        charge: {
          offline: '0%', online: '0%', onlineSize: 0, offlineSize: 0
        },
        assembly: {
          offline: '0%', online: '0%', onlineSize: 0, offlineSize: 0
        }
      },
      workStatusData: {
        trigger: '获取中',
        charge: '获取中',
        assembly: '获取中'
      }
    }
  },
  created() {
    // 10秒钟切换一次tab
    this.handleChangeActiveLoop()
    this.initData()
    // this.queryDeviceStatus()
    // this.queryWorkStatus()
  },
  mounted() {
    this.timer = setInterval(() => {
      this.initData()
    }, 5000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
    // clearInterval(this.timer2)
  },

  methods: {
    initData() {
      this.queryBatterySale()
      this.monthlyCostTarget()
      this.monthlyEnergyConsumption()
      this.querySalesVolumeChart()
      this.listMaterialRank()
      this.listSectionYearYield()
      this.listMonthYield()
      this.listRealTimeYearYield()
      this.queryDeviceInfo()
      this.listStartWorkThreeSection({
        startDate: this.$dayjs().format('YYYY-MM-DD'),
        endDate: this.$dayjs().format('YYYY-MM-DD')
      })
      this.queryYearYield()
      this.listYieldByMonth({
        year: '2024'
      })
      this.queryListProduceOrderNum()
      this.getAssembleInventory()
      this.getPolarPlateInventory()
      this.listProductionReach()
      this.queryDeviceStatus()
      this.queryWorkStatus()
    },
    // 生产订单达成监测
    listProductionReach() {
      listProductionReach().then(res => {
        if (Number(res.code === 0)) {
          const time = Object.keys(res.data.listMap).sort((a, b) => {
            new Date(b).getTime() - new Date(a).getTime()
          }).map(item => {
            return this.$dayjs(item).format('MM-DD')
          })
          const materialNameList = res.data.materialNameList.slice(0, 3)
          const listMap = res.data.listMap

          this.productionOrderMonitorData.time = time
          this.productionOrderMonitorData.materialNameList = materialNameList
          const material1 = Object.values(listMap).map(item => {
            const newItem = item.filter(itm => itm.name === materialNameList[0])
            return newItem.length && newItem[0].value
          })
          const material2 = Object.values(listMap).map(item => {
            const newItem = item.filter(itm => itm.name === materialNameList[1])
            return newItem.length && newItem[0].value
          })
          const material3 = Object.values(listMap).map(item => {
            const newItem = item.filter(itm => itm.name === materialNameList[2])
            return newItem.length && newItem[0].value
          })
          this.productionOrderMonitorData.material1 = material1
          this.productionOrderMonitorData.material2 = material2
          this.productionOrderMonitorData.material3 = material3
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
    // 装配车间库存物料
    getAssembleInventory() {
      getAssembleInventory().then(res => {
        if (Number(res.code === 0)) {
          this.rawMaterialWarehouseData = res.data.slice(0, 4).map(item => {
            return {
              name: item.name,
              value: item.value
            }
          })
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
    // 查询极板车间库存物料
    getPolarPlateInventory() {
      getPolarPlateInventory().then(res => {
        if (Number(res.code === 0)) {
          this.finishedProductWarehouseData = res.data.slice(0, 4).map(item => {
            return {
              name: item.name,
              value: item.value
            }
          })
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
    // 三大段查询生产订单数
    queryListProduceOrderNum() {
      listProduceOrderNum().then(res => {
        if (Number(res.code) === 0) {
          this.polarPlateWorkshopChartData.proOrderNumArr[0].proOrderNum = res.data.polarPlateWorkshop.orderNumber
          this.assemblyShopData.proOrderNumArr[0].proOrderNum = res.data.assemblyShop.orderNumber
          this.chargingWorkshopData.proOrderNumArr[0].proOrderNum = res.data.chargingWorkshop.orderNumber
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
    // 获取月度销量指标
    queryBatterySale() {
      queryBatterySale().then(res => {
        if (Number(res.code) === 0) {
          this.monthlySalesVolumeData.xAxisData = res.data.xAxisData
          // this.monthlySalesVolumeData.taperData = res.data.taperData
          this.monthlySalesVolumeData.columnarData = res.data.columnarData
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
    // 获取月度成本指标
    monthlyCostTarget() {
      monthlyCostTarget().then(res => {
        if (Number(res.code) === 0) {
          this.monthlyCostIndicatorsData.forEach(item => {
            item.rateArr = res.data[`${item.value}`].sort((a, b) => { Number(b.value) - Number(a.value) }).slice(0, 3)
          })
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
    // 获取月度能耗指标
    monthlyEnergyConsumption() {
      monthlyEnergyConsumption().then(res => {
        if (Number(res.code) === 0) {
          const indicator = res.data.indicator
          // const max = indicator.sort((a, b) => Number(a.value) - Number(b.value))[indicator.length - 1].value
          this.monthlynergyConsumptionData.stages = indicator.map(item => {
            return {
              name: item.name
              // ,
              // max: Number(item.value)
            }
          })
          // console.log("item---->", this.monthlynergyConsumptionData.stages);

          // console.log(this.monthlynergyConsumptionData.stages, 'this.monthlynergyConsumptionData.stages')
          this.monthlynergyConsumptionData.scores[0].value = indicator.map(item => {
            return item.value
          })
          this.monthlynergyConsumptionData.scores[0].name = '月度能耗达成'
          // console.log("item---->", this.monthlynergyConsumptionData.scores);
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
          this.monthlySalesTrendChartData.monthlySalesVolume.assemblingBatteries = res.data.monthlySalesVolume.assemblingBatteries
          this.monthlySalesTrendChartData.monthlySalesVolume.extremeEditionSales = res.data.monthlySalesVolume.extremeEditionSales
          this.monthlySalesTrendChartData.monthlySalesVolume.batterySales = res.data.monthlySalesVolume.batterySales
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      })
    },
    // 获取当日物料计划达成排名
    listMaterialRank() {
      listMaterialRank().then(res => {
        if (Number(res.code) === 0) {
          this.productionPlanChartData.materialList = res.data.materialList.slice(0, 6)
          this.productionPlanChartData.materialData = res.data.materialData.map(item => {
            return {
              name: item.name,
              type: item.type,
              data: item.data.map(item => Number(item) / 10000)
            }
          })
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
          this.productionIndicatorsData.polarPlateWorkshopYearNum = res.data.targetArr.filter(item => item.name === '极板车间产量')[0].value
          this.productionIndicatorsData.assemblyShopYearNum = res.data.targetArr.filter(item => item.name === '装配车间产量')[0].value
          this.productionIndicatorsData.chargingWorkshopYearNum = res.data.targetArr.filter(item => item.name === '充电车间产量')[0].value
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
    // 获取月度生产概况
    listMonthYield() {
      listMonthYield().then(res => {
        if (Number(res.code) === 0) {
          // 充电车间
          this.monthlyProductionOverviewData[0].data[0].value = res.data.chargingWorkshop.thatTimePlannedQuantity
          this.monthlyProductionOverviewData[0].data[1].value = res.data.chargingWorkshop.thatTimeProductionVolume
          this.monthlyProductionOverviewData[0].data[3].value = (res.data.chargingWorkshop.thatTimeProductionVolume && Number(res.data.chargingWorkshop.thatTimeProductionVolume) !== 0) ? (Number(res.data.chargingWorkshop.thatTimeProductionVolume) / Number(res.data.chargingWorkshop.thatTimePlannedQuantity)) * 100 : 0.00
          // 装配车间
          this.monthlyProductionOverviewData[1].data[0].value = res.data.assemblyShop.thatTimePlannedQuantity
          this.monthlyProductionOverviewData[1].data[1].value = res.data.assemblyShop.thatTimeProductionVolume
          this.monthlyProductionOverviewData[1].data[3].value = (res.data.assemblyShop.thatTimeProductionVolume && Number(res.data.assemblyShop.thatTimeProductionVolume) !== 0) ? (Number(res.data.assemblyShop.thatTimeProductionVolume) / Number(res.data.assemblyShop.thatTimePlannedQuantity)) * 100 : 0.00
          // 极板车间
          this.monthlyProductionOverviewData[2].data[0].value = res.data.polarPlateWorkshop.thatTimePlannedQuantity
          this.monthlyProductionOverviewData[2].data[1].value = res.data.polarPlateWorkshop.thatTimeProductionVolume
          // this.monthlyProductionOverviewData[2].data[3].value = Number('0') /Number('5');
          this.monthlyProductionOverviewData[2].data[3].value = (res.data.polarPlateWorkshop.thatTimeProductionVolume && Number(res.data.polarPlateWorkshop.thatTimeProductionVolume) !== 0) ? (Number(res.data.polarPlateWorkshop.thatTimeProductionVolume) / Number(res.data.polarPlateWorkshop.thatTimePlannedQuantity)) * 100 : 0.00
          this.queryMonthYield()
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
    // 获取当日生产概况
    listRealTimeYearYield() {
      listRealTimeYearYield().then(res => {
        if (Number(res.code) === 0) {
          // 充电车间
          this.nowProductionMonitoringData[0].data[0].value = res.data.chargingWorkshop.thatTimePlannedQuantity
          this.nowProductionMonitoringData[0].data[1].value = res.data.chargingWorkshop.thatTimeProductionVolume
          this.nowProductionMonitoringData[0].data[3].value = (res.data.chargingWorkshop.thatTimeProductionVolume && Number(res.data.chargingWorkshop.thatTimeProductionVolume) !== 0) ? (Number(res.data.chargingWorkshop.thatTimeProductionVolume) / Number(res.data.chargingWorkshop.thatTimePlannedQuantity)) * 100 : 0.00
          // 装配车间
          this.nowProductionMonitoringData[1].data[0].value = res.data.assemblyShop.thatTimePlannedQuantity
          this.nowProductionMonitoringData[1].data[1].value = res.data.assemblyShop.thatTimeProductionVolume
          this.nowProductionMonitoringData[1].data[3].value = (res.data.assemblyShop.thatTimeProductionVolume && Number(res.data.assemblyShop.thatTimeProductionVolume) !== 0)
            ? (Number(res.data.assemblyShop.thatTimeProductionVolume) / Number(res.data.assemblyShop.thatTimePlannedQuantity)) * 100 : 0.00
          // 极板车间
          this.nowProductionMonitoringData[2].data[0].value = res.data.polarPlateWorkshop.thatTimePlannedQuantity
          this.nowProductionMonitoringData[2].data[1].value = res.data.polarPlateWorkshop.thatTimeProductionVolume
          this.nowProductionMonitoringData[2].data[3].value = (res.data.polarPlateWorkshop.thatTimeProductionVolume && Number(res.data.polarPlateWorkshop.thatTimeProductionVolume) !== 0)
            ? (Number(res.data.polarPlateWorkshop.thatTimeProductionVolume) / Number(res.data.polarPlateWorkshop.thatTimePlannedQuantity)) * 100 : 0.00

          // 充电车间
          this.chargingWorkshopData.proOrderNumArr[0].thatTimePlannedQuantity = res.data.chargingWorkshop.thatTimePlannedQuantity
          this.chargingWorkshopData.proOrderNumArr[0].thatTimeProductionVolume = res.data.chargingWorkshop.thatTimeProductionVolume
          // 装配车间
          this.assemblyShopData.proOrderNumArr[0].thatTimePlannedQuantity = res.data.assemblyShop.thatTimePlannedQuantity
          this.assemblyShopData.proOrderNumArr[0].thatTimeProductionVolume = res.data.assemblyShop.thatTimeProductionVolume
          // 极板车间
          this.polarPlateWorkshopChartData.proOrderNumArr[0].thatTimePlannedQuantity = res.data.polarPlateWorkshop.thatTimePlannedQuantity
          this.polarPlateWorkshopChartData.proOrderNumArr[0].thatTimeProductionVolume = res.data.polarPlateWorkshop.thatTimeProductionVolume
          this.queryNowYield()
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
    // 获取数采数据
    queryDeviceInfo() {
      queryDeviceInfo().then(res => {
        if (Number(res.code) === 0) {
          // 充电车间数采数据
          this.dataAcquisitionIndicatorData.chargingWorkshopData.inLineEquipmentNum = res.data.data.chargingWorkshopData.inLineEquipmentNum
          this.dataAcquisitionIndicatorData.chargingWorkshopData.offLineEquipmentNum = res.data.data.chargingWorkshopData.offLineEquipmentNum
          this.dataAcquisitionIndicatorData.chargingWorkshopData.onlineRate = res.data.data.chargingWorkshopData.onlineRate
          this.dataAcquisitionIndicatorData.chargingWorkshopData.offlineRate = res.data.data.chargingWorkshopData.offlineRate
          // 极板车间数采数据
          this.dataAcquisitionIndicatorData.polarPlateWorkshopData.inLineEquipmentNum = res.data.data.polarPlateWorkshopData.inLineEquipmentNum
          this.dataAcquisitionIndicatorData.polarPlateWorkshopData.offLineEquipmentNum = res.data.data.polarPlateWorkshopData.offLineEquipmentNum
          this.dataAcquisitionIndicatorData.polarPlateWorkshopData.onlineRate = res.data.data.polarPlateWorkshopData.onlineRate
          this.dataAcquisitionIndicatorData.polarPlateWorkshopData.offlineRate = res.data.data.polarPlateWorkshopData.offlineRate
          // 装配车间数采数据
          this.dataAcquisitionIndicatorData.assemblyShopData.inLineEquipmentNum = res.data.data.assemblyShopData.inLineEquipmentNum
          this.dataAcquisitionIndicatorData.assemblyShopData.offLineEquipmentNum = res.data.data.assemblyShopData.offLineEquipmentNum
          this.dataAcquisitionIndicatorData.assemblyShopData.onlineRate = res.data.data.assemblyShopData.onlineRate
          this.dataAcquisitionIndicatorData.assemblyShopData.offlineRate = res.data.data.assemblyShopData.offlineRate

          // 极板车间数采数据
          this.polarPlateWorkshopChartData.startWorkNumArr[0].inLineEquipmentNum = res.data.data.polarPlateWorkshopData.inLineEquipmentNum
          this.polarPlateWorkshopChartData.startWorkNumArr[0].offLineEquipmentNum = res.data.data.polarPlateWorkshopData.offLineEquipmentNum
          this.polarPlateWorkshopChartData.startWorkNumArr[0].onlineRate = res.data.data.polarPlateWorkshopData.onlineRate
          // 装配车间数采数据
          this.assemblyShopData.startWorkNumArr[0].inLineEquipmentNum = res.data.data.assemblyShopData.inLineEquipmentNum
          this.assemblyShopData.startWorkNumArr[0].offLineEquipmentNum = res.data.data.assemblyShopData.offLineEquipmentNum
          this.assemblyShopData.startWorkNumArr[0].onlineRate = res.data.data.assemblyShopData.onlineRate

          // 充电车间数采数据
          this.chargingWorkshopData.startWorkNumArr[0].inLineEquipmentNum = res.data.data.chargingWorkshopData.inLineEquipmentNum
          this.chargingWorkshopData.startWorkNumArr[0].offLineEquipmentNum = res.data.data.chargingWorkshopData.offLineEquipmentNum
          this.chargingWorkshopData.startWorkNumArr[0].onlineRate = res.data.data.chargingWorkshopData.onlineRate
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
    listStartWorkThreeSection(params) {
      listStartWorkThreeSection(params).then(res => {
        if (Number(res.code) === 0) {
          // 充电车间数采数据
          this.dataAcquisitionIndicatorData.chargingWorkshopData.cd = res.data.cd
          // 极板车间数采数据
          this.dataAcquisitionIndicatorData.polarPlateWorkshopData.jb = res.data.jb
          // 装配车间数采数据
          this.dataAcquisitionIndicatorData.assemblyShopData.zp = res.data.zp

          this.polarPlateWorkshopChartData.startWorkNumArr[0].startWorkNum = res.data.jb
          this.assemblyShopData.startWorkNumArr[0].startWorkNum = res.data.zp
          this.chargingWorkshopData.startWorkNumArr[0].startWorkNum = res.data.cd
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
          this.productionIndicatorsData.polarPlateWorkshopYearRate = res.data.polarPlateYearYieldRate
          this.productionIndicatorsData.assemblyShopYearRate = res.data.assemblyYearYieldRate
          this.productionIndicatorsData.chargingWorkshopYearRate = res.data.chargingYearYieldRate
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
    // 获取月度三大段车间良品率
    queryMonthYield() {
      queryMonthYield().then(res => {
        if (Number(res.code) === 0) {
          // 充电车间
          if (!this.monthlyProductionOverviewData[0].data[1].value) {
            this.monthlyProductionOverviewData[0].data[2].value = 0
          } else {
            this.monthlyProductionOverviewData[0].data[2].value = res.data.chargingMonthYieldRate
          }
          // 装配车间
          if (!this.monthlyProductionOverviewData[1].data[1].value) {
            this.monthlyProductionOverviewData[1].data[2].value = 0
          } else {
            this.monthlyProductionOverviewData[1].data[2].value = res.data.assemblyMonthYieldRate
          }
          // 极板车间
          if (!this.monthlyProductionOverviewData[2].data[1].value) {
            this.monthlyProductionOverviewData[2].data[2].value = 0
          } else {
            this.monthlyProductionOverviewData[2].data[2].value = res.data.polarPlateMonthYieldRate
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
    // // 获取当日三大段车间良品率
    queryNowYield() {
      queryNowYield().then(res => {
        if (Number(res.code) === 0) {
          // 充电车间
          if (Number(this.nowProductionMonitoringData[0].data[1].value) === 0) {
            this.nowProductionMonitoringData[0].data[2].value = 0
            this.chargingWorkshopData.proOrderNumArr[0].yieldRate = 0
          } else {
            this.nowProductionMonitoringData[0].data[2].value = res.data.chargingRealTimeYieldRate
            this.chargingWorkshopData.proOrderNumArr[0].yieldRate = res.data.chargingRealTimeYieldRate
          }
          // 装配车间
          if (Number(this.nowProductionMonitoringData[1].data[1].value) === 0) {
            this.nowProductionMonitoringData[1].data[2].value = 0
            this.assemblyShopData.proOrderNumArr[0].yieldRate = 0
          } else {
            this.nowProductionMonitoringData[1].data[2].value = res.data.assemblyRealTimeYieldRate
            this.assemblyShopData.proOrderNumArr[0].yieldRate = res.data.assemblyRealTimeYieldRate
          }
          // 极板车间
          if (Number(this.nowProductionMonitoringData[2].data[1].value) === 0) {
            this.nowProductionMonitoringData[2].data[2].value = 0
            this.polarPlateWorkshopChartData.proOrderNumArr[0].yieldRate = 0
          } else {
            this.nowProductionMonitoringData[2].data[2].value = res.data.polarPlateRealTimeYieldRate
            this.polarPlateWorkshopChartData.proOrderNumArr[0].yieldRate = res.data.polarPlateRealTimeYieldRate
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
    // 月度产能趋势图
    listYieldByMonth(params) {
      const nowMonth = this.$dayjs().format('M')
      listYieldByMonth(params).then(res => {
        if (Number(res.code) === 0) {
          const assemblyOutput = []; const chargingOutput = []; const plateYield = []
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

          this.monthlyPrdCapacityTrendChartData.monthlyPrdCapacity.assemblyOutput = newAssemblyOutput
          this.monthlyPrdCapacityTrendChartData.monthlyPrdCapacity.chargingOutput = newChargingOutput
          this.monthlyPrdCapacityTrendChartData.monthlyPrdCapacity.plateYield = newPlateYield
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
    handleChangeActive(val) {
      this.active = val
    },
    handleChangeActiveLoop() {
      this.timer = setInterval(() => {
        this.active = !this.active
      }, 100000)
    },

    // 获取设备在线占比
    queryDeviceStatus() {
      queryDeviceStatus({}).then(res => {
        if (res && Number(res.code) === 200) {
          this.deviceStatusData.trigger = res.statusList['极板车间']
          this.deviceStatusData.charge = res.statusList['充电车间']
          this.deviceStatusData.assembly = res.statusList['装配车间']
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
    queryWorkStatus() {
      queryWorkStatus({}).then(res => {
        if (res && Number(res.code) === 200) {
          this.workStatusData.trigger = res.statusList['极板车间']
          this.workStatusData.charge = res.statusList['充电车间']
          this.workStatusData.assembly = res.statusList['装配车间']
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

<style lang="scss" scoped>
.large-screen-wrapper {
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

  .large-screen-main {
    flex: 1;
    padding: vh(20) vw(20);
    overflow: hidden;

    &-left {
      width: vw(966);
      height: 100%;
      margin-right: vw(20);

      &-top {
        margin-bottom: vh(24);
      }

      &-content {
        margin-bottom: vh(24);
      }
    }

    &-right {
      width: vw(896);
      height: 100%;

      &-top {
        margin-bottom: vh(24);
      }
    }

    &-first {
      width: vw(480);
      height: 100%;
      margin-right: vw(35);
    }

    &-second {
      width: vw(880);
      height: 100%;
    }

    &-third {
      width: vw(480);
      height: 100%;
      margin-left: vw(35);
    }
  }

}
</style>
