<template>
  <div class="pageHead">
    <div class="itemName">
      {{ itemData.itemName }}
    </div>
    <div class="startEndTime">
      <div class="startTime">报名开始时间：{{ itemData.startTime }}</div>
      <div class="status">{{ itemData.status }}</div>
      <div class="endTime">报名结束时间：{{ itemData.endTime }}</div>
    </div>
  </div>

  <div class="formTable">
    <el-card>
      <el-form ref="elForm" :model="formData" :rules="rules" size="default" label-width="100px" label-position="top">
        <el-row :gutter="200">
          <el-col :span="12">
            <el-form-item label="姓名" prop="userName">
              <el-input v-model="formData.userName" placeholder="请输入姓名" clearable :style="{ width: '100%' }">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学号" prop="userId">
              <el-input v-model="formData.userId" placeholder="请输入学号" :maxlength="10" clearable
                        :style="{ width: '100%' }"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="200">
          <el-col :span="12">
            <el-form-item label="学院" prop="userCourse">
              <el-select v-model="formData.userCourse" placeholder="请选择学院" clearable :style="{ width: '100%' }">
                <el-option v-for="item in courseOptions" :key="item" :label="item" :value="item"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班级" prop="userClass">
              <el-input v-model="formData.userClass" placeholder="请输入班级" clearable :style="{ width: '100%' }">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="200">
          <el-col :span="12">
            <el-form-item label="QQ号码" prop="userQQ">
              <el-input v-model="formData.userQQ" placeholder="请输入QQ号码" clearable :style="{ width: '100%' }">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电子邮箱" prop="userMail">
              <el-input v-model="formData.userMail" placeholder="请输入电子邮箱" clearable :style="{ width: '100%' }">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="200">
          <el-col :span="12">
            <el-form-item label="手机号" prop="userPhone">
              <el-input v-model="formData.userPhone" placeholder="请输入手机号" clearable :style="{ width: '100%' }">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别" prop="userSex">
              <el-radio-group v-model="formData.userSex" size="default">
                <el-radio-button v-for="(item, index) in userSexOptions" :key="index" :label="item.value"
                                 :disabled="item.disabled">{{ item.label }}
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="折扣" prop="isDiscount">
              <el-radio-group v-model="formData.isDiscount">
                <el-radio label='1' size="large">无折扣</el-radio>
                <el-radio label='2' size="large">九折</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="24">
          <el-form-item label="交易记录" prop="imgURI">
            <el-input disabled v-model="formData.imgURI" placeholder="请上传交易记录图片" clearable
                      :style="{ width: '100%' }">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-upload
              class="avatar-uploader"
              :action="getBackURL()"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :accept="'.jpg,.png'"
          >
            <img v-if="imgURL" :src="imgURL" class="avatar"/>
            <el-icon v-else class="avatar-uploader-icon">
              <Plus/>
            </el-icon>
          </el-upload>
        </el-col>
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
import store from "@/assets/js/store";
import {ElLoading} from "element-plus";
import {getFormtTime} from "@/assets/js/DateUtils";

export default {
  data() {
    return {
      imgURL: undefined,
      itemData: {
        itemName: undefined,
        // YYYY-MM-DD HH:MM:SS
        startTime: undefined,
        endTime: undefined,
        status: undefined,
      },
      formData: {
        userName: undefined,
        userId: undefined,
        userCourse: undefined,
        userClass: undefined,
        userQQ: undefined,
        userMail: undefined,
        userSex: undefined,
        userPhone: undefined,
        isDiscount: '1',
        imgURI: undefined
      },
      courseOptions: [
        "机械工程学院",
        "电气工程学院",
        "土木建筑工程学院",
        "化学化工学院",
        "资源环境与材料学院",
        "轻工与食品工程学院",
        "计算机与电子信息学院",
        "海洋学院",
        "生命科学与技术学院",
        "农学院",
        "动物科学技术学院",
        "林学院",
        "数学与信息科学学院",
        "物理科学与工程技术学院",
        "文学院",
        "新闻与传播学院",
        "外国语学院",
        "艺术学院",
        "公共管理学院",
        "工商管理学院",
        "法学院",
        "马克思主义学院",
        "体育学院",
        "医学院",
        "继续教育学院",
        "国际学院",
        "经济学院/中国—东盟金融合作学院",
        "非本校生"
      ],
      rules: {
        userName: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        userId: [
          {
            required: true,
            message: "请输入学号",
            trigger: "blur",
          },
        ],
        userCourse: [
          {
            required: true,
            message: "请选择学院",
            trigger: "change",
          },
        ],
        userClass: [
          {
            required: true,
            message: "请输入班级",
            trigger: "blur",
          },
        ],
        userQQ: [
          {
            required: true,
            message: "请输入QQ号码",
            trigger: "blur",
          },
        ],
        userMail: [
          {
            required: true,
            message: "请输入电子邮箱",
            trigger: "blur",
          },
        ],
        userSex: [
          {
            required: true,
            message: "性别不能为空",
            trigger: "change",
          },
        ],
        userPhone: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur",
          },
        ],
        isDiscount: [
          {
            required: true,
            message: "折扣选项不能为空",
            trigger: "blur"
          }
        ],
        imgURI: [
          {
            required: true,
            message: "交易记录不能为空",
            trigger: "blur"
          }
        ]
      },
      userSexOptions: [
        {
          label: "男",
          value: "男",
        },
        {
          label: "女",
          value: "女",
        }
      ]
    };
  },
  methods: {
    handleAvatarSuccess(response, uploadFile) {
      this.formData.imgURI = response.data
      this.imgURL = this.getBackURL() + "/" + response.data
    },
    getBackURL() {
      return store.state.backURL + "/public/image"
    },
    routerToMobile() {
      if (document.body.clientWidth < 960) {
        let path = "/mobile/signup/" + this.$route.params.itemID + "/2";
        this.$router.push({path: path})
      }
    },
    jsonClone(obj) {
      return JSON.parse(JSON.stringify(obj));
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
          .post("/public/signup/lq/" + this.$route.params.itemID + '?ok=' + ok, this.formData)
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
    this.routerToMobile();
    window.onresize = () => {
      return (() => {
        this.routerToMobile();
      })();
    };
  },
}
</script>
<style scoped>
.signup-key .el-form-item__label {
  color: red;
}

.formTable {
  width: 80%;
  margin: 0 auto;
  margin-top: 50px;
}

.pageHead {
  font-size: 30px;
  text-align: center;
}

.startEndTime {
  font-size: 18px;
  margin: 1% 0;
}

.startTime {
  display: inline;
  float: left;
  margin-left: 5%;
}

.endTime {
  display: inline;
  float: right;
  margin-right: 5%;
}

.status {
  display: inline;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>