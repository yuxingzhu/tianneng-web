<template>
  <div class="container">
    <div class="card-title-img fs">装配车间库存</div>
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
  name: 'RawMaterialWarehouse',
  props: {
    chartData: {
      type: Array,
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
        console.log(val, 'val111')
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
      const chartData1 = chartData
      const chartData2 = chartData.map((item) => {
        return {
          name: '',
          value: item.value
        }
      })
      console.log(chartData, 'chartData')
      this.myChart = echarts.init(this.$refs.echarts)
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        title: {
          text: '装配车间' + '\n' + '库存分析',
          left: 'center',
          top: 'center',
          padding: [24, 24],
          textStyle: {
            color: '#B7CFFC',
            fontSize: this.fitChartFont(10),
            align: 'center'
          }
        },
        series: [
          {
            name: '装配车间库存分析',
            type: 'pie',
            hoverAnimation: false,
            legendHoverLink: false,
            minAngle: 45, // 最小角度
            startAngle: 270, // 起始角度
            avoidLabelOverlap: true, // 是否启用防止标签重叠策略
            // radius: ['30%', '47%'],
            radius: ['25%', '42%'],
            center: ['50%', '50%'], // 调整饼图位置
            color: ['#858147', '#34909D'],
            label: {
              normal: {
                position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            tooltip: {
              show: false
            },

            data: chartData2
          },
          {
            name: '装配车间库存分析',
            type: 'pie',
            // radius: ['45%', '65%'],
            radius: ['40%', '60%'],
            center: ['50%', '50%'], // 调整饼图位置
            color: ['#F6D343', '#37DBD7'],
            minAngle: 45, // 最小角度
            startAngle: 270, // 起始角度
            avoidLabelOverlap: true, // 是否启用防止标签重叠策略
            labelLine: {
              normal: {
                show: true,
                length: 20,
                // length2: 120,
                length2: 80,
                lineStyle: {
                  width: 2,
                  color: '#B7CFFC',
                  type: 'dashed'
                }
              }
            },
            label: {
              // normal: {
              formatter: function(params) {
                console.log(params, 'params222')
                let newParamsName = ''
                if (params.name.length > 6) { // 大于六个字符就显示...
                  newParamsName = params.name.substring(0, 6) + '...'
                } else {
                  newParamsName = params.name
                }
                return `{c|${newParamsName}}\n{d|${params.percent}%}`
              },
              // formatter: '{c|{c}}\n{d|{d}%}',
              // padding: [0, -65],
              padding: [0, -80],
              rich: {
                b: {
                  fontSize: this.fitChartFont(12),
                  color: '#B7CFFC',
                  align: 'right',
                  padding: 2
                },
                d: {
                  fontSize: this.fitChartFont(12),
                  color: '#B7CFFC',
                  align: 'right',
                  padding: 2
                },
                c: {
                  fontSize: this.fitChartFont(12),
                  color: '#B7CFFC',
                  align: 'right',
                  padding: 2
                }
              }
            },
            data: chartData1
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
  width: 100%;
  margin-bottom: vh(24);
  .card-title-img {
    width: 100%;
    height: vh(40);
    margin-bottom: vh(4);
    background-image: url("~@/assets/images/largeScreen/cardTitleBg4.png");
    background-size: 100% 100%;
    background-position: center center;
    padding-left: vw(38);
    color: #ffffff;
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

