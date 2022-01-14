<template>
  <el-container>
    <el-header>
      <Nav/>
    </el-header>
    <el-main>
      <div class="flex justify-center items-center" style="height: 50vh;width: 100%;">
      <el-form ref="loginForm"  class="mt-8 space-y-6" style="width: 30rem;">
        <div class="rounded-md shadow-sm -space-y-px">
          <el-form-item >
            <el-input v-model="urls" type="textarea" placeholder="请输入链接" :autosize="{ minRows: 10, maxRows: 200}">
              <i slot="prefix" class="el-icon-lock"></i>
            </el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="addSome" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            提交
            </el-button>
        </el-form-item>
      </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'Home',
  components: {
    Nav: () => import('@/components/Nav.vue'),
  },
  data(){
    return {
      urls: '',
      addInfo: '',
      url:'',
    } 
  },
  beforeMount() {
      if (process.env.NODE_ENV === 'development') {
        this.url = '/api'
      } else {
        this.url = 'https://lms.sangoo.xyz/api'
      }
  },
  methods: {
      addSome(){
        if (this.urls == '') {
          this.$message({
            message: '请输入链接',
            type: 'warning'
          });
          return false;
        }
        axios.post(this.url +'/add',qs.stringify({urls:this.urls}),
            {
              headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access'),'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
          .then(res => {

               this.addInfo = String(res.data.reslut)
               this.alertMessage("成功数量 " +String(res.data.successNum) + " | 提交数量" + String(res.data.submitNum))
               this.urls=''
          })
          .catch(err => {
              if (err.response.status == 401) {
                  this.$message.error('登录失效，请重新登录')
                  this.$router.push('/login')
              }
              else {
                  this.$message.error('意外错误')
              }
          })
      },
      alertMessage(str){
        this.$alert(str + "<br/>" + this.addInfo, '提示', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          center: true
        })
      }
  }
}
</script>
