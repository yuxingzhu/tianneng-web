<template>
  <div class="container">
    <div class="card-title-img fs">
      月度成本指标
    </div>
    <div class="chart-container">
      <el-carousel :interval="4000" class="carousel-container" :arrow="'never'" :autoplay="true">
        <el-carousel-item v-for="(item, index) in chartData" :key="index" :style="''">
          <div class="workshop-wrapper fc">
            <div class="workshop">{{ item.title }}</div>
          </div>
          <MonthlyCostIndicatorsChart :chart-data="item.rateArr" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import MonthlyCostIndicatorsChart from './MonthlyCostIndicatorsChart'
export default {
  name: 'MonthlyCostIndicators',
  components: {
    MonthlyCostIndicatorsChart
  },
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

  mounted() {
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 49%;
  margin-right: vw(20);

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

  .chart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: vh(206);
    background: linear-gradient(135deg, rgba(3, 8, 13, 0.58) 0%, rgba(47, 99, 151, 0.58) 51%, rgba(28, 51, 111, 0.2) 100%);
    padding: vh(12);

    .workshop {
      background-image: url('~@/assets/images/largeScreen/workshopBg.png');
      background-size: 100% 100%;
      background-position: center center;
      width: vw(122);
      height: vh(27);
      line-height: vh(27);
      color: #CAFFFB;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      text-align: center;
      margin-bottom: vh(17);
      font-size: vw(18);
    }

    .carousel-container {
      width: 100%;
      height: vh(206);

      .workshop-wrapper {
        width: 100%;

      }

      .chart-wrapper {
        width: 100%;
        height: vh(123);

        .chart {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

::v-deep .el-carousel__container {
  height: 100% !important;
  display: flex;
  justify-content: center;
}

::v-deep .el-carousel__indicator--horizontal .el-carousel__button {
  width: 14px;
  height: 3px;
  background: #0F4D6C;
  border-radius: 2px;
}

::v-deep .el-carousel__indicator--horizontal.is-active .el-carousel__button {
  width: 14px;
  height: 3px;
  background: #00D6FF;
  border-radius: 2px;
}</style>
