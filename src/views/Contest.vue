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
        <el-table-column label="上传奖状" width="150">
            <template #default="scope">
                <el-button size="small" @click="showUploadDialog(scope.row.id)" type="success">Upload</el-button>
            </template>
        </el-table-column>
        <el-table-column label="Operations" width="200">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="pagingComponent.total" />
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
                        <el-date-picker v-model="editData.signUpBeginTime" type="datetime" placeholder="Pick a Date"
                            format="YYYY-MM-DD hh:mm:ss" value-format="x" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="报名结束时间" prop="signUpEndTime">
                        <el-date-picker v-model="editData.signUpEndTime" type="datetime" placeholder="Pick a Date"
                            format="YYYY-MM-DD hh:mm:ss" value-format="x" />
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
                        <el-date-picker v-model="editData.contestBeginTime" type="datetime" placeholder="Pick a Date"
                            format="YYYY-MM-DD hh:mm:ss" value-format="x" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="比赛结束时间" prop="contestEndTime">
                        <el-date-picker v-model="editData.contestEndTime" type="datetime" placeholder="Pick a Date"
                            format="YYYY-MM-DD hh:mm:ss" value-format="x" />
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
                        <el-date-picker v-model="addData.signUpBeginTime" type="datetime" placeholder="Pick a Date"
                            format="YYYY-MM-DD hh:mm:ss" value-format="x" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="报名结束时间" prop="signUpEndTime">
                        <el-date-picker v-model="addData.signUpEndTime" type="datetime" placeholder="Pick a Date"
                            format="YYYY-MM-DD hh:mm:ss" value-format="x" />
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
                        <el-date-picker v-model="addData.contestBeginTime" type="datetime" placeholder="Pick a Date"
                            format="YYYY-MM-DD hh:mm:ss" value-format="x" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="比赛结束时间" prop="contestEndTime">
                        <el-date-picker v-model="addData.contestEndTime" type="datetime" placeholder="Pick a Date"
                            format="YYYY-MM-DD hh:mm:ss" value-format="x" />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span class="dialog-footer">
            <el-button @click="showAddContestDialog()">Cancel</el-button>
            <el-button type="primary" @click="addContest()">Confirm</el-button>
        </span>
    </el-dialog>
    <!-- 上传 -->
    <template>
        <el-dialog title="奖状上传" v-model="dialogUploadVisible" width="800px" :close-on-click-modal="false"
            @close="cancel">
            <div class="upload-file">
                <el-upload :action="action" :before-upload="handleBeforeUpload" :file-list="fileList" multiple
                    :accept="accept" :on-error="handleUploadError" :on-exceed="handleExceed"
                    :on-success="handleUploadSuccess" :on-change="handChange" :show-file-list="true"
                    :auto-upload="false" class="upload-file-uploader" ref="upload">
                    <!-- 上传按钮 -->
                    <el-button size="mini" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" :disabled="fileList.length < 1" size="small" type="success"
                        @click="submitUpload">上传到服务器</el-button>
                    <!-- 上传提示 -->
                    <div class="el-upload__tip" v-if="true">
                        请上传
                        <template v-if="fileSize"> 大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b> </template>
                        <template v-if="fileType"> 格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b>
                        </template>
                        的文件
                    </div>
                </el-upload>

                <!-- 文件列表 -->
                <transition-group class="upload-file-list el-upload-list el-upload-list--text" name="el-fade-in-linear"
                    tag="ul">
                    <li :key="file.uid" class="el-upload-list__item ele-upload-list__item-content"
                        v-for="(file, index) in list">
                        <el-link :href="file.url" :underline="false" target="_blank">
                            <span class="el-icon-document"> {{ getFileName(file.name) }} </span>
                        </el-link>
                        <div class="ele-upload-list__item-content-action">
                            <el-link :underline="false" @click="handleDelete(index)" type="danger">删除</el-link>
                        </div>
                    </li>
                </transition-group>
            </div>
        </el-dialog>
    </template>

</template>

<script>
import { getFormtTime } from "@/assets/js/DateUtils.js"
export default {
    data() {
        return {
            // 已选择文件列表
            fileList: [],
            // 是否显示文件上传弹窗
            visible: false,
            // 可上传的文件类型
            accept: '',
            action: 'action',
            dialogTableVisible: false,
            dialogAddTableVisible: false,
            dialogUploadVisible: false,
            tableData: [
                {
                    id: 1,
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
                name: [{ required: true, trigger: 'blur' }],
                signUpBeginTime: [{ required: true, trigger: 'blur' }],
                signUpEndTime: [{ required: true, trigger: 'blur' }],
                email: [{ required: true, trigger: 'blur' }],
                smtpPassword: [{ required: true, trigger: 'blur' }],
                contestBeginTime: [{ required: true, trigger: 'blur' }],
                contestEndTime: [{ required: true, trigger: 'blur' }],
            },
            editData: {
                id: undefined,
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
            pagingComponent: {
                currentPage: 1,
                numberPerPage: 10,
                total: 0
            }
        }
    },
    methods: {
        //Author: cityTS
        //Date: 2022年6月22日
        //打开上传对话框
        showUploadDialog(itemId) {
            this.dialogUploadVisible = true
        },
        //Author: cityTS
        //Date: 2022年6月22日
        //JavaScript深复制
        jsonClone(obj) {
            return JSON.parse(JSON.stringify(obj));
        },
        //Author: cityTS
        //Date: 2022年6月22日
        //打开修改对话框
        handleEdit(index, row) {
            this.showContestDialog()
            this.editData = this.jsonClone(row)
            this.editData.contestBeginTime = new Date(this.editData.contestBeginTime)
            this.editData.contestEndTime = new Date(this.editData.contestEndTime)
            this.editData.signUpBeginTime = new Date(this.editData.signUpBeginTime)
            this.editData.signUpEndTime = new Date(this.editData.signUpEndTime)
        },
        //Author: cityTS
        //Date: 2022年6月22日
        //删除对应信息
        handleDelete(index, row) {
            var response = this.jsonClone(row)
            response.contestBeginTime = new Date(response.contestBeginTime)
            response.contestEndTime = new Date(response.contestEndTime)
            response.signUpBeginTime = new Date(response.signUpBeginTime)
            response.signUpEndTime = new Date(response.signUpEndTime)
            this.$http.delete('/admin/contest', response).then((res) => {
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
        //Author: cityTS
        //Date: 2022年6月22日
        //打开修改对话框
        showContestDialog() {
            this.dialogTableVisible = !this.dialogTableVisible
        },
        //Author: cityTS
        //Date: 2022年6月22日
        //打开新建对话框
        showAddContestDialog() {
            this.dialogAddTableVisible = !this.dialogAddTableVisible
            for (var index in this.addData) {
                this.addData[index] = undefined
            }
        },
        //Author: cityTS
        //Date: 2022年6月22日
        //保存修改
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
        //Author: cityTS
        //Date: 2022年6月22日
        //添加新比赛
        addContest() {
            for (var index in this.addData) {
                if (!this.addData[index]) {
                    this.$message.error('缺少必填项')
                    return
                }
            }
            this.$http.post('/admin/contest', this.addData).then((res) => {
                if (res.statusCode === 50000) {
                    this.$message.success('修改成功')
                    this.getContestInfo()
                    this.showAddContestDialog()
                } else {
                    this.$message.error(res.message)
                }
            }).catch(() => {
                this.$message.error('网络故障或系统故障')
            })
        },
        //Author: cityTS
        //Date: 2022年6月22日
        //获取所有已有比赛信息
        getContestInfo() {
            var ask = "?currentPage=" + this.pagingComponent.currentPage + "&numberPerPage=" + this.pagingComponent.numberPerPage
            this.$http.get('/admin/contest' + ask).then((res) => {
                if (res.statusCode === 50000) {
                    this.tableData = res.data.tableData
                    this.pagingComponent.total = res.data.total
                    for(var index in this.tableData) {
                        this.tableData[index].signUpEndTime = getFormtTime(this.tableData[index].signUpEndTime, true)
                        this.tableData[index].signUpBeginTime = getFormtTime(this.tableData[index].signUpBeginTime, true)
                        this.tableData[index].contestBeginTime = getFormtTime(this.tableData[index].contestBeginTime, true)
                        this.tableData[index].contestEndTime = getFormtTime(this.tableData[index].contestEndTime, true)
                    }
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