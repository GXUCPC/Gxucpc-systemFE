<template>
    <el-card>

        <div class="search-frame">
            <el-input placeholder="可按照姓名、学号、邮箱查询" v-model="queryInfo" clearable>
                <template #append>
                    <el-button @click="getFormInfo">
                        <el-icon>
                            <search></search>
                        </el-icon>
                    </el-button>
                </template>
            </el-input>
        </div>
        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="Contest" width="180" prop="contestName" fixed="left" />
                <el-table-column label="Name" width="180" prop="userName" />
                <el-table-column label="Student ID" width="180" prop="userId" />
                <el-table-column label="Academy" width="180" prop="userAcademy" />
                <el-table-column label="Class" width="180" prop="userClass" />
                <el-table-column label="QQ" width="180" prop="userQQ" />
                <el-table-column label="Email" width="180" prop="userEmail" />
                <el-table-column label="Group" width="180" prop="userGroup" />
                <el-table-column label="Star" width="180" prop="userStar" />

                <el-table-column label="Operations" width="200" fixed="right">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-card>
    <!-- 编辑 -->
    <el-dialog v-model="dialogTableVisible" title="修改表单">
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px" label-position="top">
            <el-row :gutter="200">
                <el-col :span="12">
                    <el-form-item label="姓名" prop="userName">
                        <el-input v-model="formData.userName" placeholder="请输入姓名" clearable :style="{ width: '100%' }">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="学号" prop="userId">
                        <el-input v-model="formData.userId" placeholder="请输入学号" :maxlength="10" clearable
                            :style="{ width: '100%' }"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="200">
                <el-col :span="12">
                    <el-form-item label="学院" prop="userAcademy">
                        <el-select v-model="formData.userAcademy" placeholder="请选择学院" clearable
                            :style="{ width: '100%' }">
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="班级" prop="userClass">
                        <el-input v-model="formData.userClass" placeholder="请输入班级" clearable :style="{ width: '100%' }">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="200">
                <el-col :span="12">
                    <el-form-item label="QQ号码" prop="userQQ">
                        <el-input v-model="formData.userQQ" placeholder="请输入QQ号码" clearable :style="{ width: '100%' }">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电子邮箱" prop="userEmail">
                        <el-input v-model="formData.userEmail" placeholder="请输入电子邮箱" clearable
                            :style="{ width: '100%' }">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="200">
                <el-col :span="12">
                    <el-form-item label="参赛组" prop="userGroup">
                        <el-radio-group v-model="formData.userGroup" size="medium">
                            <el-radio-button v-for="(item, index) in userGroupOptions" :key="index" :label="item.value"
                                :disabled="item.disabled">{{ item.label }}</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否打星" prop="userStar" required>
                        <el-switch v-model="formData.userStar" active-text="打星参加" inactive-text="正常参加"
                            :active-value="'打星'" :inactive-value="'正常'"></el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-col :span="24">
                <el-form-item size="large">
                    <el-button type="primary" @click="submitForm">修改</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-col>
            <br>

        </el-form>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialogTableVisible: false,
            queryInfo: undefined,
            tableData: [
                {
                    contestName: undefined,
                    userName: undefined,
                    userId: undefined,
                    userAcademy: undefined,
                    userClass: undefined,
                    userQQ: undefined,
                    userEmail: undefined,
                    userGroup: undefined,
                    userStar: undefined
                }
            ],
            formData: {},
            rules: {
                userName: [
                    {
                        required: true,
                        message: "请输入姓名",
                        trigger: "blur",
                    },
                ],
                userId: [
                    {
                        required: true,
                        message: "请输入学号",
                        trigger: "blur",
                    },
                ],
                userAcademy: [
                    {
                        required: true,
                        message: "请选择学院",
                        trigger: "change",
                    },
                ],
                userClass: [
                    {
                        required: true,
                        message: "请输入班级",
                        trigger: "blur",
                    },
                ],
                userQQ: [
                    {
                        required: true,
                        message: "请输入QQ号码",
                        trigger: "blur",
                    },
                ],
                userEmail: [
                    {
                        required: true,
                        message: "请输入电子邮箱",
                        trigger: "blur",
                    },
                ],
                userGroup: [
                    {
                        required: true,
                        message: "参赛组不能为空",
                        trigger: "change",
                    },
                ],
            },
            userGroupOptions: [
                {
                    label: "新生组",
                    value: "新生组",
                },
                {
                    label: "正式组",
                    value: "正式组",
                },
            ],
        }
    },
    methods: {
        jsonClone(obj) {
            // js深复制
            return JSON.parse(JSON.stringify(obj));
        },
        handleEdit(index, row) {
            this.formData = this.jsonClone(row)
            this.showDialog()
        },
        showDialog() {
            this.dialogTableVisible = !this.dialogTableVisible
        },
        getFormInfo() {
            if (!this.queryInfo) {
                this.$message.error("缺少搜索信息")
                return
            }
            this.$http.get('/admin/form/' + this.queryInfo).then((res) => {
                if (res.statusCode === 50000) {
                    this.tableData = res.data
                } else {
                    this.$message.error(res.message)
                }
            }).catch(() => {
                this.$message.error('网络故障或系统故障')
            })
        },
        handleDelete(index, row) {
            this.$http.delete('/admin/form', row).then((res) => {
                if (res.statusCode === 50000) {
                    this.$message.success(res.message)
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        submitForm() {
            for (var index in this.formData) {
                if (!this.formData[index]) {
                    this.$message.error('缺少必填信息')
                    return
                }
            }
            this.$http.post('/admin/form', this.formData).then((res) => {
                if (res.statusCode === 50000) {
                    this.$message.success(res.message)
                    if (!this.queryInfo) {
                        this.$message.info('搜索框为空，请手动重新选择搜索条件刷新')
                    } else {
                        this.getFormInfo()
                    }
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        resetForm() {
            for(var index in this.formData) {
                this.formData[index] = undefined
            }
        }
    }
}

</script>

<style>
.search-frame {
    text-align: center;
    width: 40%;
}
</style>