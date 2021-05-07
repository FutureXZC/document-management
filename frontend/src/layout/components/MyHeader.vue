<template>
  <div class="myHeader">
    <span>文件管理系统</span>
    <div class="userName">
      <el-dropdown>
        <span>{{ user }}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyHeader",
  data() {
    return {
      user
    };
  },
  created() {
    this.user = window.sessionStorage.getItem("username");
  }
};
</script>

<style>
.myHeader {
  background-color: #333;
  color: #fff;
  text-align: center;
  line-height: 60px;
  padding: 0;
}
.userName {
  display: inline-block;
  position: absolute;
  right: 50px;
}
.userName span {
  color: #fff;
  font-size: 16px;
}
</style>
