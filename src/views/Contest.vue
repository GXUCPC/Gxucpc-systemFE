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
        <el-table-column label="上传奖状" width="200">
            <template #default="scope">
                <el-button size="small" @click="showUploadDialog(scope.row.id)" type="success">Upload</el-button>
                <el-button size="small" @click="showDeleteDialog(scope.row.id)" type="danger">Delete</el-button>
            </template>
        </el-table-column>
        <el-table-column label="开放奖状下载" width="180">
            <template #default="scope">
                <el-switch v-model="scope.row.isDownload"
                    @change="setDownloadStatus(scope.row.id, scope.row.name, scope.row.isDownload)" inline-prompt size="large"
                    active-text="开放" inactive-text="关闭" />
            </template>
        </el-table-column>
        <el-table-column label="下载报名表单" width="180">
            <template #default="scope">
                <el-button size="small" type="success" @click="downloadForm(scope.row)">下载</el-button>
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
    <el-pagination background layout="total, prev, pager, next" v-model:currentPage="pagingComponent.currentPage"
        :total="pagingComponent.total" @current-change="currentChange" />
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
    <el-dialog title="奖状上传" v-model="dialogUploadVisible" width="800px" :close-on-click-modal="false" @close="cancel">
        <div class="upload-file">
            <el-upload :action="action" :before-upload="beforeUpload" :headers="header" :file-list="fileList" multiple
                :show-file-list="true" :auto-upload="true" class="upload-file-uploader" ref="upload">
                <!-- 上传按钮 -->
                <el-button size="small" type="primary">选取文件</el-button>


            </el-upload>
        </div>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog title="删除奖状" v-model="dialogDeleteVisible" width="800px" @close="closeDelete">
        <div class="delete-file">
            <el-form inline="true" :model="formDeleteData">
                <el-form-item label="学号">
                    <el-input v-model="formDeleteData.userId"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formDeleteData.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="deleteFile">Delete</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>

</template>

<script>
import { getFormtTime, dateStr2TimeTamp } from "@/assets/js/DateUtils.js"
import store from "@/store/index.js"
export default {
    data() {
        return {
            contestUploadId: undefined,
            action: '',
            // 已选择文件列表
            fileList: [],
            // 可上传的文件类型
            accept: '',
            dialogTableVisible: false,
            dialogAddTableVisible: false,
            dialogUploadVisible: false,
            dialogDeleteVisible: false,
            header: {
                token: localStorage.getItem('token'),
                username: localStorage.getItem('username'),
                password: localStorage.getItem('password'),
                userType: localStorage.getItem("userType")
            },
            formDeleteData: {

            },
            tableData: [
                // {
                //     id: 1,
                //     name: '“东信杯”广西大学第五届程序设计竞赛',
                //     signUpBeginTime: '2022-6-21 12:00:00',
                //     signUpEndTime: '2022-6-22 12:00:00',
                //     email: 'gxucpc@163.com',
                //     smtpPassword: '12345',
                //     contestBeginTime: '2022-6-22 12:00:00',
                //     contestEndTime: '2022-6-22 12:00:00',
                //     isDownload: true
                // },
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
        downloadForm(row) {
            this.$http.get("/admin/contest/download/" + row.id, { responseType: 'blob' }).then((res) => {
                // const content = res;
                // const blob = new Blob([content]);

                // const elink = document.createElement('a');
                // elink.download = row.name + '.pdf';
                // elink.style.display = 'none';
                // elink.href = URL.createObjectURL(blob);
                // document.body.appendChild(elink);
                // elink.click();
                // // 释放URL对象
                // URL.revokeObjectURL(elink.href);
                // document.body.removeChild(elink);
                let url = window.URL.createObjectURL(new Blob([res])) // 将获取的文件转化为blob格式
            let a = document.createElement('a'); // 此处向下是打开一个储存位置
            a.style.display = 'none';
            a.href = url;
            // 下面两行是自己项目需要的处理，总之就是得到下载的文件名（加后缀）即可
            var fileName = row.name + "-报名表.xls";
            
            a.setAttribute('download',fileName);
            document.body.appendChild(a);
            a.click();//点击下载
            document.body.removeChild(a);// 下载完成移除元素
            window.URL.revokeObjectURL(url);// 释放掉blob对象
            this.$message.success("文件下载成功") //删除弹窗
            })
        },
        // 换页
        currentChange(number) {
            this.pagingComponent.currentPage = number;
            this.getContestInfo();
        },

        //Author: cityTS
        //Date: 2022年7月31日
        //改变下载状态
        setDownloadStatus(id, name, isDownload) {
            let ask = { id: id, name: name, isDownload: isDownload };
            this.$http.put("/admin/contest/download", ask).then((res) => {
                if (res.statusCode === 50000) {
                    if (isDownload === true)
                        this.$message.success("已开放下载")
                    else this.$message.success("已关闭下载")
                } else {
                    this.$message.error(res.message);
                }
            }).catch(() => {
                this.$message.error("系统故障或网络故障")
            })
        },

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
            this.editData.contestBeginTime = parseInt(new Date(this.editData.contestBeginTime).getTime())
            this.editData.contestEndTime = parseInt(new Date(this.editData.contestEndTime).getTime())
            this.editData.signUpBeginTime = parseInt(new Date(this.editData.signUpBeginTime).getTime())
            this.editData.signUpEndTime = parseInt(new Date(this.editData.signUpEndTime).getTime())
        },
        //Author: cityTS
        //Date: 2022年6月22日
        //删除对应信息
        handleDelete(index, row) {
            this.$http.delete('/admin/contest?id=' + row.id + "&name=" + row.name).then((res) => {
                if (res.statusCode === 50000) {
                    this.$message.success('删除成功')
                } else {
                    this.$message.error(res.message)
                }
                this.getContestInfo()
            }).catch(() => {
                this.$message.error('网络故障或系统故障')
            })
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
            for (var index in this.editData) {
                if (!this.editData[index] && index != "isDownload") {
                    this.$message.error('缺少必填项')
                    return
                }
                if (index.includes("Time")) {
                    this.editData[index] = parseInt(new Date(this.editData[index]).getTime());
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
                    this.$message.success('添加成功')
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
                    for (var index in this.tableData) {
                        this.tableData[index].signUpEndTime = getFormtTime(this.tableData[index].signUpEndTime, true)
                        this.tableData[index].signUpBeginTime = getFormtTime(this.tableData[index].signUpBeginTime, true)
                        this.tableData[index].contestBeginTime = getFormtTime(this.tableData[index].contestBeginTime, true)
                        this.tableData[index].contestEndTime = getFormtTime(this.tableData[index].contestEndTime, true)
                    }
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        showUploadDialog(id) {
            this.contestUploadId = id
            this.getBackURL()
            this.dialogUploadVisible = true
        },
        showDeleteDialog(id) {
            this.contestUploadId = id
            this.dialogDeleteVisible = true
        },
        cancel() {
            this.dialogUploadVisible = false
        },
        closeDelete() {
            this.dialogDeleteVisible = false
        },
        getBackURL() {
            this.action = store.state.backURL + "/admin/contest/file/" + this.contestUploadId
        },
        beforeUpload(file) {
            let fileName = file.name
            let endIndex = fileName.indexOf(".")
            let newFileName = fileName.substring(0, endIndex)
            let arr = newFileName.split("-")
            if (arr.length !== 2) {
                this.$message.error("文件格式错误，请按照以下格式命名:学号-姓名.pdf")
                return false
            }
            return true
        },
        deleteFile() {
            for (var idx in this.formDeleteData) {
                if (!this.formDeleteData[idx]) {
                    this.$message.error("缺少必填项")
                    return
                }
            }
            this.$http.delete("/admin/contest/file/" + this.contestUploadId, this.formDeleteData).then((res) => {
                if (res.statusCode === 50000) {
                    this.$message.success("删除成功")
                    for (var idx in this.formDeleteData) {
                        this.formDeleteData[idx] = undefined
                    }
                } else {
                    this.$message.error(res.message)
                }
            }).catch(() => {
                this.$message.error('网络错误或系统故障')
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

.delete-file {
    width: 75%;
    margin: 0 auto;
}
</style>