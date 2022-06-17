<template>
    <div class="Board">
        <div class="title">
            {{ Board.title }}
        </div>
        <div class="start-end-time">
            <div class="start-time">
                <b>
                    Start:
                    {{ Board.startTime }}
                    <sup>GMT+8</sup>
                </b>
            </div>
            <div class="status-time">
                <b>
                    {{ Board.status }}
                </b>
            </div>
            <div class="end-time">
                <b>
                    End:
                    {{ Board.endTime }}
                    <sup>GMT+8</sup>
                </b>
            </div>
        </div>
        <div class="time-line">
            <el-progress :percentage="Board.per" :duration="5" stroke-width="30" :status="Board.sym"> </el-progress>
        </div>
        <div class="tableForm">
            <el-table :data="tableData" height="250" style="width: 100%; font-size: 10px;"
                empty-text="·" v-fitColumns>
                <el-table-column label="Place" type='index' width="100" />
                <el-table-column prop="school" label="School" width="100" />
                <el-table-column prop="name" label="Name" width="100" />
                <el-table-column prop="solved" label="Solved" width="100" />
                <el-table-column prop="time" label="Time" width="100" />
                
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Board',
    data() {
        return {
            Board: {
                title: '不存在该比赛',
                startTime: '2022-6-15 21:00:00',
                endTime: '2022-6-15 22:00:00',
                status: 'END',
                per: 100,
                sym: 'exception'
            },
            tableData: [
                {
                    school: '广西大学',
                    name: '金珉瑞',
                    solved: 13,
                    time: 2001,

                },
                {
                    school: '广西大学',
                    name: '蓝秋雨',
                    solved: 13,
                    time: 2010,

                },
            ]
        }
    },
    // mounted: {
    //     // getItem() {
    //     //     this.$http.get("/contest/" + this.$route.params.itemID).then((res) => {
    //     //         if (res.statusCode === 50000) {

    //     //         } else {
    //     //             this.$message.error(res.msg);
    //     //         }
    //     //     })
    //     // }
    // },
    directives: {
        fitColumns: {
            update() { },
            bind() { },
            inserted(el) {
                setTimeout(() => {
                    adjustColumnWidth(el);
                }, 300);
            },
            componentUpdated(el) {
                el.classList.add("r-table");
                setTimeout(() => {
                    adjustColumnWidth(el);
                }, 300);
            },
            unbind() { },
        }
    }
}
</script>

<style>
.Board {
    text-align: center;
}

.tableForm {
    width: 80%;
    margin: auto;
}

.title {
    --scroll-bar: 0;
    font-feature-settings: "tnum";
    font-variant: tabular-nums;
    line-height: 1.5715;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    text-align: center;
    color: rgba(0, 0, 0, .75);
    font-size: 32px;
    font-weight: 400;
    padding: 12px 16px 12px 0;
}

.start-time {
    flex: 1;
    /* height: 300px; */
    /* border: 1px solid black; */
    text-align: left;
}

.end-time {
    flex: 1;
    /* height: 300px; */
    /* border: 1px solid black; */
    text-align: right;
}

.status-time {
    flex: 1;
    /* height: 300px; */
    /* border: 1px solid black; */
    text-align: center;
}

.start-end-time {
    width: 100%;
    /* background: #333; */
    /* margin: 100px auto; */
    display: flex;
    display: -webkit-flex;
    /* Safari */
}
</style>