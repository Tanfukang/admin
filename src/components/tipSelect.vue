<!--
 * @Author: your name
 * @Date: 2020-11-18 10:20:00
 * @LastEditTime: 2020-11-26 15:55:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \testc:\Users\v_kangfutan.000\Desktop\comp\wxpay-ida-metric-component\uikits\tipSelect\default.vue
-->
<template>
  <div class="wrapper">
    <el-select
      v-model="svalue"
      placeholder="请选择"
      size="small"
      @change="selectChange"
      filterable
      @focus="Getfocus($event)"
      @input="$emit('input', $event)"
    >
      <el-tooltip
        class="item"
        effect="dark"
        :open-delay="600"
        :content="item.tip"
        placement="top-start"
        v-for="(item, index) in options"
        :key="item.value"
      >
        <el-option
          @mouseover.native="setMouseOver(item, index)"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-tooltip>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "jimu-components-tipSelect",
  components: {},
  props: {
    value: {
      //当前选中值
      type: String,
      default() {
        return "";
      }
    },
    options: {
      type: Array,
      default() {
        return [
          {
            value: "选项1",
            label: "黄金糕",
            tip: "正在加载"
          },
          {
            value: "选项2",
            label: "双皮奶",
            tip: "正在加载"
          },
          {
            value: "选项3",
            label: "蚵仔煎",
            tip: "正在加载"
          },
          {
            value: "选项4",
            label: "龙须面",
            tip: "正在加载"
          },
          {
            value: "选项5",
            label: "北京烤鸭",
            tip: "正在加载"
          }
        ];
      }
    }
  },
  data() {
    return {
      svalue: this.value
    };
  },
  methods: {
    setMouseOver(value, index) {
      this.$emit("mouseover", value, index);
    },
    selectChange(value) {
      this.$emit("change", value);
    },
    Getfocus(el) {
      this.$emit("focus", el);
    }
  },
  watch: {
    value(val) {
      this.svalue = val; //②监听外部对props属性result的变更，并同步到组件内的data属性myResult中
    },
    // //判断下拉框的值是否有改变
    svalue(val, oldVal) {
      if (val !== oldVal) {
        this.$emit("input", val);
      }
    }
  },
  created() {},
  mounted() {
    this.svalue = this.value;
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-select .el-input.is-focus .el-input__inner {
  border-color: #00c250;
}
.el-select-dropdown__item.selected {
  color: #00c250;
  font-weight: 700;
}
/deep/.el-select .el-input__inner:focus {
  border-color: #00c250;
}
</style>
