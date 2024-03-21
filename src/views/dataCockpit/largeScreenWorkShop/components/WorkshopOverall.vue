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
      车间总体
    </div>
    <div class="chart-container">
      <div class="chart-container-content">
        <div class="chart-container-content-list">
          <div class="chart-container-content-list-content">
            <div class="chart-container-content-list-content-left">
              <div class="img1" />
              <!-- <div class="left-icon" />
              <div class="title">当日情况</div>
              <div class="right-icon" /> -->
            </div>
            <div class="chart-container-content-list-content-item">
              <div class="item-num">{{ chartData.day.thatTimePlannedQuantity }}</div>
              <div class="item-img1" />
              <div class="item-dis">当日计划量</div>
            </div>
            <div class="chart-container-content-list-content-item">
              <div class="item-num">{{ chartData.day.thatTimeProductionVolume }}</div>
              <div class="item-img2" />
              <div class="item-dis">当日生产量</div>
            </div>
            <div class="chart-container-content-list-content-item">
              <div class="item-num">{{ Number(chartData.day.percentage).toFixed(2) }}%</div>
              <div class="item-img3" />
              <div class="item-dis">当日完成率</div>
            </div>
          </div>
          <img :src="workshopbg" mode="scaleToFill">
        </div>
        <div class="chart-container-content-list">
          <div class="chart-container-content-list-content">
            <div class="chart-container-content-list-content-left">
              <!-- <div class="left-icon" />
              <div class="title">月度情况</div>
              <div class="right-icon" /> -->
              <div class="img2" />
            </div>
            <div class="chart-container-content-list-content-item">
              <div class="item-num">{{ Number(chartData.month.taperData) * 10000 }}</div>
              <div class="item-img4" />
              <div class="item-dis">本月销量</div>
            </div>
            <div class="chart-container-content-list-content-item">
              <div class="item-num">{{ chartData.month.thatMonthProductionVolume }}</div>
              <div class="item-img2" />
              <div class="item-dis">本月生产量</div>
            </div>
            <div class="chart-container-content-list-content-item">
              <div class="item-num">{{ Number(chartData.month.monthYieldRate).toFixed(2) }}%</div>
              <div class="item-img5" />
              <div class="item-dis">月良品率</div>
            </div>
          </div>
          <img :src="workshopbg" mode="scaleToFill">
        </div>
        <div class="chart-container-content-list">
          <div class="chart-container-content-list-content">
            <div class="chart-container-content-list-content-left">
              <!-- <div class="left-icon" />
              <div class="title">年度情况</div>
              <div class="right-icon" /> -->
              <div class="img3" />
            </div>
            <div class="chart-container-content-list-content-item">
              <div class="item-num">{{ chartData.year.salesVolume }}</div>
              <div class="item-img4" />
              <div class="item-dis">累计销量</div>
            </div>
            <div class="chart-container-content-list-content-item">
              <div class="item-num">{{ chartData.year.WorkshopYearNum }}</div>
              <div class="item-img2" />
              <div class="item-dis">累计生产产量</div>
            </div>
            <div class="chart-container-content-list-content-item">
              <div class="item-num">{{ Number(chartData.year.yieldRate).toFixed(2) }}%</div>
              <div class="item-img5" />
              <div class="item-dis">年良品率</div>
            </div>
          </div>
          <img :src="workshopbg" mode="scaleToFill">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import workshopbg from '@/assets/images/largeScreenWorkshop/workshopbg.png'

export default {
  name: '',
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
      workshopbg: workshopbg
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {
  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
.container {
  width: 100%;
  margin-bottom: vh(24);
  background-image: url('~@/assets/images/largeScreen/cardTitleBg7.png');
  background-size: 100% 100%;
  background-position: center center;

  .card-title-img {
    width: 100%;
    height: vh(40);
    margin-bottom: vh(4);
    // background-image: url('~@/assets/images/largeScreen/cardTitleBg7.png');
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

    &-content {
      &-list {
        width: 100%;
        height: 100%;

        &-content {
          height: vh(118);
          display: flex;
          margin-bottom: vh(8);

          &-left {
            width: vw(368);
            height: 140%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;

            .img1 {
              width: vw(257);
              height: vh(49);
              background-image: url('~@/assets/images/largeScreenWorkshop/workshopLeft1.png');
              background-size: 100% 100%;
              background-position: center;
            }

            .img2 {
              width: vw(257);
              height: vh(49);
              background-image: url('~@/assets/images/largeScreenWorkshop/workshopLeft2.png');
              background-size: 100% 100%;
              background-position: center;
            }

            .img3 {
              width: vw(257);
              height: vh(49);
              background-image: url('~@/assets/images/largeScreenWorkshop/workshopLeft3.png');
              background-size: 100% 100%;
              background-position: center;
            }

            // .left-icon {
            //   width: vw(42);
            //   height: vh(49);
            //   background-image: url('~@/assets/images/largeScreenWorkshop/workshopLeft.png');
            //   background-size: 100% 100%;
            //   background-position: center;
            // }

            // .title {
            //   width: vw(160);
            //   height: vh(47);
            //   font-family: YouSheBiaoTiHei;
            //   font-size: 36px;
            //   color: #00FDE2;
            //   line-height: vw(47);
            //   text-align: center;
            // }

            // .right-icon {
            //   width: vw(42);
            //   height: vh(49);
            //   background-image: url('~@/assets/images/largeScreenWorkshop/workshopRight.png');
            //   background-size: 100% 100%;
            //   background-position: center;
            // }
          }

          &-item {
            width: vw(111);
            height: vh(194);

            .item-num {
              font-size: vw(22);
              width: 100%;
              text-align: center;
              font-weight: 500;
              color: #00D6FF;
              margin-bottom: vh(15);
              margin-top: vh(5);
            }

            .item-img1 {
              width: 100%;
              height: vh(81);
              background-image: url('~@/assets/images/largeScreenWorkshop/img1.png');
              background-size: 100% 100%;
              background-position: center center;
              margin-bottom: vh(5);
            }

            .item-img2 {
              width: 100%;
              height: vh(81);
              background-image: url('~@/assets/images/largeScreenWorkshop/img2.png');
              background-size: 100% 100%;
              background-position: center center;
              margin-bottom: vh(5);
            }

            .item-img3 {
              width: 100%;
              height: vh(81);
              background-image: url('~@/assets/images/largeScreenWorkshop/img3.png');
              background-size: 100% 100%;
              background-position: center center;
              margin-bottom: vh(5);
            }

            .item-img4 {
              width: 100%;
              height: vh(81);
              background-image: url('~@/assets/images/largeScreenWorkshop/img5.png');
              background-size: 100% 100%;
              background-position: center center;
              margin-bottom: vh(5);
            }

            .item-img5 {
              width: 100%;
              height: vh(81);
              background-image: url('~@/assets/images/largeScreenWorkshop/img4.png');
              background-size: 100% 100%;
              background-position: center center;
              margin-bottom: vh(5);
            }

            .item-dis {
              width: 100%;
              height: vh(29);
              color: #00D6FF;
              font-size: vw(16);
              text-align: center;
              line-height: vh(29);
              background: linear-gradient(180deg, rgba(173, 242, 255, 0.15) 0%, rgba(29, 156, 181, 0.65) 100%);
            }
          }

          &-item:nth-child(3) {
            margin: 0 vw(60);
          }
        }

        &>img {
          width: 100%;
          height: vh(55);
        }
      }
    }

    .chart-container-list {
      display: flex;
      margin-top: vh(30);
      justify-content: space-between;

      .chart-container-list-item {
        width: vw(120);
        height: vh(194);
        // background-color: aqua;

        .item-num {
          font-size: vw(22);
          width: 100%;
          text-align: center;
          font-weight: 500;
          color: #00FDE2;
          margin-bottom: vh(33);
        }

        .item-img1 {
          width: 100%;
          height: vh(88);
          background-image: url('~@/assets/images/largeScreenWorkshop/img1.png');
          background-size: 100% 100%;
          background-position: center center;
          margin-bottom: vh(15);
        }

        .item-dis {
          width: 100%;
          height: vh(29);
          color: #FFFFFF;
          font-size: vw(16);
          text-align: center;
          line-height: vh(29);
          background: linear-gradient(180deg, rgba(63, 145, 216, 0.1) 0%, rgba(63, 145, 216, 0.5) 100%);
        }
      }
    }

    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
