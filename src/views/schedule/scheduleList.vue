<template>
  <div>
    <sample-navbar></sample-navbar>

    <div class="container is-fluid">
      <h4 class="title is-4">スケジュール一覧</h4>

      <div class="notification">
        <div class="field is-grouped is-grouped-right">
          <button
            id="form-submit"
            class="button is-link"
            type="submit"
            v-on:click.stop.prevent="search"
          >Search</button>
        </div>
      </div>
    </div>

    <hr />

    <div class="container is-fluid" v-if="searched">
      <div class="columns">
        <div class="column is-2" id="ganttlabel">
          <div class="daily-area">
            <div class="chart">
              <section class="hour"></section>
              <section v-for="schedule in schedules" :key="schedule.id">{{schedule.id}}</section>
            </div>
          </div>
        </div>

        <div class="column" id="easygantt">
          <div v-bind:id="'chart_' + i" class="chart" v-for="i in 1" :key="'chart_' + i">
            <div class="daily-area">
              <div class="scale">
                <section
                  class="hour"
                  v-for="hour in 24"
                  :key="'chart_' + i + '_hour' + hour"
                >{{hour-1}}</section>

                <span v-for="j in schedules.length" :key="j">
                  <span v-for="hour in 24" :key="hour">
                    <section
                      v-bind:id="j + '_' + `00${(hour - 1)}`.slice(-2) + time"
                      class="dropzone"
                      v-for="time in ['00', '15', '30', '45']"
                      :key="time"
                      draggable="true"
                      @dragover.prevent
                      @dragenter="dragenter({
                        i,
                        hour,
                        time,
                      },
                      $event)"
                      @dragstart="dragstart(
                      {
                        i,
                        hour,
                        time,
                      },
                      $event)"
                      @drop="drop(
                      {
                        i,
                        hour,
                        time,
                      },
                      $event)"
                    ></section>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <sample-footer></sample-footer>
    <img id="dummy" style="opacity:0; height:0px" src="#" />
    <!-- #TODO -->
  </div>
</template>

<script>
/* TODO eslint enable */
/* eslint-disable */
import { BaseList } from "@/views/base";
import { sleep } from "@/helpers";

const tasks = [
  {
    id: "#1",
    info: "法人利用（株式会社 あああああああああああああああああああああああああああああああああああああああああああああ）",
    startTime: 1000,
    endTime: 1100,
    area: "chiyoda"
  },
  {
    id: "#2",
    info: "個人利用（ああいい）",
    startTime: 1000,
    endTime: 1100,
    area: "chiyoda"
  },
  {
    id: "#3",
    info: "法人利用（株式会社い）",
    startTime: 1200,
    endTime: 1700,
    area: "chiyoda"
  },
  {
    id: "#4",
    info: "個人利用（Takeshi Hirosue）",
    startTime: "0000",
    endTime: 1100,
    area: "chuou"
  },
  {
    id: "#5",
    info: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttest",
    startTime: "0000",
    endTime: "0400",
    area: "chuou"
  },
  {
    id: "#6",
    info: "法人利用（株式会社 う）",
    startTime: 1200,
    endTime: 1400,
    area: "chuou"
  },
  {
    id: "#7",
    info: "法人利用です",
    startTime: "0100",
    endTime: "0700",
    area: "minato"
  },
  {
    id: "#8",
    info: "サンプル情報８",
    startTime: 1800,
    endTime: 2400,
    area: "minato"
  }
];

// 5分ごとの整数列のイテレータを返す
function* range(begin, end, interval = 5) {
  for (let i = begin; i < end; i += interval) {
    yield i;
  }
}

export default {
  name: "scheduleList",
  mixins: [BaseList],

  data() {
    return {
      schedules: [],
      searched: false,
      start: {},
      end: {}
    };
  },

  mounted() {},

  methods: {
    async search() {
      this.searched = false;
      this.schedules = [...tasks];

      await sleep(500);
      this.searched = true;

      this.$nextTick(() => {
        // タスク配置
        tasks.forEach((task, index) => {
          const start = task.startTime;
          const end = task.endTime;

          let count = 0;
          for (const time of range(Number(start), Number(end))) {
            const id = `${index + 1}_` + `0000${time}`.slice(-4);
            const element = document.getElementById(id);

            if (element !== null) {
              count += 1;
              element.style.width = "0px";
              if (`0000${start}`.slice(-4) === `0000${time}`.slice(-4)) {
                element.style.borderLeft = "1px solid gainsboro;";
              } else {
                element.style.borderLeft = "0px";
              }
              if (
                this.$moment(`0000${end}`.slice(-4), "HHmm").format("HHmm") ===
                this.$moment(`0000${time}`.slice(-4), "HHmm")
                  .add(15, "m")
                  .format("HHmm")
              ) {
                const firstElement = document.getElementById(
                  `${index + 1}_` + `0000${start}`.slice(-4)
                );
                firstElement.innerText = task.info;
                firstElement.style.width = count * 30 + "px";
              }
              element.style.backgroundColor = "lightblue";
            }
          }

          // 初期スクロール位置調整
          const target = document.getElementById("easygantt");
          const res = document.evaluate(
            "//section[contains(., '7')]",
            document,
            null,
            XPathResult.ANY_TYPE,
            null
          );
          target.scrollLeft =
            res.iterateNext().getBoundingClientRect().left - 175;

          [...document.querySelectorAll(".chart")].forEach(ele => {
            ele.style.height = 30 + this.schedules.length * 60 + "px";
          });
        });
      });
    },
    dragstart(item, event) {
      console.log("dragstart");
      this.start = item;
      event.dataTransfer.setData("text/plain", null);
      event.dataTransfer.setDragImage(document.getElementById("dummy"), 0, 0); // 選択要素をドラッグ中に表示させない
    },
    dragenter(item, event) {
      console.log("dragenter");
      console.log(item);
      if (
        event.target.className == "dropzone" &&
        event.target.style.backgroundColor !== "lightblue"
      ) {
        // var previous = event.target.previousElementSibling;
        // var next = event.target.nextElementSibling;
        const selectPos = this.start.hour * 60 + this.start.time;
        const currentPos = item.hour * 60 + item.time;

        if (selectPos <= currentPos) {
          console.log("->");
          // if(next && next.style.color !== "black") {
          this.paint(event.target);
          // } else {
          //  this.clear(event.target);
          // }
        } else {
          console.log("<-");
          // if(next && next.style.color === "black") {
          this.paint(event.target);
          // } else {
          //  this.clear(event.target);
          // }
        }
      }
    },
    drop(item, event) {
      console.log("drop");
      console.log(item);
      this.end = item;
      if (event.target.style.backgroundColor !== "lightblue") {
        this.showModal = true;
      } else {
        this.$showModal(
          "選択した時間には、予約時間が含まれています。",
          "時間指定エラー"
        );
        this.clearAll();
      }
    },
    closeModal() {
      this.showModal = !this.showModal;
      this.clearAll();
    },
    clearAll() {
      [...document.querySelectorAll(".dropzone")].forEach(ele => {
        if (ele.style.backgroundColor === "cyan") {
          this.clear(ele);
        }
      });
    },
    paint: ele => {
      ele.style.background = "cyan";
      ele.style.color = "black";
    },
    clear: ele => {
      ele.style.background = "white";
      ele.style.color = "dimgray";
    },
    modalSubmit() {},
    getDisplayDate(index = 0) {
      const date = this.$moment().add(index, "days");
      return `${date.format("YYYY/MM/DD")}(${this.$moment.weekdaysShort(
        date.day()
      )})`;
    },
    getDisplayTime(hour, time, add = 0) {
      return this.$moment(`${hour - 1}:${`00${time}`.slice(-2)}`, "HH:mm")
        .add(add, "m")
        .format("HH:mm");
    }
  },

  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/schedule.css">
</style>
