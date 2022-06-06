<template>
  <div class="statistics">
    <div class="chartsBox">
      <div class="topCharts">
        <div class="watchLineChart">
          <div class="chartTitle">浏览量统计</div>
          <div id="watchLineChart"></div>
        </div>
        <div class="statisticCount">
          <div class="statisticTop">
            <div class="left">
              <div class="title">总访问量</div>
              <div class="count">
                {{
                  $filters.numSplit(
                    statistic.statisticCount
                      ? statistic.statisticCount.watch
                      : 0
                  )
                }}
              </div>
              <div class="iconfont">&#xe6c6;</div>
            </div>
            <div class="right">
              <div class="title">总评论数</div>
              <div class="count">
                {{
                  $filters.numSplit(
                    statistic.statisticCount
                      ? statistic.statisticCount.comment
                      : 0
                  )
                }}
              </div>
              <div class="iconfont">&#xe668;</div>
            </div>
          </div>
          <div class="statisticBottom">
            <div class="left">
              <div class="title">文章数</div>
              <div class="count">
                {{
                  $filters.numSplit(
                    statistic.statisticCount
                      ? statistic.statisticCount.article
                      : 0
                  )
                }}
              </div>
              <div class="iconfont">&#xe67d;</div>
            </div>
            <div class="right">
              <div class="title">用户数</div>
              <div class="count">
                {{
                  $filters.numSplit(
                    statistic.statisticCount
                      ? statistic.statisticCount.users
                      : 0
                  )
                }}
              </div>
              <div class="iconfont">&#xe620;</div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottomchart">
        <div class="leftChart">
          <div class="chartTitle">文章访问量排行</div>
          <div class="articleList">
            <div
              class="articleItem"
              v-for="(item, index) in statistic.articleCount"
              :key="item.article_id"
              :title="item.title"
            >
              <div class="num">{{ index + 1 }}</div>
              <div
                class="articleName"
                @click="
                  $router.push({
                    name: 'articleDetail',
                    params: { id: item.article_id },
                  })
                "
              >
                {{ item.title }}
              </div>
              <div class="bar">
                <div
                  class="active_bar"
                  :style="{
                    width: parseInt((item.watch / item.allcount) * 100) + '%',
                  }"
                ></div>
              </div>
              <div class="percent">
                {{ parseInt((item.watch / item.allcount) * 100) + "%" }}
              </div>
            </div>
          </div>
        </div>
        <div class="rightChart">
          <div class="chartTitle">文章提交日历</div>
          <div class="colorCard">
            <div
              class="cardItem"
              :style="{ 'background-color': item.color }"
              v-for="item in cardList"
              :key="item.color"
            >
              <toolTip :content="'<div style=\'white-space:nowrap\'>'+item.tip+'</div>'"></toolTip>
            </div>
          </div>
          <Calendar :list="statistic.commitCount"></Calendar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import Calendar from "@/components/calendar/calendar";
import toolTip from "@/components/tooltip/toolTip";
export default {
  name: "statistics",
  components: {
    Calendar,
    toolTip,
  },
  data() {
    return {
      statistic: {},
      cardList: [
        {
          color: "#ededed",
          tip: "文章提交数：0",
          count: 0,
        },
        {
          color: "#b3b3b3",
          tip: "文章提交数：1",
          count: 1,
        },
        {
          color: "#717171",
          tip: "文章提交数：2",
          count: 2,
        },
        {
          color: "#2f2f2f",
          tip: "文章提交数：3",
          count: 3,
        },
        {
          color: "#0d0d0d",
          tip: "文章提交数：4+",
          count: 4,
        },
      ],
    };
  },
  mounted() {
    this.getStatistic();
  },
  methods: {
    getStatistic() {
      this.$statisticApi.getStatistic().then((res) => {
        if (res.code === 200) {
          this.statistic = res.data;
          this.drawCharts();
        }
      });
    },
    drawCharts() {
      let myChart = echarts.getInstanceByDom(
        document.getElementById("watchLineChart")
      );
      if (myChart == null) {
        myChart = echarts.init(document.getElementById("watchLineChart"));
      }
      let xdata = [];
      let ydata = [];
      this.statistic.watchLineList.reverse().forEach((item, index, array) => {
        if (index > 0) {
          ydata.push(item.count - array[index - 1].count);
          xdata.push(this.$moment(array[index - 1].date).format("MM-DD"));
        }
      });
      var option = {
        tooltip: {
          trigger: "axis",
        },
        color: ["#0d0d0d"], //折线的颜色
        legend: {
          data: [
            {
              name: "当日浏览量",
              icon: "circle",
            },
          ],
          itemWidth: 6,
          itemHeight: 6,
          top: "2%",
          right: "4%",
          textStyle: {
            //图例的文字样式
            color: "#0d0d0d",
          },
        },

        grid: {
          top: "15%",
          bottom: "15%",
          right: "5%",
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xdata,
          // 轴线的字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#0d0d0d",
              fontSize: "11",
              // fontSize: 16, 可直接写数字,单位px
            },
            margin: 16,
          },
          // 轴线的样式
          axisLine: {
            lineStyle: {
              color: "#e3e3e3",
            },
          },
          // 网格线样式
          splitLine: {
            show: true,
            lineStyle: {
              color: ["transparent"],
            },
          },
          axisTick: {
            show: false, // 不显示坐标轴刻度
          },
        },
        yAxis: {
          type: "value",
          name: "", // y轴的单位,不写就没有
          nameTextStyle: {
            //单位'个'的样式
            color: "",
            padding: [0, 0, 0, -56], // 用来移动单位的位置对齐
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#0d0d0d",
              fontSize: "11",
            },
            margin: 18, //轴线上的文字与线的距离
          },
          axisLine: {
            lineStyle: {
              color: "#e3e3e3",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#e3e3e3"],
            },
          },
        },
        series: [
          {
            name: "当日浏览量",
            type: "line",
            data: ydata,
            symbol: "none",
            smooth: true,
            /*
symbol:拐弯的那个节点的样式
值:'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
具体啥样子,我每次都是挨个试的.
*/
            areaStyle: {
              // 要加这个属性,折线与下方的区域才能填充颜色
              // color: 'red', // 可以直接填充颜色
              color: {
                // 这边是设置渐变色,好看一点
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(0,0,0,0.5)",
                  },
                  {
                    offset: 0.9, //这是于下方线的距离,设置1就不留空隙
                    color: "rgba(0,0,0,0)",
                  },
                ],
                global: false,
              },
            },
          },
        ],
      };

      myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.statistics {
  min-height: calc(100vh - 200px);
  padding: 24px;
  .chartsBox {
    width: 100%;
    height: 100%;
    max-width: 1200px;
    border-radius: 15px;
    border: 4px solid #0d0d0d;
    margin: 0 auto;
    background: url("@/assets/img/chartsbg.png");
    background-repeat: no-repeat;
    background-size: cover;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .chartTitle {
      position: absolute;
      left: 5%;
      top: 8%;
      font-size: 18px;
      font-weight: bold;
    }
    .topCharts {
      height: 300px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      .watchLineChart {
        width: 56%;
        height: 100%;
        background-color: white;
        border-radius: 15px;
        padding-top: 20px;
        position: relative;
        #watchLineChart {
          width: 100%;
          height: 100%;
        }
      }
      .statisticCount {
        width: 42%;
        height: 100%;
        position: relative;
        background-color: white;
        border-radius: 15px;
        .statisticTop {
          display: flex;
          height: 50%;
          .left {
            width: 50%;
            height: 100%;
            background-color: white;
            border-top-left-radius: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-left: 25px;
            position: relative;
            overflow: hidden;
            .title {
              color: #0d0d0d;
              font-size: 18px;
              margin-bottom: 24px;
              font-weight: bold;
            }
            .count {
              color: #0d0d0d;
              font-size: 30px;
              font-weight: bold;
              z-index: 1;
            }
            .iconfont {
              position: absolute;
              color: #e3e3e3;
              right: -2%;
              bottom: -10%;
              font-size: 120px;
              font-weight: bold;
            }
          }
          .right {
            @extend .left;
            background-color: #0d0d0d;
            border-top-left-radius: 0px;
            border-top-right-radius: 15px;
            .title {
              color: white;
            }
            .count {
              color: white;
            }
            .iconfont {
              color: rgba($color: #e3e3e3, $alpha: 0.8);
              right: -2%;
              bottom: -10%;
              font-weight: normal;
              font-size: 130px;
            }
          }
        }
        .statisticBottom {
          display: flex;
          height: 50%;
          .right {
            width: 50%;
            height: 100%;
            background-color: white;
            border-bottom-right-radius: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-left: 25px;
            position: relative;
            overflow: hidden;
            .title {
              color: #0d0d0d;
              font-size: 18px;
              margin-bottom: 24px;
              font-weight: bold;
            }
            .count {
              color: #0d0d0d;
              font-size: 30px;
              font-weight: bold;
              z-index: 1;
            }
            .iconfont {
              position: absolute;
              color: #e3e3e3;
              right: -2%;
              bottom: -5%;
              font-size: 130px;
              font-weight: bold;
            }
          }
          .left {
            @extend .right;
            background-color: #0d0d0d;
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 0;
            .title {
              color: white;
            }
            .count {
              color: white;
            }
            .iconfont {
              color: rgba($color: #e3e3e3, $alpha: 0.8);
              right: -5%;
              bottom: -20%;
              font-weight: normal;
              font-size: 145px;
            }
          }
        }
      }
    }
    .bottomchart {
      height: 300px;
      display: flex;
      justify-content: space-between;
      .leftChart {
        height: 100%;
        width: 41%;
        position: relative;
        background-color: white;
        border-radius: 15px;
        padding-top: 65px;
        padding-left: 25px;
        .articleList {
          .articleItem {
            display: flex;
            align-items: center;
            margin-bottom: 18px;
            &:first-child,
            &:nth-child(2),
            &:nth-child(3) {
              .num {
                background-color: rgba($color: #000000, $alpha: 0.7);
              }
            }
            .num {
              width: 18px;
              height: 18px;
              background-color: lightgray;
              border-radius: 50%;
              color: white;
              text-align: center;
              line-height: 18px;
              font-size: 12px;
              margin-right: 8px;
            }
            .articleName {
              width: 35%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 14px;
              margin-right: 10px;
              cursor: pointer;
              &:hover {
                text-decoration: underline;
              }
            }
            .bar {
              width: 40%;
              height: 12px;
              border-radius: 6px;
              background-color: #f2f2f2;
              margin-right: 10px;
              position: relative;
              .active_bar {
                position: absolute;
                height: 100%;
                border-radius: 6px;
                background-color: #0d0d0d;
              }
            }
            .percent {
              font-size: 13px;
              color: gray;
            }
          }
        }
      }
      .rightChart {
        width: 57%;
        height: 100%;
        background-color: white;
        border-radius: 15px;
        padding: 20px;
        padding-top: 60px;
        position: relative;
        .colorCard {
          position: absolute;
          right: 6.5%;
          top: 8%;
          display: flex;
          z-index: 2;
          .cardItem {
            width: 20px;
            height: 20px;
            // border: 1px solid lightgray;
            margin-left: 6px;
            position: relative;
            cursor: pointer;
            &:hover {
              .tooltip {
                opacity: 1;
                visibility: visible;
              }
            }
          }
        }
      }
    }
  }
}
</style>
