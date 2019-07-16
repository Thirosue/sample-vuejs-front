<template>
  <div>
    <sample-navbar></sample-navbar>
    <div class="container is-fluid">
      <h3 class="title is-4">スケジュール一覧（１週間）</h3>

      <div id="easygantt">
        <div v-bind:id="'chart_' + i" class="chart" v-for="i in 6" :key="'chart_' + i">
          <div>
            <span class="date is-fixed" id="date0">{{getDisplayDate(i-1)}}</span>
          </div>
          <div class="daily-area">
            <div class="scale">
              <section
                class="hour"
                v-for="hour in 24"
                :key="'chart_' + i + '_hour' + hour"
              >{{hour-1}}</section>

              <span v-for="hour in 24" :key="hour">
                <section
                  class="dropzone"
                  v-for="time in [0, 15, 30, 45]"
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
            </div>
          </div>
        </div>
      </div>
    </div>

    <sample-footer></sample-footer>
    <img id="dummy" style="opacity:0; height:0px" src="#" />
    <!-- #TODO -->

    <div id="modal" class="modal is-active" v-show="showModal">
      <div class="modal-background" @click.stop="closeModal"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">問い合わせ内容</p>
          <button class="delete" aria-label="close" @click.stop="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <p style="white-space: pre-line;">{{content}}</p>
        </section>
        <footer class="modal-card-foot"></footer>
      </div>
    </div>
  </div>
</template>

<script>
/* TODO eslint enable */
/* eslint-disable */
export default {
  name: "scheduleList",
  data() {
    return {
      pos: {},
      showData: true,
      showModal: false,
      content: ""
    };
  },

  mounted() {
    // 初期位置調整
    const target = document.getElementById("easygantt");
    const res = document.evaluate(
      "//section[contains(., '7')]",
      document,
      null,
      XPathResult.ANY_TYPE,
      null
    );

    target.scrollLeft = res.iterateNext().getBoundingClientRect().left - 32;
    const _left7 = target.scrollLeft;

    // 日付ラベル設定
    const size = document.querySelectorAll(".chart").length;
    for (let i = 0; i < size; i += 1) {
      const target = document.querySelectorAll(".chart")[i];
      const label = document.querySelectorAll(".date")[i];
      label.style.top = `${target.getBoundingClientRect().top - 22}px`;
    }
  },

  methods: {
    dragstart(item, event) {
      console.log("dragstart");
      this.pos = item;
      event.dataTransfer.setData("text/plain", null);
      event.dataTransfer.setDragImage(document.getElementById("dummy"), 0, 0); // 選択要素をドラッグ中に表示させない
    },
    dragenter(item, event) {
      console.log("dragenter");
      if (event.target.className === "dropzone") {
        this.paint(event.target);
      }
    },
    drop(item, event) {
      console.log("drop");
      this.pos = {};
      this.showModal = true;
    },
    closeModal() {
      this.showModal = !this.showModal;
      [...document.querySelectorAll(".dropzone")].forEach(ele =>
        this.clear(ele)
      );
    },
    paint: ele => {
      ele.style.background = "#FFFFCC";
      ele.style.color = "black";
    },
    clear: ele => {
      ele.style.background = "white";
      ele.style.color = "dimgray";
    },
    getDisplayDate(index) {
      const date = this.$moment().add(index, "days");
      return `${date.format("YYYY/MM/DD")}(${this.$moment.weekdaysShort(
        date.day()
      )})`;
    },
    getDisplayTime: (hour, time) => `${hour - 1}:${`00${time}`.slice(-2)}`
  },

  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/schedule2.css">
</style>
