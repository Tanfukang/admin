<!--
 * @Author: your name
 * @Date: 2020-11-21 18:17:55
 * @LastEditTime: 2020-11-21 19:45:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \teste:\Vue\Test\admin-test\src\views\Detail.vue
-->
<template>
  <div class="wrapper">
    <el-button type="primary" @click="change">主要按钮</el-button>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    change() {
      this.$router.push({ path: "/test" });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>
