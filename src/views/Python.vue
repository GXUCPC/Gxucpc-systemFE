<template>
  <div style="width: 100%">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">

        <el-card class="box-card" style="">
          <template #header>
            <div class="card-header">
              <span>榜单爬虫管理</span>
              <el-button style="float: right" type="success" v-if="!pythonStatus" @click="up">激活</el-button>
              <el-button style="float: right" type="danger" v-if="pythonStatus" @click="down">停止</el-button>
            </div>
          </template>
          <el-form :model="Reptile" label-width="200px">
            <el-form-item label="比赛名称" prop="registerContest">
              <!--                        <el-input v-model="formLabelAlign.itemNumber" type="number"></el-input>-->
              <el-select v-model="Reptile.registerContest" filterable="true" remote="true"
                         placeholder="输入并选择比赛名称" :remote-method="remoteMethod" :loading="loading" style="width: 100%" :disabled="pythonStatus">
                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Domjudge API URL">
              <el-input v-model="Reptile.url" placeholder="Domjudge 榜单API地址" :disabled="pythonStatus"/>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" v-if="pythonStatus">
      <el-col :span="12" :offset="6">
        <el-card>
          <template #header>
            <span>活动脚本状态</span>
          </template>
          <el-descriptions column="1">
            <el-descriptions-item label="Contest Name">{{ this.statusBody.name }}</el-descriptions-item>
            <el-descriptions-item label="API URL">{{ this.statusBody.url }}</el-descriptions-item>
            <el-descriptions-item label="Last Update Time">{{ this.statusBody.updateTime }}</el-descriptions-item>
            <el-descriptions-item label="Fault Time">{{ this.statusBody.faultTime }}</el-descriptions-item>
            <el-descriptions-item label="Status">
              <el-tag type="success" size="small" v-if="this.statusBody.faultTime === 0">Running</el-tag>
              <el-tag type="warning" size="small" v-else>Reload</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getFormtTime} from '@/assets/js/DateUtils.js'
export default {
  data() {
    return {
      Reptile: {
        registerContest: undefined,
        url: undefined,
      },
      options:[],
      loading: false,
      pythonStatus: false,
      statusBody: {}
    }
  },
  methods: {
    async remoteMethod(query) {
      if (query) {
        this.loading = true;
        await this.$http.get("/public/download/contests?query=" + query).then((res) => {
          if (res.statusCode === 50000) {
            this.options = res.data
          }
        })
        this.loading = false;
      } else {
        this.options.value = []
      }
    },
    async up() {
      this.$http.post("/admin/schedule/start", this.Reptile).then((res) => {
        if(res.statusCode === 50000) {
          // this.pythonStatus = true
          this.query();
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    async down() {
      this.$http.get("/admin/schedule/stop").then((res) => {
        if(res.statusCode === 50000) {
          // this.pythonStatus = false
          this.query();
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    async query() {
      this.$http.get("admin/schedule/active").then((res) => {
        if(res.statusCode === 50000) {
          this.statusBody = res.data;
          if(!this.statusBody.updateTime) {
            this.statusBody.updateTime = "Not Update"
          } else {
            this.statusBody.updateTime = getFormtTime(this.statusBody.updateTime, true)
          }
          this.pythonStatus = true
        } else {
          this.pythonStatus = false
        }
      })
    },
    async update() {
      setInterval(() => {
        this.query(); // 更新数据
      }, 50000);
    }
  },
  mounted() {
    this.update();
    this.query();
  }
}
</script>