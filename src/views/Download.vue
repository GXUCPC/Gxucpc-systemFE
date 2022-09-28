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
<!--                        <el-input v-model="formLabelAlign.itemNumber" type="number"></el-input>-->
                        <el-select v-model="formLabelAlign.itemNumber" filterable="true" remote="true" placeholder="输入并选择比赛名称" :remote-method="remoteMethod" :loading="loading">
                          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
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
            },
            loading: false,
            options: [],
        }
    },
    methods: {

         async remoteMethod(query) {
          if(query){
            this.loading = true;
            await this.$http.get("/public/download/contests?query=" + query).then((res) => {
              if(res.statusCode === 50000) {
                this.options = res.data
              }
            })
            this.loading = false;
          } else {
            this.options.value = []
          }
        },

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
            this.$http.post("/public/download", obj, { responseType: 'blob' }).then(res => {
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
                this.$http.post("/public/download/checkStatus", obj).then(res => {
                    if (res.statusCode === 50000) {
                        this.downloadFile(obj);
                    } else {
                        this.$message.error(res.message);
                    }
                }).catch(() => {
                    this.$message.error('网络故障或系统故障')
                })
            }
        }
    }
}

</script>
<style>
.card {
    padding: 20px;
}

.front {
    text-align: center;
	background-color: #fff;
	border-radius: 20px;
	width: 480px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
}

.title {
    text-align: center;
    font-size: 24px;
    color: #000000;
    margin-bottom: 20px;
}
.el-form-item .el-select {
  width: 100%;
}
</style>
