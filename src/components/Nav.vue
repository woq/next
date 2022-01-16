<template>
    <b-navbar>
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/home' }" type="is-drak">
                <img
                    src="/buefy-logo.png"
                    alt="没用的Logo"
                >
            </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item href="#" tag="router-link" :to="{ path: '/home' }" active>
                链接
            </b-navbar-item>
            <b-navbar-item href="#" tag="router-link" :to="{ path: '/status' }">
                状态
            </b-navbar-item>
            <b-navbar-dropdown label="每周">
                <b-navbar-item href="#">
                    联盟战绩
                </b-navbar-item>
                <b-navbar-item href="#">
                    联盟消费
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template #end>
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-primary">
                        <strong>管理</strong>
                    </a>
                    <a class="button is-light" @click="logout">
                        登出
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>
<script>
export default {
    methods: {
        logout() {
          localStorage.removeItem('access')
          this.$router.push('/login')
        }
    }
}
</script>
<style>
.el-header{
    padding: 0;
}
</style>