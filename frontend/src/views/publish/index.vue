<template>
  <div class="publish-wrap">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="任务名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请填写任务名称，最多20个字符"
        ></el-input>
      </el-form-item>
      <el-form-item label="截止时间" prop="date1">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker
            placeholder="选择时间"
            v-model="form.date2"
            style="width: 100%;"
          ></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="任务描述" prop="desc">
        <el-input
          type="textarea"
          v-model="form.desc"
          placeholder="描述该任务的一些具体要求，最多100个字符"
          :autosize="{ minRows: 4 }"
          maxlength="100"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item
        v-for="(file, index) in form.fileList"
        :label="'文件' + (index + 1)"
        :key="index"
        :prop="'fileList.' + index + '.filename'"
        :rules="{
          required: true,
          message: '文件名不能为空',
          trigger: 'blur'
        }"
      >
        <el-input
          v-model="file.filename"
          placeholder="该任务要保存的文件名，最多20个字符"
          class="filename"
          maxlength="20"
        ></el-input
        ><el-button @click.prevent="removeFile(file)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="addFile">添加文件</el-button>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">立即发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addTask } from "@/api/publish";

export default {
  name: "publish",
  data() {
    let validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("文件名不能为空"));
      } else {
        callback();
      }
    };
    let validateDate1 = (rule, value, callback) => {
      if (this.form.date1 === "") {
        callback(new Error("截止日期不能为空"));
      } else if (this.form.date2 === "") {
        callback(new Error("截止日期的时间段不能为空"));
      } else {
        callback();
      }
    };
    let validateDesc = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("任务描述不能为空"));
      } else {
        callback();
      }
    };
    return {
      form: {
        name: "",
        date1: "",
        date2: "",
        desc: "",
        fileList: [{ filename: "" }]
      },
      rules: {
        name: [{ required: true, validator: validateName, trigger: "blur" }],
        date1: [{ required: true, validator: validateDate1, trigger: "blur" }],
        desc: [{ required: true, validator: validateDesc, trigger: "blur" }]
      }
    };
  },
  methods: {
    /*
     * 提交任务列表
     */
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formData = {
            name: this.form.name,
            date1: this.form.date1,
            date2: this.form.date2,
            desc: this.form.desc,
            teacher: window.sessionStorage.getItem("username"),
            teacherId: window.sessionStorage.getItem("id"),
            fileList: []
          };
          for (let i = 0; i < this.form.fileList.length; i++) {
            formData.fileList.push(this.form.fileList[i]["filename"]);
          }
          addTask(formData).then(res => {
            this.$message({
              message: "任务创建成功！",
              type: "success"
            });
          });
        } else {
          return false;
        }
      });
    },

    /*
     * 删除对应文件信息
     */
    removeFile(item) {
      var index = this.form.fileList.indexOf(item);
      if (index !== -1) {
        this.form.fileList.splice(index, 1);
      }
    },

    /*
     * 添加一个文件信息
     */
    addFile() {
      this.form.fileList.push({
        filename: ""
      });
    }
  }
};
</script>

<style>
.publish-wrap {
  padding: 20px;
}

.line {
  text-align: center;
  font-size: 16px;
}

.filename {
  width: 80%;
  margin-right: 8px;
}
</style>
