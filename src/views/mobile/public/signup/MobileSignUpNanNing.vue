<template>
  <div class="mo-formTable">
    <el-card>
      <div class="mo-itemName">
        {{ itemData.itemName }}
      </div>
      <div class="mo-startTime">报名开始时间：{{ itemData.startTime }}</div>
      <div class="mo-endTime">报名结束时间：{{ itemData.endTime }}</div>
      <div class="mo-status">报名状态:
        <el-tag type="success" v-if="itemData.status === '报名进行中'">{{ itemData.status }}</el-tag>
        <el-tag type="danger" v-else-if="itemData.status === '报名已结束'">{{ itemData.status }}</el-tag>
        <el-tag v-else>{{ itemData.status }}</el-tag>
      </div>
      <el-form ref="elForm" :model="formData" :rules="rules" size="default" label-width="100px" label-position="top">
        <el-row>
          <el-col>
            <el-form-item label="队伍名称" prop="team">
              <el-input v-model="formData.team" placeholder="请输入队伍名称" clearable :style="{ width: '100%' }">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="指导教师" prop="teacher">
              <el-input v-model="formData.teacher" placeholder="请输入指导老师" clearable
                        :style="{ width: '100%' }"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="队员1" prop="member1">
              <el-input v-model="formData.member1" placeholder="请输入队员1姓名" clearable
                        :style="{ width: '100%' }"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="队员2" prop="member2">
              <el-input v-model="formData.member2" placeholder="请输入队员2姓名" clearable
                        :style="{ width: '100%' }"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="队员3" prop="member3">
              <el-input v-model="formData.member3" placeholder="请输入队员3姓名" clearable
                        :style="{ width: '100%' }"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="学校" prop="school">
              <el-input v-model="formData.school" placeholder="请输入学校名称" clearable :style="{ width: '100%' }">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="电子邮箱" prop="email">
              <el-input v-model="formData.email" placeholder="请输入电子邮箱" clearable :style="{ width: '100%' }">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="24">
          <el-form-item size="large">
            <el-button type="primary" @click="submitForm">报名</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import {ElLoading} from "element-plus";
import {getFormtTime} from "@/assets/js/DateUtils";

export default {
  data() {
    return {
      itemData: {
        itemName: undefined,
        // YYYY-MM-DD HH:MM:SS
        startTime: undefined,
        endTime: undefined,
        status: undefined,
      },
      formData: {
        team: undefined,
        teacher: undefined,
        member1: undefined,
        member2: undefined,
        member3: undefined,
        school: undefined,
        email: undefined,
      },
      rules: {
        team: [
          {
            required: true,
            message: "请输入队伍名称",
            trigger: "blur",
          },
        ],
        teacher: [
          {
            required: true,
            message: "请输入指导教师名称",
            trigger: "blur",
          },
        ],
        member1: [
          {
            required: true,
            message: "至少有一名参赛队员",
            trigger: "blur",
          },
        ],
        school: [
          {
            required: true,
            message: "请输入学校名称",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入电子邮箱",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    routerToPC() {
      if (document.body.clientWidth >= 960) {
        let path = "/signup/" + this.$route.params.itemID + "/3";
        this.$router.push({path: path})
      }
    },
    checkStatus() {
      // 每秒检查一次报名状态
      setInterval(() => {
        // 兼容IOS
        let stTime = Date.parse(this.itemData.startTime.replace(/-/g, '/'));
        let enTime = Date.parse(this.itemData.endTime.replace(/-/g, '/'));
        let noTime = new Date().getTime();
        if (noTime < stTime) {
          this.itemData.status = "报名未开始";
        } else if (noTime < enTime) {
          this.itemData.status = "报名进行中";
        } else {
          this.itemData.status = "报名已结束";
        }
      }, 1000);
    },
    getItemData() {
      this.$http
          .get("/public/signup/" + this.$route.params.itemID)
          .then((res) => {
            if (res.statusCode === 50000) {
              this.itemData.itemName = res.data.name;
              // 格式化时间戳
              this.itemData.startTime = getFormtTime(res.data.signUpBeginTime, true)
              this.itemData.endTime = getFormtTime(res.data.signUpEndTime, true)
            } else {
              this.$message.error(res.message);
              this.$router.push("/list/signup");
            }
          })
          .catch(() => {
            this.$message.error("网络故障或系统故障");
          });
    },
    async submitForm(ok) {
      if(ok !== 1) ok = 0
      if (this.itemData.status !== "报名进行中") {
        if (this.itemData.status === "报名未开始") {
          this.$message.info("报名未开始，请耐心等待")
        } else if (this.itemData.status === "报名已结束") {
          this.$message.info("报名已结束")
        } else {
          this.$message.error("请勿修改网站文件")
        }
        return
      }
      let valid = await this.$refs["elForm"].validate();
      if (!valid) {
        return
      }

      let status = "报名中";
      let loading = ElLoading.service({
        lock: true,
        text: status + '，请稍后...',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      await this.$http
          .post("/public/signup/nn/" + this.$route.params.itemID, this.formData)
          .then((res) => {
            if (res.statusCode === 50000) {
              this.$message({
                message: res.message,
                duration: 6000,
                type: "success"
              })
              this.resetForm();
            } else if(res.statusCode === 50001) {
              this.$messageBox.alert(res.message, '警告', {
                // if you want to disable its autofocus
                // autofocus: false,
                confirmButtonText: '替换',
                cancelButtonText: '取消',
                callback: (action) => {
                  if(action === 'confirm') {
                    this.submitForm(1)
                  } else {
                    this.$message.info("取消成功")
                  }
                },
              })
            }
            else {
              this.$message.error(res.message)
            }
          })
          .catch(() => {
            this.$message.error("网络故障或系统故障");
          });
      loading.close();
    },
    resetForm() {
      this.$refs["elForm"].resetFields();
      this.imgURL = undefined
    },
  },
  mounted() {
    this.getItemData();
    this.checkStatus();
    this.routerToPC();
    window.onresize = () => {
      return (() => {
        this.routerToPC();
      })();
    };
  },
}
</script>
<style>
.info {
  margin: 0 10px;
}
.signup-key .el-form-item__label {
  color: red;
}

.update-button {
  margin: 10px auto;
  text-align: center;
}

.mo-itemName {
  text-align: center;
  font-size: 22px;
}
.el-message {
  min-width: 0px;
  width: 90%;
}
.el-dialog {
  --el-dialog-width: 90%;
}
</style>
