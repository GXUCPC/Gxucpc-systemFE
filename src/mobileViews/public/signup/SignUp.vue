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
          <el-col :span="12">
            <el-form-item class="signup-key" label="密钥(用于查询比赛账号和密码,请牢记！)" prop="key">
              <el-input v-model="formData.key" placeholder="请输入密钥" clearable :style="{ width: '100%' }">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="200">
          <el-col :span="8">
            <el-form-item label="参赛组" prop="group">
              <el-radio-group v-model="formData.group" size="default">
                <el-radio-button v-for="(item, index) in groupOptions" :key="index" :label="item.value"
                                 :disabled="item.disabled">{{ item.label }}
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别" prop="userSex">
              <el-radio-group v-model="formData.userSex" size="default">
                <el-radio-button v-for="(item, index) in userSexOptions" :key="index" :label="item.value"
                                 :disabled="item.disabled">{{ item.label }}
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否打星" prop="star">
              <el-switch v-model="formData.star" active-text="打星参加" inactive-text="正常参加" :active-value="1"
                         :inactive-value="0"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="200">
          <el-col>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formData.remark" maxlength="500" placeholder="可以写一些你想说的话" show-word-limit
                        type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="24">
          <el-form-item size="large">
            <el-button type="primary" @click="submitForm">{{ this.submitStatus === true ? "修改" : "报名" }}</el-button>
            <el-button @click="resetForm">重置</el-button>
            <el-button type="success" @click="backSignup" v-if="this.submitStatus">返回报名</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>
  </div>
  <div class="update-button" v-if="this.switchList.length > 0">
    您已提交本次比赛的报名信息，是否修改？
    <el-tag @click="updateForm" type="success" style="cursor:pointer">修改</el-tag>
  </div>
  <el-divider>
    <el-icon>
      <star-filled/>
    </el-icon>
  </el-divider>
  <div class="info">
    <h3>比赛信息</h3>
    <p>竞赛名称: {{ itemData.itemName }}</p>
    <p>主办单位: 广西大学教务处</p>
    <p>承办单位: 广西大学计算机与电子信息学院</p>
    <p>赛事赞助: 中国—东盟信息港股份有限公司</p>
    <p>
      感谢广西大学计算机与电子信息学院计算机协会、广西大学ICPC/CCPC集训队的技术支持
    </p>
    <h3>参赛对象</h3>
    <p>同步赛(线上赛): 对参赛者的学校、身份不做要求</p>
    <p>校内赛(线下赛):</p>
    <p>
      &emsp;1.正式组: 经过校内报名的广西大学 {{ range.old }}-{{
        range.latest
      }}级本科生和 {{ range.latest }} 级硕士研究生
    </p>
    <p>&emsp;2.新生组: 经过校内报名的广西大学 {{ range.latest }} 级本科生</p>
    <h5>
      *打星:
      因年级限制、其它学校同学、自愿选择等因素限制但是想要参加线下赛的同学可以选择打星参赛。该部分参赛成员的成绩不计入最后终榜。
    </h5>
  </div>
  <div class="switch-update">
    <el-dialog v-model="dialogTableVisible" title="选择修改的报名记录">
      <el-table :data="switchList">
        <el-table-column prop="userName" label="姓名"/>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" @click="handUpdate(scope.$index)">修改信息</el-button>
            <el-button type="warning" @click="handDelete(scope.$index)">取消报名</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import {getFormtTime} from "@/assets/js/DateUtils.js"
import {ElLoading} from "element-plus";

export default {
  components: {},
  props: [],
  data() {
    return {
      submitStatus: false,
      switchList: [],
      dialogTableVisible: false,
      range: {
        old: undefined,
        latest: undefined,
      },
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
        group: undefined,
        star: 0,
        userSex: undefined,
        userPhone: undefined,
        key: undefined,
        remark: undefined
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
        group: [
          {
            required: true,
            message: "参赛组不能为空",
            trigger: "change",
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
        key: [
          {
            required: true,
            message: "密钥不能为空",
            trigger: "blur",
          },
        ],
      },
      groupOptions: [
        {
          label: "新生组",
          value: 0,
        },
        {
          label: "正式组",
          value: 1,
        },
      ],
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
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    this.getItemData();
    this.checkStatus();
    this.getIsSubmitted();
    this.routerToMobile();
    window.onresize = () => {
      return (() => {
        this.routerToMobile();
      })();
    };
  },
  methods: {
    routerToMobile() {
      if(document.body.clientWidth < 960) {
        let path = "/mobile/signup/" +this.$route.params.itemID + "/1";
        this.$router.push({path: path})
      }
    },
    jsonClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    async getIsSubmitted() {
      let client = localStorage.getItem("client")
      if(client.length !== 36) {
        return
      }
      await this.$http.get("/public/signup/history?id=" + this.$route.params.itemID).then((res) => {
        if (res.statusCode === 50000) {
          this.switchList = res.data;
          for(let idx = 0; idx < this.switchList.length; idx++) {
            if(this.switchList[idx].group === true) {
              this.switchList[idx].group = 1
            } else if(this.switchList[idx].group === false) {
              this.switchList[idx].group = 0;
            }
          }
        }
      })
    },
    backSignup() {
      this.submitStatus = false;
      this.resetForm();
    },
    handUpdate(idx) {
      this.submitStatus = true;
      this.dialogTableVisible = false;
      this.formData = this.jsonClone(this.switchList[idx])
    },
    async handDelete(idx) {
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
      let loading = ElLoading.service({
        lock: true,
        text: '取消报名中，请稍后...',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      await this.$http.put("/public/signup/history/cancel?id=" + this.switchList[idx].informationId + "&itemID=" + this.$route.params.itemID).then((res) => {
        if (res.statusCode === 50000) {
          this.$message.success(res.message);
        } else {
          this.$message.error(res.message)
        }
        this.getIsSubmitted();
      })
      loading.close();
    },
    updateForm() {
      this.dialogTableVisible = true;
    },
    getYear() {
      this.range.latest = new Date(this.itemData.startTime).getFullYear();
      if (new Date(this.itemData.startTime).getMonth() < 8) this.range.latest--;
      this.range.old = this.range.latest - 3;
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
      // TODO 获取 itemID对应的比赛信息
      this.$http
          .get("/public/signup/" + this.$route.params.itemID)
          .then((res) => {
            if (res.statusCode === 50000) {
              this.itemData.itemName = res.data.name;
              // 格式化时间戳
              this.itemData.startTime = getFormtTime(res.data.signUpBeginTime, true)
              this.itemData.endTime = getFormtTime(res.data.signUpEndTime, true)
              this.getYear()
            } else {
              this.$message.error(res.message);
              this.$router.push("/list/signup");
            }
          })
          .catch(() => {
            this.$message.error("网络故障或系统故障");
          });
    },
    async submitForm() {
      let client = localStorage.getItem("client")
      if(client.length !== 36) {
        this.$message.error("您的浏览器无法正常使用，建议使用最新版的Google浏览器")
        return
      }
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
      if (this.submitStatus === true) status = "修改中";
      let loading = ElLoading.service({
        lock: true,
        text: status + '，请稍后...',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      if (this.submitStatus === false) {
        await this.$http
            .post("/public/signup/" + this.$route.params.itemID, this.formData)
            .then((res) => {
              if (res.statusCode === 50000) {
                this.$message({
                  message: res.message,
                  duration: 6000,
                  type: "success"
                })
                this.resetForm();
              } else {
                this.$message.error(res.message)
              }
            })
            .catch(() => {
              this.$message.error("网络故障或系统故障");
            });
      } else {
        await this.$http
            .put("/public/signup/" + this.$route.params.itemID, this.formData)
            .then((res) => {
              if (res.statusCode === 50000) {
                this.$message.success(res.message)
                this.resetForm();
                this.submitStatus = false;
              } else {
                this.$message.error(res.message)
              }
            })
            .catch(() => {
              this.$message.error("网络故障或系统故障");
            });
      }
      loading.close();
      await this.getIsSubmitted();
    },
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
  }
};
</script>
<style>
.signup-key .el-form-item__label {
  color: red;
}

.update-button {
  margin: 10px auto;
  text-align: center;
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
.info {
  width: 80%;
  margin: 0 auto;
}
</style>
