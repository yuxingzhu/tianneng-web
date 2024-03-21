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
      设备在线占比
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
      const data = [{
        name: '在线',
        value: chartData.onlineSize
      }, {
        name: '离线',
        value: chartData.offlineSize
      }]
      console.log('data------>', data)
      this.myChart = echarts.init(this.$refs.echarts)
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        title: {
          text: '设备在线' + '\n' + '占比',
          left: 'center',
          top: 'center',
          padding: [24, 24],
          textStyle: {
            color: '#B7CFFC',
            fontSize: this.fitChartFont(16),
            align: 'center'
          }
        },
        series: [
          {
            name: '设备在线占比',
            type: 'pie',
            // radius: ['45%', '65%'],
            radius: ['45%', '65%'],
            center: ['50%', '50%'], // 调整饼图位置
            color: ['#00C4FF', '#F6D343', '#37DBD7', '#FFB200'],
            minAngle: 45, // 最小角度
            startAngle: 270, // 起始角度
            avoidLabelOverlap: true, // 是否启用防止标签重叠策略
            hoverAnimation: false, // 鼠标移入变大
            labelLine: {
              normal: {
                show: true,
                length: 20,
                // length2: 100,
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
                  align: 'left',
                  padding: 2
                },
                c: {
                  fontSize: this.fitChartFont(12),
                  color: '#B7CFFC',
                  align: 'left',
                  padding: 2
                }
              }
            },
            data: data
          },
          {
            name: '外边框',
            type: 'pie',
            clockWise: false, // 顺时加载
            hoverAnimation: false, // 鼠标移入变大
            center: ['50%', '50%'],
            radius: ['80%', '80%'],
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
