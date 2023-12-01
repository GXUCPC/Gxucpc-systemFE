<template>
  <el-row :gutter="24">
    <el-col :span="8">
      <el-card class="card-das" shadow="always">
        <el-row>
          <el-col :span="10">

            <div class="image-user">
              <img class="avatar" src="@/assets/images/user.png" alt="">
            </div>
          </el-col>
          <el-col :span="14">
            <div class="user-info">
              <p class="admin-info-name">{{ user.Username }}</p>
              <p>{{ user.Power }}</p>
            </div>
          </el-col>
          <el-divider></el-divider>
          <div class="last-info">
            <p>最后登录状态</p>
            <el-form label-position="right" label-width="100px" style="max-width: 460px">
              <el-form-item label="Time">
                {{ formLastInfo.Time }}
              </el-form-item>
              <el-form-item label="IP">
                {{ formLastInfo.IP }}
              </el-form-item>
              <el-form-item label="OS">
                {{ formLastInfo.OS }}
              </el-form-item>
              <el-form-item label="Browser">
                {{ formLastInfo.Browser }}
              </el-form-item>
            </el-form>
          </div>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="14">
      <div class="info-container">
                <span>
                    Operation Log
                </span>
        <hr>
        <ul v-infinite-scroll="load" :infinite-scroll-immediate="true" class="infinite-list" style="overflow: auto">
          <li v-for="i in log.logs" :key="i" class="infinite-list-item">{{ i }}</li>
        </ul>
      </div>
    </el-col>
  </el-row>
  <div class="icp-row">
    <el-row :gutter="24">
      <el-col :span="8">
        <el-card>
          <div class="icp-input icp">
            <el-input v-model="ICP">
              <template #prepend>ICP备案编号</template>
            </el-input>
          </div>
          <div class="icp-save icp">
            <el-button type="success" @click="addICP">保存</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card>
          <div class="icp-input icp">
            <el-input ref="saveTagInput" v-model="inputValue"
                      @keyup.enter="handleInputConfirm" @blur="handleInputConfirm">
              <template #prepend>新增网站首页图片</template>
            </el-input>
          </div>
          <el-tag v-for="tag in dynamicTags" :key="tag" class="mx-1" closable :disable-transitions="false"
                  @close="handleClose(tag)">
            <img class="img-tag" :src="tag" alt="" tabindex="0">
            <img class="img-big" :src="tag" alt="">
          </el-tag>
        </el-card>

      </el-col>
    </el-row>

  </div>
</template>

<script>
import {GetOs, GetCurrentBrowser} from '@/assets/js/userInfoUtils.js'
import {ElLoading} from "element-plus";

export default {
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      user: {
        Username: undefined,
        Power: undefined
      },
      formLastInfo: {
        Time: undefined,
        IP: undefined,
        OS: undefined,
        Browser: undefined
      },
      activeNames: [1],
      log: {
        cout: 10,
        logs: [],
        status: true
      },
      // {
      //         user: 'root',
      //         details: "添加"
      // },

      releases: [],
      ICP: '',
    }
  },
  mounted() {
    this.getUserInfo()
    this.getRelese(this.log.cout)
    this.getImages()
  },
  methods: {
    async addICP() {
      if (this.ICP === '' || this.ICP === undefined || this.ICP === null) {
        this.$message.error("请输入需要添加的ICP备案编号!")
        return
      }
      let loading = ElLoading.service({
        lock: true,
        text: '添加中，请稍后...',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      await this.$http.post("/admin/dashboard/icp?icp=" + this.ICP).then((res) => {
        if (res.statusCode === 50000) {
          this.ICP = ''
          this.$message.success("添加成功")
        } else {
          this.$message.success(res.message)
        }
      })
      loading.close();
    },
    async addImagesURL(url) {
      if (url === '' || url === undefined || url === null) {
        return
      }
      let loading = ElLoading.service({
        lock: true,
        text: '添加中，请稍后...',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      await this.$http.post("/admin/dashboard/images?url=" + url).then((res) => {
        if (res.statusCode === 50000) {
          this.$message.success("添加成功")
          this.getImages()
        } else {
          this.$message.error(res.message)
        }
      })
      loading.close();
    },
    async handleClose(tag) {
      let loading = ElLoading.service({
        lock: true,
        text: '删除中，请稍后...',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      await this.$http.delete("/admin/dashboard/images?url=" + tag).then((res) => {
        if (res.statusCode === 50000) {
          this.$message.success("删除成功")
          this.getImages()
        }
      })
      loading.close();
    },
    getImages() {
      this.$http.get("/admin/dashboard/images").then((res) => {
        if (res.statusCode === 50000) {
          this.dynamicTags.splice(0, this.dynamicTags.length)
          for (let i = 0; i < res.data.length; i++) {
            this.dynamicTags.push(res.data[i].value)
          }
        }
      })
    },
    handleInputConfirm() {
      this.addImagesURL(this.inputValue);
      this.inputVisible = false;
      this.inputValue = '';
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    load() {
      if (this.log.status === false) return;
      this.log.cout += 2
      this.getRelese(this.log.cout)
    },
    getUserInfo() {
      this.user.Username = localStorage.getItem('username')
      this.user.Power = localStorage.getItem('power')
      var now = new Date()
      var time = now.getFullYear() + "-" + ((now.getMonth() + 1) < 10 ? "0" : "") + (now.getMonth() + 1) + "-" + (now.getDate() < 10 ? "0" : "") + now.getDate() + " " + (now.getHours() < 10 ? "0" : "") + now.getHours() + ":" + (now.getMinutes() < 10 ? "0" : "") + now.getMinutes() + ":" + (now.getSeconds() < 10 ? "0" : "") + now.getSeconds()
      this.formLastInfo.Time = time
      this.formLastInfo.OS = GetOs()
      this.formLastInfo.Browser = GetCurrentBrowser()
      this.$http.get('/public/ip').then((res) => {
        this.formLastInfo.IP = res.data
      }).catch(() => {
        this.$message.error('网络故障或系统故障')
      })
    },
    getRelese(num) {
      this.$http.get('/admin/dashboard/operationlog?num=' + num).then((res) => {
        if (this.log.cout !== 10 && res.data.length === this.log.logs.length) {
          this.log.status = false;
          return
        }
        this.log.logs = res.data
      }).catch(() => {
        this.$message.error('网络故障或系统故障')
      })
    }
  }
}
</script>

<style scoped>
.img-tag {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

.img-big {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-55%, -85%);
  display: none;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

:focus + .img-big {
  display: flex;
}

.icp-row {
  margin-top: 20px;
}

.icp {
  display: inline-block;
}

.icp-save {
  margin-left: 20px;
}

.card-das {
  height: 600px;
}

.info-container {
  background-color: white;
  min-width: 100%;
  padding: 20px;
}

.avatar {
  max-width: 100%;
}

.admin-info-name {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #409eff;
}

.user-info {
  margin-left: 20%;
  margin-top: 20;
}

.infinite-list {
  height: 520px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}

.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>