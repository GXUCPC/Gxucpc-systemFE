<template>
    <div class="email-body">
        <div class="email-search-frame">
            <el-select v-model="emailTable.id" class="m-2" placeholder="选择需要群发邮件的比赛" size="large" style="width:100%"
                clearable filterable>
                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
        </div>
        <div class="input-email-subject">
            <el-input v-model="emailTable.emailSubject" :autosize="{maxRows: 1}" type="textarea" placeholder="请输入邮件主题"></el-input>
        </div>
        <div class="input-email">
            <el-input v-model="emailTable.emailData" :autosize="{ minRows: 10 , maxRows: 10}" type="textarea"
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
                emailData: undefined,
                emailSubject: undefined
            },
            options: [
                {
                    id: undefined,
                    name: undefined
                }
            ]
        }
    },
    methods: {
        // 提交群发请求
        async submitEmail() {
            if(!this.emailTable.id) {
                this.$message.error('没有选择比赛项目')
                return
            } else if(!this.emailTable.emailData) {
                this.$message.error('缺少邮件正文')
                return
            }
            this.$message.info("为防止运营商垃圾邮件拦截机制，群发邮件减速措施，群发结果稍后会发送至赛事邮箱")
            this.$http.post('/admin/email', this.emailTable, {timeout: 2000000}).then((res) => {
                if(res.statusCode === 50000) {
                    this.$message.success(res.message)
                } else {
                    this.$message.error(res.message)
                }
            })
          this.emailTable.id = undefined
          this.emailTable.emailData = undefined
          this.emailTable.emailSubject = undefined
        },
        // 获得已存在的比赛信息
        getContestInfo() {
            var ask = "?currentPage=1&numberPerPage=99999999"
            this.$http.get('/admin/contest' + ask).then((res) => {
                if (res.statusCode === 50000) {
                    // 只需要id和name
                    this.options = res.data.tableData
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
    margin-top: 10px;

}
.input-email-subject {
    width: 50%;
    margin: 0 auto;
    margin-top: 70px;
}

.submit-foot {
    margin-top: 5px;
}
</style>