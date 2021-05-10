<template>
  <div class="submit-wrap">
    <el-table
      :data="submitList"
      style="width: 100%"
      border
      v-loading="loadingSubmitList"
    >
      <el-table-column prop="releaseDate" label="发布日期" width="160">
      </el-table-column>
      <el-table-column prop="deadline" label="截止日期" width="160">
      </el-table-column>
      <el-table-column prop="name" label="任务名称" width="200">
      </el-table-column>
      <el-table-column prop="desc" label="任务描述" width="320">
      </el-table-column>
      <el-table-column prop="teacher" label="发布教师" width="100">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            @click="handleDetail(scope.$index, scope.row)"
            v-loading="scope.row.loadingFileNeededList"
            >详情</el-button
          >
          <el-dialog title="需求文件列表" :visible.sync="dialogTableVisible">
            <p class="tips">
              上传的文件会被后台自动重命名为 <b>文件名-用户名</b>。<br />
              点击每个需求文件后对应的
              <b>选择文件</b> 按钮，上传对应的文件。需求文件不齐则无法上传。
            </p>
            <el-divider></el-divider>
            <form
              ref="fileForm"
              action="http://118.24.211.84:3033/submit/upload"
              method="post"
              enctype="multipart/form-data"
            >
              <el-table :data="fileNeededList">
                <el-table-column
                  prop="filename"
                  label="文件名"
                  width="400"
                ></el-table-column>
                <el-table-column label="上传" width="250">
                  <template slot-scope="info">
                    <input
                      type="file"
                      :name="
                        releaseDate +
                          '_' +
                          id +
                          '_' +
                          info.row['filename'] +
                          '_' +
                          id +
                          user
                      "
                      size="50"
                      class="fileBtn"
                    /> </template
                ></el-table-column>
              </el-table>
            </form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogTableVisible = false">取消</el-button>
              <el-button type="primary" @click="submit">提交</el-button>
            </span>
          </el-dialog>
        </template></el-table-column
      >
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
import { getSubmitList, getFileList } from "@/api/submit";

export default {
  name: "submit",
  data() {
    return {
      submitList: [], // 任务列表的表格数据
      fileNeededList: [], // 需求文件列表的表格数据
      user: "", // 用户名
      id: "", // 用户id
      releaseDate: "", // 点击对应行的“详情”按钮时，记录该行任务的发布日期
      currentPage: 1,
      pageSize: 20,
      totalCount: 1,
      dialogTableVisible: false,
      loadingSubmitList: false
    };
  },

  created() {
    // 加载任务列表的表格数据
    this.user = window.sessionStorage.getItem("username");
    this.id = window.sessionStorage.getItem("id");
    this.handleCurrentChange(1);
  },

  methods: {
    /*
     * 加载需求文件列表的表格数据
     */
    handleDetail(index, row) {
      // 按钮loading
      this.$set(row, "loadingFileNeededList", true);
      getFileList({
        releaseDate: row.releaseDate
      }).then(res => {
        this.fileNeededList = [];
        for (let i = 0; i < res.length; i++) {
          this.fileNeededList.push({
            filename: res.data[i].filename
          });
        }
        // 点击对应行的“详情”按钮时，记录该行任务的发布日期
        this.releaseDate = row.releaseDate;
        this.dialogTableVisible = true;
        // 按钮取消loading
        this.$set(row, "loadingFileNeededList", false);
      });
    },

    /*
     * 按钮上传事件
     */
    submit() {
      this.$refs["fileForm"].submit();
    },

    /*
     * 切换分页
     */
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadingSubmitList = true;
      getSubmitList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.submitList = res.data;
        this.totalCount = res.totalCount;
      });
      this.loadingSubmitList = false;
    }
  }
};
</script>

<style>
.submit-wrap {
  padding: 20px;
}

.tips {
  font-size: 16px;
}

.fileBtn {
  font-size: 14px;
}

.pagination {
  margin-top: 20px;
}

.el-dialog__wrapper {
  transition-duration: 0.3s;
}
</style>
