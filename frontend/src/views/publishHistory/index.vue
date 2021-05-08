<template>
  <div class="history-wrap">
    <el-table :data="tableData" style="width: 100%" border v-loading="loading">
      <el-table-column prop="releaseDate" label="发布日期" width="160">
      </el-table-column>
      <el-table-column prop="deadline" label="截止日期" width="160">
      </el-table-column>
      <el-table-column prop="name" label="任务名称" width="200">
      </el-table-column>
      <el-table-column prop="desc" label="任务描述" width="320">
      </el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button
            type="success"
            plain
            @click="handleDownload(scope.$index, scope.row)"
            >下载文件</el-button
          >
          <el-button
            type="danger"
            plain
            @click="handleDelete(scope.$index, scope.row)"
            >删除任务</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getPublishedTask, deleteTask } from "@/api/history";
export default {
  name: "publishHistory",
  data() {
    return {
      tableData: [],
      loading: false,
      currentPage: 1,
      pageSize: 20,
      totalCount: 200
    };
  },

  created() {
    // 加载历史记录列表的初始数据
    this.handleCurrentChange(1);
  },

  methods: {
    /*
     * 删除对应任务记录
     */
    handleDelete(index, row) {
      deleteTask({
        releaseDate: row.releaseDate
      }).then(res => {
        if (res.code == 200) {
          this.$alert(res.msg, "操作结果", {});
          this.tableData.splice(index, 1);
          this.handleCurrentChange(this.currentPage);
        } else {
          this.$alert(res.msg, "操作结果", {});
        }
      });
    },

    /*
     * 切换分页
     */
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loading = true;
      getPublishedTask({
        submitId: window.sessionStorage.getItem("id"),
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.tableData = res.data;
        this.totalCount = res.totalCount;
      });
      this.loading = false;
    }
  }
};
</script>

<style>
.history-wrap {
  padding: 20px;
}

.pagination {
  margin-top: 20px;
}
</style>
