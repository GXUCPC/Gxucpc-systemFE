<template>
    <header class="header-contest">比赛管理</header>
    <div class="add-contest">
        <el-button type="success" @click="showAddContestDialog()" plain>添加比赛</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed="left" label="比赛名称" width="300" prop="name" />
        <el-table-column label="报名开始时间" width="180" prop="signUpBeginTime" />
        <el-table-column label="报名结束时间" width="180" prop="signUpEndTime" />
        <el-table-column label="邮箱" width="180" prop="email" />
        <el-table-column label="SMTP密钥" width="180" prop="smtpPassword" />
        <el-table-column label="比赛开始时间" width="180" prop="contestBeginTime" />
        <el-table-column label="比赛结束时间" width="180" prop="contestEndTime" />

        <el-table-column label="Operations" width="200">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 编辑 -->
    <el-dialog v-model="dialogTableVisible" title="比赛信息">
        <el-form :model="editData" :rules="rules" label-width="120px" label-position="left">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="比赛名称" prop="name">
                        <el-input v-model="editData.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="报名开始时间" prop="signUpBeginTime">
                        <el-input v-model="editData.signUpBeginTime"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="报名结束时间" prop="signUpEndTime">
                        <el-input v-model="editData.signUpEndTime"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="editData.email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="SMTP密钥" prop="smtpPassword">
                        <el-input v-model="editData.smtpPassword"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="比赛开始时间" prop="contestBeginTime">
                        <el-input v-model="editData.contestBeginTime"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="比赛结束时间" prop="contestEndTime">
                        <el-input v-model="editData.contestEndTime"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span class="dialog-footer">
            <el-button @click="showContestDialog()">Cancel</el-button>
            <el-button type="primary" @click="saveContest()">Confirm</el-button>
        </span>
    </el-dialog>
    <!-- 添加 -->
    <el-dialog v-model="dialogAddTableVisible" title="添加比赛">
        <el-form :model="addData" :rules="rules" label-width="120px" label-position="left">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="比赛名称" prop="name">
                        <el-input v-model="addData.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="报名开始时间" prop="signUpBeginTime">
                        <el-input v-model="addData.signUpBeginTime"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="报名结束时间" prop="signUpEndTime">
                        <el-input v-model="addData.signUpEndTime"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="addData.email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="SMTP密钥" prop="smtpPassword">
                        <el-input v-model="addData.smtpPassword"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="比赛开始时间" prop="contestBeginTime">
                        <el-input v-model="addData.contestBeginTime"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="比赛结束时间" prop="contestEndTime">
                        <el-input v-model="addData.contestEndTime"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span class="dialog-footer">
            <el-button @click="showAddContestDialog()">Cancel</el-button>
            <el-button type="primary" @click="addContest()">Confirm</el-button>
        </span>
    </el-dialog>
</template>

<script>

export default {
    data() {
        return {
            dialogTableVisible: false,
            dialogAddTableVisible: false,
            tableData: [
                {
                    name: '“东信杯”广西大学第五届程序设计竞赛',
                    signUpBeginTime: '2022-6-21 12:00:00',
                    signUpEndTime: '2022-6-22 12:00:00',
                    email: 'gxucpc@163.com',
                    smtpPassword: '12345',
                    contestBeginTime: '2022-6-22 12:00:00',
                    contestEndTime: '2022-6-22 12:00:00'
                },
            ],
            rules: {
                name: [{required: true, trigger: 'blur'}],
                signUpBeginTime: [{required: true, trigger: 'blur'}],
                signUpEndTime: [{required: true, trigger: 'blur'}],
                email: [{required: true, trigger: 'blur'}],
                smtpPassword: [{required: true, trigger: 'blur'}],
                contestBeginTime: [{required: true, trigger: 'blur'}],
                contestEndTime: [{required: true, trigger: 'blur'}],
            },
            editData: {
                name: undefined,
                signUpBeginTime: undefined,
                signUpEndTime: undefined,
                email: undefined,
                smtpPassword: undefined,
                contestBeginTime: undefined,
                contestEndTime: undefined
            },
            addData: {
                name: undefined,
                signUpBeginTime: undefined,
                signUpEndTime: undefined,
                email: undefined,
                smtpPassword: undefined,
                contestBeginTime: undefined,
                contestEndTime: undefined
            },
        }
    },
    methods: {
        jsonClone(obj) {
            // js深复制
            return JSON.parse(JSON.stringify(obj));
        },
        handleEdit(index, row) {
            this.showContestDialog()
            this.editData = this.jsonClone(row)
        },
        handleDelete(index, row) {
            this.$http.delete('/admin/contest', row).then((res) => {
                if (res.statusCode === 50000) {
                    this.$message.success('删除成功')
                } else {
                    this.$message.error(res.message)
                }
            }).catch(() => {
                this.$message.error('网络故障或系统故障')
            })
            this.getContestInfo()
        },
        showContestDialog() {
            this.dialogTableVisible = !this.dialogTableVisible
        },
        showAddContestDialog() {
            this.dialogAddTableVisible = !this.dialogAddTableVisible
            for (var index in this.addData) {
                this.addData[index] = undefined
            }
        },
        saveContest() {
            for (index in this.editData) {
                if (!this.editData[index]) {
                    this.$message.error('缺少必填项')
                    return
                }
            }
            this.$http.put('/admin/contest', this.editData).then((res) => {
                if (res.statusCode === 50000) {
                    this.$message.success('修改成功')
                    this.getContestInfo()
                    this.showContestDialog()
                } else {
                    this.$message.error(res.message)
                }
            }).catch(() => {
                this.$message.error('网络故障或系统故障')
            })
        },
        addContest() {
            for (var index in this.addData) {
                if (!this.addData[index]) {
                    this.$message.error('缺少必填项')
                    return
                }
            }
            this.$http.post('/admin/contest', this.editData).then((res) => {
                if (res.statusCode === 50000) {
                    this.$message.success('修改成功')
                    this.getContestInfo()
                    this.showContestDialog()
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
                    this.tableData = res.data
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
.header-contest {
    background-color: #ffffff;
    padding: 10px;
}

.add-contest {
    width: 100%;
    text-align: right;
    margin-right: 5%;
    background-color: #ffffff;
}
</style>