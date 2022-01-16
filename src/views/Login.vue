<template>
  <div class="login">
    <section class="hero is-success is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <h3 class="title has-text-black">登录</h3>
            <hr class="login-hr" />
            <p class="subtitle has-text-black">开门需要个钥匙</p>
            <div class="box">
              <el-form
                ref="loginForm"
                :model="user"
                :rules="rules"
                status-icon
                class="mt-8 space-y-6"
              >
                <div class="rounded-md shadow-sm -space-y-px">
                  <el-form-item prop="username">
                    <el-input
                      v-model="user.username"
                      placeholder="你的用户名"
                      prefix-icon
                    >
                      <i slot="prefix" class="el-icon-user-solid"></i>
                    </el-input>
                  </el-form-item>
                  <el-form-item id="password" prop="password">
                    <el-input
                      v-model="user.password"
                      show-password
                      placeholder="你的密码"
                      @keyup.enter.native="doLogin"
                    >
                      <i slot="prefix" class="el-icon-lock"></i>
                    </el-input>
                  </el-form-item>
                </div>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="doLogin()"
                    class="button is-block is-info is-large is-fullwidth"
                  >
                    提交
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
            <p class="has-text-grey">
              <a>全新注册</a> &nbsp;·&nbsp; <a>忘记密码</a> &nbsp;·&nbsp;
              <a>需要帮助?</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      url: "",
      user: {
        username: "",
        password: "",
      },

      rules: {
        username: [
          { required: true, message: "你的用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "你的密码", trigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  beforeMount() {
    if (process.env.NODE_ENV === "development") {
      this.url = "/api";
    } else {
      this.url = "https://lms.sangoo.xyz/api";
    }
    if (localStorage.getItem("access") != null) {
      console.log("yes");
      axios
        .post(this.url + "/token/verify", {
          token: localStorage.getItem("access"),
        })
        .then((res) => {
          if (res.status == 200) {
            this.$router.push("/home");
          } else {
            this.$message.error("意外错误");
          }
        })
        .catch((err) => {
          localStorage.removeItem("access");
        });
    }
  },
  methods: {
    doLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          axios
            .post(this.url + "/token/pair", this.user)
            .then((res) => {
              if (res.status == 200) {
                this.$message.success("登录成功 正在跳转中...");
                localStorage.setItem("access", res.data.access);
                localStorage.setItem("refresh", res.data.refresh);
                localStorage.setItem("username", res.data.username);
                this.$router.push("/home");
              } else {
                this.$message.error("意外错误");
                return false;
              }
            })
            .catch((err) => {
              this.$message.error("登录失败 " + err);
              return false;
            });
        } else {
          this.$message.warning("请检查输入项");
          return false;
        }
      });
    },
    seedMessage() {
      this.$message({
        message: "嗯? What are you doing man?",
        type: "info",
      });
    },
  },
};
</script>
<style scoped>
html,
body {
  font-family: "Questrial", sans-serif;
  font-size: 14px;
  font-weight: 300;
}
.hero.is-success {
  background: #f2f6fa;
}
.hero .nav,
.hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 2rem;
}
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
input {
  font-weight: 300;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 1rem;
}

.login-hr {
  border-bottom: 1px solid black;
}

.has-text-black {
  color: black;
}

.field {
  padding-bottom: 10px;
}

.fa {
  margin-left: 5px;
}
</style>
