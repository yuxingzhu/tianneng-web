<template>
  <div class="chart-wrapper fb">
    <div id="chart1" ref="echarts1" v-chart-resize class="chart" />
    <div id="chart2" ref="echarts2" v-chart-resize class="chart" />
    <div id="chart3" ref="echarts3" v-chart-resize class="chart" />
  </div>
</template>

<script>
import { debounce } from '@/utils'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {
  name: 'MonthlyCostIndicatorsChart',
  props: {
    chartData: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      myChart1: null,
      myChart2: null,
      myChart3: null,
      $_resizeHandler: null
    }
  },

  watch: {
    chartData: {
      deep: true,
      handler(val) {
        console.log(val, 'val111')
        this.$nextTick(() => {
          this.getChart1(val)
          this.getChart2(val)
          this.getChart3(val)
        })
      },
      immediate: true
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
        title: [
          {
            text: `{score|${Number(chartData[0].value).toFixed(2)}}{unit|%}`,
            left: 'center',
            y: '23%',
            textStyle: {
              rich: {
                score: {
                  color: '#ffffff',
                  fontSize: this.fitChartFont(18)
                },
                unit: {
                  color: '#ffffff',
                  fontSize: this.fitChartFont(12),
                  align: 'center',
                  verticalAlign: 'bottom'
                }
              }
            }
          },
          {
            subtext: `${chartData[0].name}`,
            left: 'center',
            top: '62%',
            subtextStyle: {
              left: 'center',
              fontSize: this.fitChartFont(12),
              color: '#00D6FF',
              overflow: 'truncate', // 超出隐藏
              ellipsis: '...' // 超出部分用省略号表示
            }
          }
        ],
        tooltip: {
          formatter: function(params) {
            return (
              '<span style="color: #fff;">占比：' + Number(params.value).toFixed(2) + '%</span>'
            )
          }
        },
        polar: {
          radius: ['54%', '70%'],
          center: ['50%', '35%']
        },
        angleAxis: {
          max: 100,
          clockwise: true, // 顺时针
          // 隐藏刻度线
          show: false
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [{
          type: 'bar',
          roundCap: true,
          coordinateSystem: 'polar',
          showBackground: true,
          backgroundStyle: {
            color: '#445669',
            borderWidth: 10
          },
          hoverAnimation: false,
          center: ['60%', '30%'],
          data: [Number(chartData[0].value)],
          polarIndex: 0,
          barWidth: 30,
          itemStyle: {
            normal: {
              opacity: 1,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#5ACEFF'
                },
                {
                  offset: 1,
                  color: '#439CFF'
                }
              ])
            }
          }
        }],
        grid: {
          top: 0,
          left: 'center'
        }
      }
      this.myChart1.setOption(option, true)
    },
    getChart2(chartData) {
      this.myChart2 = echarts.init(this.$refs.echarts2)
      const option = {
        title: [
          {
            text: `{score|${Number(chartData[1].value).toFixed(2)}}{unit|%}`,
            left: 'center',
            y: '23%',
            textStyle: {
              rich: {
                score: {
                  color: '#ffffff',
                  fontSize: this.fitChartFont(18)
                },
                unit: {
                  color: '#ffffff',
                  fontSize: this.fitChartFont(12),
                  align: 'center',
                  verticalAlign: 'bottom'
                }
              }
            }
          },
          {
            subtext: `${chartData[1].name}`,
            left: 'center',
            top: '62%',
            subtextStyle: {
              left: 'center',
              fontSize: this.fitChartFont(12),
              color: '#00D6FF',
              overflow: 'truncate', // 超出隐藏
              ellipsis: '...' // 超出部分用省略号表示
            }
          }
        ],
        tooltip: {
          formatter: function(params) {
            return (
              '<span style="color: #fff;">占比：' + Number(params.value).toFixed(2) + '%</span>'
            )
          }
        },
        polar: {
          radius: ['54%', '70%'],
          center: ['50%', '35%']
        },
        angleAxis: {
          max: 100,
          clockwise: true, // 顺时针
          // 隐藏刻度线
          show: false
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [{
          type: 'bar',
          roundCap: true,
          coordinateSystem: 'polar',
          showBackground: true,
          backgroundStyle: {
            color: '#445669',
            borderWidth: 10
          },
          hoverAnimation: false,
          center: ['60%', '30%'],
          data: [Number(chartData[1].value)],
          polarIndex: 0,
          barWidth: 30,
          itemStyle: {
            normal: {
              opacity: 1,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#60FEC7'
                },
                {
                  offset: 1,
                  color: '#40E0DC'
                }
              ])
            }
          }
        }],
        grid: {
          top: 0,
          left: 'center'
        }
      }
      this.myChart2.setOption(option, true)
    },
    getChart3(chartData) {
      this.myChart3 = echarts.init(this.$refs.echarts3)
      const option = {
        title: [
          {
            text: `{score|${Number(chartData[2].value).toFixed(2)}}{unit|%}`,
            left: 'center',
            y: '23%',
            textStyle: {
              rich: {
                score: {
                  color: '#ffffff',
                  fontSize: this.fitChartFont(18)
                },
                unit: {
                  color: '#ffffff',
                  fontSize: this.fitChartFont(12),
                  align: 'center',
                  verticalAlign: 'bottom'
                }
              }
            }
          },
          {
            subtext: `${chartData[2].name}`,
            left: 'center',
            top: '62%',
            subtextStyle: {
              left: 'center',
              fontSize: this.fitChartFont(12),
              color: '#00D6FF',
              overflow: 'truncate', // 超出隐藏
              ellipsis: '...' // 超出部分用省略号表示
            }
          }
        ],
        tooltip: {
          formatter: function(params) {
            return (
              '<span style="color: #fff;">占比：' + Number(params.value).toFixed(2) + '%</span>'
            )
          }
        },
        polar: {
          radius: ['54%', '70%'],
          center: ['50%', '35%']
        },
        angleAxis: {
          max: 100,
          clockwise: true, // 顺时针
          // 隐藏刻度线
          show: false
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [{
          type: 'bar',
          roundCap: true,
          coordinateSystem: 'polar',
          showBackground: true,
          backgroundStyle: {
            color: '#445669',
            borderWidth: 10
          },
          hoverAnimation: false,
          center: ['60%', '30%'],
          data: [Number(chartData[2].value)],
          polarIndex: 0,
          barWidth: 30,
          itemStyle: {
            normal: {
              opacity: 1,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#A8F07B'
                },
                {
                  offset: 1,
                  color: '#E6F982'
                }
              ])
            }
          }
        }],
        grid: {
          top: 0,
          left: 'center'
        }
      }
      this.myChart3.setOption(option, true)
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-wrapper {
  width: 100%;
  height: vh(123);
  .chart {
    width: 33.3%;
    height: 100%;
  }
}
</style>
