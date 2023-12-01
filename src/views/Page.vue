<template>

    <div class="page-body">
        <p class="page-title">{{page.title}}</p>
        <p class="page-time">{{page.time}}</p>
	<v-md-preview :text="page.content"></v-md-preview>
    </div>
</template>

<script>
import {getFormtTime} from '@/assets/js/DateUtils.js'
    export default{
        data() {
            return {
                page: {
                    id: 0,
                    title: "",
                    time: "",
                    content: "",
                }
            }
        },
        methods: {
            getPage() {
                this.$http.get("/public/text" + "?id=" + this.$route.params.itemID).then((res) => {
                    if (res.statusCode !== 50000) {
                        this.$message.error(res.message)
                        this.$router.push({path: "/"})
                        return
                    }

                    this.page = res.data
                    this.page.time = getFormtTime(this.page.time, false);
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

<style scoped>
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
img {
    margin: 0 auto;
    display: block;
}


</style>