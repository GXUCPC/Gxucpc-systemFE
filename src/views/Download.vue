<template>
    <div>
        <div class="front">
            <el-card class="card">
                <div class="title">
                    <span>获奖证书下载</span>
                </div>
                <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" :rules="rules"
                    style="max-width: 460px">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="formLabelAlign.name"></el-input>
                    </el-form-item>
                    <el-form-item label="学号/职工号" prop="number">
                        <el-input v-model="formLabelAlign.number" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="比赛编号" prop="itemNumber">
                        <el-input v-model="formLabelAlign.itemNumber" type="itemNumber"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(formLabelAlign)">
                            <el-icon>
                                <Download />
                            </el-icon>下载
                        </el-button>
                        <el-button @click="resetForm(formLabelAlign)">
                            <el-icon>
                                <Refresh />
                            </el-icon>重置
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "downloadSystem",
    data() {
        return {
            formLabelAlign: {
                name: '',
                number: '',
                itemNumber: ''
            },
            labelPosition: 'left',
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 2, max: 13, message: '长度范围 2 to 13', trigger: 'blur' },
                ],
                number: [
                    { required: true, message: '请输入学号/职工号', trigger: 'blur' }
                ],
                itemNumber: [
                    { required: true, message: '请输入比赛编号', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        //Author: cityTS 
        //Date: 2022年6月12日
        //Description: 
        //  @param: Form object corresponding to download information
        //  @return: null
        //  @function: clear form

        resetForm(obj) {
            obj.name = obj.number = obj.itemNumber = '';
        },

        //Author: cityTS 
        //Date: 2022年6月12日
        //Description: 
        //  @param: Form object corresponding to download information
        //  @return: null
        //  @function: Submit a download request to the server. If there is no corresponding file, an error message will be given
        downloadFile(obj) {
            this.$http.post("/download", obj, { responseType: 'blob' }).then(res => {
                const content = res;
                const blob = new Blob([content]);

                const elink = document.createElement('a');
                elink.download = obj.name + '-' + obj.number + '-' + '.pdf';
                elink.style.display = 'none';
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                // 释放URL对象
                URL.revokeObjectURL(elink.href);
                document.body.removeChild(elink);

            }).catch(() => {
                this.$message.error("服务器故障，请联系管理员")
            })

        },
        // 每次获取文件前先预查询一下
        //  1.该比赛不存在
        //  2.该比赛还没开启下载
        //  3.该用户没有获得名次或没有参加
        submitForm(obj) {
            if (!obj.name) {
                this.$message.error('请输入姓名');
            } else if (!obj.number) {
                this.$message.error('请输入学号/职工号');
            } else if (!obj.itemNumber) {
                this.$message.error('请输入比赛编号');
            } else {
                this.$http.post("/download/checkStatus", obj).then(res => {
                    if (res.statusCode === 200) {
                        this.downloadFile(obj);
                    } else {
                        this.$message.error(res.message);
                    }
                })
            }
        }
    }
}

</script>
<style>
.front {
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
}

.title {
    text-align: center;
    font-size: 24px;
    color: #000000;
    margin-bottom: 20px;
}
</style>
