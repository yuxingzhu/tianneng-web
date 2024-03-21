<!--
  页面类型:
  文件名:EquipmentOnlineShareChart
  菜单路径:
  功能描述:
  创建时间:2024-02-28 15:49:18
-->
<template>
  <div class="container">
    <div class="card-title-img fs">
      设备在线占比
    </div>
    <div class="chart-container">
      <div class="item">
        <div id="chart1" ref="echarts1" class="chart" />
        <div class="item-title">极板车间</div>
      </div>
      <div class="item">
        <div id="chart2" ref="echarts2" class="chart" />
        <div class="item-title">装配车间</div>
      </div>
      <div class="item">
        <div id="chart3" ref="echarts3" class="chart" />
        <div class="item-title">充电车间</div>
      </div>
    </div>
  </div>
</template>
<script>
import { debounce } from '@/utils'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {
  name: 'EquipmentOnlineShareChart',
  components: {

  },
  mixins: [],
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      myChart1: null,
      $_resizeHandler: null
    }
  },
  computed: {

  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.getChart1(val)
        this.getChart2(val)
        this.getChart3(val)
      }
    }
  },
  mounted() {
    this.getChart1(this.chartData)
    this.getChart2(this.chartData)
    this.getChart3(this.chartData)
    this.$_resizeHandler = debounce(() => {
      if (this.myChart1) {
        this.myChart1.resize()
      }
      if (this.myChart2) {
        this.myChart2.resize()
      }
      if (this.myChart3) {
        this.myChart3.resize()
      }
    }, 100)
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    if (!this.myChart1) {
      return
    }
    if (!this.myChart2) {
      return
    }
    if (!this.myChart3) {
      return
    }
    window.removeEventListener('resize', this.$_resizeHandler)
    this.myChart1.clear()
    this.myChart2.clear()
    this.myChart3.clear()
    this.myChart1 = null
    this.myChart2 = null
    this.myChart3 = null
  },
  methods: {
    getChart1(chartData) {
      console.log(chartData, 'chartData')
      this.myChart1 = echarts.init(this.$refs.echarts1)
      const option = {
        legend: {
          show: false
        },
        grid: {
          top: '1%',
          left: '4%',
          right: '4%',
          bottom: '5%',
          containLabel: true
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['70%', '90%'],
            avoidLabelOverlap: true,
            label: {
              position: 'center',
              show: true,
              formatter: function(params) {
                const str = `{a|${chartData.trigger.online}}` + '\n' + '{b|在线}'
                return str
              },
              rich: {
                a: {
                  color: '#00FDE2', // a、b不设置颜色的话，字体颜色就会是饼图颜色的混合色
                  fontSize: this.fitChartFont(16)
                },
                b: {
                  fontSize: this.fitChartFont(14),
                  color: '#ffffff'
                }
              }
            },
            hoverAnimation: false,
            emphasis: {
              label: {
                show: false
              }
            },
            labelLine: {
              show: true
            },
            color: [
              '#00FFE7', '#FFE457'
            ],
            data: [
              { value: chartData.trigger.onlineSize, name: '在线' },
              { value: chartData.trigger.offlineSize, name: '离线' }
            ]
          },
          {
            name: '外边框',
            type: 'pie',
            clockWise: false, // 顺时加载
            hoverAnimation: false, // 鼠标移入变大
            center: ['50%', '50%'],
            radius: ['98%', '99%'],
            label: {
              normal: {
                show: false
              }
            },
            data: [{
              value: 9,
              name: '',
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  borderColor: '#00FFE7'
                }
              }
            }]
          }
        ]
      }
      this.myChart1.setOption(option, true)
    },
    getChart2(chartData) {
      this.myChart2 = echarts.init(this.$refs.echarts2)
      const option = {
        legend: {
          show: false
        },
        grid: {
          top: '1%',
          left: '4%',
          right: '4%',
          bottom: '5%',
          containLabel: true
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['70%', '90%'],
            avoidLabelOverlap: true,
            label: {
              position: 'center',
              show: true,
              formatter: function(params) {
                const str = `{a|${chartData.assembly.online}}` + '\n' + '{b|在线}'
                return str
              },
              rich: {
                a: {
                  color: '#00FDE2', // a、b不设置颜色的话，字体颜色就会是饼图颜色的混合色
                  fontSize: this.fitChartFont(16)
                },
                b: {
                  fontSize: this.fitChartFont(14),
                  color: '#ffffff'
                }
              }
            },
            hoverAnimation: false,
            emphasis: {
              label: {
                show: false
              }
            },
            labelLine: {
              show: true
            },
            color: [
              '#00FFE7', '#FFE457'
            ],
            data: [
              { value: chartData.assembly.onlineSize, name: '在线' },
              { value: chartData.assembly.offlineSize, name: '离线' }
            ]
          },
          {
            name: '外边框',
            type: 'pie',
            clockWise: false, // 顺时加载
            hoverAnimation: false, // 鼠标移入变大
            center: ['50%', '50%'],
            radius: ['98%', '99%'],
            label: {
              normal: {
                show: false
              }
            },
            data: [{
              value: 9,
              name: '',
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  borderColor: '#00FFE7'
                }
              }
            }]
          }
        ]
      }
      this.myChart2.setOption(option, true)
    },
    getChart3(chartData) {
      this.myChart3 = echarts.init(this.$refs.echarts3)
      const option = {
        legend: {
          show: false
        },
        grid: {
          top: '1%',
          left: '4%',
          right: '4%',
          bottom: '5%',
          containLabel: true
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['70%', '90%'],
            avoidLabelOverlap: true,
            label: {
              position: 'center',
              show: true,
              formatter: function(params) {
                const str = `{a|${chartData.charge.online}}` + '\n' + '{b|在线}'
                return str
              },
              rich: {
                a: {
                  color: '#00FDE2', // a、b不设置颜色的话，字体颜色就会是饼图颜色的混合色
                  fontSize: this.fitChartFont(16)
                },
                b: {
                  fontSize: this.fitChartFont(14),
                  color: '#ffffff'
                }
              }
            },
            hoverAnimation: false,
            emphasis: {
              label: {
                show: false
              }
            },
            labelLine: {
              show: true
            },
            color: [
              '#00FFE7', '#FFE457'
            ],
            data: [
              { value: chartData.charge.onlineSize, name: '在线' },
              { value: chartData.charge.offlineSize, name: '离线' }
            ]
          },
          {
            name: '外边框',
            type: 'pie',
            clockWise: false, // 顺时加载
            hoverAnimation: false, // 鼠标移入变大
            center: ['50%', '50%'],
            radius: ['98%', '99%'],
            label: {
              normal: {
                show: false
              }
            },
            data: [{
              value: 9,
              name: '',
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  borderColor: '#00FFE7'
                }
              }
            }]
          }
        ]
      }
      this.myChart3.setOption(option, true)
    }

  }
}
</script>
<style lang='scss' scoped>
.container {
  width: 49%;

  .card-title-img {
    width: 100%;
    height: vh(40);
    margin-bottom: vh(4);
    background-image: url('~@/assets/images/largeScreen/cardTitleBg6.png');
    background-size: 100% 100%;
    background-position: center center;
    padding-left: vw(38);
    color: #FFFFFF;
    font-size: vw(18);
  }

  .chart-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: vh(220);
    background: linear-gradient(135deg, rgba(3, 8, 13, 0.58) 0%, rgba(47, 99, 151, 0.58) 51%, rgba(28, 51, 111, 0.2) 100%);
    padding: vh(12);

    .item {
      width: vw(135);
      height: 100%;

      .chart {
        width: 100%;
        height: vh(130);
      }

      .item-title {
        background-image: url('~@/assets/images/largeScreen/workshopBg.png');
        background-size: 100% 100%;
        background-position: center center;
        width: vw(122);
        height: vh(27);
        line-height: vh(27);
        color: #CAFFFB;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        text-align: center;
        margin-bottom: vh(17);
        margin-left: vw(8);
        margin-top: vh(10);
        font-size: vw(18);
      }
    }

  }
}
</style>
