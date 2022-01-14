<template>
  <el-container>
    <el-header>
      <Nav/>
    </el-header>
    <el-main>
      <div class="status">
          <el-button @click="addSome">手动更新</el-button>
            <el-alert
                :title=this.updateTime
                type="info"
                show-icon>
            </el-alert>
              <el-table
                stripe
                border
                :data="links">
                    <el-table-column
                        prop="sango_id"
                        label="ID"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="sango_name"
                        label="君主"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="sango_unionName"
                        label="联盟">
                    </el-table-column>
                    <el-table-column
                        prop="defend_status"
                        label="驻防">
                    </el-table-column>
                    <el-table-column
                        prop="defend_mainCity"
                        label="主城">
                    </el-table-column>
                    <el-table-column
                        prop="defend_auxiliaryCities"
                        label="辅城">
                    </el-table-column>
                    <el-table-column
                        prop="operate_defendLastTime"
                        label="驻防更新">
                    </el-table-column>
                    <el-table-column
                        prop="defend_num"
                        label="驻防总数">
                    </el-table-column>
                    <el-table-column
                        prop="defend_numShould"
                        label="驻防应有">
                    </el-table-column>
                    <el-table-column
                        prop="sango_linkAddTime"
                        label="链接添加时间">
                    </el-table-column>
                </el-table>
      </div>
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'Home',
  components: {
    Nav: () => import('@/components/Nav.vue'),
  },
  data(){
    return {
      urls: '',
      links:[],
      url:'',
      updateTime: '',
    } 
  },
  beforeMount() {
      if (process.env.NODE_ENV === 'development') {
        this.url = '/api'
      } else {
        this.url = 'https://lms.sangoo.xyz/api'
      }
      this.addSome()
  },
  methods: {
      addSome(){
        axios.get(this.url +'/link',
            {
              headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access'),'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
          .then(res => {
              moment.locale('zh-cn')
              this.updateTime = "更新时间   " + moment().calendar();
              this.links = res.data
          })
          .catch(err => {
              if (err.response.status == 401) {
                  this.$message.error('登录失效，请重新登录')
                  //this.$router.push('/login')
              }
              else {
                  this.$message.error('意外错误')
                  //this.$router.push('/login')
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
<style>
.el-table{
    width: 95vw;
    margin-top: 3vh;
    font-size: 0.5rem;
    text-align: center;
}
.el-alert{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1vh;
}
</style>