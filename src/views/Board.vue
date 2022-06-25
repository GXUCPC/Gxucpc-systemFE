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
      <el-progress :text-inside="true" :percentage="Board.per" :duration="5" stroke-width="30" :status="Board.sym">
      </el-progress>
    </div>
    <div class="downloadTable">
      <el-button type="primary" icon="Download" round @click="download()">下载榜单</el-button>
    </div>
    <div class="tableForm">
      <el-table id="out-table" style="width: 100%" border :data="tableData"
        :header-cell-style="{ 'text-align': 'center' }" :cell-style="cellStyle">
        <template v-for="(item, index) in tableHead">
          <el-table-column :prop="item.column_name" :label="item.column_comment" :key="index" v-if="true">
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
import * as XLSX from "xlsx"
// 修改后的FileSaver组件
import FileSaver from "@/assets/js/FileSaver.js"
export default {
  name: "Board",
  data() {
    return {
      startTag: false,
      Board: {
        title: undefined,
        // YYYY-MM-DD HH:MM:SS
        startTime: undefined,
        endTime: undefined,
        status: undefined,
        per: undefined,
        sym: undefined,
      },
      // column_name: prop
      // column_comment: 展示文字
      tableHead: [],
      tableData: [],
    };
  },
  mounted() {
    this.getItem();
  },
  methods: {
    //Author: cityTS
    //Date: 2022年6月19日
    // 创建计时器1： 每秒更新比赛时间轴
    // 创建计时器2：十秒更新一次数据
    updateData() {
      const that = this;
      // 创建计时器1
      setInterval(() => {
        if (Date.parse(that.Board.startTime) > new Date()) {
          that.Board.status = "UNSTART";
          that.Board.per = 0;
        } else if (Date.parse(that.Board.endTime) > new Date()) {
          that.Board.status = "RUNING";
          that.Board.per = (
            ((new Date().getTime() - Date.parse(that.Board.startTime)) /
              (Date.parse(that.Board.endTime) -
                Date.parse(that.Board.startTime))) *
            100
          ).toFixed(2);
          that.Board.sym = "success";
        } else {
          that.Board.status = "END";
          that.Board.per = 100;
          that.Board.sym = "exception";
        }
      }, 1000);
      // 创建计时器2
      setInterval(() => {
        that.getItem(); // 更新数据
      }, 10000);
    },
    //Author: cityTS
    //Date: 2022年6月19日
    //获取比赛数据
    getItem() {
      this.$http
        .get("/public/board/" + this.$route.params.itemID)
        .then((res) => {
          if (res.statusCode === 50000) {
            this.tableData = res.tableData;
            this.tableHead = res.tableHead;
            this.Board.title = res.title
            // YYYY-MM-DD HH:MM:SS
            this.Board.startTime = res.startTime
            this.Board.endTime = res.endTime
            this.Board = res.Board;
            if (!this.startTag) {
              // 防止不断生成计时器
              this.startTag = true;
              this.updateData();
            }
          } else if (res.statusCode === 50001) {
            // 无效itemID
            this.$router.push("/")
            this.$message.error(res.message)
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(() => {
          this.$message.error("网络错误或系统错误");
        });
    },
    //Author: cityTS
    //Date: 2022年6月19日
    //@prame row 该行所有的数据
    //@prame column 该列所有的属性
    //return 返回单元格的样式JSON

    cellStyle({ row, column }) {
      let style = { "text-align": "center" };
      if (column.property >= "A" && column.property <= "Z") {
        if (row[`${column.property}`].includes("+")) {
          style.background = "#e1ffb5";
        } else if (row[`${column.property}`].includes("-")) {
          style.background = "#ffd0d0";
        } else if (row[`${column.property}`].includes("?")) {
          style.background = "#ae3a65";
        }
      }
      return style;
    },
    //Author: cityTS
    //Date: 2022年6月19日
    //下载表格内容到excel 
    download() {
      var fix = document.querySelector(".el-table_fixed");
      var wb;
      if (fix) {
        wb = XLSX.utils.table_to_book(
          document.querySelector("#out-table").removeChild(fix)
        );
        document.querySelector("#out-table").appendChild(fix);
      } else {
        wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      }
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], {
            type: "application/octet-stream",
          }),
          // 导出的文件名称
          this.Board.title + ".xlsx"
        )
      } catch (e) {
        this.$message.error("出现错误：" + e);
      }
      // return wbout;
    },
  },
};
</script>

<style>
.downloadTable {
  text-align: right;
  margin-top: 10px;
}

.el-table .cell {
  white-space: pre-line;
}

.Board {
  text-align: center;
}

.tableForm {
  width: 95%;
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
  color: rgba(0, 0, 0, 0.75);
  font-size: 32px;
  font-weight: 400;
  padding: 12px 16px 12px 0;
}

.start-time {
  flex: 1;
  text-align: left;
}

.end-time {
  flex: 1;
  text-align: right;
}

.status-time {
  flex: 1;
  text-align: center;
}

.start-end-time {
  width: 100%;
  display: flex;
  display: -webkit-flex;
}
</style>
