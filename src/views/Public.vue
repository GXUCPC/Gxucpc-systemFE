<template>
  <div class="common-layout">
    <el-container style="height:100%;" direction="vertical">
      <el-header>
        <HomeHeader></HomeHeader>
      </el-header>
      <el-main class="home-main" style="overflow:visible">
        <div class="main-body">
          <router-view></router-view>
        </div>
      </el-main>
      <el-footer>
        <HomeFooter></HomeFooter>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import HomeHeader from '@/components/HomeHeader.vue'
import HomeFooter from '@/components/HomeFooter.vue'

export default {
  components: {
    HomeHeader,
    HomeFooter
  }
}
</script>

<style>
.home-main {
  padding: 0;
  width: 100%;
  margin: 0 auto;
  background-color: #f5f7fa;
}

.main-body {
  width: 100%;
  margin: 0 auto;
}

html, body, #app, .common-layout, .el-container {
  /* 铺屏 */
  padding: 0px;
  margin: 0px;
  height: 100%;
}
.common-layout {
  min-width: 1200px;
}
</style>
