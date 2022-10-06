<template>
    <el-carousel indicator-position="outside" :height="screenwidth" v-if="imageUrlList.length > 0">
        <el-carousel-item v-for="item in this.imageUrlList" :key="item">
            <img class="home-img" :src="item" alt="">
        </el-carousel-item>
    </el-carousel>
    <div class="data-show">
        <div class="flex-lr"></div>
        <div class="note">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>赛事通知</span>
                        <a href="/list/notice"><span>查看更多</span></a>
                    </div>
                </template>
                <div class="text item">
                    <el-table :show-header="false" :data="noticeData" style="width: 100%">
                        <el-table-column prop="title" width="470">
                        <template #default="scope">
                            <a :href="scope.row.linkUrl" target="_blank">{{scope.row.title}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="time" width="110" />
                    </el-table>
                </div>
            </el-card>
        </div>

        <div class="flex-mid"></div>
        <div class="news">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>赛事新闻</span>
                        <a href="/list/news"><span>查看更多</span></a>
                    </div>
                </template>
                <div class="text item">
                <el-table :show-header="false" :data="newsData" style="width: 100%">
                    <el-table-column prop="title" width="470">
                        <template #default="scope">
                            <a :href="scope.row.linkUrl" target="_blank">{{scope.row.title}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="time" width="110" />
                </el-table>
                </div>
            </el-card>
        </div>

        <div class="flex-lr"></div>
    </div>
</template>

<script>
import { getFormtTime } from '@/assets/js/DateUtils';
export default {
    data() {
        return {
            noticeData: [],
            newsData: [],
            screenwidth: undefined,
            imageUrlList: []
        }
    },
    methods: {
        getImageSize() {
          this.screenwidth = document.documentElement.clientWidth / 2.5 + "px";
        },
        getNews() {
            this.$http.get("/public/text/news?currentPage=1&numberPerPage=8").then((res) => {
                if(res.statusCode === 50000) {
                    this.newsData = res.data.tableData;
                    for(let i = 0; i < this.newsData.length; i++) {
                        this.newsData[i].time = getFormtTime(this.newsData[i].time, false)
                        this.newsData[i].linkUrl = "/pages/" + this.newsData[i].id
                    }
                }
            })
        },
        getNotice() {
            this.$http.get("/public/text/notice?currentPage=1&numberPerPage=8").then((res) => {
                if(res.statusCode === 50000) {
                    this.noticeData = res.data.tableData;
                    for(let i = 0; i < this.noticeData.length; i++) {
                        this.noticeData[i].time = getFormtTime(this.noticeData[i].time, false)
                        this.noticeData[i].linkUrl = "/pages/" + this.noticeData[i].id
                    }
                }
            })
        },
        getImagesURL() {
            this.$http.get("/public/images").then((res) => {
                if(res.statusCode === 50000) {
                    this.imageUrlList.splice(0, this.imageUrlList.length)
                    for(let i = 0; i < res.data.length; i++) {
                        this.imageUrlList.push(res.data[i].value)
                    }
                }
            })
        }
    },
    mounted() {
        this.getImageSize();
        window.onresize = () => {
            return (() => {
                if(document.documentElement.clientWidth > 960) {
                    this.screenwidth = document.documentElement.clientWidth / 2.5 + "px";
                }
            })();
        };
        this.getNews();
        this.getNotice();
        this.getImagesURL();
    }
}
</script>

<style>
.home-img {
    /*设置图片宽度和浏览器宽度一致*/
    width: 100%;
    height: inherit;
}

.data-show {
    display: flex;
}

.news {
    display: inline-block;
}

.note {
    display: inline-block;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-header span {
    margin-left: 31px;
    height: 50px;
    font-size: 24px;
    color: #161F39;
    line-height: 50px;
    cursor: pointer;
}

a {
    text-decoration: none;
    
    color: #000000;

}

.card-header a span {
    margin-left: 186px;
    height: 50px;
    font-size: 16px;
    font-weight: 400;
    color: #000000;
    line-height: 50px;
    cursor: pointer;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 580px;
}

.flex-lr {
    flex-grow: 0.45;
}

.flex-mid {
    flex-grow: 0.1;
}
.el-card__body {
    padding: 0;
}
</style>