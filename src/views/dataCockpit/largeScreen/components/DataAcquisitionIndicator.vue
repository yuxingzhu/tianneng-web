<template>
  <div class="data-acquisition-indicator">
    <!-- 充电车间 -->
    <div class="indicator-item indicator-charging-workshop">
      <h4 class="indicator-title" @click="handleOpen({ name: '充电车间', status: chartData.charge })">充电车间：<span
        :class="chartData.charge == '生产中' ? 'indicator-title-status-ing' : chartData.charge == '停产中' ? 'indicator-title-status-done' : 'indicator-title-status-getting'"
      >{{
        chartData.charge }}</span>
      </h4>
      <div class="indicator-img1" />
      <!-- <div class="indicator-content fb">
        <div class="indicator-content-left">
          <div class="indicator-content-left-text">
            开工人数
          </div>
          <div class="indicator-content-left-num">
            {{ regexHandleNum(chartData.chargingWorkshopData.cd) }}人
          </div>
        </div>
        <div class="indicator-content-right">
          <div class="indicator-content-right-top">
            <span class="indicator-content-right-text">在线采集设备数</span>
            <span class="indicator-content-right-num indicator-content-right-online-num">{{
              regexHandleNum(chartData.chargingWorkshopData.inLineEquipmentNum) }}台</span>
          </div>
          <div class="indicator-content-right-bottom">
            <span class="indicator-content-right-text">离线采集设备数</span>
            <span class="indicator-content-right-num indicator-content-right-offline-num">{{
              regexHandleNum(chartData.chargingWorkshopData.offLineEquipmentNum) }}台</span>
          </div>
        </div>
      </div> -->
      <!-- <img :src="dataAcquisitionLineBg2" class="indicator-item-line-img2" alt=""> -->
    </div>
    <!-- 极板车间 -->
    <div class="indicator-item indicator-polar-plate-workshop">
      <h4 class="indicator-title" @click="handleOpen({ name: '极板车间', status: chartData.trigger })">极板车间：<span
        :class="chartData.trigger == '生产中' ? 'indicator-title-status-ing' : chartData.trigger == '停产中' ? 'indicator-title-status-done' : 'indicator-title-status-getting'"
      >{{
        chartData.trigger }}</span></h4>
      <div class="indicator-img1" />
      <!-- <div class="indicator-content fb">
        <div class="indicator-content-left">
          <div class="indicator-content-left-text">
            开工人数
          </div>
          <div class="indicator-content-left-num">
            {{ regexHandleNum(chartData.polarPlateWorkshopData.jb) }}人
          </div>
        </div>
        <div class="indicator-content-right">
          <div class="indicator-content-right-top">
            <span class="indicator-content-right-text">在线采集设备数</span>
            <span class="indicator-content-right-num indicator-content-right-online-num">{{
              regexHandleNum(chartData.polarPlateWorkshopData.inLineEquipmentNum) }}台</span>
          </div>
          <div class="indicator-content-right-bottom">
            <span class="indicator-content-right-text">离线采集设备数</span>
            <span class="indicator-content-right-num indicator-content-right-offline-num">{{
              regexHandleNum(chartData.polarPlateWorkshopData.offLineEquipmentNum) }}台</span>
          </div>
        </div>
      </div>
      <img :src="dataAcquisitionLineBg1" class="indicator-item-line-img1" alt=""> -->
    </div>
    <!-- 装配车间 -->
    <div class="indicator-item indicator-assembly-shop">
      <h4 class="indicator-title" @click="handleOpen({ name: '装配车间', status: chartData.assembly })">装配车间：<span
        :class="chartData.assembly == '生产中' ? 'indicator-title-status-ing' : chartData.assembly == '停产中' ? 'indicator-title-status-done' : 'indicator-title-status-getting'"
      >{{
        chartData.assembly }}</span></h4>
      <div class="indicator-img1" />
      <!-- <div class="indicator-content fb">
        <div class="indicator-content-left">
          <div class="indicator-content-left-text">
            开工人数
          </div>
          <div class="indicator-content-left-num">
            {{ regexHandleNum(chartData.assemblyShopData.zp) }}人
          </div>
        </div>
        <div class="indicator-content-right">
          <div class="indicator-content-right-top">
            <span class="indicator-content-right-text">在线采集设备数</span>
            <span class="indicator-content-right-num indicator-content-right-online-num">{{
              regexHandleNum(chartData.assemblyShopData.inLineEquipmentNum) }}台</span>
          </div>
          <div class="indicator-content-right-bottom">
            <span class="indicator-content-right-text">离线采集设备数</span>
            <span class="indicator-content-right-num indicator-content-right-offline-num">{{
              regexHandleNum(chartData.assemblyShopData.offLineEquipmentNum) }}台</span>
          </div>
        </div>
      </div>
      <img :src="dataAcquisitionLineBg3" class="indicator-item-line-img3" alt=""> -->
    </div>
  </div>
</template>

<script>
import { regexHandleNum } from '@/utils'
import dataAcquisitionLineBg1 from '@/assets/images/largeScreen/dataAcquisitionLineBg1.png'
import dataAcquisitionLineBg2 from '@/assets/images/largeScreen/dataAcquisitionLineBg2.png'
import dataAcquisitionLineBg3 from '@/assets/images/largeScreen/dataAcquisitionLineBg3.png'
export default {
  name: 'DataAcquisitionIndicator',
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      dataAcquisitionLineBg1: dataAcquisitionLineBg1,
      dataAcquisitionLineBg2: dataAcquisitionLineBg2,
      dataAcquisitionLineBg3: dataAcquisitionLineBg3
    }
  },

  mounted() {

  },

  methods: {
    regexHandleNum,
    handleOpen(val) {
      this.$router.push({ path: '/largeScreenWorkshop', query: { name: val.name, status: val.status }})
      // this.$router.push({ name: 'largeScreenWorkshop', params: {user:'david'}})
    }
  }
}
</script>

<style lang="scss" scoped>
.data-acquisition-indicator {
  width: 100%;
  height: vh(685);
  background-image: url('~@/assets/images/largeScreen/factoryBg.png');
  background-size: 100% 100%;
  background-position: center center;
  position: relative;

  .indicator-item {
    width: vw(267);
    height: vh(52);
    background-image: url('~@/assets/images/largeScreen/targetBg1.png');
    background-size: 100% 100%;
    background-position: center center;

    .indicator-title {
      width: 100%;
      height: vh(52);
      font-size: vw(20);
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      line-height: vh(52);
      padding-left: vw(16);

      .indicator-title-status-ing {
        color: #00EC61;
      }

      .indicator-title-status-done {
        color: #FF0000;
      }

      .indicator-title-status-getting {
        color: #00FFF9;
      }
    }

    .indicator-img1{
      width: vw(24);
      height: vh(131);
      margin-left: vw(121);
      background-image: url('~@/assets/images/largeScreen/targetBg2.png');
      background-size: 100% 100%;
      background-position: center center;
    }

    .indicator-content {
      width: 100%;
      height: vh(148);
      padding: vh(4) vw(20) vh(25) vw(28);

      &-left {
        width: vw(98);
        height: 100%;
        text-align: center;

        &-text {
          margin-top: vh(20);
          margin-bottom: vh(32);
          font-size: vw(20);
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          color: #B6CADE;
          line-height: vw(22);
        }

        &-num {
          font-size: vw(24);
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          color: #00FDE2;
          line-height: vw(22);
        }
      }

      &-right {
        width: vw(276);
        height: 100%;
        padding: vh(18) 0 vh(18) vw(30);

        &-top {
          width: 100%;
          height: vh(30);
          margin-bottom: vh(22);
        }

        &-bottom {
          width: 100%;
          height: vh(30);
        }

        &-text {
          font-size: vw(18);
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          color: #B6CADE;
          line-height: vw(22);
          margin-right: vw(11);
        }

        &-num {
          font-size: vw(22);
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          line-height: vw(30);
        }

        &-online-num {
          color: #00FF34;
        }

        &-offline-num {
          color: #FF8000;
        }
      }
    }

  }

  // 充电车间
  .indicator-charging-workshop {
    position: absolute;
    top: vh(23);
    left: vw(291);
    cursor: pointer;

    .indicator-item-line-img2 {
      position: absolute;
      right: vw(-75);
      top: 50%;
      transform: translateY(-50%);
      width: vw(75);
      height: vh(45);
    }
  }

  // 极板车间
  .indicator-polar-plate-workshop {
    position: absolute;
    top: vh(153);
    right: vw(20);
    cursor: pointer;

    .indicator-item-line-img1 {
      position: absolute;
      bottom: vh(-110);
      left: 50%;
      transform: translateX(-50%);
      width: vw(43);
      height: vh(110);
    }
  }

  // 装配车间
  .indicator-assembly-shop {
    position: absolute;
    top: vh(86);
    left: vw(470);
    cursor: pointer;

    .indicator-item-line-img3 {
      position: absolute;
      top: vh(-76);
      left: 70%;
      width: vw(46);
      height: vh(76);
    }
  }

}
</style>
