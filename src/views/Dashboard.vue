<template>
    <el-row :gutter="24">
        <el-col :span="8">
            <el-card shadow="always">
                <el-row>
                    <el-col :span="10">

                        <div class="image-user">
                            <img class="avatar" src="@/assets/images/user.png" alt="">
                        </div>
                    </el-col>
                    <el-col :span="14">
                        <div class="user-info">
                            <p class="admin-info-name">{{ user.Username }}</p>
                            <p>{{ user.Power }}</p>
                        </div>
                    </el-col>
                    <el-divider></el-divider>
                    <div class="last-info">
                        <p>最后登录状态</p>
                        <el-form label-position="right" label-width="100px" style="max-width: 460px">
                            <el-form-item label="Time">
                                {{ formLastInfo.Time }}
                            </el-form-item>
                            <el-form-item label="IP">
                                {{ formLastInfo.IP }}
                            </el-form-item>
                            <el-form-item label="OS">
                                {{ formLastInfo.OS }}
                            </el-form-item>
                            <el-form-item label="Browser">
                                {{ formLastInfo.Browser }}
                            </el-form-item>
                        </el-form>
                    </div>
                </el-row>
            </el-card>
        </el-col>
        <el-col :span="14">
            <div class="info-container">
                <span>
                    Operation Log
                </span>
                <hr>
                <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
                    <li v-for="i in log.logs" :key="i" class="infinite-list-item">{{ i }}</li>
                </ul>
            </div>
        </el-col>
    </el-row>

</template>

<script>
import { GetOs, GetCurrentBrowser } from '@/assets/js/userInfoUtils.js'
export default {
    data() {
        return {
            user: {
                Username: undefined,
                Power: undefined
            },
            formLastInfo: {
                Time: undefined,
                IP: undefined,
                OS: undefined,
                Browser: undefined
            },
            activeNames: [1],
            log: {
                cout: 10,
                logs: []
            },
            // {
            //         user: 'root',
            //         details: "添加"
            // },

            releases: []
        }
    },
    mounted() {
        this.getUserInfo()
        this.getRelese(this.log.cout)
    },
    methods: {
        load() {
            this.log.cout += 2
            this.getRelese(this.log.cout)
        },
        getUserInfo() {
            this.user.Username = localStorage.getItem('username')
            this.user.Power = localStorage.getItem('power')
            var now = new Date()
            var time = now.getFullYear() + "-" + ((now.getMonth() + 1) < 10 ? "0" : "") + (now.getMonth() + 1) + "-" + (now.getDate() < 10 ? "0" : "") + now.getDate() + " " + (now.getHours() < 10 ? "0" : "") + now.getHours() + ":" + (now.getMinutes() < 10 ? "0" : "") + now.getMinutes() + ":" + (now.getSeconds() < 10 ? "0" : "") + now.getSeconds()
            this.formLastInfo.Time = time
            this.formLastInfo.OS = GetOs()
            this.formLastInfo.Browser = GetCurrentBrowser()
            this.$http.get('/public/ip').then((res) => {
                this.formLastInfo.IP = res.data
            }).catch(() => {
                this.$message.error('网络故障或系统故障')
            })
        },
        getRelese(num) {
            this.$http.get('/admin/dashboard/operationlog?num=' + num).then((res) => {
                this.log.logs = res.data
            }).catch(() => {
                this.$message.error('网络故障或系统故障')
            })
        }
    }
}
</script>

<style>
.info-container {
    background-color: white;
    min-width: 100%;
    padding: 20px;
}

.avatar {
    max-width: 100%;
}

.admin-info-name {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
    color: #409eff;
}

.user-info {
    margin-left: 20%;
    margin-top: 20;
}
.infinite-list {
  height: 600px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>