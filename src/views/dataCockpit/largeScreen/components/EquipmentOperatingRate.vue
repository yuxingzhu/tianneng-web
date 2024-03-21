<!--
  页面类型:
  文件名:EquipmentOperatingRate
  菜单路径:
  功能描述:
  创建时间:2024-02-28 16:22:15
-->
<template>
  <div class="container">
    <div class="card-title-img fs">设备运行率</div>
    <div ref="chart" v-chart-resize class="chart" />
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
      this.myChart = echarts.init(this.$refs.chart)
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['极板车间', '装配车间', '充电车间'],
          textStyle: {
            color: '#ffffff',
            fontFamily: 'DINProRegular',
            fontSize: this.fitChartFont(10)
          },
          icon: 'roundRect',
          // 图例标记宽高
          itemWidth: 10,
          itemHeight: 5,
          itemGap: 5,
          top: 0,
          right: 50
        },
        // legend: {
        //   data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        // },
        grid: {
          top: '10%',
          left: '3%',
          right: '4%',
          bottom: '4%',
          containLabel: true
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#44F1FF',
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
          },
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          // y轴文字属性设置
          axisLabel: {
            textStyle: {
              fontSize: this.fitChartFont(10),
              color: '#44F1FF',
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
        series: [
          {
            name: '极板车间',
            type: 'line',
            stack: 'Total',
            color: '#FFB700',
            smooth: true,
            // symbol: 'circle',
            symbolSize: 6,
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '装配车间',
            type: 'line',
            stack: 'Total',
            color: '#00F7FF',
            smooth: true,
            // symbol: 'circle',
            symbolSize: 6,
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '充电车间',
            type: 'line',
            stack: 'Total',
            color: '#42EDB5',
            smooth: true,
            // symbol: 'pin',
            symbolSize: 6,
            data: [150, 232, 201, 154, 190, 330, 410]
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
  width: vw(284);

  .card-title-img {
    width: 100%;
    height: vh(40);
    margin-bottom: vh(4);
    background-image: url("~@/assets/images/largeScreen/cardTitleBg1.png");
    background-size: 100% 100%;
    background-position: center center;
    padding-left: vw(38);
    color: #ffffff;
    font-size: vw(18);
  }

  .chart {
    width: 100%;
    height: vh(200);
    // background: linear-gradient(135deg, rgba(3, 8, 13, 0.58) 0%, rgba(47, 99, 151, 0.58) 51%, rgba(28, 51, 111, 0.2) 100%);
    background: radial-gradient(81% 141% at 0% 0%, rgba(3, 8, 13, 0.58) 0%, rgba(47, 99, 151, 0.58) 51%, rgba(28, 51, 111, 0.2) 100%);
  }
}
</style>
