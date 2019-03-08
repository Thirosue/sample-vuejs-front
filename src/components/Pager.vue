// Custominze
// https://github.com/lokyoung/vuejs-paginate
<template>
  <nav :class="containerClass" role="navigation" aria-label="pagination" v-if="!noLiSurround">
    <a v-if="!(firstPageSelected() && hidePrevNext)"
          :disabled="firstPageSelected()"
          :class="prevLinkClass" @click="prevPage()"
          @keyup.enter="prevPage()"
    >{{ prevText }}</a><!--Prev-->
    <a v-if="!(lastPageSelected() && hidePrevNext)"
        :disabled="lastPageSelected()"
        :class="nextLinkClass" @click="nextPage()"
        @keyup.enter="nextPage()"
    >{{ nextText }}</a><!--Next-->

    <ul class="pagination-list">
      <li v-if="firstLastButton">
        <a :disabled="firstPageSelected()"
              :class="pageLinkClass"
              :tabindex="firstPageSelected() ? -1 : 0"
              @click="selectFirstPage()"
              @keyup.enter="selectFirstPage()"
        >{{ firstButtonText }}</a>
      </li><!--First-->

      <li v-for="(page,index) in pages" v-bind:key="index"
          :class="[pageClass, page.breakView ? breakViewClass: '']"
      >
        <a v-if="page.breakView"  tabindex="0"
                :class="[pageLinkClass, breakViewLinkClass]"
        >
          <slot name="breakViewContent">{{ breakViewText }}</slot>
        </a>
        <a v-else-if="page.disabled" tabindex="0"
              :class="[pageLinkClass, page.selected ? activeClass : '' ]"
              :disabled="page.selected"
        >{{ page.content }}</a>
        <a v-else tabindex="0"
              :class="[pageLinkClass, page.selected ? activeClass : '' ]"
              :disabled="page.selected"
              @click="handlePageSelected(page.index)"
              @keyup.enter="handlePageSelected(page.index)"
        >{{ page.content }}</a>
      </li>

      <li v-if="firstLastButton">
        <a :disabled="lastPageSelected()"
              :class="pageLinkClass"
              :tabindex="lastPageSelected() ? -1 : 0"
              @click="selectLastPage()"
              @keyup.enter="selectLastPage()"
        >{{ lastButtonText }}</a>
      </li><!--Last-->
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    pageCount: {
      type: Number,
      required: true,
    },
    initialPage: {
      type: Number,
      default: 0,
    },
    forcePage: {
      type: Number,
    },
    clickHandler: {
      type: Function,
      default: () => {},
    },
    pageRange: {
      type: Number,
      default: 3,
    },
    marginPages: {
      type: Number,
      default: 1,
    },
    prevText: {
      type: String,
      default: 'Previous',
    },
    nextText: {
      type: String,
      default: 'Next page',
    },
    breakViewText: {
      type: String,
      default: '…',
    },
    containerClass: {
      type: String,
      default: 'pagination',
    },
    pageClass: {
      type: String,
      default: 'page-item', // not used
    },
    pageLinkClass: {
      type: String,
      default: 'pagination-link',
    },
    prevClass: {
      type: String,
      default: 'page-item', // not used
    },
    prevLinkClass: {
      type: String,
      default: 'pagination-previous',
    },
    nextClass: {
      type: String,
      default: 'page-item', // not used
    },
    nextLinkClass: {
      type: String,
      default: 'pagination-next',
    },
    breakViewClass: {
      type: String,
    },
    breakViewLinkClass: {
      type: String,
    },
    activeClass: {
      type: String,
      default: 'is-current',
    },
    disabledClass: {
      type: String,
      default: 'disabled',
    },
    noLiSurround: {
      type: Boolean,
      default: false,
    },
    firstLastButton: {
      type: Boolean,
      default: true,
    },
    firstButtonText: {
      type: String,
      default: 'First Page',
    },
    lastButtonText: {
      type: String,
      default: 'Last Page',
    },
    hidePrevNext: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selected: this.initialPage,
      rows: this.initialRows,
    };
  },
  beforeUpdate() {
    if (this.forcePage === undefined) return;
    if (this.forcePage !== this.selected) {
      this.selected = this.forcePage;
    }
  },
  computed: {
    pages() {
      const items = {};
      if (this.pageCount <= this.pageRange) {
        for (let index = 0; index < this.pageCount; index += 1) {
          const page = {
            index,
            content: index + 1,
            selected: index === this.selected,
          };
          items[index] = page;
        }
      } else {
        const halfPageRange = Math.floor(this.pageRange / 2);
        const setPageItem = (index) => {
          const page = {
            index,
            content: index + 1,
            selected: index === this.selected,
          };
          items[index] = page;
        };
        const setBreakView = (index) => {
          const breakView = {
            disabled: true,
            breakView: true,
          };
          items[index] = breakView;
        };
        // 1st - loop thru low end of margin pages
        for (let i = 0; i < this.marginPages; i += 1) {
          setPageItem(i);
        }
        // 2nd - loop thru selected range
        let selectedRangeLow = 0;
        if (this.selected - halfPageRange > 0) {
          selectedRangeLow = this.selected - halfPageRange;
        }
        let selectedRangeHigh = selectedRangeLow + this.pageRange - 1;
        if (selectedRangeHigh >= this.pageCount) {
          selectedRangeHigh = this.pageCount - 1;
          selectedRangeLow = selectedRangeHigh - this.pageRange + 1;
        }
        for (let i = selectedRangeLow; i <= selectedRangeHigh && i <= this.pageCount - 1; i += 1) {
          setPageItem(i);
        }
        // Check if there is breakView in the left of selected range
        if (selectedRangeLow > this.marginPages) {
          setBreakView(selectedRangeLow - 1);
        }
        // Check if there is breakView in the right of selected range
        if (selectedRangeHigh + 1 < this.pageCount - this.marginPages) {
          setBreakView(selectedRangeHigh + 1);
        }
        // 3rd - loop thru high end of margin pages
        for (let i = this.pageCount - 1; i >= this.pageCount - this.marginPages; i -= 1) {
          setPageItem(i);
        }
      }
      return items;
    },
  },
  methods: {
    handlePageSelected(selected) {
      if (this.selected === selected) return;
      this.selected = selected;
      this.clickHandler(this.selected + 1);
    },
    prevPage() {
      if (this.selected <= 0) return;
      this.selected -= 1;
      this.clickHandler(this.selected + 1);
    },
    nextPage() {
      if (this.selected >= this.pageCount - 1) return;
      this.selected += 1;
      this.clickHandler(this.selected + 1);
    },
    firstPageSelected() {
      return this.selected === 0;
    },
    lastPageSelected() {
      return (this.selected === this.pageCount - 1) || (this.pageCount === 0);
    },
    selectFirstPage() {
      this.selected = 0;
      this.clickHandler(this.selected + 1);
    },
    selectLastPage() {
      this.selected = this.pageCount;
      this.clickHandler(this.selected);
    },
    changeRows(rows) {
      this.clickHandler(1, rows);
    },
  },
};
</script>

<style lang="css" scoped>
a {
  cursor: pointer;
}
</style>
