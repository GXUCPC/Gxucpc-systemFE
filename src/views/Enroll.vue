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
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="medium"
        label-width="100px"
        label-position="top"
      >
        <el-row :gutter="200">
          <el-col :span="12">
            <el-form-item label="姓名" prop="userName">
              <el-input
                v-model="formData.userName"
                placeholder="请输入姓名"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学号" prop="userID">
              <el-input
                v-model="formData.userID"
                placeholder="请输入学号"
                :maxlength="10"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="200">
          <el-col :span="12">
            <el-form-item label="学院" prop="userAcademy">
              <el-select
                v-model="formData.userAcademy"
                placeholder="请选择学院"
                clearable
                :style="{ width: '100%' }"
              >
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班级" prop="userClass">
              <el-input
                v-model="formData.userClass"
                placeholder="请输入班级"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="200">
          <el-col :span="12">
            <el-form-item label="QQ号码" prop="userQQ">
              <el-input
                v-model="formData.userQQ"
                placeholder="请输入QQ号码"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电子邮箱" prop="userEmail">
              <el-input
                v-model="formData.userEmail"
                placeholder="请输入电子邮箱"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="200">
          <el-col :span="12">
            <el-form-item label="参赛组" prop="userGroup">
              <el-radio-group v-model="formData.userGroup" size="medium">
                <el-radio-button
                  v-for="(item, index) in userGroupOptions"
                  :key="index"
                  :label="item.value"
                  :disabled="item.disabled"
                  >{{ item.label }}</el-radio-button
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否打星" prop="userStar" required>
              <el-switch
                v-model="formData.userStar"
                active-text="打星参加"
                inactive-text="正常参加"
                :active-value="'打星'"
                :inactive-value="'正常'"
              ></el-switch>
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
  <el-divider>
    <el-icon><star-filled /></el-icon>
  </el-divider>
  <div class="info">
    <h3>比赛信息</h3>
    <p>竞赛名称: {{ itemData.itemName }}</p>
    <p>参赛时间: {{ itemData.itemDate }} {{ itemData.itemTime }}</p>
    <p>主办单位: 广西大学教务处 广西大学计算机与电子信息学院</p>
    <p>
      感谢广西大学计算机与电子信息学院计算机协会、广西大学ICPC/CCPC集训队的技术支持
    </p>
    <h3>参赛对象</h3>
    <p>同步赛(线上赛): 没有报名校内赛的所有学生</p>
    <p>校内赛(线下赛):</p>
    <p>
      &emsp;1.正式组: 经过校内报名的广西大学 {{ range.old }}-{{
        range.latest
      }}级本科生和 {{ range.latest }} 级硕士研究生
    </p>
    <p>&emsp;2.新生组: 经过校内报名的广西大学 2021 级本科生</p>
    <h5>
      *打星:
      因年级限制、其它学校同学、自愿选择等因素限制但是想要参加线下赛的同学可以选择打星参赛。该部分参赛成员的成绩不计入最后终榜。
    </h5>
  </div>
</template>
<script>
import { h } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  components: {},
  props: [],
  data() {
    return {
      range: {
        old: undefined,
        latest: undefined,
      },
      itemData: {
        itemName: "第五届东信杯",
        startTime: "2022-11-1 12:00",
        endTime: "2022-11-12 13:00",
        status: "报名中",
        itemDate: "2022-12-11",
        itemTime: "13:00 -- 17:00",
      },
      formData: {
        userName: undefined,
        userID: undefined,
        userAcademy: undefined,
        userClass: undefined,
        userQQ: undefined,
        userEmail: undefined,
        userGroup: undefined,
        userStar: "正常",
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        userID: [
          {
            required: true,
            message: "请输入学号",
            trigger: "blur",
          },
        ],
        userAcademy: [
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
        userEmail: [
          {
            required: true,
            message: "请输入电子邮箱",
            trigger: "blur",
          },
        ],
        userGroup: [
          {
            required: true,
            message: "参赛组不能为空",
            trigger: "change",
          },
        ],
      },
      userGroupOptions: [
        {
          label: "新生组",
          value: "新生组",
        },
        {
          label: "正式组",
          value: "正式组",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getYear();
    this.getItemData();
  },
  methods: {
    submitInfo(msg) {
        console.log(msg)
      ElMessageBox({
        title: "通知",
        message: h("p", null, [
          h("span", null, msg),
        ]),
        confirmButtonText: "OK",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            done();
          }
        },
      })
    },
    getYear() {
      this.range.latest = new Date(this.itemData.startTime).getFullYear();
      this.range.old = this.range.latest - 3;
    },
    checkStatus() {
      // 两秒检查一次报名状态
      setInterval(() => {
        let stTime = Date.parse(this.itemData.startTime);
        let enTime = Date.parse(this.itemData.endTime);
        let noTime = new Date().getTime();
        if (noTime < stTime) {
          this.itemData.status = "报名未开始";
        } else if (noTime < enTime) {
          this.itemData.status = "报名进行中";
        } else {
          this.itemData.status = "报名已结束";
        }
      }, 2000);
    },
    getItemData() {
      // TODO 获取 itemID对应的比赛信息
      this.$http
        .get("/public/enroll/" + this.$route.params.itemID, this.formData)
        .then(() => {
          if (res.statusCode === 50000) {
            res.itemData = res.itemData;
          } else if (res.statusCode === 50001) {
            this.$message.error(res.message);
            this.$router.push("/");
          }
        })
        .catch(() => {
          this.$message.error("网络故障或系统故障");
        });
    },
    submitForm() {
      // TODO 提交表单
      for(let value in this.formData) {
            if(!this.formData[value]) {
                this.$message.error('缺少必填信息')
                return
            }
      }
      this.$http
        .post("/public/enroll/" + this.$route.params.itemID, this.formData)
        .then((res) => {
          if (res.statusCode === 50000) {
            this.submitInfo(res.message)
            this.resetForm();
          } else {
            this.submitInfo(res.message)
          }
        })
        .catch(() => {
          this.$message.error("网络故障或系统故障");
        });
    },
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
  },
};
</script>
<style>
#app {
  width: 80%;
  margin: 30px auto;
}
.formTable {
  width: 80%;
  margin: 0 auto;
  /* margin-top: 10%; */
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
</style>
