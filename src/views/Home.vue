<!--
 * @Author: your name
 * @Date: 2020-11-13 09:53:39
 * @LastEditTime: 2020-11-26 19:06:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \teste:\Vue\Test\admin-test\src\views\Home.vue
-->
<template>
  <div class="home">
    <el-header></el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#001529"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item
            v-for="(item, index) in navData"
            :key="index"
            :index="item.path"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <el-breadcrumb
            separator-class="el-icon-arrow-right"
            style="margin-bottom: 20px;"
          >
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  components: {},
  data() {
    return {
      breadList: [],
      navData: [
        {
          icon: "el-icon-s-data",
          path: "/dashboard",
          title: "Dashboard"
        },
        {
          icon: "el-icon-document-copy",
          path: "/dynamicForm",
          title: "动态表单"
        },
        {
          icon: "el-icon-document-copy",
          path: "/detail",
          title: "详情"
        },
        {
          icon: "el-icon-s-grid",
          path: "/table",
          title: "表格"
        }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.el-aside {
  height: calc(100vh - 60px);
  background-color: #001529;
  overflow: hidden;
}
.el-header {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-menu {
  width: 100%;
}
.el-main {
  font-size: 14px;
  height: calc(100vh - 60px);
  background-color: #e9eef3;
}
</style>
