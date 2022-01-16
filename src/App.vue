<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
html {
  font-family: "Montserrat", "Helvetica Neue", Helvetica, "思源黑体",
    "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,
    sans-serif;
  text-align: center;
  height: 100vh;
}
.router-link-active {
  text-decoration: none;
  color: black;
}
a {
  text-decoration: none;
  color: black;
}
.el-aside {
  height: 100vh;
}
</style>
