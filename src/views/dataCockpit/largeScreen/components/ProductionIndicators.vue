<template>
  <div class="container">
    <!-- 充电车间良品率 -->
    <div class="indicators-item indicators-blue-bg indicators-charging-workshop">
      <div class="indicators-item-text">充电车间良品率</div>
      <div class="indicators-item-num">{{ `${Number(chartData.chargingWorkshopYearRate).toFixed(2)}%` || '--' }}</div>
    </div>
    <!-- 装配车间良品率 -->
    <div class="indicators-item indicators-orange-bg indicators-assembly-shop">
      <div class="indicators-item-text">装配车间良品率</div>
      <div class="indicators-item-num">{{ `${Number(chartData.assemblyShopYearRate).toFixed(2)}%` || '--' }}</div>
    </div>
    <!-- 极板车间良品率 -->
    <div class="indicators-item indicators-orange-bg indicators-polar-plate-workshop">
      <div class="indicators-item-text">极板车间良品率</div>
      <div class="indicators-item-num">{{ `${Number(chartData.polarPlateWorkshopYearRate).toFixed(2)}%` || '--' }}</div>
    </div>
    <!-- 年累计极板车间产量 -->
    <div class="indicators-item indicators-blue-bg indicators-plate-yield">
      <div class="indicators-item-text">年累计极板车间产量</div>
      <div class="indicators-item-num">{{ regexHandleNum(chartData.polarPlateWorkshopYearNum) || '--' }}<span
        class="unit"
      >套</span>
      </div>
    </div>
    <!-- 年累计装配车间产量 -->
    <div class="indicators-item indicators-orange-bg indicators-assembly-output">
      <div class="indicators-item-text">年累计装配车间产量</div>
      <div class="indicators-item-num">{{ regexHandleNum(chartData.assemblyShopYearNum) || '--' }}<span
        class="unit"
      >只</span>
      </div>
    </div>
    <!-- 年累计充电车间产量 -->
    <div class="indicators-item indicators-blue-bg indicators-battery-production">
      <div class="indicators-item-text">年累计充电车间产量</div>
      <div class="indicators-item-num">{{ regexHandleNum(chartData.chargingWorkshopYearNum) || '--' }}<span
        class="unit"
      >只</span>
      </div>
    </div>
  </div>
</template>

<script>
import { regexHandleNum } from '@/utils'
export default {
  name: 'ProductionIndicators',

  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {

    }
  },

  mounted() {
  },

  methods: {
    regexHandleNum
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: vh(686);
  margin-bottom: vh(20);
  background-image: url('~@/assets/images/largeScreen/earthBg.png');
  background-size: 100% 100%;
  background-position: center center;

  .indicators-item {
    width: vw(177);
    height: vh(60);
    background-size: 100% 100%;
    background-position: center center;
    padding: vh(5) 0 vh(5) vw(14);

    &-text {
      font-size: vw(14);
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: vw(20);
    }

    &-num {
      font-size: vw(24);
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      line-height: vw(25);
      letter-spacing: vh(2);
      width: vw(210);

      .unit {
        display: inline-block;
        font-size: vw(14);
      }

    }
  }

  .indicators-blue-bg {
    background-image: url('~@/assets/images/largeScreen/prdIndicatorsBlueBg.png');
  }

  .indicators-orange-bg {
    background-image: url('~@/assets/images/largeScreen/prdIndicatorsOrangeBg.png');
  }

  .indicators-charging-workshop {
    position: absolute;
    top: vh(70);
    left: vw(133);
  }

  .indicators-assembly-shop {
    position: absolute;
    top: vh(93);
    right: vw(136);
  }

  .indicators-polar-plate-workshop {
    position: absolute;
    top: vh(270);
    left: vw(136);
  }

  .indicators-plate-yield {
    position: absolute;
    top: vh(240);
    right: vw(252);
  }

  .indicators-assembly-output {
    position: absolute;
    bottom: vh(142);
    left: vw(252);
  }

  .indicators-battery-production {
    position: absolute;
    bottom: vh(222);
    right: vw(124);
  }
}
</style>
