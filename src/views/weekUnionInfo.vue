<template>
  <div class="status">
    <Nav />
    <div class="status_table">
      <section>
        <b-field>
          <b-button class="is-small" @click="getInfo">手动刷新</b-button>
        </b-field>
        <b-field>
          <b-tag type="is-primary">{{ updateTime }}</b-tag>
        </b-field>
        <b-table
          :data="isEmpty ? [] : getData"
          bordered
          striped
          hoverable
          :loading="isLoading"
          focusable
          mobile-cards
        >
          <b-table-column field="userId" label="周" v-slot="props" centered>
            <span class="tag">{{ props.row.weeksNum }}</span>
          </b-table-column>

          <b-table-column field="level" label="联盟ID" v-slot="props" centered>
            <span class="tag is-info">{{ props.row.union_id }}</span>
          </b-table-column>
          <b-table-column field="addTime" label="联盟" v-slot="props" centered>
            <span class="tag is-success">
              {{ props.row.union_name }}
            </span>
          </b-table-column>
          <b-table-column
            field="addTime"
            label="联盟消费"
            v-slot="props"
            centered
          >
            <span class="tag is-success is-light">
              {{ props.row.weekSecConsume }}
            </span>
          </b-table-column>
          <template #empty>
            <div class="has-text-centered">暂无数据</div>
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
      getData: [],
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
    document.title = "联盟消费";
    this.getInfo();
  },
  methods: {
    getInfo() {
      axios
        .get(this.url + "/WeekUnionInfo", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          dayjs.locale("zh-cn");
          this.updateTime =
            "更新时间   " + dayjs().format("YYYY-MM-DD HH:mm:ss");
          this.getData = res.data;
          this.$message.success("加载成功");
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
