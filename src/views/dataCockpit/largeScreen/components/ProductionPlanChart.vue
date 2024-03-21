<template>
  <div class="container">
    <div class="card-title-img fs">
      当日生产计划达成率
    </div>
    <div class="chart-container">
      <div id="chart" ref="echarts" v-chart-resize class="chart" />
    </div>
  </div>
</template>

<script>
import { debounce } from '@/utils'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {
  name: 'ProductionPlanChart',
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
        console.log(val, 'val111000')
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
      const prodData = chartData.materialData.filter(item => item.name === '生产量')[0].data
      const planData = chartData.materialData.filter(item => item.name === '计划量')[0].data
      const data = prodData.map((num, index) => planData[index] === 0 ? 0 : ((num / planData[index]) * 100).toFixed(2))

      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function(params) {
            return `${params[0].name}<br />达成率:${params[0].value}%`
          }
        },
        // legend: {
        //   top: 0,
        //   right: 10,
        //   // 图例标记宽高
        //   itemWidth: 15,
        //   itemHeight: 8,
        //   itemGap: 5,
        //   data: ['生产量', '计划量'],
        //   textStyle: {
        //     color: '#fff', // 图例文字颜色
        //     fontSize: this.fitChartFont(10),
        //     fontWeight: 400
        //   }
        // },
        grid: {
          left: '20',
          right: '10%',
          bottom: '3%',
          top: '25%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          min: 0,
          axisTick: { show: false },
          axisLabel: {
            formatter: function(value) {
              return value
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#d9d9d9'
            }
          },
          splitLine: { show: false }
        },
        yAxis: {
          name: '单位：百分比',
          nameTextStyle: {
            fontSize: this.fitChartFont(10),
            color: '#fff',
            fontFamily: 'PingFangSC, PingFang SC',
            fontWeight: 400
          },
          type: 'category',
          data: chartData.materialList,
          axisTick: { show: false },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#d9d9d9'
            }
          },
          axisLabel: {
            interval: 0,
            // margin: 58,
            textStyle: {
              align: 'right',
              // width: 500,
              fontSize: this.fitChartFont(10)
            },
            formatter: function(params) {
              const str = `{a|${params.split('/')[2] ? params.split('/')[2] : params.split('/')[1]}}`
              return str
            },
            rich: {
              a: {
                align: 'right',
                color: '#fff', // a、b不设置颜色的话，字体颜色就会是饼图颜色的混合色
                fontSize: this.fitChartFont(10),
                width: 100
                // backgroundColor: 'none'
              }

            }
            // formatter: function (value) {
            //   return value.split('/')[2]
            // }
          }
        },
        series: [
          {
            name: '达成率',
            type: 'bar',
            // data: chartData.materialData.filter(item => item.name === '生产量')[0].data,
            data: data,
            barWidth: '6',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  0,
                  [
                    {
                      offset: 0,
                      color: '#185473' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#00B4FB' // 100% 处的颜色
                    }
                  ],
                  false
                )
              }
            },
            label: {
              show: false
            }
          }
          // {
          //   name: '计划量',
          //   type: 'bar',
          //   data: chartData.materialData.filter(item => item.name === '计划量')[0].data,
          //   itemStyle: {
          //     normal: {
          //       color: new echarts.graphic.LinearGradient(
          //         0,
          //         0,
          //         1,
          //         0,
          //         [
          //           {
          //             offset: 0,
          //             color: '#F89F32' // 0% 处的颜色
          //           },
          //           {
          //             offset: 1,
          //             color: '#FCCD61' // 100% 处的颜色
          //           }
          //         ],
          //         false
          //       )
          //     }
          //   },
          //   label: {
          //     show: false
          //   }
          // }
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
