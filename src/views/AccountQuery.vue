<template>
  <div class="account-query-body">

  <div class="account-query" v-if="resultOrQuery <= 0">
    <el-card shadow="always">
      <template #header>
        <p>比赛账号&密码查询</p>
        <br/>
        <p>对外查询</p>
      </template>
      <div class="account-query-item">
        <el-form ref="query-form" label-position="top" label-width="100px" :model="queryForm"
                 :rules="rules"
                 style="max-width: 460px">
          <el-form-item label="学号" prop="number">
            <el-input v-model="queryForm.number" type="number" placeholder="请输入学号"></el-input>
          </el-form-item>
          <el-form-item label="比赛" prop="itemNumber">
            <!--                        <el-input v-model="formLabelAlign.itemNumber" type="number"></el-input>-->
            <el-select v-model="queryForm.itemNumber" filterable="true" remote="true"
                       placeholder="输入并选择比赛名称" :remote-method="remoteMethod" :loading="loading" style="width: 100%">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密钥" prop="key">
            <el-input v-model="queryForm.key" placeholder="请输入密钥"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryResult()">
              <el-icon>
                <Search/>
              </el-icon>
              查询
            </el-button>
          </el-form-item>
        </el-form>
        <div v-if="resultOrQuery === -1" class="no-result">{{ errMessage }}</div>
      </div>
    </el-card>
  </div>
  <div class="query-result" v-if="resultOrQuery === 1">
    <el-card>
      <div class="query-criteria">
        <el-input v-model="criteria" disabled>
          <template #prepend>查询条件: </template>
          <template #append>
            <el-button type="success" @click="back">返回</el-button>
          </template>
        </el-input>
      </div>
      <div class="user-result">
        <p class="result-title"><span class="hx">*</span>学号</p>
        <p class="result-data">{{ queryData.player.userId }}</p>
      </div>
      <hr>
      <div class="user-result">
        <p class="result-title"><span class="hx">*</span>姓名</p>
        <p class="result-data">{{ queryData.player.userName }}</p>
      </div>
      <hr>
      <div class="user-result">
        <p class="result-title"><span class="hx">*</span>Domjudge账号</p>
        <p class="result-data">{{ queryData.username }}</p>
      </div>
      <hr>
      <div class="user-result">
        <p class="result-title"><span class="hx">*</span>Domjudge密码</p>
        <p class="result-data">{{ queryData.password }}</p>
      </div>
    </el-card>
  </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      criteria: undefined,
      resultOrQuery: 0,
      queryForm: {
        number: undefined,
        itemNumber: undefined,
        key: undefined
      },
      rules: {
        number: [
          {required: true, message: '请输入学号', trigger: 'blur'},
          {min: 10, max: 10, message: '学号长度为10', trigger: 'blur'},
        ],
        itemNumber: [
          {required: true, message: '请输入比赛编号', trigger: 'blur'}
        ],
        key: [
          {required: true, message: '请输入密钥', trigger: 'blur'}
        ]
      },
      loading: false,
      options: [],
      errMessage: undefined,
      queryData:{}
    }
  },
  methods: {
    back() {
      this.resultOrQuery = 0;
      this.queryData = {};
    },
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
    async queryResult() {
      let vis = await this.$refs['query-form'].validate();
      if(!vis) return;
      this.$http.get("/public/query/" + this.queryForm.itemNumber + "/" + this.queryForm.number + "/" + this.queryForm.key).then((res) => {
        if(res.statusCode === 50000) {
          this.resultOrQuery = 1;
          this.queryData = res.data;
          this.criteria = "学号:" + this.queryForm.number + "&比赛编号:" + this.queryForm.itemNumber + "&密钥:" + this.queryForm.key;
          this.$refs['query-form'].resetFields();
        } else {
          this.resultOrQuery = -1;
          this.errMessage = res.message;
        }
      })
    }
  }
}
</script>

<style>
.account-query-body {
  height: 100%;
  width: 100%;
  margin: 0 auto;
  background: url("@/assets/images/query-bg.png") center top;
}
.account-query {
  margin: 0 auto 60px;
  position: relative;
  top: 15vh;
  width: 460px;
  /*background-color: #ffffff;*/
  box-shadow: 0px 4px 4px 0px rgb(177 185 193 / 63%);
  /*border-radius: 4px;*/
  overflow: hidden;
}
.account-query .el-card__header {
  background-color: #0791ff;
  height: 100px;
  color: white;
  text-align: center;
  font-size: 18px;
}
.account-query .el-card__header p {
  margin: 0;
}
.account-query-item {
  height: 350px;
}
.account-query-item .el-form {
  margin: 0 auto;
  margin-top: 30px;
  width: 80%;
}
.no-result {
  color: red;
  margin: 0 auto;
  text-align: center;
  font-size: 12px;
}
.query-result {
  margin: 0 auto;
  text-align: center;
  width: 70%;
  max-width: 850px;
}
.user-result {
  text-align: left;
}
.user-result .result-title {
  font-weight:bolder;
}
.user-result .result-title .hx {
  color: red;
}
</style>