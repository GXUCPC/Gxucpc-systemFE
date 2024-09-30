<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="205px">
        <CommonAside></CommonAside>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <CommonHeader></CommonHeader>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonHeader from "@/components/CommonHeader.vue";
import CommonAside from "@/components/CommonAside.vue";

export default {
  components: {
    CommonHeader,
    CommonAside
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app,
.box {
  height: 100%;
}

.el-container {
  height: 100%;
}

.common-layout {
  height: 100%;
}

.el-main {
  background-color: #edecec;
  width: 100%;
}
</style>