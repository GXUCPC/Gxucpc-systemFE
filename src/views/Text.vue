<template>
    <div class="page-list-body">
        <div class="add-text">
            <el-button type="success" @click="addText">新建文章</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%" :show-header="false">
            <el-table-column prop="data">
                <template #default="scope">
                    <div class="list-item-body">
                        <div class="list-item-title">
                            <a :href="scope.row.data.url">{{ scope.row.data.title }}</a>
                            <p class="list-item-author"> <el-tag :type="getType(scope.row.data.type)">{{scope.row.data.type}}</el-tag></p>
                        </div>
                        <div class="list-item-footer">
                            <p class="list-item-time">{{ scope.row.data.time }}</p>
                            <a :href="scope.row.data.url">修改文章</a>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination background layout="total, prev, pager, next" v-model:currentPage="pagingComponent.currentPage"
            :total="pagingComponent.total" :page-size="pagingComponent.numberPerPage" @current-change="currentChange" />


    </div>
</template>

<script>
import { getFormtTime } from '@/assets/js/DateUtils';

export default {
    data() {
        return {
            tableData: [],
            pagingComponent: {
                currentPage: 1,
                total: 0,
                numberPerPage: 5,
            }
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
            this.$http.get("/admin/allList" +  ask).then((res) => {
                if(res.statusCode !== 50000) {
                    this.$message.error(res.message)
                    return
                }
                this.pagingComponent.total = res.data.total
                this.tableData.splice(0, this.tableData.length);
                for(var i = 0; i < res.data.tableData.length; i++) {
                    let temp = {data: res.data.tableData[i]};
                    temp.data["url"] = "/admin/text/edit/" + temp.data.id;
                    temp.data.type = temp.data.type === 'news'? '赛事新闻': temp.data.type === 'notice'? '赛事通知' : temp.data.type === 'winners' ? '获奖名单': '奖项设置';
                    temp.data.time = getFormtTime(temp.data.time, false)
                    this.tableData.push(temp)
                }
            }).catch(() => {
                this.$message.error("网络故障")
            })
        },
        getType(type) {
            if(type === '赛事新闻') return '';
            else if(type === '赛事通知') return 'success';
            else if(type === '获奖名单') return 'info';
            else return 'warning';
        },
        addText() {
            this.$router.push({path: "/admin/text/add"})
        }
    },
    mounted() {
        this.getList()
    }
}
</script>

<style>

.page-list-body {
    width: 90%;
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
.add-text {
    float: right;
    padding-bottom: 10px;
}
</style>