<template>
    <div class="page-list-body">

        <el-table :data="tableData" style="width: 100%" :show-header="false">
            <el-table-column prop="data">
                <template #default="scope">
                    <div class="list-item-body">
                        <div class="list-item-title">
                            <a :href="scope.row.data.url">{{ scope.row.data.title }}</a>
                            <p class="list-item-author">{{ scope.row.data.author }}</p>
                        </div>
                        <div class="list-item-footer">
                            <p class="list-item-time">{{ scope.row.data.time }}</p>
                            <a :href="scope.row.data.url">{{checkText}}</a>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination background layout="total, prev, pager, next" v-model:currentPage="pagingComponent.currentPage"
            :total="pagingComponent.total" @current-change="currentChange" />


    </div>
</template>

<script>
import {getFormtTime} from '@/assets/js/DateUtils.js'
export default {
    data() {
        return {
            tableData: [],
            pagingComponent: {
                currentPage: 1,
                total: 0,
                numberPerPage: 10,
            },
            checkText: '查看全文'
        }
    },
    methods: {
        currentChange(number) {
            this.pagingComponent.currentPage = number
            this.getList()
        },
        getList() {
            var ask =
                "?currentPage=" +
                this.pagingComponent.currentPage +
                "&numberPerPage=" +
                this.pagingComponent.numberPerPage;

            this.$http.get("/public/text/" + this.$route.params.listType + ask).then((res) => {
                if(res.statusCode !== 50000) {
                    this.$message.error(res.message)
                    return
                }
                this.pagingComponent.total = res.data.total
                this.tableData.splice(0, this.tableData.length);
                if(this.$route.params.listType === 'board'|| this.$route.params.listType === 'signup') {
                    this.checkText = this.$route.params.listType === 'board'? '查看榜单' : '立即报名';
                    for(var i = 0; i < res.data.tableData.length; i++) {
                        let temp = {data: res.data.tableData[i]}
                        if(this.$route.params.listType === 'board') temp.data.url = "/" +  this.$route.params.listType + "/" + res.data.tableData[i].id
                        else temp.data.url = "/" +  this.$route.params.listType + "/" + res.data.tableData[i].id + "/" + res.data.tableData[i].type
                        temp.data["title"] = temp.data.name
                        temp.data["time"] = getFormtTime(temp.data.createTime)
                        this.tableData.push(temp)
                    }
                } else {
                    this.checkText = '查看全文'
                    for(let i = 0; i < res.data.tableData.length; i++) {
                        let temp = {data: res.data.tableData[i]};
                        temp.data.url = "/pages/" + temp.data.id;
                        temp.data.time = getFormtTime(temp.data.time, false);
                        this.tableData.push(temp)
                    }
                }
            }).catch(() => {
                this.$message.error("网络故障")
            })
        }
    },
    mounted() {
        this.getList();
    },
    watch: {
        $route(to, from) {
            if (to.path.includes("list")){
                this.pagingComponent.currentPage = 1
                this.getList()
            }
        }
    }
}
</script>

<style>

.page-list-body {
    width: 72%;
    margin: 0 auto;
    margin-top: 10px;
}

.list-item-body {
    height: 135px;
    padding-top: 40px;
    position: relative;
}

.list-item-title {
    height: 55px;
    overflow: hidden;
}

.list-item-title a {
    font-size: 18px;
    color: #313131;
    text-decoration: none
}

.list-item-title a:hover {
    color: #4ea2e3;
}

.list-item-author {
    color: #a0a0a0;
    font-size: 12px;
    position: relative;
    float: right;
    margin: 0;
}

.list-item-footer {
    margin: 0;
    padding: 0;
}

.list-item-footer p {
    float: left;
    font-size: 13px;
    color: #a0a0a0;
    margin: 0;
}

.list-item-footer a {
    text-decoration: none;
    float: right;
    color: #4ea2e3;
    font-size: 12px;
    line-height: 13px;
}
</style>
