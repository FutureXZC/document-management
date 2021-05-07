<template>
  <div class="history-wrap">
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="submitDate" label="提交日期" width="160">
      </el-table-column>
      <el-table-column prop="name" label="任务名称" width="200">
      </el-table-column>
      <el-table-column prop="desc" label="任务描述" width="320">
      </el-table-column>
      <el-table-column prop="teacher" label="发布老师" width="100">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            type="danger"
            plain
            @click="handleDelete(scope.$index, scope.row)"
            >删除记录</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { getList, getExam, deleteHis } from "@/api/sqlTools";

export default {
  name: "history",
  data() {
    return {
      // tableData: [
      //   {
      //     submitDate: "2020-05-03 19:55:55",
      //     name: "实验报告",
      //     desc: "5班学生的实验报告",
      //     teacher: "张三"
      //   },
      //   {
      //     submitDate: "2020-05-03 09:55:55",
      //     name: "成绩单",
      //     desc: "6班同学的成绩",
      //     teacher: "李四"
      //   },
      //   {
      //     submitDate: "2020-05-03 19:56:05",
      //     name: "立项材料",
      //     desc: "自然科学基金的立项申请材料",
      //     teacher: "王五"
      //   }
      // ]
      tableData: []
    };
  },

  created() {
    // this.getBaseList();
  },

  methods: {
    handleDetail(index, row) {
      if (row["isExam"] == "否") {
        this.$alert("该患者没有输入体检数据。", "体检数据", {});
        return;
      }
      getExam({ time: row["time"] }).then(res => {
        for (let key in res[0]) {
          this.gridData[0][key] = res[0][key];
        }
        this.gridDesc[0]["desc"] = row["desc"];
        this.gridDesc[0]["prob"] = row["prob"];
        this.dialogTableVisible = true;
      });
    },

    handleDelete(index, row) {
      deleteHis({ time: row["time"], isExam: row["isExam"] }).then(res => {
        if (res["code"] == 200) {
          this.$alert(res["msg"], "操作结果", {});
          this.tableData.splice(index, 1);
          this.getBaseList();
        } else {
          this.$alert(res["msg"], "操作结果", {});
        }
      });
    }
  }
};
</script>

<style>
.history-wrap {
  padding: 20px;
}
</style>
