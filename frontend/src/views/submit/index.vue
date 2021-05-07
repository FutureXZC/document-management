<template>
  <div class="submit-wrap">
    <el-table :data="submitList" style="width: 100%" border v-loading="loading">
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
              action="http://127.0.0.1:3000/submit/upload"
              method="post"
              enctype="multipart/form-data"
            >
              <el-table :data="fileNeededList">
                <el-table-column
                  prop="filename"
                  label="文件名"
                  width="450"
                ></el-table-column>
                <el-table-column label="上传" width="250">
                  <template slot-scope="info">
                    <input
                      type="file"
                      :name="
                        releaseDate + '_' + info.row['filename'] + '_' + user
                      "
                      size="50"
                    /> </template
                ></el-table-column>
              </el-table>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <input type="submit" value="上传" />
              </span>
            </form>
            <iframe
              id="uploadFrame"
              name="uploadFrame"
              style="display:none;"
            ></iframe>
          </el-dialog> </template
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getSubmitList, getFileList, upload } from "@/api/submit";

export default {
  name: "submit",
  data() {
    return {
      submitList: [], // 任务列表的表格数据
      fileNeededList: [], // 需求文件列表的表格数据
      user: "张三", // 用户名
      releaseDate: "",
      dialogTableVisible: false,
      loading: false
    };
  },

  created() {
    // 加载任务列表的表格数据
    this.loading = true;
    getSubmitList().then(res => {
      this.submitList = res;
    });
    this.loading = false;
  },

  methods: {
    /*
     * 加载需求文件列表的表格数据
     */
    handleDetail(index, row) {
      getFileList({ releaseDate: row["releaseDate"] }).then(res => {
        this.fileNeededList = [];
        for (let i = 0; i < res.length; i++) {
          this.fileNeededList.push({
            filename: res[i]["filename"]
          });
        }
      });
      this.releaseDate = row["releaseDate"];
      this.dialogTableVisible = true;
    }

    // /*
    //  *点击“上传”按钮时调用
    //  * 将[文件列表、用户名和任务发布时间]上传，文件列表内的格式为 [文件对象，重命名后的文件名] ，最后两项为用户名和任务发布时间
    //  */
    // submitUpload() {
    //   // 文件列表 [文件对象，重命名后的文件名]
    //   // let fileList = {};
    //   let req = {
    //     releaseDate: this.releaseDate,
    //     fileList: {}
    //   };
    //   let inputArr = document.getElementsByTagName("input");
    //   for (let i = 0; i < inputArr.length; i++) {
    //     console.log(inputArr[i].name);
    //     let file = inputArr[i].files[0];
    //     let tmp = {};
    //     tmp["path"] = window.URL.createObjectURL(file);
    //     tmp["name"] = file.name;
    //     tmp["size"] = file.size;
    //     tmp["type"] = file.type;
    //     // Object.assign(tmp, file);
    //     req.fileList[inputArr[i].name] = tmp;
    //   }
    //   console.log(req);
    //   upload(req).then(res => {
    //     // console.log(111);
    //   });
    // },

    // /*
    //  * 上传成功的钩子
    //  */
    // handleSuccess() {
    //   this.$message({
    //     message: "任务提交成功！",
    //     type: "success"
    //   });
    //   console.log("success", this.fileList, this.uploadFileList);
    // },

    // /*
    //  * 上传失败的钩子
    //  */
    // handleError() {
    //   this.$message({
    //     message: "任务提交失败，请重试！",
    //     type: "error"
    //   });
    //   console.log("error", this.fileList, this.uploadFileList);
    // }
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
.mark {
  color: #67c23a;
  font-size: 20px;
}
</style>
