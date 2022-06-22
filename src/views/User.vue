<template>
    <header class="header-user">用户管理</header>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column label="Username" width="180" prop="username" />
        <el-table-column label="Create Time" width="180" prop="createTime" />
        <el-table-column label="Last Login" width="180" prop="lastLogin" />
        <el-table-column label="Real Name" width="180" prop="realName" />
        <el-table-column label="Email" width="180" prop="email" />
        <el-table-column label="User Type" width="180" prop="userType" />

        <el-table-column label="Operations">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="dialogTableVisible" title="用户信息">
        <el-form :model="editData" label-width="120px" label-position="left">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Username" required>
                        <el-input v-model="editData.username"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Real Name" required>
                        <el-input v-model="editData.realName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Email" required>
                        <el-input v-model="editData.email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="New Password">
                        <el-input v-model="editData.password"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="User Type">
                        <el-select v-model="editData.userType">
                            <el-option label="Admin" value="Admin"></el-option>
                            <el-option label="Super Admin" value="Super Admin"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

            </el-row>
        </el-form>
        <span class="dialog-footer">
            <el-button @click="showUserDialog()">Cancel</el-button>
            <el-button type="primary" @click="saveUser()">Confirm</el-button>
        </span>
    </el-dialog>
</template>

<script>

export default {
    data() {
        return {
            dialogTableVisible: false,
            tableData: [
                {
                    username: 'yukino',
                    createTime: '2022-6-21 12:00:10',
                    lastLogin: '2022-6-21 12:11:11',
                    realName: '洪越',
                    email: '22@qq.com',
                    userType: 'Super Admin'
                },
            ],
            editData: {
                username: undefined,
                realName: undefined,
                email: undefined,
                userType: undefined,
                password: null
            }
        }
    },
    methods: {
        handleEdit(index, row) {
            this.showUserDialog()
            this.editData = row
            this.editData.password = null
        },
        handleDelete(index, row) {
            this.$http.delete('/admin/user', row).then((res) => {
                if(res.statusCode === 50000) {
                    this.$message.success('删除成功')
                } else {
                    this.$message.error(res.message)
                }
            }).catch(() => {
                this.$message.error('网络故障或系统故障')
            })
            this.getUserInfo()
        },
        showUserDialog() {
            this.dialogTableVisible = true
        },
        saveUser() {
            this.$http.put('/admin/user', this.editData).then((res) => {
                if(res.statusCode === 50000) {
                    this.$message.success('修改成功')
                } else {
                    this.$message.error(res.message)
                }
            }).catch(() => {
                this.$message.error('网络故障或系统故障')
            })
            this.getUserInfo()
        },
        getUserInfo() {
            this.$http.get('/admin/user').then((res) => {
                if(res.statusCode === 50000) {
                    this.tableData = res.data
                } else {
                    this.$message.error(res.message)
                }
            })
        }
    }

}
</script>

<style>
.header-user {
    background-color: #ffffff;
    padding: 10px;
}
</style>