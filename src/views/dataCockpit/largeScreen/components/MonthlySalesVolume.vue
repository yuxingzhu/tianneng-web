<template>
  <div class="container">
    <div class="card-title-img fs">
      月度销量指标
    </div>
    <div class="unit">
      <div class="unit-item">装配：万只</div>
      <div class="unit-item">极板：万套</div>
      <div class="unit-item">电池：万只</div>
    </div>
    <div ref="chart" v-chart-resize class="chart" />
  </div>
</template>

<script>
import { debounce } from '@/utils'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {
  name: 'MonthlySalesVolume',
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
      this.myChart = echarts.init(this.$refs.chart)
      const option = {
        grid: {
          top: '15%',
          bottom: '15%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function(params) {
            console.log(params, 'pardfdfdd')
            return params[0].name + ':' + params[0].data
            // return params[0].name + '<br/>' +
            //   // '计划销量' + '：' + params[0].data + '<br>' +
            //   '实际销量' + '：' + params[0].data + '<br>'
          }
        },
        xAxis: {
          data: chartData.xAxisData,
          axisTick: {
            show: false // 不显示坐标轴刻度线
          },
          axisLine: {
            show: false // 不显示坐标轴线
          },
          axisLabel: {
            show: true,
            formatter: function(value) {
              // console.log(value, chartData.columnarData, '3434')
              // 根据数据判断是否显示
              // if (chartData.columnarData.length === 0 && chartData.taperData.length === 0) {
              if (chartData.columnarData.length === 0) {
                return ''
              } else {
                return value
              }
            },
            color: '#fff',
            fontSize: this.fitChartFont(10)
          },
          splitLine: {
            show: false // 不显示网格线
          }
        },
        yAxis: {
          show: true,
          nameTextStyle: {
            color: '#8CB5E2'
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        series: [
          // {
          //   name: 'hill',
          //   // 象柱形图
          //   type: 'pictorialBar',
          //   // 同一系列的柱间距离
          //   barCategoryGap: '-60%',
          //   // 自定义svg 图标 (三角锥形的关键)
          //   symbol: (value, params) => {
          //     const num = isNaN(value) ? 0 : Number(value)
          //     if (num > 0) {
          //       return 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z'
          //     } else {
          //       return 'none'
          //     }
          //   },
          //   // 默认样式
          //   itemStyle: {
          //     label: {
          //       show: false
          //     },
          //     borderColor: '#206fde',
          //     borderWidth: 1,
          //     color: {
          //       colorStops: [
          //         {
          //           offset: 0,
          //           color: 'rgb(15, 90, 183, 0.09)'
          //         },
          //         {
          //           offset: 1,
          //           color: 'rgb(15, 107, 208, 0.5)'
          //         }
          //       ]
          //     }
          //   },
          //   // 鼠标滑过样式
          //   emphasis: {
          //     label: {
          //       show: true,
          //       position: 'top',
          //       color: '#12DCFF'
          //     },
          //     itemStyle: {
          //       borderColor: '#17cdfa',
          //       borderWidth: 1,
          //       color: {
          //         colorStops: [
          //           {
          //             offset: 0,
          //             color: 'rgba(0,238,255, 0.09)'
          //           },
          //           {
          //             offset: 1,
          //             color: 'rgba(23,205,250, 0.5)'
          //           }
          //         ]
          //       }
          //     }
          //   },
          //   // data: chartData.taperData,
          //   data: chartData.columnarData,
          //   z: 10,
          //   label: {
          //     normal: {
          //       // 设置每根柱子上字的位置和颜色
          //       show: true,
          //       position: 'top',
          //       color: '#fff',
          //       fontSize: this.fitChartFont(14),
          //       fontWeight: 400
          //     }
          //   }
          // },
          {
            // data: chartData.columnarData,
            data: chartData.columnarData,
            type: 'bar',
            barWidth: 15,
            itemStyle: {
              normal: {
                color: '#97C6FF',
                label: {
                  show: true, // 开启显示
                  position: 'inside', // 在上方显示
                  textStyle: { // 数值样式
                    color: '#fff',
                    fontSize: this.fitChartFont(12)
                  }
                }
              }
            }
          }
        ],
        graphic: {
          type: 'text',
          left: 'center',
          top: 'middle',
          silent: true,
          // invisible: chartData.columnarData.length && chartData.taperData.length,
          invisible: chartData.taperData.length,
          style: {
            fill: 'rgba(255,255,255,.8)',
            fontWeight: 'bold',
            text: '暂无数据',
            fontSize: this.fitChartFont(26)
          }
        }

      }
      this.myChart.setOption(option, true)
    }
  }
}
</script>

<style lang="scss" scoped>
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

  .chart {
    width: 100%;
    height: vh(200);
    background: linear-gradient(135deg, rgba(3, 8, 13, 0.58) 0%, rgba(47, 99, 151, 0.58) 51%, rgba(28, 51, 111, 0.2) 100%);
  }

  .unit {
    z-index: 2;
    margin-top: vw(10);
    margin-left: vw(10);
    position: fixed;
    color: #fff;
    font-size: vw(10);
  }

}
</style>
