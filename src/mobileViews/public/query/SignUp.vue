<script>
import {reactive} from "vue";

let captureBtn = reactive({
    text: "获取验证码",
    disabled: true
});

function getButtonText() {
    const coldTime = localStorage.getItem("coldTime");
    captureBtn.disabled = !(coldTime === null || new Date().getTime() - coldTime > 60000);
    if (coldTime === null || new Date().getTime() - coldTime > 60000) {
        return "获取验证码";
    } else {
        return `${Math.floor((60000 - (new Date().getTime() - coldTime)) / 1000)} 秒后重试`;
    }
}

setInterval(() => {
    captureBtn.text = getButtonText();
}, 200);

export default {
    data() {
        return {
            form: reactive({
                name: "",
                email: "",
                captcha: "",
            }),
            captureBtn: captureBtn,
            rules: reactive({
                name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
                email: [
                    {required: true, message: '请输入邮箱', trigger: 'blur'},
                    {type: 'email', message: '请输入正确的邮箱', trigger: 'blur'}
                ],
                captcha: [{required: true, message: '请输入验证码', trigger: 'blur'}]
            })
        };
    },
    methods: {
        onSubmit() {
            // TODO: 提交表单请求
        },
        getCaptcha() {
            localStorage.setItem("coldTime", new Date().setTime(new Date().getTime() + 60000));
            this.$http.post("http://123.207.50.47:8082/api/information/sendEmailOtp", {userName: this.form.name, userMail: this.form.email})
                .then(res=>{
                    console.log(res);
                })
        }
    }
};
</script>

<template>
    <div id="container">
        <el-card shadow="always" id="formContainer">
            <template #header>
                <span>查询报名情况</span>
            </template>
            <el-form :model="form" label-width="auto" :rules="rules">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" ref="email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="captcha">
                    <div style="display: flex;width: 100%;">
                        <el-input v-model="form.captcha" placeholder="请输入验证码"></el-input>
                        <el-button type="primary" @click="getCaptcha" style="margin-left: 1em;width: 8em;"
                                   :disabled="captureBtn.disabled || /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(form.email) === false">
                            {{ captureBtn.text }}
                        </el-button>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button style="margin: 0 auto;" type="success" @click="onSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<style scoped>

#container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

#formContainer {
    width: 400px;
}

</style>