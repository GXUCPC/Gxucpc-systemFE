<template>
  <div class="login" clearfix>
    <div class="login-wrap">
      <el-card>
        <el-row type="flex" justify="center">
          <el-form
            ref="loginForm"
            :model="user"
            :rules="rules"
            status-icon
            label-width="80px"
          >
            <h3>GXUCPC-登录</h3>
            <hr />
            <el-form-item prop="username" label="用户名">
              <el-input
                v-model="user.username"
                placeholder="请输入用户名"
                prefix-icon
              ></el-input>
            </el-form-item>
            <el-form-item id="password" prop="password" label="密码">
              <el-input
                v-model="user.password"
                show-password
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <router-link to="/">回到首页</router-link>
            <el-form-item>
              <el-button type="primary" icon="el-icon-upload" @click="doLogin"
                >登 录</el-button
              >
            </el-form-item>
          </el-form>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  created() {},
  methods: {
    doLogin() {
      if (!this.user.username) {
        this.$message.error("请输入用户名！");
        return;
      } else if (!this.user.password) {
        this.$message.error("请输入密码！");
        return;
      } else {
        //校验用户名和密码是否正确;
        this.$http
          .post("/login/", this.user)
          .then((res) => {
            if (res.statusCode === 50000) {
              localStorage.setItem("token", res.data.token);
              this.$router.push({ path: "/admin" });
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(() => {
            this.$message.error("服务器故障或网络异常，请稍后重试");
          });
      }
    },
  },
};
</script>

<style scoped>

.login {
  background: url("../assets/images/bg.jpg") no-repeat;
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;

}

.login-wrap {
  width: 400px;
  height: 300px;
  margin: 215px auto;
  overflow: hidden;
}

#password {
  margin-bottom: 5px;
}

h3 {
  color: #0babeab8;
  font-size: 24px;
}

hr {
  background-color: #444;
  margin: 20px auto;
}

a {
  text-decoration: none;
  color: #aaa;
  font-size: 15px;
}

a:hover {
  color: rgb(80, 80, 255);
}

.el-button {
  width: 100%;
}
</style>
