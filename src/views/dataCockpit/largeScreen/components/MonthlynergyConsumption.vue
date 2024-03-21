<template>
  <div class="container">
    <div class="card-title-img fs">月度能耗达成</div>
    <div ref="chart" v-chart-resize class="chart" />
  </div>
</template>

<script>
import { debounce } from '@/utils'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {
  name: 'MonthlynergyConsumption',
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
          console.log(val, 'val111000')
          this.getChart(val.stages, val.scores)
        })
      },
      immediate: true
    }
  },

  mounted() {
    this.getChart(this.chartData.stages, this.chartData.scores)
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
    contains(arr, obj) {
      let i = arr.length
      while (i--) {
        if (arr[i].name === obj) {
          return i
        }
      }
      return false
    },
    unit(value) {
      switch (value) {
        case '球磨':
          return '度/吨'
        case '连铸连轧':
          return '度/万小片'
        case '涂片(含圈化)':
          return '度/万小片'
        case '涂片（含固化）':
          return '度/万小片'
        case '装配车间':
          return '度/标准只'
        case '充电车间':
          return '度/KVAH'
        case '空压机能耗':
          return '度/KVAH'
      }
    },
    getChart(stages, scores) {
      // console.log("scores---->", scores);
      // console.log("stages---->", stages);
      const _this = this
      this.myChart = echarts.init(this.$refs.chart)
      const option = {
        color: ['rgba(0,183,238, 1)', 'rgba(86,199,60, 1)'],
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: function(params) {
            return `
            ${params.name}<br />
            ${stages[0].name}: ${scores[0].value[0]}<br />
            ${stages[1].name}: ${scores[0].value[1]}<br />
            ${stages[2].name}: ${scores[0].value[2]}<br />
            ${stages[3].name}: ${scores[0].value[3]}<br />
            ${stages[4].name}: ${scores[0].value[4]}<br />
            ${stages[5].name}: ${scores[0].value[5]}<br />
            `
          }
        },
        radar: {
          center: ['50%', '50%'],
          radius: '60%',
          triggerEvent: true,
          startAngle: 90,
          splitNumber: 4,
          splitArea: {
            areaStyle: {
              color: ['transparent']
            }
          },
          axisLabel: {
            show: false,
            fontSize: this.fitChartFont(20),
            color: '#fff',
            fontStyle: 'normal',
            fontWeight: 'normal'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#fff'
            }
          },
          name: {
            rich: {
              a: {
                fontSize: this.fitChartFont(12),
                color: '#fff',
                lineHeight: this.fitChartFont(12),
                padding: [0, 0, 0, 0]
              },
              b: {
                color: '#00FFE4',
                fontSize: this.fitChartFont(12),
                padding: [0, 0, 0, 0]
              },
              c: {
                color: '#fff',
                fontSize: this.fitChartFont(10),
                padding: [0, 0, 0, 0]
              },

              triggerEvent: true
            },

            formatter: function(a) {
              console.log(a, 'params213433')
              const i = _this.contains(stages, a) // 处理对应要显示的样式
              const value = scores[0]['value'][i]
              return `{b| ${value}}{c| (${_this.unit(a) + ')'}}\n{a| ${a}}`
            },
            textStyle: {
              color: '#fff'
            }
          },
          nameGap: '2',
          indicator: stages
        },
        series: [
          {
            type: 'radar',
            symbol: 'circle',
            symbolSize: 3,
            symbolColor: '#32F5AB',
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: '#3D95A1'
                    },
                    {
                      offset: 1,
                      color: '#22FFA4'
                    }
                  ],
                  false
                )
              }
            },
            itemStyle: {
              color: '#22FFA4',
              borderColor: '#32F5AB',
              borderWidth: 2
            },
            lineStyle: {
              normal: {
                color: '#fff',
                width: 2
              }
            },
            data: [scores[0]]
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

  .card-title-img {
    width: 100%;
    height: vh(40);
    margin-bottom: vh(4);
    background-image: url("~@/assets/images/largeScreen/cardTitleBg6.png");
    background-size: 100% 100%;
    background-position: center center;
    padding-left: vw(38);
    color: #ffffff;
    font-size: vw(18);
  }

  .chart {
    width: 100%;
    height: vh(200);
    background: linear-gradient(135deg, rgba(3, 8, 13, 0.58) 0%, rgba(47, 99, 151, 0.58) 51%, rgba(28, 51, 111, 0.2) 100%);
  }
}
</style>
