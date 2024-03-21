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
      设备采集率
    </div>
    <div class="chart-container">
      <div ref="echarts" v-chart-resize class="chart" />
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {
  name: '',
  components: {

  },
  mixins: [],
  props: {

  },
  data() {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {
    this.getChart()
  },
  methods: {
    getChart() {
      this.myChart = echarts.init(this.$refs.echarts)
      const option = {

        tooltip: {
          show: false
        },

        toolbox: {
          feature: {
            saveAsImage: {}
          },
          show: false
        },
        grid: {
          top: '3%',
          left: '3%',
          right: '4%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
          }
        ],
        yAxis: [
          {
            type: 'value',
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
            // y轴刻度线颜色
            axisTick: {
              show: false
            },
            // y轴边框颜色
            axisLine: {
              show: false
            }
          }

        ],
        series: [
          {
            name: 'Line 1',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 3,
              color: '#7351b5'
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#A143AE'
                },
                {
                  offset: 1,
                  color: '#8365E4'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [140, 232, 101, 264, 90, 340, 250]
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
