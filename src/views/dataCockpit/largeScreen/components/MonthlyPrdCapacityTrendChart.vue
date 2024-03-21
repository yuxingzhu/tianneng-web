<template>
  <div class="container">
    <div class="card-title-img fs">
      月度产能趋势图
    </div>
    <div class="chart-container">
      <div class="unit">
        <div class="unit-item">装配：万只</div>
        <div class="unit-item">极板：万套</div>
        <div class="unit-item">电池：万只</div>
      </div>
      <div id="chart" ref="echarts" v-chart-resize class="chart" />
    </div>
  </div>
</template>

<script>
import { debounce } from '@/utils'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {
  name: 'MonthlyPrdCapacityTrendChart',

  props: {
    chartData: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      myChart: null,
      $_resizeHandler: null
    }
  },

  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.$nextTick(() => {
          this.getChart(val)
        })
      },
      immediate: true
    }
  },

  mounted() {
    this.getChart(this.chartData)
    this.$_resizeHandler = debounce(() => {
      if (this.myChart) {
        this.myChart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.$_resizeHandler)
  },

  beforeDestroy() {
    if (!this.myChart) {
      return
    }
    window.removeEventListener('resize', this.$_resizeHandler)
    this.myChart.clear()
    this.myChart = null
  },

  methods: {
    getChart(chartData) {
      const assemblyOutput = chartData.monthlyPrdCapacity.assemblyOutput.map(item => {
        return (Number(item) / 10000).toFixed(2)
      })
      const chargingOutput = chartData.monthlyPrdCapacity.chargingOutput.map(item => {
        return (Number(item) / 10000).toFixed(2)
      })
      const plateYield = chartData.monthlyPrdCapacity.plateYield.map(item => {
        return (Number(item) / 10000 / 54).toFixed(2)
      })
      this.myChart = echarts.init(this.$refs.echarts)
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
          // ,
          // formatter: function() {

          // }
        },
        textStyle: {
          color: '#466293'
        },
        legend: {
          data: ['装配产量', '充电产量', '极板产量'],
          textStyle: {
            color: '#8db0ef',
            fontFamily: 'DINProRegular',
            fontSize: this.fitChartFont(10)
          },
          // 图例标记宽高
          itemWidth: 10,
          itemHeight: 5,
          itemGap: 5,
          top: 10,
          right: 10
        },
        // 直角坐标系内绘图网格，就是柱状图距外边容器的margin值
        grid: {
          top: 35,
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          // name: '单位：万',
          // nameTextStyle: {
          //   fontSize: this.fitChartFont(10),
          //   color: '#fff',
          //   fontFamily: 'PingFangSC, PingFang SC',
          //   fontWeight: 400
          // },
          type: 'value',
          min: 0,
          // max: 80,
          boundaryGap: [0, 0.1],
          // y轴文字属性设置
          axisLabel: {
            textStyle: {
              fontSize: this.fitChartFont(10),
              color: '#fff',
              fontFamily: 'PingFangSC, PingFang SC',
              fontWeight: 400
            },
            formatter: '{value}'
          },
          // y轴横向分割线颜色
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#314B63'
            }
          },
          // y轴刻度线颜色
          axisTick: {
            show: false
          },
          // y轴边框颜色
          axisLine: {
            show: false
          }
        },
        xAxis: {
          type: 'category',
          data: chartData.time,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff',
              fontFamily: 'PingFangSC, PingFang SC',
              fontSize: this.fitChartFont(10),
              fontWeight: 400
            },
            interval: 0
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#D8D8D8',
              type: 'solid'
            }
          }
        },
        series: [
          {
            name: '装配产量',
            type: 'bar',
            data: assemblyOutput,
            itemStyle: {
              normal: {
                color: '#00FFF9',
                label: {
                  show: false
                  // , // 开启显示
                  // position: 'top', // 在上方显示
                  // textStyle: { // 数值样式
                  //   color: '#fff',
                  //   fontSize: this.fitChartFont(8)
                  // }
                }
              }
            }
          },
          {
            name: '充电产量',
            type: 'bar',
            data: chargingOutput,
            itemStyle: {
              normal: {
                color: '#975BFF',
                label: {
                  show: false
                  // , // 开启显示
                  // position: 'top', // 在上方显示
                  // textStyle: { // 数值样式
                  //   color: '#fff',
                  //   fontSize: this.fitChartFont(8)
                  // }
                }
              }
            }
          },
          {
            name: '极板产量',
            type: 'bar',
            data: plateYield,
            itemStyle: {
              normal: {
                color: '#F4FF4F',
                label: {
                  show: false
                  // , // 开启显示
                  // position: 'top', // 在上方显示
                  // textStyle: { // 数值样式
                  //   color: '#fff',
                  //   fontSize: this.fitChartFont(8)
                  // }
                }
              }
            }
          }
        ]
      }
      this.myChart.setOption(option, true)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 49%;
  height: vh(250);

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
    width: 100%;
    height: vh(206);
    background: linear-gradient(135deg, rgba(3, 8, 13, 0.58) 0%, rgba(47, 99, 151, 0.58) 51%, rgba(28, 51, 111, 0.2) 100%);

    .chart {
      width: 100%;
      height: 100%;
    }

    .unit {
      z-index: 2;
      margin-top: vw(10);
      margin-left: vw(10);
      position: fixed;
      color: #fff;
      font-size: vw(10);
      display: flex;

      .unit-item {
        padding-right: vw(10);
      }
    }
  }
}
</style>
