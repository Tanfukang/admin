<!--
 * @Author: your name
 * @Date: 2020-11-13 15:20:36
 * @LastEditTime: 2020-11-30 17:20:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \teste:\Vue\Test\admin-test\src\views\Dashboard.vue
-->
<template>
  <div class="wrapper">
    <el-row :gutter="20">
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-card class="box-card" v-loading="loading">
            <div slot="header" class="clearfix">
              <div class="sale-title">
                <div>总销售额</div>
                <el-tooltip
                  class="action"
                  effect="dark"
                  style=""
                  content="指标说明"
                  placement="top"
                >
                  <div class="el-icon-warning-outline"></div>
                </el-tooltip>
              </div>
            </div>
            <div
              ref="axisCharts"
              :style="{ width: '100%', height: '100%' }"
            ></div>
          </el-card></div
      ></el-col>
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-card class="box-card" v-loading="loading">
            <div slot="header" class="clearfix">
              <div class="sale-title">
                <div>访问量</div>
                <el-tooltip
                  class="action"
                  effect="dark"
                  style=""
                  content="指标说明"
                  placement="top"
                >
                  <div class="el-icon-warning-outline"></div>
                </el-tooltip>
              </div>
            </div>
            <div
              ref="categoryCharts"
              :style="{ width: '100%', height: '100%' }"
            ></div>
          </el-card></div
      ></el-col>
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-card class="box-card" v-loading="loading">
            <div slot="header" class="clearfix">
              <div class="sale-title">
                <div>支付笔数</div>
                <el-tooltip
                  class="action"
                  effect="dark"
                  style=""
                  content="指标说明"
                  placement="top"
                >
                  <div class="el-icon-warning-outline"></div>
                </el-tooltip>
              </div>
            </div>
            <div
              ref="payCharts"
              :style="{ width: '100%', height: '100%' }"
            ></div>
          </el-card></div
      ></el-col>
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-card class="box-card" v-loading="loading">
            <div slot="header" class="clearfix">
              <div class="sale-title">
                <div>运营活动效果</div>
                <el-tooltip
                  class="action"
                  effect="dark"
                  style=""
                  content="指标说明"
                  placement="top"
                >
                  <div class="el-icon-warning-outline"></div>
                </el-tooltip>
              </div>
            </div>
            <div
              ref="echartsBar"
              :style="{ width: '100%', height: '100%' }"
            ></div>
          </el-card></div
      ></el-col>
    </el-row>
    <el-card
      class="box-card"
      shadow="never"
      style="margin-bottom:20px;height:500px;"
    >
      <div class="tab-seles">
        <el-date-picker
          class="date-select"
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          size="small"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
        <el-tabs v-model="activeName" @tab-click="handleClick" class="sales">
          <el-tab-pane label="销售额" name="first">
            <el-row :gutter="20" style="height: 100%">
              <el-col :span="14">
                <div>销售趋势</div>
                <div
                  v-loading="loading"
                  ref="salesCharts"
                  style="width: 100%;height: 100%"
                ></div>
              </el-col>
              <el-col :span="10"> aaa </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="访问量" name="second">
            <el-row :gutter="20">
              <el-col :span="14"></el-col>
              <el-col :span="10"> bbb </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>线上热门搜索</span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >操作按钮</el-button
              >
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ "列表内容 " + o }}
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>销售额类别占比</span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >操作按钮</el-button
              >
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ "列表内容 " + o }}
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-card class="box-card" shadow="never">
      <el-tabs v-model="conversionText" @tab-click="conversion">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth"
          >定时任务补偿</el-tab-pane
        >
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      activeName: "first",
      conversionText: "first",
      loading: true,
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
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: "",
      value2: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    //环形图
    mycharts() {
      let myChart = this.$echarts.init(this.$refs.axisCharts, "macarons");
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "10",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },

            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" }
            ]
          }
        ]
      });
      window.addEventListener("resize", function() {
        myChart.resize(); // myChart 是实例对象
      });
    },
    //折线图
    categoryCharts() {
      let myChart = this.$echarts.init(this.$refs.categoryCharts, "macarons");
      myChart.setOption({
        color: ["#975FE4"],
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "8%",

          containLabel: true
        },
        yAxis: {
          type: "value"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            areaStyle: {}
          }
        ]
      });
      window.addEventListener("resize", function() {
        myChart.resize(); // myChart 是实例对象
      });
    },
    //柱状图
    payCharts() {
      let myChart = this.$echarts.init(this.$refs.payCharts, "macarons");
      myChart.setOption({
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "8%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed"
              }
            }
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      });
      window.addEventListener("resize", function() {
        myChart.resize(); // myChart 是实例对象
      });
    },
    //进度条
    echartsBarInit() {
      let myChart = this.$echarts.init(this.$refs.echartsBar, "macarons");
      myChart.setOption(
        // 通过setOption来生成柱状图
        {
          grid: {
            // 直角坐标系内绘图网格
            left: "3%",
            right: "4%",
            bottom: "3%",
            top: "8%",
            containLabel: true
            // left/right/top/bottom/width/height决定的是包括了坐标轴标签在内的
            //所有内容所形成的矩形的位置.常用于【防止标签溢出】的场景
          },
          xAxis: {
            //直角坐标系grid中的x轴,
            //一般情况下单个grid组件最多只能放上下两个x轴,
            //多于两个x轴需要通过配置offset属性防止同个位置多个x轴的重叠。
            type: "value", //坐标轴类型,分别有：
            //'value'-数值轴；'category'-类目轴;
            //'time'-时间轴;'log'-对数轴
            splitLine: { show: false }, //坐标轴在 grid 区域中的分隔线
            axisLabel: { show: false }, //坐标轴刻度标签
            axisTick: { show: false }, //坐标轴刻度
            axisLine: { show: false } //坐标轴轴线
          },
          yAxis: {
            type: "category",
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: {
              color: "black",
              fontSize: 36
            },
            data: [" "] //类目数据，在类目轴（type: 'category'）中有效。
            //如果没有设置 type，但是设置了axis.data,则认为type 是 'category'。
          },
          series: [
            //系列列表。每个系列通过 type 决定自己的图表类型
            {
              name: "%", //系列名称
              type: "bar", //柱状、条形图
              barWidth: 19, //柱条的宽度,默认自适应
              data: [70], //系列中数据内容数组
              label: {
                //图形上的文本标签
                show: true,
                position: "right", //标签的位置
                offset: [0, -40], //标签文字的偏移，此处表示向上偏移40
                formatter: "{c}{a}", //标签内容格式器 {a}-系列名,{b}-数据名,{c}-数据值
                color: "black", //标签字体颜色
                fontSize: 20 //标签字号
              },
              itemStyle: {
                //图形样式
                normal: {
                  //normal 图形在默认状态下的样式;
                  //emphasis图形在高亮状态下的样式
                  barBorderRadius: 10, //柱条圆角半径,单位px.
                  //此处统一设置4个角的圆角大小;
                  //也可以分开设置[10,10,10,10]顺时针左上、右上、右下、左下
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: "#22B6ED" //柱图渐变色起点颜色
                    },
                    {
                      offset: 1,
                      color: "#3FE279" //柱图渐变色终点颜色
                    }
                  ])
                }
              },
              zlevel: 1 //柱状图所有图形的 zlevel 值,
              //zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面
            },
            {
              name: "进度条背景",
              type: "bar",
              barGap: "-100%", //不同系列的柱间距离，为百分比。
              // 在同一坐标系上，此属性会被多个 'bar' 系列共享。
              // 此属性应设置于此坐标系中最后一个 'bar' 系列上才会生效，
              //并且是对此坐标系中所有 'bar' 系列生效。
              barWidth: 19,
              data: [100, 100, 100],
              color: "#151B87", //柱条颜色
              itemStyle: {
                normal: {
                  barBorderRadius: 10
                }
              }
            }
          ]
        }
      );
      window.addEventListener("resize", function() {
        myChart.resize(); // myChart 是实例对象
      });
    },
    salesCharts() {
      let myChart = this.$echarts.init(this.$refs.salesCharts, "macarons");
      myChart.setOption({
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          top: "3%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      });
      window.addEventListener("resize", function() {
        myChart.resize(); // myChart 是实例对象
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    conversion(tab, event) {
      console.log(tab, event);
    }
  },
  created() {},
  mounted() {
    setTimeout(() => {
      this.mycharts();
      this.categoryCharts();
      this.payCharts();
      this.echartsBarInit();
      this.salesCharts();
      this.loading = false;
    }, 2000);
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
}
.text {
  font-size: 14px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  height: 200px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.sale-title {
  color: #999999;
  position: relative;
}
.action {
  position: absolute;
  top: 4px;
  right: 0;
  line-height: 1;
  cursor: pointer;
}
.tab {
  background-color: white;
}
.sales {
  width: 100%;
  height: 100%;
}
.tab-seles {
  height: 100%;
  position: relative;
}
.tab-seles .date-select {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1;
}
</style>
