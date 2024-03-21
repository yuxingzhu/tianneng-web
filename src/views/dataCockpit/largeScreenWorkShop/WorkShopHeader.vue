<!--
  页面类型:
  文件名:WorkShopHeader
  菜单路径:
  功能描述:
  创建时间:2024-02-28 18:59:51
-->
<template>
  <div class="large-screen-header fb">
    <div class="large-screen-header-title">
      <div class="large-screen-header-title-left">
        <img :src="chartData.name === '充电车间' ? title1 : chartData.name === '极板车间' ? title2 : title3" alt="">
      </div>
      <div class="large-screen-header-title-right">
        <img
          :src="chartData.status === '生产中' ? titleStatus1 : chartData.status === '获取中' ? titleStatus2 : titleStatus3"
          alt=""
        >
      </div>
    </div>

    <div class="large-screen-header-date">
      <div class="large-screen-header-date-back" @click="() => this.$router.go(-1)">返回</div>
      <!-- <el-button type="primary" size="default" @click="() => this.$router.go(-1)">返回</el-button> -->
    </div>
  </div>
</template>

<script>
import title1 from '@/assets/images/largeScreenWorkshop/title1.png'
import title2 from '@/assets/images/largeScreenWorkshop/title2.png'
import title3 from '@/assets/images/largeScreenWorkshop/title3.png'
import titleStatus1 from '@/assets/images/largeScreenWorkshop/titleStatus1.png'
import titleStatus2 from '@/assets/images/largeScreenWorkshop/titleStatus2.png'
import titleStatus3 from '@/assets/images/largeScreenWorkshop/titleStatus3.png'

export default {
  name: 'LargeScreenHeader',
  props: {
    active: {
      default: true,
      type: Boolean
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      nowDate: this.$dayjs().format('YYYY-MM-DD HH:mm:ss'),
      title1: title1,
      title2: title2,
      title3: title3,
      titleStatus1: titleStatus1,
      titleStatus2: titleStatus2,
      titleStatus3: titleStatus3

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
  background-image: url('~@/assets/images/largeScreenWorkshop/titlebg.png');
  background-size: 100% 100%;
  background-position: center center;

  &-title {
    width: vw(659);
    height: vh(60);
    margin-left: vw(78);
    color: #fff;
    font-size: vw(40);
    display: flex;

    &-left {
      width: vw(406);
      height: vh(50);
      z-index: 10;

      &>img {
        width: 100%;
        height: 100%;
      }
    }

    &-right {
      width: vw(253);
      height: vh(50);
      z-index: 10;
      margin-left: vw(50);

      &>img {
        width: 80%;
        height: 80%;
        margin-top: vh(5);
      }
    }

  }

  &-date {
    &-back {
      width: vw(176);
      height: vh(103);
      margin-right: vw(28);
      background-image: url('~@/assets/images/largeScreenWorkshop/titleBack.png');
      background-size: 100% 100%;
      background-position: center center;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      font-size: vw(22);
      color: #00FDE2;
      cursor: pointer;
    }
  }

}
</style>
