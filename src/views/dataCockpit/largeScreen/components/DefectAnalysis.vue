<template>
  <div class="container">
    <div class="card-title-img fs">
      不良原因分析
    </div>
    <div class="chart-container fb">
      <div class="chart-box">
        <div ref="chart1" v-chart-resize class="chart" />
        <div class="workshop">
          充电车间
        </div>
      </div>
      <div class="chart-box">
        <div ref="chart2" v-chart-resize class="chart" />
        <div class="workshop">
          装配车间
        </div>
      </div>
      <div class="chart-box">
        <div ref="chart3" v-chart-resize class="chart" />
        <div class="workshop">
          充电车间
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/utils'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {
  name: 'DefectAnalysis',

  data() {
    return {
      myChart1: null,
      myChart2: null,
      myChart3: null,
      $_resizeHandler: null
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
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
    initChart() {
      this.getChart1()
      this.getChart2()
      this.getChart3()
    },
    getChart1() {
      this.myChart1 = echarts.init(this.$refs.chart1)
      const option = {
        // 直角坐标系内绘图网格，就是柱状图距外边容器的margin值
        grid: {
          left: '3%',
          top: 70,
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        title: {
          text: '占比比例',
          left: 'center',
          top: 'center',
          padding: [24, 24],
          textStyle: {
            color: '#fff',
            fontSize: this.fitChartFont(12),
            align: 'center'
          }
        },
        series: [{
          name: '人员类型',
          type: 'pie',
          hoverAnimation: false,
          legendHoverLink: false,
          // radius: ['38%', '45%'],
          // radius: ['50%', '57%'],
          radius: ['40%', '57%'],
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

          data: [{
            value: 100,
            name: ''
          },
          {
            value: 100,
            name: ''
          },
          {
            value: 100,
            name: ''
          },
          {
            value: 100,
            name: ''
          }
          ]
        },
        {
          name: '人员类型',
          type: 'pie',
          // radius: ['43%', '55%'],
          // radius: ['55%', '67%'],
          radius: ['55%', '75%'],
          color: ['#F6D343', '#37DBD7'],
          labelLine: {
            normal: {
              show: true,
              length: 20,
              length2: 45,
              lineStyle: {
                width: 2,
                color: '#B7CFFC',
                type: 'dashed'
              }
            }
          },
          label: {
            normal: {
              // formatter: '{c|{c}}\n{hr|}\n{d|{d}%}',
              formatter: '{c|{c}}\n{d|{d}%}',
              padding: [0, -40],
              rich: {
                b: {
                  fontSize: this.fitChartFont(12),
                  color: '#12EABE',
                  align: 'left',
                  padding: 4
                },
                hr: {
                  borderColor: '#12EABE',
                  width: '100%',
                  borderWidth: 2,
                  height: 0
                },
                d: {
                  fontSize: this.fitChartFont(12),
                  color: '#fff',
                  align: 'left',
                  padding: 4
                },
                c: {
                  fontSize: this.fitChartFont(12),
                  color: '#fff',
                  align: 'left',
                  padding: 4
                }
              }
            }
          },
          data: [{
            value: 100,
            name: '社工'
          },
          {
            value: 100,
            name: '养老护理员'
          },
          {
            value: 100,
            name: '康复师'
          },
          {
            value: 100,
            name: '心理咨询师'
          }
          ]
        }
        ]
      }
      this.myChart1.setOption(option, true)
    },
    getChart2() {
      this.myChart2 = echarts.init(this.$refs.chart2)
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        title: {
          text: '占比比例',
          left: 'center',
          top: 'center',
          padding: [24, 24],
          textStyle: {
            color: '#fff',
            fontSize: this.fitChartFont(12),
            align: 'center'
          }
        },
        series: [{
          name: '人员类型',
          type: 'pie',
          hoverAnimation: false,
          legendHoverLink: false,
          radius: ['40%', '57%'],
          // radius: ['50%', '57%'],
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

          data: [{
            value: 100,
            name: ''
          },
          {
            value: 100,
            name: ''
          },
          {
            value: 100,
            name: ''
          },
          {
            value: 100,
            name: ''
          }
          ]
        },
        {
          name: '人员类型',
          type: 'pie',
          // radius: ['43%', '55%'],
          // radius: ['55%', '67%'],
          radius: ['55%', '75%'],
          color: ['#F6D343', '#37DBD7'],
          labelLine: {
            normal: {
              show: true,
              length: 20,
              length2: 45,
              lineStyle: {
                width: 2,
                color: '#B7CFFC',
                type: 'dashed'
              }
            }
          },
          label: {
            normal: {
              // formatter: '{c|{c}}\n{hr|}\n{d|{d}%}',
              formatter: '{c|{c}}\n{d|{d}%}',
              padding: [0, -40],
              rich: {
                b: {
                  fontSize: this.fitChartFont(12),
                  color: '#12EABE',
                  align: 'left',
                  padding: 4
                },
                hr: {
                  borderColor: '#12EABE',
                  width: '100%',
                  borderWidth: 2,
                  height: 0
                },
                d: {
                  fontSize: this.fitChartFont(12),
                  color: '#fff',
                  align: 'left',
                  padding: 4
                },
                c: {
                  fontSize: this.fitChartFont(12),
                  color: '#fff',
                  align: 'left',
                  padding: 4
                }
              }
            }
          },
          data: [{
            value: 100,
            name: '社工'
          },
          {
            value: 100,
            name: '养老护理员'
          },
          {
            value: 100,
            name: '康复师'
          },
          {
            value: 100,
            name: '心理咨询师'
          }
          ]
        }
        ]
      }
      this.myChart2.setOption(option, true)
    },
    getChart3() {
      this.myChart3 = echarts.init(this.$refs.chart3)
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        title: {
          text: '占比比例',
          left: 'center',
          top: 'center',
          padding: [24, 24],
          textStyle: {
            color: '#fff',
            fontSize: this.fitChartFont(12),
            align: 'center'
          }
        },
        series: [{
          name: '人员类型',
          type: 'pie',
          hoverAnimation: false,
          legendHoverLink: false,
          // radius: ['50%', '57%'],
          radius: ['40%', '57%'],
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

          data: [{
            value: 100,
            name: ''
          },
          {
            value: 100,
            name: ''
          },
          {
            value: 100,
            name: ''
          },
          {
            value: 100,
            name: ''
          }
          ]
        },
        {
          name: '人员类型',
          type: 'pie',
          // radius: ['43%', '55%'],
          // radius: ['55%', '67%'],
          radius: ['55%', '75%'],
          color: ['#F6D343', '#37DBD7'],
          labelLine: {
            normal: {
              show: true,
              length: 20,
              length2: 45,
              lineStyle: {
                width: 2,
                color: '#B7CFFC',
                type: 'dashed'
              }
            }
          },
          label: {
            normal: {
              // formatter: '{c|{c}}\n{hr|}\n{d|{d}%}',
              formatter: '{c|{c}}\n{d|{d}%}',
              padding: [0, -40],
              rich: {
                b: {
                  fontSize: this.fitChartFont(12),
                  color: '#12EABE',
                  align: 'left',
                  padding: 4
                },
                hr: {
                  borderColor: '#12EABE',
                  width: '100%',
                  borderWidth: 2,
                  height: 0
                },
                d: {
                  fontSize: this.fitChartFont(12),
                  color: '#fff',
                  align: 'left',
                  padding: 4
                },
                c: {
                  fontSize: this.fitChartFont(12),
                  color: '#fff',
                  align: 'left',
                  padding: 4
                }
              }
            }
          },
          data: [{
            value: 100,
            name: '社工'
          },
          {
            value: 100,
            name: '养老护理员'
          },
          {
            value: 100,
            name: '康复师'
          },
          {
            value: 100,
            name: '心理咨询师'
          }
          ]
        }
        ]
      }
      this.myChart3.setOption(option, true)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;

  .card-title-img {
    width: 100%;
    height: vh(40);
    margin-bottom: vh(4);
    background-image: url('~@/assets/images/largeScreen/cardTitleBg5.png');
    background-size: 100% 100%;
    background-position: center center;
    padding-left: vw(38);
    color: #FFFFFF;
    font-size: vw(18);
  }

  .chart-container {
    width: 100%;
    height: vh(193);
    padding: vh(18) vw(18);
    background: linear-gradient(135deg, rgba(3, 8, 13, 0.58) 0%, rgba(47, 99, 151, 0.48) 51%, rgba(28, 51, 111, 0.2) 100%);

    .chart-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 33.33%;
      height: 100%;
      border-right: 1px solid rgb(45, 98, 130, .5);

      &:last-child {
        border-right: none;
      }

      .chart {
        width: vw(212);
        height: vh(136);
        margin-bottom: vh(15);
      }

      .workshop {
        background-image: url('~@/assets/images/largeScreen/workshopBg.png');
        background-size: 100% 100%;
        background-position: center center;
        width: vw(122);
        height: vh(30);
        line-height: vh(30);
        color: #CAFFFB;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        text-align: center;
      }
    }
  }
}</style>
