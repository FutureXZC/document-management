<template>
  <div class="login-wrap">
    <div>
      <img
        src="static/images/logo.png"
        alt="金陵科技学院-软件工程学院"
        class="logo"
      />
      <img src="static/images/title.png" alt="文件管理系统" class="title" />
    </div>
    <el-form
      ref="loginForm"
      :model="form"
      :rules="rules"
      label-width="80px"
      class="login-box"
      label-position="top"
    >
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="id" size="large">
        <div class="login-form-wrap">
          <el-input
            type="text"
            placeholder="账号为您的学号/工号"
            v-model="form.id"
          />
        </div>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <div class="login-form-wrap">
          <el-input placeholder="请输入密码" v-model="form.pwd" show-password />
        </div>
      </el-form-item>
      <el-form-item>
        <div class="login-btn">
          <el-button type="primary" v-on:click="onSubmit('loginForm')"
            >登录</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "@/api/user";
export default {
  name: "Login",
  data() {
    let validateid = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("账号不能为空"));
      } else if (!/^[A-Za-z0-9]+$/.test(value)) {
        callback(new Error("账号只能输入字母和数字"));
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
    return {
      form: {
        id: "",
        pwd: ""
      },
      rules: {
        id: [
          {
            required: true,
            validator: validateid,
            trigger: "blur"
          }
        ],
        pwd: [{ required: true, validator: validatePwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 后台通过验证则跳转到操作界面
          login(this.form).then(res => {
            console.log(res);
            if (res.code === 200) {
              window.sessionStorage.setItem("token", res.token);
              window.sessionStorage.setItem("username", res.username);
              window.sessionStorage.setItem("id", this.form.id);
              this.$message({
                message: "登录成功",
                type: "success"
              });
              this.$router.push("/submit");
            } else {
              console.log(res.msg);
              this.$message.error("账号或密码错误");
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

<style>
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
  margin: 35px 90px;
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
  margin: 0 auto 20px auto;
  color: #303133;
}

.login-btn {
  text-align: center;
}
</style>
