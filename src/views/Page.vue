<template>

    <div class="page-body">
        <p class="page-title">{{page.title}}</p>
        <p class="page-time">{{page.time}}</p>
	<v-md-preview :text="page.content"></v-md-preview>
    </div>
</template>

<script>
    export default{
        data() {
            return {
                page: {
                    title: "第十三届蓝桥杯全国软件和信息技术专业人才大赛（个人赛）",
                    time: "2021-10-12",
                    content: "- 金奖\n  排名第一\n- 银奖\n  排名第2、3、4"
                }
            }
        },
        methods: {
            getPage() {
                this.$http.get("/public/pages/" + this.$route.params.itemID).then((res) => {
                    if (res.statusCode !== 50000) {
                        this.$message.error(res.message)
                        return
                    }

                    this.page = res.data
                }).catch(() => {
                    this.$message.error("网络故障")
                })
            }
        },
        mounted() {
            this.getPage()
        }
    }
</script>

<style>
.page-body {
    width: 80%;
    height: 100%;
    margin: 0 auto;
}
.page-title {
        color: #313131;
    font-size: 24px;
    line-height: 30px;
}
.page-time {
    font-size: 13px;
    color: #a0a0a0;
    padding: 15px 0 40px 0;
}


</style>