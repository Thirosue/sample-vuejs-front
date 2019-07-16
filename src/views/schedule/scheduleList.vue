<template>
  <div>
    <sample-navbar></sample-navbar>
    <div class="container is-fluid">
      <h4 class="title is-4">スケジュール一覧（日指定）</h4>
      <h6 class="title is-6">{{getDisplayDate()}}</h6>

      <div class="columns">
        <div class="column is-1" id="ganttlabel">
          <div class="daily-area">
            <div class="chart">
              <section class="hour"></section>
              <section>label1</section>
              <section>label2</section>
              <section>label3</section>
              <section>label4</section>
              <section>label5</section>
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

                <span v-for="j in [0,1,2,3,4]" :key="j">
                  <span v-for="hour in 24" :key="hour">
                    <section
                      v-bind:id="j + '_' + (hour - 1) + time"
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

    <span id="ganttlabel">
      <div class="chart">
        <div class="daily-area"></div>
      </div>
    </span>

    <sample-footer></sample-footer>
    <img id="dummy" style="opacity:0; height:0px" src="#" />
    <!-- #TODO -->

    <div id="modal" class="modal is-active" v-show="showModal">
      <div class="modal-background" @click.stop="closeModal"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">スケジュール登録</p>
          <button class="delete" aria-label="close" @click.stop="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <h6 class="title is-6">以下の時間で登録しますか？</h6>
          <p style="white-space: pre-line;">日時: {{getDisplayDate()}}</p>
          <p style="white-space: pre-line;">開始時間: {{getDisplayTime(start.hour, start.time)}}</p>
          <p style="white-space: pre-line;">終了時間: {{getDisplayTime(end.hour, end.time, 15)}}</p>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click.stop.prevent="modalSubmit">はい</button>
          <button class="button" @click.stop.prevent="closeModal">キャンセル</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
/* TODO eslint enable */
/* eslint-disable */

const tasks = [
  // 1日目
  [
    {
      name: "勉強会",
      startTime: 1000,
      endTime: 1045,
      category: "event"
    },
    {
      name: "ビジュアルコミュニケーションセミナー",
      startTime: 1100,
      endTime: 1200,
      category: "lecture"
    },
    {
      name: "部のランチ会",
      startTime: 1215,
      endTime: 1315,
      category: "other"
    },
    {
      name: "アプリ開発",
      startTime: 1400,
      endTime: 1730,
      category: "dev"
    }
  ],
  [],
  [
    {
      name: "A社と打ち合わせ",
      startTime: 1300,
      endTime: 1500,
      category: "meeting"
    },
    {
      name: "品川出張",
      startTime: 1600,
      endTime: 1730,
      category: "other"
    }
  ]
];

// 5分ごとの整数列のイテレータを返す
function* range(begin, end, interval = 5) {
  for (let i = begin; i < end; i += interval) {
    yield i;
  }
}
export default {
  name: "scheduleList",
  data() {
    return {
      showModal: false,
      start: {},
      end: {},
      content: ""
    };
  },

  mounted() {
    // 初期スクロール位置調整
    const target = document.getElementById("easygantt");
    const res = document.evaluate(
      "//section[contains(., '7')]",
      document,
      null,
      XPathResult.ANY_TYPE,
      null
    );

    target.scrollLeft = res.iterateNext().getBoundingClientRect().left - 133;

    // タスク配置
    tasks.forEach((taskList, index) => {
      taskList.forEach(task => {
        const start = task.startTime;
        const end = task.endTime;

        for (const time of range(start, end)) {
          const id = `${index}_${time}`;
          const element = document.getElementById(id);

          if (element !== null) {
            if (start == time) {
              element.style.borderLeft = "1px solid gainsboro;";
            } else {
              element.style.borderLeft = "0px";
            }
            element.style.backgroundColor = "yellow";
          }
        }
      });
    });
  },

  methods: {
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
        event.target.style.backgroundColor !== "yellow"
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
      if (event.target.style.backgroundColor !== "yellow") {
        this.showModal = true;
      } else {
        this.$showModal(
          "選択した時間には、予約済時間が含まれています。",
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
