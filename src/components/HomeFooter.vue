<template>
    <div class="foot-bg">
        <div class="flex-lr"></div>
        <div class="support">
            <p class="p1">支持单位</p>
            <table class="p2">
            <tr>
                <td>主办单位</td>
                <td>: 广西大学教务处</td>
            </tr>
            <tr>
                <td>承办单位</td>
                <td>: 广西大学计算机与电子信息学院</td>
            </tr>
            <!--<tr>-->
            <!--    <td>赛事赞助</td>-->
            <!--    <td>: 中国—东盟信息港股份有限公司</td>-->
            <!--</tr>-->
            <tr>
                <td>技术支持</td>
                <td>: 广西大学计算机与电子信息学院计算机协会、广西大学ICPC/CCPC集训队</td>
            </tr>
            </table>
        </div>
        <div class="flex-mid"></div>
        <div class="relation-me flex-lr">
            <p class="p1">联系我们</p>
            <table class="p2">
                <tr>
                    <td>Email</td>
                    <td>: gxucpc@163.com</td>
                </tr>
                <tr>
                    <td>QQ群</td>
                    <td>: 676859593</td>
                </tr>
                <tr>
                    <td>Github</td>
                    <td>: https://github.com/gxuca</td>
                </tr>
                <tr>
                    <td>地址</td>
                    <td>: 广西壮族自治区南宁市西乡塘区广西大学计算机与电子信息学院</td>
                </tr>
            </table>
            
            
        </div>
        <div class="flex-lr"></div>
    </div>
    <div class="bg2">
        <p class="p3">Copyright ©2022-{{nowYear}} <a class="p3" href="https://beian.miit.gov.cn/">{{ICP}}</a></p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ICP: '',
            nowYear: undefined
        }
    },
    methods: {
        getYear() {
            var date = new Date()
            this.nowYear = date.getFullYear()
        },
        getICP() {
            this.$http.get("/public/icp").then((res) => {
                if(res.statusCode === 50000) {
                    this.ICP = res.data.value
                }
            })
        }
    },
    mounted() {
        this.getYear()
        this.getICP()
    }
}
</script>

<style>
.foot-bg {
    background: #1A1A1A;
    padding-bottom: 30px;
    border-bottom: 1px solid;
    margin: 0 auto;
    display: flex;
    align-items: center;
}
.bg2 {
    background: #1A1A1A;
    height: 80px;
    margin: 0 auto;
}
.support {
    display: inline-block;
}
.relation-me {
    display: inline-block;
}
.p1 {
    color: #d2d2d2;
    font-size: 18px;
    font-weight: 600;
    padding: 50px 0 10px 0;
    width: 250px;
}

.p2 {
    font-size: 14px;
    color: #979797;
    line-height: 24px;
    letter-spacing: 0.67px;
}
.p3 {
    margin: 0;
    padding-top: 15px;
    font-size: 14px;
    color: #979797;
    line-height: 24px;
    letter-spacing: 0.67px;
    text-align: center;
}
.el-footer {
    padding: 0;
}
.flex-lr {
    flex-grow: 0.45;
}
.flex-mid {
    flex-grow: 0.1;
}
</style>