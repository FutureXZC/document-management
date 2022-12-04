<template>
  <div>
    <div class="login-wrap">
      <div>
        <img src="static/images/logo.png" alt="曦开实验室" class="logo" />
        <img src="static/images/title.png" alt="文件管理系统" class="title" />
      </div>
      <el-form
        ref="registerForm"
        :model="form"
        :rules="rules"
        label-width="80px"
        class="login-box"
      >
        <h3 class="login-title">用户注册</h3>
        <el-form-item label="账号" prop="id" size="large">
          <div class="login-form-wrap">
            <el-input
              type="text"
              placeholder="账号建议使用您的工号"
              v-model="form.id"
            />
          </div>
        </el-form-item>
        <el-form-item label="用户名" prop="name" size="large">
          <div class="login-form-wrap">
            <el-input
              type="text"
              placeholder="用户名应为您的姓名"
              v-model="form.name"
            />
          </div>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <div class="login-form-wrap">
            <el-input
              placeholder="可输入6-18位字母、数字和下划线"
              v-model="form.pwd"
              show-password
            />
          </div>
        </el-form-item>
        <el-form-item label="确认密码" prop="pwd2">
          <div class="login-form-wrap">
            <el-input
              placeholder="请再次输入密码"
              v-model="form.pwd2"
              show-password
            />
          </div>
        </el-form-item>
        <el-form-item>
          <div class="login-btn">
            <el-button v-on:click="register">注册</el-button>
            <el-button type="primary" v-on:click="toLogin">前往登录</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="icp-record-blue">苏ICP备19034356号-1</div>
  </div>
</template>

<script>
import { register } from "@/api/user";
export default {
  name: "Register",
  data() {
    let validateid = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("账号不能为空"));
      } else if (!/^[0-9]+$/.test(value)) {
        callback(new Error("账号只能数字"));
      } else {
        callback();
      }
    };
    let validatename = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    let validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (!/^\w{6,18}$/.test(value)) {
        callback(new Error("密码只能输入6-18位字母、数字和下划线"));
      } else {
        callback();
      }
    };
    let validatePwd2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码以完成确认"));
      } else if (value != this.form.pwd) {
        callback(new Error("两次输入密码不一致，请检查"));
      } else if (!/^\w{6,18}$/.test(value)) {
        callback(new Error("密码只能输入6-18位字母、数字和下划线"));
      } else {
        callback();
      }
    };
    return {
      form: {
        id: "",
        name: "",
        pwd: "",
        pwd2: ""
      },
      rules: {
        id: [{ required: true, validator: validateid, trigger: "blur" }],
        name: [{ required: true, validator: validatename, trigger: "blur" }],
        pwd: [{ required: true, validator: validatePwd, trigger: "blur" }],
        pwd2: [{ required: true, validator: validatePwd2, trigger: "blur" }]
      }
    };
  },

  methods: {
    /*
     * 转到用户登录界面
     */
    toLogin() {
      this.$router.push("/login");
    },

    /*
     * 用户注册
     */
    register() {
      this.$refs["registerForm"].validate(valid => {
        if (valid) {
          // 表单通过验证即可提交注册
          let formData = {
            id: this.form.id,
            name: this.form.name,
            pwd: this.form.pwd
          };
          register(formData).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.msg,
                type: "success"
              });
            } else if (res.code === 202) {
              this.$message.warning(res.msg);
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-wrap {
  height: 500px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background: linear-gradient(to left, #0188bc 0%, #e4ebf9 100%);
}

.logo {
  margin: 30px 0 0 30px;
  display: block;
}

.title {
  width: 640px;
  margin: 64px 90px;
}

.login-box {
  font-size: 24px;
  height: 350px;
  width: 500px;
  position: absolute;
  top: 0;
  right: 50px;
  bottom: 0;
  /* left: 0; */
  margin: auto 0;
  padding: 35px 35px 15px 35px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
  background: #fff;
}

.login-title {
  text-align: center;
  margin: 0 auto 10px auto;
  color: #303133;
}

.login-btn {
  text-align: center;
}

.icp-record-blue {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  color: white;
  font-size: 16px;
  line-height: 40px;
  text-align: center;
  background-color: #68a3be;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
