<template>
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="login.svg" alt="Workflow">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          全新登录
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          或
          <a @click="seedMessage" class="font-medium text-indigo-600 hover:text-indigo-500">
            先走一步
          </a>
        </p>
      </div>
      <el-form ref="loginForm" :model="user" :rules="rules" status-icon class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm -space-y-px">
          <el-form-item prop="username">
            <el-input v-model="user.username" placeholder="请输入用户名" prefix-icon>
              <i slot="prefix" class="el-icon-user-solid"></i>
            </el-input>
          </el-form-item>
          <el-form-item id="password" prop="password">
            <el-input v-model="user.password" show-password placeholder="请输入密码" @keyup.enter.native="doLogin">
              <i slot="prefix" class="el-icon-lock"></i>
            </el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="doLogin()" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            登录
            </el-button>
        </el-form-item>
      </el-form>
     </div>
    </div>
</template>
<script>
import axios from'axios'
export default {
    name: 'login',
    data() {
      return {
        url: '',
        user: {
            username: '',
            password: ''
          },

    rules: {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 30, message: '长度在 6 到 18 个字符', trigger: 'blur' }
      ]
    }
        }
    },
    beforeMount() {
      if (process.env.NODE_ENV === 'development') {
        this.url = '/api'
      } else {
        this.url = 'https://lms.sangoo.xyz/api'
      }
      if(localStorage.getItem('access') != null){
        console.log('yes')
        axios.post(this.url+'/token/verify',  {token: localStorage.getItem('access')})
          .then(res => {
            if (res.status == 200) {
              this.$router.push('/home');
            } else {
              this.$message.error('意外错误');
            }
          })
          .catch(err => {
            localStorage.removeItem('access')
          })}
    },
    methods: {
      doLogin() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            axios.post(this.url+'/token/pair', this.user)
              .then(res => {
                if (res.status == 200) {
                  this.$message.success('登录成功 正在跳转中...');
                  localStorage.setItem('access', res.data.access)
                  localStorage.setItem('refresh', res.data.refresh)
                  localStorage.setItem('username', res.data.username)
                  this.$router.push('/home');
                } else {
                  this.$message.error('意外错误');
                  return false;
                }
              })
              .catch(err => {
                this.$message.error('登录失败 ' + err);
                return false;
              })
          } else {
            this.$message.warning('请检查输入项');
            return false;
          }
        });
      },
      seedMessage() {
        this.$message({
          message: '嗯? What are you doing man?',
          type: 'info'
        });
      }
    },
  }
</script>
<style scoped>
</style>