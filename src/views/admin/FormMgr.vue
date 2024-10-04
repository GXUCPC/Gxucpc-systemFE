<template>
    <el-card>
        <template #header>
            <el-row gutter="20">
                <el-col :span="2">
                    <div class="grid-content">
                        <div style="float: left;">表单管理</div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-select v-model="contestID" placeholder="请选择比赛" clearable
                               :style="{ width: '100%' }">
                        <el-option v-for="item in contestOptions" :key="item.id" :label="item.name" :value="item.id"/>
                    </el-select>
                </el-col>
                <el-col :span="7">
                    <el-input placeholder="可按照姓名、学号、邮箱等信息查询" v-model="queryInfo" clearable>
                        <template #append>
                            <el-button @click="getFormInfo">
                                <el-icon>
                                    <search></search>
                                </el-icon>
                            </el-button>
                        </template>
                    </el-input>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content">
                        <el-button type="success" @click="addForm" style="float: right" plain>
                            新建表单
                        </el-button>
                    </div>
                </el-col>
            </el-row>
            <!--<div class="headerContainer">-->
            <!--</div>-->
        </template>
        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="比赛名称" width="300" prop="contestName" fixed="left"/>
                <el-table-column label="姓名" width="180" prop="userName"/>
                <el-table-column label="学号" width="180" prop="userId"/>
                <el-table-column label="学院" width="180" prop="userCourse"/>
                <el-table-column label="班级" width="180" prop="userClass"/>
                <el-table-column label="QQ" width="180" prop="userQQ"/>
                <el-table-column label="邮箱" width="180" prop="userMail"/>
                <el-table-column label="手机号" width="180" prop="userPhone"/>
                <el-table-column label="性别" width="180" prop="userSex"/>
                <el-table-column label="组别" width="180" prop="group"/>
                <el-table-column label="打星" width="180" prop="star"/>
                <el-table-column label="密钥" width="180" prop="key"/>
                <el-table-column label="备注" width="180" prop="remark"/>

                <el-table-column label="Operations" width="200" fixed="right">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <template #footer>
            <!-- 分页 -->
            <el-pagination background layout="total, prev, pager, next" v-model:currentPage="pagingComponent.currentPage"
                           :total="pagingComponent.total" @current-change="currentChange"/>
        </template>
    </el-card>
    <!-- 编辑 -->
    <el-dialog v-model="dialogTableVisible" title="修改表单">
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px" label-position="top">
            <el-row :gutter="200">
                <el-col :span="12">
                    <el-form-item label="姓名" prop="userName">
                        <el-input v-model="formData.userName" placeholder="请输入姓名" clearable
                                  :style="{ width: '100%' }">
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
                    <el-form-item label="学院" prop="userCourse">
                        <el-select v-model="formData.userCourse" placeholder="请选择学院" clearable
                                   :style="{ width: '100%' }">
                            <el-option v-for="item in courseOptions" :key="item" :label="item" :value="item"/>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="班级" prop="userClass">
                        <el-input v-model="formData.userClass" placeholder="请输入班级" clearable
                                  :style="{ width: '100%' }">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="200">
                <el-col :span="12">
                    <el-form-item label="QQ号码" prop="userQQ">
                        <el-input v-model="formData.userQQ" placeholder="请输入QQ号码" clearable
                                  :style="{ width: '100%' }">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电子邮箱" prop="userMail">
                        <el-input v-model="formData.userMail" placeholder="请输入电子邮箱" clearable
                                  :style="{ width: '100%' }">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="200">
                <el-col :span="12">
                    <el-form-item label="手机号" prop="userPhone">
                        <el-input v-model="formData.userPhone" placeholder="请输入手机号" clearable
                                  :style="{ width: '100%' }">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="密钥" prop="key">
                        <el-input v-model="formData.key" placeholder="请输入密钥" clearable :style="{ width: '100%' }">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="200" style="margin-left: 0px; margin-right: 0px;">
                <el-col :span="8" style="padding-left: 0px; padding-right: 0px">
                    <el-form-item label="参赛组" prop="group">
                        <el-radio-group v-model="formData.group" size="small">
                            <el-radio-button v-for="(item, index) in userGroupOptions" :key="index" :label="item.value">
                                {{
                                    item.label
                                }}
                            </el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="8" style="padding-left: 0px; padding-right: 0px">
                    <el-form-item label="性别" prop="userSex">
                        <el-radio-group v-model="formData.userSex" size="small">
                            <el-radio-button v-for="(item, index) in userSexOptions" :key="index" :label="item.value">{{
                                    item.label
                                }}
                            </el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="8" style="padding-left: 0px; padding-right: 0px">
                    <el-form-item label="是否打星" prop="star" required>
                        <el-switch v-model="formData.star" active-text="打星参加" inactive-text="正常参加"
                                   :active-value="1"
                                   :inactive-value="0"></el-switch>
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
import {ElLoading} from "element-plus";

export default {
    data() {
        return {
            donloadContestID: '',
            contestID: undefined,
            dialogTableVisible: false,
            queryInfo: "",
            tableData: [
                // {
                //     informatonId: undefined,
                //     contestName: undefined,
                //     userName: undefined,
                //     userId: undefined,
                //     userCourse: undefined,
                //     userClass: undefined,
                //     userQQ: undefined,
                //     userMail: undefined,
                //     group: undefined,
                //     star: undefined
                // }
            ],
            courseOptions: [
                "机械工程学院",
                "电气工程学院",
                "土木建筑工程学院",
                "化学化工学院",
                "资源环境与材料学院",
                "轻工与食品工程学院",
                "计算机与电子信息学院",
                "海洋学院",
                "生命科学与技术学院",
                "农学院",
                "动物科学技术学院",
                "林学院",
                "数学与信息科学学院",
                "物理科学与工程技术学院",
                "文学院",
                "新闻与传播学院",
                "外国语学院",
                "艺术学院",
                "公共管理学院",
                "工商管理学院",
                "法学院",
                "马克思主义学院",
                "体育学院",
                "医学院",
                "继续教育学院",
                "国际学院",
                "经济学院/中国—东盟金融合作学院",
                "非本校生"
            ],
            contestOptions: [],
            formData: {
                userName: undefined,
                userId: undefined,
                userCourse: undefined,
                userClass: undefined,
                userQQ: undefined,
                userMail: undefined,
                group: undefined,
                star: 0,
                userSex: undefined,
                userPhone: undefined,
                key: undefined,
                remark: undefined
            },
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
                userCourse: [
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
                userMail: [
                    {
                        required: true,
                        message: "请输入电子邮箱",
                        trigger: "blur",
                    },
                ],
                group: [
                    {
                        required: true,
                        message: "参赛组不能为空",
                        trigger: "change",
                    },
                ],
                userSex: [
                    {
                        required: true,
                        message: "性别不能为空",
                        trigger: "change",
                    },
                ],
                userPhone: [
                    {
                        required: true,
                        message: "手机号不能为空",
                        trigger: "blur",
                    },
                ],
                key: [
                    {
                        required: true,
                        message: "密钥不能为空",
                        trigger: "blur",
                    },
                ],
            },
            userGroupOptions: [
                {
                    label: "新生组",
                    value: 0,
                },
                {
                    label: "正式组",
                    value: 1,
                },
            ],
            userSexOptions: [
                {
                    label: "男",
                    value: "男",
                },
                {
                    label: "女",
                    value: "女",
                },
            ],
            pagingComponent: {
                total: 0,
                currentPage: 1,
                numberPerPage: 10,
            },
        };
    },
    methods: {

        // 换页
        currentChange(number) {
            this.pagingComponent.currentPage = number;
            this.getFormInfo();
        },
        jsonClone(obj) {
            // js深复制
            return JSON.parse(JSON.stringify(obj));
        },
        handleEdit(index, row) {
            this.formData = this.jsonClone(row);
            this.formData.group = this.formData.group === '新生组' ? 0 : 1;
            this.formData.star = this.formData.star === '打星' ? 1 : 0;
            this.showDialog();
        },
        showDialog() {
            this.dialogTableVisible = !this.dialogTableVisible;
        },
        // 搜索表单
        getFormInfo() {
            if (this.contestID === undefined || this.contestID === "") return;
            this.$http.get('/admin/form?q=' + this.queryInfo + '&currentPage=' + this.pagingComponent.currentPage + '&numberPerPage=' + this.pagingComponent.numberPerPage + '&id=' + this.contestID).then((res) => {
                if (res.statusCode === 50000) {
                    this.tableData = res.data.tableData;
                    this.pagingComponent.total = res.data.total;
                    for (let i = 0; i < this.tableData.length; i++) {
                        this.tableData[i]['contestName'] = this.getContestName(this.tableData[i].contestId);
                        this.tableData[i].group = this.tableData[i].group === false ? '新生组' : '正式组';
                        this.tableData[i].star = this.tableData[i].star === false ? '正常' : '打星';
                    }
                } else {
                    this.$message.error(res.message);
                }
            }).catch(() => {
                this.$message.error('网络故障或系统故障');
            });
        },
        // 删除表单
        async handleDelete(index, row) {
            let loading = ElLoading.service({
                lock: true,
                text: '删除中，请稍后...',
                background: 'rgba(0, 0, 0, 0.7)',
            });
            await this.$http.put('/admin/form/delete/' + row.informationId).then((res) => {
                if (res.statusCode === 50000) {
                    this.$message.success(res.message);
                    this.getFormInfo();
                } else {
                    this.$message.error(res.message);
                }
            });
            loading.close();
        },
        // 保存表单
        async submitForm() {
            let vis = await this.$refs['elForm'].validate();
            if (!vis) return;
            let loading = ElLoading.service({
                lock: true,
                text: '保存中，请稍后...',
                background: 'rgba(0, 0, 0, 0.7)',
            });
            await this.$http.post('/admin/form', this.formData).then((res) => {
                if (res.statusCode === 50000) {
                    this.$message.success(res.message);
                    this.dialogTableVisible = false;
                    this.getFormInfo();
                } else {
                    this.$message.error(res.message);
                }
            });
            loading.close();
        },
        resetForm() {
            for (var index in this.formData) {
                this.formData[index] = undefined;
            }
        },
        getContestInfo() {
            this.$http.get("/admin/contest?currentPage=1&numberPerPage=99999999").then((res) => {
                if (res.statusCode === 50000) {
                    this.contestOptions = res.data.tableData;
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        getContestName(id) {
            for (let i = 0; i < this.contestOptions.length; i++) {
                if (id === this.contestOptions[i].id) {
                    return this.contestOptions[i].name;
                }
            }
            return "无效的比赛名";
        },
        addForm() {
            this.$router.push({path: "/admin/form/add"});
        }
    },
    mounted() {
        this.getContestInfo();
    }
};

</script>

<style>
.headerContainer{
    display: flex;
}
.headerContainer > span {
    width: 6em;
    margin: auto 0;
}
.headerContainer >*{
    display: inline-block;
    margin: 0 1em;
}
.selectContainer{
    width: 50%;
}

#sex-col {
    padding-right: 50px;
    padding-left: 50px;
}
</style>