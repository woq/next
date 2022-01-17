<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/home' }">
        <img src="/buefy-logo.png" alt="没用的Logo" />
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-dropdown label="链接" hoverable>
        <b-navbar-item href="#" tag="router-link" :to="{ path: '/home' }">
          链接添加
        </b-navbar-item>
        <b-navbar-item href="#" tag="router-link" :to="{ path: '/status' }">
          所有状态
        </b-navbar-item>
        <b-navbar-item href="#" tag="router-link" :to="{ path: '/addlog' }">
          添加记录
        </b-navbar-item>
        <b-navbar-item href="#" tag="router-link" :to="{ path: '/expiredlog' }">
          过期记录
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown label="每天" hoverable>
        <b-navbar-item href="#"> 攻伐使用 </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown label="每周" hoverable>
        <b-navbar-item
          href="#"
          tag="router-link"
          :to="{ path: '/weekunioninfo' }"
        >
          周联盟战绩
        </b-navbar-item>
        <b-navbar-item href="#"> 周联盟消费 </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown label="每月" hoverable>
        <b-navbar-item href="#"> 月王族等级 </b-navbar-item>
        <b-navbar-item href="#"> 月天下第一 </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown label="驻防" hoverable>
        <b-navbar-item href="#"> 驻防状态 </b-navbar-item>
        <b-navbar-item href="#"> 驻防设置 </b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary">
            <strong>管理</strong>
          </a>
          <a class="button is-light" @click="logout"> 登出 </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("access");
      this.$router.push("/login");
    },
  },
};
</script>
<style>
.el-header {
  padding: 0;
}
</style>
