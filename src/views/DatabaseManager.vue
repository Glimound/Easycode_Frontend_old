<template>
  <div class="home">
    <DHeader />
    <main>
      <div class="left">
        <DSidebar :appsData="appsData"/>
      </div>
      <div class="center">
        <DManager />
      </div>
    </main>
  </div>
</template>

<script>
import DHeader from '@/components/DatabaseManager/DHeader'
import DSidebar from '@/components/DatabaseManager/DSideBar'
import DManager from '@/components/DatabaseManager/DManager'
import { appsDataTest, tableData1_1, tableData1_2 } from '@/test/testData'
import { mapState } from 'vuex'

export default {
  components: {
    DHeader,
    DSidebar,
    DManager
  },
  computed: {
    ...mapState(['appsData'])
  },
  beforeCreate() {
    // 初始化测试数据
    if (!localStorage.getItem('appsData')) {
      localStorage.setItem('appsData', JSON.stringify(appsDataTest))
    }
    if (!localStorage.getItem('tableData1_1')) {
      localStorage.setItem('tableData1_1', JSON.stringify(tableData1_1))
    }
    if (!localStorage.getItem('tableData1_2')) {
      localStorage.setItem('tableData1_2', JSON.stringify(tableData1_2))
    }

    this.$store.dispatch('getAppsData', 1)
  }
}
</script>

<style lang="scss">
.home {
  height: 100vh;
  background: #f5f5f5;

  main {
    height: calc(100% - 64px);
    position: relative;

    .left {
      position: absolute;
      height: 100%;
      width: 250px;
      left: 0;
      top: 0;
      background-color: white;

      & > div {
        overflow: auto;
      }
    }

    .center {
      margin-left: 250px;
      background: #f5f5f5;
      height: 100%;
      overflow: auto;
    }
  }
}
</style>