<template>
  <div class="container">
    <div class="card-title-img fs">
      当日实时生产量监测
    </div>
    <ul class="card-content">
      <li v-for="(item, index) in chartData" :key="index" class="card-content-item">
        <div class="card-content-item-title fc">
          <div class="card-content-item-title-img">
            {{ item.title }}
          </div>
          <span v-if="item.title === '极板车间'" class="card-content-item-title-unit">单位：小片</span>
          <span v-else-if="item.title === '充电车间'" class="card-content-item-title-unit">单位：只</span>
          <span v-else class="card-content-item-title-unit">单位：只</span>
        </div>
        <div class="card-content-item-data fb">
          <div v-for="(itm, idx) in item.data" :key="idx" class="data-box">
            <div class="data-title">
              {{ (itm.name !== '' && itm.name !== undefined && itm.name !== null) ? itm.name : '--' }}
            </div>
            <div class="data-value">
              <span
                :style="`${itm.name === '完成率' ? 'color: #FFB000;' : itm.name === '良品率' ? 'color:#00FFE4;' : 'color: #3DDDFF;'}`"
              >
                {{ (itm.value !== '' && itm.value !== undefined && itm.value !== null) ? ((itm.name !== '完成率' &&
                  itm.name
                  !== '良品率') ?
                  regexHandleNum(itm.value) : `${Number(itm.value).toFixed(2)}%`) : '--' }}
              </span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { regexHandleNum } from '@/utils'
import cardTitleBg1 from '@/assets/images/largeScreen/cardTitleBg1.png'
export default {
  name: 'NowProductionMonitoring',
  props: {
    chartData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      cardTitleBg1: cardTitleBg1
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
  width: vw(473);

  .card-title-img {
    width: 100%;
    height: vh(40);
    margin-bottom: vh(7);
    background-image: url('~@/assets/images/largeScreen/cardTitleBg6.png');
    background-size: 100% 100%;
    background-position: center center;
    padding-left: vw(38);
    color: #FFFFFF;
    font-size: vw(18);
  }

  .card-content {
    width: 100%;

    &-item {
      margin-bottom: vh(16);
      text-align: center;

      &:last-child {
        margin-bottom: 0;
      }

      &-title {
        margin-bottom: vh(9);

        &-img {
          background-image: url('~@/assets/images/largeScreen/workshopBg.png');
          background-size: 100% 100%;
          background-position: center center;
          width: vw(122);
          height: vh(33);
          line-height: vh(33);
          color: #CAFFFB;
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          text-align: center;
          font-size: vw(18);
        }

        &-unit {
          width: vw(70);
          display: inline-block;
          position: relative;
          margin-right: vw(-170);
          margin-left: vw(100);
          font-size: vw(12);
          color: #FFFFFF;
          text-align: left;
          margin-top: vw(10);
        }
      }

      &-data {
        width: 100%;
        height: vh(68);
        background: linear-gradient(360deg, rgba(5, 96, 127, 0) 0%, rgba(0, 117, 148, 0.8) 100%);
        border: 1px solid;
        border-image: linear-gradient(352deg, rgba(0, 220, 255, 0.27), rgba(0, 245, 255, 0.69)) 1 1;
        padding: vh(8) 0;

        .data-box {
          width: 33.33%;
          border-right: 1px solid;
          border-image: linear-gradient(180deg, rgba(54, 161, 255, 0), rgba(25, 104, 255, 1), rgba(54, 161, 255, 0)) 1 1;

          &:last-child {
            border-right: none;
          }

          .data-title {
            font-size: vw(16);
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.8);
            line-height: vw(23);
            margin-bottom: vh(4);
          }

          .data-value {
            font-size: vw(20);
            font-family: Helvetica, Helvetica;
            font-weight: bold;
            color: #3DDDFF;
            line-height: vw(24);
          }
        }
      }
    }
  }
}
</style>
