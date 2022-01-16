<template>
  <div class="status">
    <Nav />
    <div class="status_table">
      <section>
        <b-table
          :data="isEmpty ? [] : links"
          bordered
          striped
          hoverable
          :loading="isLoading"
          focusable
          mobile-cards
        >
          <b-table-column field="sango_id" label="ID" v-slot="props" centered>
            <span class="tag is-warning is-light">{{
              props.row.sango_id
            }}</span>
          </b-table-column>

          <b-table-column
            field="sango_name"
            label="君主"
            v-slot="props"
            centered
          >
            <span class="tag is-info">{{ props.row.sango_name }}</span>
          </b-table-column>

          <b-table-column
            field="sango_unionName"
            label="联盟"
            v-slot="props"
            centered
          >
            <span class="tag is-info">{{ props.row.sango_unionName }}</span>
          </b-table-column>
          <b-table-column
            field="sango_linkAddTime"
            label="存活时间"
            v-slot="props"
            centered
          >
            <span class="tag is-success">
              {{ props.row.sango_linkAddTime | dateFormat }}
            </span>
          </b-table-column>
          <b-table-column
            field="token_lastGenerateTime"
            label="验证更新"
            v-slot="props"
            centered
          >
            {{ props.row.token_lastGenerateTime | dateFormat }}
          </b-table-column>
          <template #empty>
            <div class="has-text-centered">No records</div>
          </template>
        </b-table>
      </section>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import dayjs from "dayjs";
export default {
  name: "Home",
  components: {
    Nav: () => import("@/components/Nav.vue"),
  },
  data() {
    return {
      urls: "",
      links: [],
      url: "",
      updateTime: "",
      isEmpty: false,
      isLoading: false,
    };
  },
  mounted() {
    if (process.env.NODE_ENV === "development") {
      this.url = "/api";
    } else {
      this.url = "https://lms.sangoo.xyz/api";
    }
    this.addSome();
  },
  methods: {
    addSome() {
      axios
        .get(this.url + "/link", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          dayjs.locale("zh-cn");
          this.updateTime =
            "更新时间   " + dayjs().format("YYYY-MM-DD HH:mm:ss");
          this.links = res.data;
        })
        .catch((err) => {
          if (err.response.status == 401) {
            this.$message.error("登录失效，请重新登录");
            this.$router.push("/login");
          } else {
            this.$message.error("意外错误");
          }
        });
    },
    alertMessage(str) {
      this.$alert(str + "<br/>" + this.addInfo, "提示", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        center: true,
      });
    },
  },
  filters: {
    dateFormat(time) {
      //return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
      let minutes = dayjs().diff(dayjs(time), "minutes");
      return Math.floor(minutes / 60) + " 时 " + (minutes % 60) + " 分";
    },
  },
};
</script>
<style>
.status {
  display: flex;
  flex-direction: column;
  width: 100vw;
}
.status_table {
  display: flex;
  justify-content: center;
  align-items: center;
}
.b-table {
  width: 50vw;
}
</style>
