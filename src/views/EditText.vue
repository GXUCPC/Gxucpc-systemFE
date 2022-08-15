<template>
    <div class="edit-body">
        <div class="top-line">
        <div class="edit-title">
            <el-input placeholder="请输入文章标题" v-model="text.title"><template #prepend>文章主题</template></el-input>
        </div>
        <div class="select-type">
            <el-select v-model="text.type" placeholder="请选择文章类型">
            <template #prefix>文章类型:</template>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>
        <div class="sava-canal">
            <el-button type="success" @click="saveText">保存文章</el-button>
            <el-button type="info" @click="cancel">取消</el-button>
        </div>
        </div>

        <div class="edit-content">
        <v-md-editor v-model="text.content" height="100%" left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code"></v-md-editor>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: {
                id: 0,
                title: "",
                content: '',
                type: undefined,
            },
            options: [
                {
                    value: 'news',
                    label: '赛事新闻',
                },
                {
                    value: 'notice',
                    label: '赛事通知',
                },
                {
                    value: 'winners',
                    label: '获奖名单',
                },
                {
                    value: 'prize',
                    label: '奖项设置',
                }
            ]
        }
    },
    methods: {
        saveText() {
            let req;
            if(this.$route.path.includes('add')) {
                req = this.$http.post;
            } else {
                req = this.$http.put;
            }

            req('/admin/text', this.text).then((res) => {
                if(res.statusCode === 50000) {
                    this.$message.success(res.message)
                    this.cancel();
                } else {
                    this.$message.error(res.message)
                }
            }).catch(() => {
                this.$message.error('网络故障')
            })
        },
        cancel() {
            this.$router.push({ path: "/admin/text" });
        },
        getInfo() {
            if(this.$route.path.includes('edit')) {
                this.$http.get("/public/text" + "?id=" + this.$route.params.itemID).then((res) => {
                    if(res.statusCode === 50000) {
                        this.text = res.data;
                    } else {
                        this.$message.error(res.message);
                    }
                }).catch(() => {
                    this.$message.error('网络故障');
                })
            }
        }
    },
    mounted() {
        this.getInfo();
    }
}
</script>

<style>
.edit-body {
    height: 100%;
}
.edit-content {
    height: 90%;
}
.top-line {
    padding-bottom: 10px;
}
.edit-title {
    display: inline-block;
}
.select-type {
    display: inline-block;
    margin-left: 20px;
}
.el-input {
    display: inline-block;
}
.sava-canal {
    float: right;
}
</style>