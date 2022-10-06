<script setup>

</script>

<template>
  <router-view/>
</template>

<style>
body {
  margin: 0;
  min-width: 1200px;
}
</style>

<script>
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  methods: {
    displayWindowSize() {
      let w = document.documentElement.clientWidth;
      if(w < 1200) {
        ElMessageBox.confirm(
            '建议使用PC端访问本网站，是否继续访问?',
            'Warning',
            {
              confirmButtonText: '继续访问',
              type: 'warning',
            }
        )
            .then(() => {
              ElMessage({
                type: 'success',
                message: '欢迎来到广西大学程序设计竞赛服务平台',
              })
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: '建议使用PC端访问本网站',
              })
            })
      }
    }
  },
  mounted() {
    this.displayWindowSize();
  }
}

</script>
