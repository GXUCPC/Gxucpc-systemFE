<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <HomeHeader></HomeHeader>
      </el-header>
      <el-main><router-view></router-view></el-main>
      <el-footer><HomeFooter></HomeFooter></el-footer>
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
.el-main {
  padding: 0;
}
</style>