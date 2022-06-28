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
                            <p class="admin-info-name">{{user.Username}}</p>
                            <p>{{user.Power}}</p>
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
                    Release Notes
                </span>
                <hr>
                <el-collapse accordion="true" v-model="activeNames" v-for="(release, index) of releases"
                    :key="'release' + index">
                    <el-collapse-item :name="index + 1" :title="release.title">
                        <p>Level: {{ release.level }}</p>
                        <p>Details: </p>
                        <div class="release-body">
                            <ul v-for="detail in release.details" :key="detail">
                                <li v-html="detail"></li>
                            </ul>
                        </div>
                    </el-collapse-item>
                </el-collapse>
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

            // {
            //         title: '2020-11-8',
            //         level: 'imiort',
            //         details: [
            //             '更新1',
            //             '更新2'
            //         ]
            // },

            releases: []
        }
    },
    mounted() {
        this.getUserInfo()
        this.getRelese()
    },
    methods: {
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
        getRelese() {
            this.$http.get('/admin/relese').then((res) => {
                releases = res.data
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
</style>