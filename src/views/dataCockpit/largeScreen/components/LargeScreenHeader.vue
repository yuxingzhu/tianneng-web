<template>
  <div class="large-screen-header fb">
    <div class="large-screen-header-title">
      <img :src="largeScreenTitle" alt="">
    </div>
    <div class="large-screen-header-tab fb">
      <div class="img-left">
        <img :src="active === true ? largeScreenTitleLeft2 : largeScreenTitleLeft1" alt="" @click="handleHeaderTabLeftClick(true)">
      </div>
      <div class="img-right">
        <img :src="active === false ? largeScreenTitleRight2 : largeScreenTitleRight1" alt="" @click="handleHeaderTabRightClick(false)">
      </div>
    </div>
    <div class="large-screen-header-date">
      {{ nowDate }}
    </div>
  </div>
</template>

<script>
import largeScreenTitle from '@/assets/images/largeScreen/largeScreenTitle.png'
import largeScreenTitleRight1 from '@/assets/images/largeScreen/largeScreenTitleRight1.png'
import largeScreenTitleLeft1 from '@/assets/images/largeScreen/largeScreenTitleLeft1.png'
import largeScreenTitleRight2 from '@/assets/images/largeScreen/largeScreenTitleRight2.png'
import largeScreenTitleLeft2 from '@/assets/images/largeScreen/largeScreenTitleLeft2.png'
export default {
  name: 'LargeScreenHeader',
  props: {
    active: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      nowDate: this.$dayjs().format('YYYY-MM-DD HH:mm:ss'),
      largeScreenTitle: largeScreenTitle,
      largeScreenTitleRight1: largeScreenTitleRight1,
      largeScreenTitleLeft1: largeScreenTitleLeft1,
      largeScreenTitleRight2: largeScreenTitleRight2,
      largeScreenTitleLeft2: largeScreenTitleLeft2

    }
  },
  created() {
    setInterval(() => {
      this.nowDate = this.$dayjs().format('YYYY-MM-DD HH:mm:ss')
    }, 1000)
  },
  mounted() {
    setInterval(() => {
      this.nowDate = this.$dayjs().format('YYYY-MM-DD HH:mm:ss')
    }, 1000)
  },

  methods: {
    handleHeaderTabLeftClick(val) {
      this.$emit('changeActive', val)
    },
    handleHeaderTabRightClick(val) {
      this.$emit('changeActive', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.large-screen-header {
  width: 100%;
  height: vh(108);
  background-image: url('~@/assets/images/largeScreen/largeScreenTitleBg.png');
  background-size: 100% 100%;
  background-position: center center;
  &-title {
    width: vw(407);
    height: vh(60);
    margin-left: vw(78);
    & > img {
      width: 100%;
      height: 100%;
    }
  }
  &-date {
    width: vw(242);
    font-size: vw(20);
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    color: #fff;
    letter-spacing: vh(2);
    margin-right: vw(10);
  }
  &-tab {
    width: vw(508);
    height: vh(50);
    margin-left: vw(130);
    cursor: pointer;
    .img-left {
      width: vw(230);
      height: vh(50);
      z-index: 10;
      & > img {
        width: 100%;
        height: 100%;
      }
    }
    .img-right {
      width: vw(508);
      height: vh(50);
      margin-left: vw(-230);
      & > img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

</style>
