<template>
  <el-aside width="200px">
    <el-menu
      :default-active="isActive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="1" @click="goTo('submit')">
        <i class="el-icon-data-line"></i>
        <span slot="title">任务提交</span>
      </el-menu-item>
      <el-menu-item index="2" @click="goTo('publish')">
        <i class="el-icon-info"></i>
        <span slot="title">任务发布</span>
      </el-menu-item>
      <el-menu-item index="3" @click="goTo('history')">
        <i class="el-icon-document"></i>
        <span slot="title">历史记录</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "Sidebar",
  computed: {
    isActive() {
      if (this.$route.path == "/submit") {
        return "1";
      } else if (this.$route.path == "/publish") {
        return "2";
      } else {
        return "3";
      }
    }
  },

  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },

    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },

    goTo(index) {
      this.$router.push(index);
    }
  }
};
</script>

<style>
.el-aside {
  background-color: #444;
  color: #fff;
  text-align: center;
  line-height: 200px;
}
.el-menu {
  border: 0;
}
.el-menu-item {
  background-color: #444;
  color: #fff;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
