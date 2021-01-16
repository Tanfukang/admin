<!--
 * @Author: your name
 * @Date: 2020-11-13 09:53:39
 * @LastEditTime: 2020-11-26 15:56:13
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \teste:\Vue\Test\admin-test\src\views\Test.vue
-->
<template>
  <div class="wrapper">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>动态表单</span>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div class="date-select">
          <el-form-item label="时间:" prop="relativeTime">
            <el-date-picker
              v-model="ruleForm.relativeTime"
              type="datetimerange"
              format="yyyy-MM-dd HH:mm"
              value-format="timestamp"
              @change="datePicker"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            >
            </el-date-picker>
          </el-form-item>
          <div class="date-control">
            最近：
            <el-select
              @change="selectTime"
              v-model="timeValue"
              placeholder="请选择"
              style="width: 100px"
            >
              <el-option
                v-for="item in selectHourList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="date-control">
            <el-button
              icon="el-icon-arrow-left"
              @click="theDayBefore"
              :disabled="ruleForm.relativeTime.length ? false : true"
              >前一天</el-button
            >
            <el-button
              @click="theDayAfter"
              :disabled="ruleForm.relativeTime.length ? false : true"
              >后一天<i class="el-icon-arrow-right el-icon--right"></i
            ></el-button>
          </div>
        </div>
        <div
          v-for="(item, index) in ruleForm.dataList"
          :key="index"
          class="for-list"
        >
          <el-form-item
            :label="String.fromCharCode(64 + (index + 1))"
            :prop="`dataList.${index}.level1`"
            class="form-item"
            :rules="rules.level1"
          >
            <el-select v-model="item.level1" filterable placeholder="请选择">
              <el-option
                v-for="v in firstList"
                :key="v.value"
                :label="v.label"
                :value="v.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :prop="`dataList.${index}.level2`"
            class="form-item"
            :rules="rules.level2"
          >
            <el-select v-model="item.level2" filterable placeholder="请选择">
              <el-option
                v-for="i in lastList"
                :key="i.value"
                :label="i.label"
                :value="i.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :prop="`dataList.${index}.level3`"
            class="form-item-last"
            :rules="rules.level3"
          >
            <el-input v-model="item.level3" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item style="width:80px;display: inline-block;">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteView(index)"
            ></el-button>
          </el-form-item>
        </div>
        <div class="form-btn">
          <el-button
            type="primary"
            @click="add()"
            icon="el-icon-plus"
            :disabled="ruleForm.dataList.length > 9"
            >添加</el-button
          >
          <el-button @click="resetForm('ruleForm')" icon="el-icon-refresh"
            >重置</el-button
          >
          <el-button
            type="primary"
            @click="query('ruleForm')"
            icon="el-icon-search"
            >查询</el-button
          >
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              console.log(start);
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近半年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 12);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      selectHourList: [
        {
          label: "1小时",
          value: 1
        },
        {
          label: "3小时",
          value: 3
        },
        {
          label: "8小时",
          value: 8
        },
        {
          label: "12小时",
          value: 12
        },
        {
          label: "24小时",
          value: 24
        }
      ],
      firstList: [
        {
          value: "money",
          label: "交易金额"
        },
        {
          value: "address",
          label: "交易地址"
        },
        {
          value: "date",
          label: "交易日期"
        },
        {
          value: "type",
          label: "交易类型"
        },
        {
          value: "name",
          label: "交易名称"
        }
      ],
      lastList: [
        {
          label: "大于",
          value: "GREATER_THAN"
        },
        {
          label: "小于",
          value: "LESS_THAN "
        },
        {
          label: "等于",
          value: "EQUAL"
        },
        {
          label: "大于等于",
          value: "REATER_EQUAL"
        },
        {
          label: "小于等于",
          value: "LESS_EQUAL"
        },
        {
          label: "属于",
          value: "IN"
        },
        {
          label: "不属于",
          value: "NOT_IN"
        },
        {
          label: "模糊匹配",
          value: "LIKE"
        }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      timeValue: "",
      beforeButton: false,
      afterButton: false,
      ruleForm: {
        relativeTime: [],
        dataList: []
      },
      rules: {
        relativeTime: [
          { required: true, message: "请选择时间", trigger: "change" }
        ],
        level1: [{ required: true, message: "请选择", trigger: "change" }],
        level2: [{ required: true, message: "请输入内容", trigger: "change" }],
        level3: [{ required: true, message: "请输入内容", trigger: "change" }]
      }
    };
  },
  watch: {
    "ruleForm.relativeTime": {
      handler(val) {
        if (val == null) {
          this.ruleForm.relativeTime = [];
        }
      }
    }
  },
  computed: {},
  methods: {
    query(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (!valid) return;
        console.log(this.ruleForm);
      });
    },
    add() {
      this.ruleForm.dataList.push({
        level1: "",
        level2: "",
        level3: ""
      });
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.timeValue = "";
    },
    //删除列表
    deleteView(index) {
      this.ruleForm.dataList.splice(index, 1);
    },
    initDate() {
      //设置date-picker默认值
      const startDate = this.$moment()
        .subtract(1, "week")
        .valueOf();
      const endDate = this.$moment()
        .subtract(1, "days")
        .valueOf();
      this.ruleForm.relativeTime = [startDate, endDate];
    },
    datePicker() {
      this.timeValue = "";
    },
    selectTime(value) {
      const startDate = this.$moment()
        .subtract(value, "h")
        .valueOf();
      const endDate = this.$moment().valueOf();
      this.ruleForm.relativeTime = [startDate, endDate];
    },
    //前一天时间
    theDayBefore() {
      this.$set(
        this.ruleForm.relativeTime,
        0,
        this.ruleForm.relativeTime[0] - 24 * 60 * 60 * 1000
      );
    },
    //后一天时间
    theDayAfter() {
      this.$set(
        this.ruleForm.relativeTime,
        0,
        this.ruleForm.relativeTime[0] + 24 * 60 * 60 * 1000
      );
    }
  },
  created() {},
  mounted() {
    this.initDate();
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  height: calc(100% - 80px);
  background-color: white;
  overflow-y: auto;
  padding: 20px;
}
.for-list {
  width: 100%;
}
.form-item {
  width: 220px;
  display: inline-block;
  .el-select,
  .el-input {
    width: 200px;
  }
}
.form-item-last {
  width: 300px;
  display: inline-block;
  .el-input {
    width: 280px;
  }
}
.form-btn {
  margin-left: 100px;
}
.date-select {
  display: flex;
}
.date-control {
  margin-left: 10px;
}
</style>
