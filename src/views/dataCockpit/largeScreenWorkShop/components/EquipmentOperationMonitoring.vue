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
      设备运行实时监测
    </div>
    <div class="chart-container">
      <div class="chart-container-header">
        <div class="chart-container-header-item">
          序号
        </div>
        <div class="chart-container-header-item">
          设备名称
        </div>
        <div class="chart-container-header-item">
          网关ID
        </div>
        <div class="chart-container-header-item">
          工厂设备ID
        </div>
        <div class="chart-container-header-item">
          在线状态
        </div>
      </div>

      <div class="chart-container-list">
        <div ref="scrolldiv" class="chart-container-list-scroll">
          <div v-for="(item, index) in chartData" :key="index" class="chart-container-list-item">
            <div class="chart-container-list-item-value">{{ index }}</div>
            <div class="chart-container-list-item-value">{{ item.deviceName }}</div>
            <div class="chart-container-list-item-value">{{ item.gatewayId }}</div>
            <div class="chart-container-list-item-value">{{ item.deviceNo }}</div>
            <div class="chart-container-list-item-value">
              <span v-if="item.state == 1" class="online">在线 </span>
              <span v-else class="offline">离线 </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {

  },
  mixins: [],
  props: {
    chartData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
    }
  },
  computed: {
    shouldAnimate() {
      return this.chartData.length >= 9
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.$nextTick(() => {
          this.setMarqueeSpeed()
        })
      }
    }
  },
  mounted() {
    this.setMarqueeSpeed()
  },
  methods: {
    setMarqueeSpeed() {
      console.log('this.chartData.length----->', this.chartData.length)
      if (this.shouldAnimate) {
        this.$nextTick(() => {
          // 根据数据长度设置滚动速度
          this.$refs.scrolldiv.style.animationDuration = this.chartData.length * 2 + 's'
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.container {
  width: 100%;
  // margin-bottom: vh(24);
  background-image: url('~@/assets/images/largeScreen/cardTitleBg7.png');
  background-size: 100% 100%;
  background-position: center center;

  .card-title-img {
    width: 100%;
    height: vh(40);
    margin-bottom: vh(4);
    // background-image: url('~@/assets/images/largeScreen/cardTitleBg5.png');
    // background-size: 100% 100%;
    // background-position: center center;
    padding-left: vw(38);
    color: #FFFFFF;
    font-size: vw(18);
  }

  .chart-container {
    width: 100%;
    height: vh(575);
    padding: vh(15) vw(15);
    background: rgba(16, 40, 62, 0.39);

    .chart-container-header {
      width: 100%;
      height: vh(54);
      font-size: vw(16);
      background: rgba(0, 181, 255, 0.29);
      font-weight: 500;
      display: flex;
      color: #FFFFFF;
      align-items: center;

      &-item {
        flex: 1;
        padding-left: vw(22);
      }
    }

    .chart-container-list {
      width: 100%;
      height: vh(490);
      overflow: hidden;
      position: relative;

      &-scroll {
        animation: scroll linear infinite;
      }

      &-item {
        width: 100%;
        height: vh(54);
        font-size: vw(14);
        // background: rgba(0, 181, 255, 0.29);
        font-weight: 400;
        display: flex;
        color: #FFFFFF;
        align-items: center;

        &-value {
          flex: 1;
          padding-left: vw(22);
          white-space: nowrap;
          /* 不换行 */
          overflow: hidden;
          /* 隐藏超出部分 */
          text-overflow: ellipsis;

          /* 显示省略号 */
          .online {
            color: #00EC61;
          }

          .offline {
            color: #FF0000;
          }
        }
      }

      &-item:nth-child(odd) {
        background: rgba(134, 165, 210, 0.15);

      }

      &-scroll:hover {
        animation-play-state: paused;
      }
    }

    .chart {
      width: 100%;
      height: 100%;
    }
  }
}

@keyframes scroll {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-100%);
  }

}
</style>
