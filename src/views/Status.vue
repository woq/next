<template>
  <el-container>
    <el-header>
      <Nav/>
    </el-header>
    <el-main>
          <el-button @click="addSome">手动更新</el-button>
            <el-alert
                :title='updateTime'
                type="info"
                show-icon>
            </el-alert>
              <el-table
                stripe
                border
                fit
                style="display: flex; flex-direction: column; width: 100%;"
                :data="links">
                    <el-table-column
                        prop="sango_id"
                        label="ID"
                        align="center"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="sango_name"
                        label="君主"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="sango_unionName"
                        label="联盟"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="sango_linkAddTime"
                        label="存活时间"
                        align="center">
                      <template slot-scope="scope">{{ scope.row.sango_linkAddTime | dateFormat }}</template>
                    </el-table-column>
                </el-table>

    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import dayjs from 'dayjs'
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
  beforeUpdate() {
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
              dayjs.locale('zh-cn')
              this.updateTime = "更新时间   " + dayjs().format('YYYY-MM-DD HH:mm:ss');
              this.links = res.data
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
  },
  filters: {
    dateFormat(time) {
      //return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
      let minutes = dayjs().diff(dayjs(time),'minutes')
      return  Math.floor(minutes / 60) + ' 时 ' + minutes % 60 + ' 分'
    }
  }
}
</script>
<style>
.el-table{
    width: 50vw;
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