<!--
  页面类型:
  文件名:PercentageEquipmentChart
  菜单路径:
  功能描述:
  创建时间:2024-02-28 19:19:05
-->
<template>
  <div class="container">
    <div class="card-title-img fs">
      产能趋势图
    </div>
    <div class="chart-container">
      <div ref="echarts" v-chart-resize class="chart" />
    </div>
  </div>
</template>
<script>
import { debounce } from '@/utils'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {
  name: '',
  components: {

  },
  mixins: [],
  props: {
    chartData: {
      type: Object,
      required: true
    },
    infoData: {
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
  computed: {

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
      this.myChart = echarts.init(this.$refs.echarts)
      const option = {
        grid: {
          top: '15%',
          left: 16,
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          data: ['计划量', '生产量'],
          textStyle: {
            color: '#8db0ef',
            fontFamily: 'DINProRegular',
            fontSize: this.fitChartFont(10)
          },
          // 图例标记宽高
          itemWidth: 10,
          itemHeight: 5,
          itemGap: 5,
          top: -5,
          right: 5
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
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
              color: '#48535e',
              type: 'solid'
            }
          }
          // splitLine: {
          //   show: true,
          //   lineStyle: {
          //     color: '#293847',
          //     type: 'solid'
          //   }
          // }
        },
        yAxis: {
          type: 'value',
          name: this.infoData && this.infoData.name === '极板车间' ? '单位：套' : '单位：只',
          nameTextStyle: {
            fontSize: this.fitChartFont(10),
            color: '#fff',
            fontFamily: 'PingFangSC, PingFang SC',
            fontWeight: 400
          },
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
            show: false,
            lineStyle: {
              type: 'dashed',
              color: '#314B63'
            }
          },
          data: chartData.time,
          // y轴刻度线颜色
          axisTick: {
            show: false
          },
          // y轴边框颜色
          axisLine: {
            show: false
          }
        },
        series: [
          {
            name: '计划量',
            type: 'bar',
            data: chartData.value.plan,
            barWidth: '6',
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 1,
                  x2: 0,
                  y2: 0,
                  colorStops: [{
                    offset: 0, color: '#FF6242' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#FC9B03' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                },
                label: {
                  show: false
                }
              }
            }
          },
          {
            name: '生产量',
            type: 'bar',
            data: chartData.value.production,
            barWidth: '6',
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 1,
                  x2: 0,
                  y2: 0,
                  colorStops: [{
                    offset: 0, color: '#53FC46' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#EBFC03' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                },
                label: {
                  show: false
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
<style lang='scss' scoped>
.container {
  width: 49%;
  margin-bottom: vh(24);

  .card-title-img {
    width: 100%;
    height: vh(40);
    margin-bottom: vh(4);
    background-image: url('~@/assets/images/largeScreen/cardTitleBg4.png');
    background-size: 100% 100%;
    background-position: center center;
    padding-left: vw(38);
    color: #FFFFFF;
    font-size: vw(18);
  }

  .chart-container {
    width: 100%;
    height: vh(258);
    padding: vh(15) vw(15);
    background: rgba(16, 40, 62, 0.39);

    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
