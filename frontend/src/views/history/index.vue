<template>
  <div class="history-wrap">
    <el-table :data="tableData" style="width: 100%" border v-loading="loading">
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
import { getHistory, deleteHistory } from "@/api/history";
export default {
  name: "history",
  data() {
    return {
      tableData: [],
      loading: false
    };
  },

  created() {
    // 加载历史记录列表的初始数据
    this.getBaseList();
  },

  methods: {
    /*
     * 加载历史记录列表的数据，页面首次加载、删除记录、刷新页面时都会调用
     */
    getBaseList() {
      this.loading = true;
      getHistory().then(res => {
        this.tableData = res;
      });
      this.loading = false;
    },

    /*
     * 删除对应历史记录
     */
    handleDelete(index, row) {
      deleteHistory({ submitDate: row["submitDate"] }).then(res => {
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
