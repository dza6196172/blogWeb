<template>
  <div class="calendar">
    <div class="calendarwa">
      <div class="secd">
        <p>Mon</p>
        <p>Tues</p>
        <p>Wed</p>
        <p>Thur</p>
        <p>Fri</p>
        <p>Sat</p>
        <p>Sun</p>
      </div>


      <div class="calendarList" style="white-space:nowrap" v-if="calendarList.length >= 140">
        <div class="calendarItem" v-for="item in calendarList" :key="item.date">
          <!-- {{ item }} -->
          <div class="item" :style="{'background-color':barColor(item.date)}">
            <toolTip :content="`<div class='tip' style='white-space:nowrap'>${item.date}<br />文章数：${articleCount(item.date)}</div>`"></toolTip>
          </div>
          <div class="month" v-if="item.isFirst">
            {{ $moment(item.date).format("MMM") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import toolTip from '@/components/tooltip/toolTip'
export default {
  name: "calendar",
  data() {
    return {
      year: null, //年份
      month: null, //月份
      days: [], //当月的日期列表
      calendarList: [],
      daynum: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], //1-12月每个月的天数
      cardList: [
        {
          color: "#ededed",
          tip: "文章提交数：0",
          count:0
        },
        {
          color: "#b3b3b3",
          tip: "文章提交数：1",
          count:1
        },
        {
          color: "#717171",
          tip: "文章提交数：2",
          count:2
        },
        {
          color: "#2f2f2f",
          tip: "文章提交数：3",
          count:3
        },
        {
          color: "#0d0d0d",
          tip: "文章提交数：4+",
          count:4
        },
      ],
    };
  },
  props:{
    list:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    toolTip
  },
  computed: {
    currentDate() {
      return this.$moment().format("YYYY-MM-DD");
    },
  },
  created() {
    let time = new Date();
    this.year = time.getFullYear();
    this.month = time.getMonth() + 1;

    this.isyear(this.year); //判断平年闰年
    let i = 6;
    this.nowmonth();
    while (i > 0) {
      i--;
      if (i === 1) {
        this.lastMonth(true);
      } else {
        this.lastMonth();
      }
    }
    while (
      (this.calendarList.length - (this.calendarList.length % 7)) / 7 >
      20
    ) {
      for (let i = 0; i < 7; i++) {
        this.calendarList.shift();
      }
    }
  },
  methods: {
    barColor(date){
      if(!this.list.length){
        return '#ededed'
      }
      let listIndex = this.list.findIndex(item => { return date === this.$moment(item.create_date).format('YYYY-MM-DD')})
      if(listIndex !== -1){
        let cardIndex = this.cardList.findIndex(item => {
          return item.count === this.list[listIndex].count
        })
        // console.log(listIndex,cardIndex,this.list[listIndex].count);
        if(cardIndex !== -1){
          return this.cardList[cardIndex].color
        }else{
          return '#0d0d0d'
        }
      }else{
        return '#ededed'
      }
    },
    articleCount(date){
      if(!this.list.length){
        return 0
      }
      let listIndex = this.list.findIndex(item => { return date === this.$moment(item.create_date).format('YYYY-MM-DD')})
      if(listIndex !== -1){
        return this.list[listIndex].count
      }else{
        return 0
      }
    },
    // 判断平年闰年
    isyear(val) {
      if (
        (val % 4 == 0 && val % 100 != 0) ||
        (val % 100 == 0 && val % 400 == 0)
      ) {
        this.daynum[1] = 29;
      } else {
        this.daynum[1] = 28;
      }
    },
    // 计算当月多少天
    nowmonth(isLast) {
      var daylength = this.daynum[this.month - 1];
      this.calendarList = this.days.concat(this.calendarList);
      this.days.splice(0);
      for (let i = 0; i < daylength; i++) {
        if (
          this.$moment(this.currentDate).isSameOrAfter(
            this.year +
              "-" +
              this.month.toString().padStart(2, "0") +
              "-" +
              (i + 1).toString().padStart(2, "0")
          )
        ) {
          if (i === 0) {
            this.days.push({
              date:
                this.year +
                "-" +
                this.month.toString().padStart(2, "0") +
                "-" +
                (i + 1).toString().padStart(2, "0"),
              isFirst: true,
            });
          } else {
            this.days.push({
              date:
                this.year +
                "-" +
                this.month.toString().padStart(2, "0") +
                "-" +
                (i + 1).toString().padStart(2, "0"),
              isFirst: false,
            });
          }
        }
        //根据获取的天数向数组中添加日期
      }

      if (isLast) {
        var times = new Date(this.year, this.month - 1, 1).getDay();
        if (times == 0) {
          //如果times是0则在前面添加6个空字符（视情况，有的星期天排在最前面）
          times = 6;
        } else {
          times--; //返回6则添加5个空字符，以此内推，返回1则不添加
        }
        for (let f = 0; f < times; f++) {
          this.days.unshift(" ");
        }
      }

      //获取当月1号是周几，然后向数组中添加空字符串占位
    },
    // 上个月
    lastMonth(isLast) {
      if (this.month == 1) {
        this.month = 12;
        this.year--;
        this.isyear(this.year);
      } else {
        this.month--;
      }
      this.nowmonth(isLast);
    },
    // 下个月
    nextMonth() {
      if (this.month == 12) {
        this.month = 1;
        this.year++;
        this.isyear(this.year);
      } else {
        this.month++;
      }
      this.nowmonth();
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar {
  width: 100%;
  height: 260px;
  padding: 0 10px;
  padding-right: 30px;
  padding-top: 40px;
  position: absolute;
  left: 4%;
  top: 25px;
  overflow-x: scroll;
  &::-webkit-scrollbar{
    width: 0;
    height: 0;
  }
}
.calendarwa {
  width: 100%;
  height: 100%;
  
  display: flex;
  position: relative;
  
  .secd {
    display: flex;
    flex-direction: column;
    p {
      width: 20px;
      height: 20px;
      margin: 3px 0;
      padding-top: 20px;
      font-size: 12px;
      line-height: 20px;
      margin-right: 10px;
    }
  }
  .colorCard {
    position: absolute;
    right: 2%;
    top: -16%;
    display: flex;
    .cardItem {
      width: 20px;
      height: 20px;
      // border: 1px solid lightgray;
      margin-left: 6px;
      cursor: pointer;
    }
  }
  .calendarList {
    width: fit-content;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100%;
    padding: 20px 0;
    padding-bottom: 0;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
    .calendarItem {
      width: 20px;
      height: 20px;
      
      margin: 3px;
      font-size: 12px;
      cursor: pointer;
      
  
      .month {
        position: absolute;
        top: 0;
        font-size: 13px;
      }
      .item {
        width: 100%;
        height: 100%;
        position: relative;
        background-color: #ededed;
        // border: 1px solid lightgray;
        &:hover {
          background-color: aquamarine!important;
          .tooltip {
            opacity: 1;
            visibility: visible;
          }
        }
        
      }
    }
  }
}
</style>
