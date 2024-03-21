<template>
  <div class="container">
    <div class="card-title-img fs">
      极板车间
    </div>
    <div class="table-container">
      <el-table
        :data="chartData.startWorkNumArr"
        border
        style="width: 100%;height: 74px;"
        :cell-style="{ borderColor: '#2384DD', padding: '0', color: '#00D6FF', fontSize: '14px' }"
        :header-cell-style="{ borderColor: '#2384DD', padding: '0', color: '#fff', fontSize: '14px' }"
      >
        <el-table-column label="设备总量" min-width="35%" class-name="active-table-column">
          <template>
            <div :style="'color: #00FDE2;'" class="active-table-column-num">
              <!-- {{ (scope.row.startWorkNum !== '' && scope.row.startWorkNum !== undefined && scope.row.startWorkNum !==
              null) ? regexHandleNum(scope.row.startWorkNum) : '--' }} -->
              {{ regexHandleNum((deviceData.offlineSize + deviceData.onlineSize) || 0) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="设备" align="center">
          <el-table-column prop="inLineEquipmentNum" min-width="35%" label="在线">
            <template>
              <div>
                {{ regexHandleNum(deviceData.onlineSize || 0) }}
                <!-- {{ (scope.row.inLineEquipmentNum !== '' && scope.row.inLineEquipmentNum !== undefined &&
                scope.row.inLineEquipmentNum !==
                null) ? regexHandleNum(scope.row.inLineEquipmentNum) : '--' }} -->
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="offLineEquipmentNum" min-width="35%" label="离线">
            <template>
              <div>
                {{ regexHandleNum(deviceData.offlineSize || 0) }}
                <!-- {{ (scope.row.offLineEquipmentNum !== '' && scope.row.offLineEquipmentNum !== undefined &&
                scope.row.offLineEquipmentNum !==
                null) ? regexHandleNum(scope.row.offLineEquipmentNum) : '--' }} -->
              </div>
            </template>
          </el-table-column>
          <el-table-column min-width="30%" label="在线率">
            <template>
              <div>
                {{ regexHandleNum(deviceData.online || 0) }}
                <!-- {{ (scope.row.onlineRate !== '' && scope.row.onlineRate !== undefined && scope.row.onlineRate !== null)
                ?
                `${Number(scope.row.onlineRate).toFixed(2)}%` : '--' }} -->
              </div>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-table
        :data="chartData.proOrderNumArr"
        border
        style="width: 100%;height: 74px;"
        :cell-style="{ borderColor: '#2384DD', padding: '0', color: '#00D6FF', fontSize: '14px' }"
        :header-cell-style="{ borderColor: '#2384DD', padding: '0', color: '#fff', fontSize: '14px' }"
      >
        <el-table-column prop="proOrderNum" label="生产订单数" min-width="35%" class-name="active-table-column">
          <template slot-scope="scope">
            <div class="active-table-column-num" :style="'color: #00FDE2'">{{ (scope.row.proOrderNum !== '' && scope.row.proOrderNum !==
              undefined && scope.row.proOrderNum !==
                null) ? regexHandleNum(scope.row.proOrderNum) : '--' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="设备" align="center">
          <el-table-column prop="thatTimePlannedQuantity" min-width="35%" label="当日计划量">
            <template slot-scope="scope">
              <div>{{ (scope.row.thatTimePlannedQuantity !== '' && scope.row.thatTimePlannedQuantity !== undefined &&
                scope.row.thatTimePlannedQuantity !==
                null) ? regexHandleNum(scope.row.thatTimePlannedQuantity) : '--' }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="thatTimeProductionVolume" min-width="35%" label="当日生产量">
            <template slot-scope="scope">
              <div>{{ (scope.row.thatTimeProductionVolume !== '' && scope.row.thatTimeProductionVolume !== undefined &&
                scope.row.thatTimeProductionVolume !==
                null) ? regexHandleNum(scope.row.thatTimeProductionVolume) : '--' }}</div>
            </template>
          </el-table-column>
          <el-table-column min-width="30%" label="良品率">
            <template slot-scope="scope">
              <div>{{ (scope.row.yieldRate !== '' && scope.row.yieldRate !== undefined && scope.row.yieldRate !== null) ?
                `${Number(scope.row.yieldRate).toFixed(2)}%` : '--' }}</div>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { regexHandleNum } from '@/utils'
export default {
  name: 'PolarPlateWorkshopChart',
  props: {
    chartData: {
      type: Object,
      required: true
    },
    deviceData: {
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
  width: 100%;
  margin-bottom: vh(24);

  .card-title-img {
    width: 100%;
    height: vh(40);
    margin-bottom: vh(4);
    background-image: url('~@/assets/images/largeScreen/cardTitleBg4.png');
    background-size: 100% 100%;
    background-position: center center;
    padding-left: vw(38);
    color: #FFFFFF;
    font-size: vw(18);
  }

  .table-container {
    width: 100%;
    height: vh(258);
    padding: vh(15) vw(15);
  }
}

//透明化整体
.table-container ::v-deep .el-table,
.table-container ::v-deep .el-table__expanded-cell {
  background-color: transparent !important;
  .cell{
    font-size: vw(16);
    padding: 0 vw(10);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.active-table-column-num{
  font-size: vw(18);
}

//透明化行、单元格
.table-container ::v-deep .el-table th,
.table-container ::v-deep .el-table tr,
.table-container ::v-deep .el-table td {
  background-color: transparent !important;
}

.table-container ::v-deep .el-table::before {
  display: none;
}

.table-container ::v-deep .el-table {
  border: solid 1px #2384DD;
}

// 去掉右侧的线
.table-container ::v-deep .el-table--border::after {
  width: 0px !important;
}

.table-container ::v-deep .el-table__header-wrapper {
  background: none !important;
}

.table-container ::v-deep .el-table thead.is-group th.active-table-column.el-table__cell {
  background: rgba(35, 132, 221, 0.3) !important;
}
</style>

