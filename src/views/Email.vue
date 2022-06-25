<template>
    <div class="email-body">
        <div class="email-search-frame">
            <el-select v-model="emailTable.id" class="m-2" placeholder="选择需要群发邮件的比赛" size="large" style="width:100%"
                clearable>
                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
        </div>
        <div class="input-email">
            <el-input v-model="emailTable.emailData" :autosize="{ minRows: 10 }" type="textarea"
                placeholder="输入邮件正文" />
        </div>
        <div class="submit-foot">
            <el-button type="primary" @click="submitEmail">群发邮件</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            emailTable: {
                id: undefined,
                emailData: undefined
            },
            options: [
                {
                    id: 12333,
                    name: '东信杯第五届广西大学程序设计竞赛'
                }
            ]
        }
    },
    methods: {
        submitEmail() {
            if(!emailTable.id) {
                this.$message.error('没有选择比赛项目')
                return
            } else if(!emailTable.emailData) {
                this.$message.error('缺少邮件正文')
                return
            }
            this.$http.post('/admin/email', emailTable).then((res) => {
                if(res.statusCode === 50000) {
                    this.$message.success(res.message)
                    emailTable.id = undefined
                    emailTable.emailData = undefined
                } else {
                    this.$message.error(res.message)
                }
            }).catch(() => {
                this.$message.error('网络故障或系统故障')
            })
        },
        getContestInfo() {
            this.$http.get('/admin/contest').then((res) => {
                if (res.statusCode === 50000) {
                    // 只需要id和name
                    this.options = res.data
                } else {
                    this.$message.error(res.message)
                }
            })
        }
    },
    mounted() {
        this.getContestInfo()
    }
}

</script>

<style>
.email-body {
    width: 100%;
    height: 100%;
    background-color: #fff;
    text-align: center;
}

.email-search-frame {
    width: 350px;
    margin: 0 auto;
    padding-top: 120px;

}
.input-email {
    width: 50%;
    margin: 0 auto;
    margin-top: 80px;

}
.submit-foot {
    margin-top: 5px;
}
</style>