<template>
  <el-container>
    <el-container class="content-wrap">
      <el-header>
        <my-header></my-header>
      </el-header>
      <el-container>
        <sidebar></sidebar>
        <app-main></app-main>
      </el-container>
    </el-container>
    <el-footer class="icp-record-dark">苏ICP备19034356号-1</el-footer>
  </el-container>
</template>

<script>
import MyHeader from "./components/MyHeader";
import Sidebar from "./components/Sidebar";
import AppMain from "./components/AppMain";

export default {
  name: "Layout",
  components: {
    MyHeader,
    Sidebar,
    AppMain
  }
};
</script>

<style scoped>
body > .el-container {
  margin-bottom: 40px;
}
.content-wrap {
  padding-bottom: 60px;
}
.el-header {
  padding: 0;
}
.icp-record-dark {
  width: 100%;
  height: 40px;
  color: white;
  font-size: 14px;
  text-align: center;
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  z-index: 9999;
}
</style>
