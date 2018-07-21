// Custominze
// https://github.com/lokyoung/vuejs-paginate
<template>
  <ul :class="containerClass" v-if="!noLiSurround">
    <li v-if="firstLastButton" :class="[pageClass, firstPageSelected() ? disabledClass : '']">
      <a @click="selectFirstPage()" @keyup.enter="selectFirstPage()" :class="pageLinkClass" :tabindex="firstPageSelected() ? -1 : 0">{{ firstButtonText }}</a>
    </li>

    <li v-if="!(firstPageSelected() && hidePrevNext)" :class="[prevClass, firstPageSelected() ? disabledClass : '']">
      <a @click="prevPage()" @keyup.enter="prevPage()" :class="prevLinkClass" :tabindex="firstPageSelected() ? -1 : 0"><slot name="prevContent">{{ prevText }}</slot></a>
    </li>

    <li v-for="(page,index) in pages" v-bind:key="index" :class="[pageClass, page.selected ? activeClass : '', page.disabled ? disabledClass : '', page.breakView ? breakViewClass: '']">
      <a v-if="page.breakView" :class="[pageLinkClass, breakViewLinkClass]" tabindex="0"><slot name="breakViewContent">{{ breakViewText }}</slot></a>
      <a v-else-if="page.disabled" :class="pageLinkClass" tabindex="0">{{ page.content }}</a>
      <a v-else @click="handlePageSelected(page.index)" @keyup.enter="handlePageSelected(page.index)" :class="pageLinkClass" tabindex="0">{{ page.content }}</a>
    </li>

    <li v-if="!(lastPageSelected() && hidePrevNext)" :class="[nextClass, lastPageSelected() ? disabledClass : '']">
      <a @click="nextPage()" @keyup.enter="nextPage()" :class="nextLinkClass" :tabindex="lastPageSelected() ? -1 : 0"><slot name="nextContent">{{ nextText }}</slot></a>
    </li>

    <li v-if="firstLastButton" :class="[pageClass, lastPageSelected() ? disabledClass : '']">
      <a @click="selectLastPage()" @keyup.enter="selectLastPage()" :class="pageLinkClass" :tabindex="lastPageSelected() ? -1 : 0">{{ lastButtonText }}</a>
    </li>
    
    <div class="search_result_area" v-if="changeCount">
      <select class="search" @change="changeRows(rows)" v-model="rows">
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="250">250</option>
        <option value="500">500</option>
      </select>
      件		        								
    </div>
  </ul>
</template>

<script>
export default {
  props: {
    pageCount: {
      type: Number,
      required: true
    },
    initialPage: {
      type: Number,
      default: 0
    },
    forcePage: {
      type: Number
    },
    clickHandler: {
      type: Function,
      default: () => {}
    },
    pageRange: {
      type: Number,
      default: 3
    },
    marginPages: {
      type: Number,
      default: 1
    },
    prevText: {
      type: String,
      default: '<'
    },
    nextText: {
      type: String,
      default: '>'
    },
    breakViewText: {
      type: String,
      default: '…'
    },
    containerClass: {
      type: String,
      default: 'pagination'
    },
    pageClass: {
      type: String,
      default: 'page-item'
    },
    pageLinkClass: {
      type: String,
      default: 'page-link'
    },
    prevClass: {
      type: String,
      default: 'page-item'
    },
    prevLinkClass: {
      type: String,
      default: 'page-link'
    },
    nextClass: {
      type: String,
      default: 'page-item'
    },
    nextLinkClass: {
      type: String,
      default: 'page-link'
    },
    breakViewClass: {
      type: String
    },
    breakViewLinkClass: {
      type: String
    },
    activeClass: {
      type: String,
      default: 'active'
    },
    disabledClass: {
      type: String,
      default: 'disabled'
    },
    noLiSurround: {
      type: Boolean,
      default: false
    },
    firstLastButton: {
      type: Boolean,
      default: true
    },
    firstButtonText: {
      type: String,
      default: '<<'
    },
    lastButtonText: {
      type: String,
      default: '>>'
    },
    hidePrevNext: {
      type: Boolean,
      default: false
    },
    changeCount: {
      type: Boolean,
      default: false
    },
    initialRows: {
    }
  },
  data() {
    return {
      selected: this.initialPage,
      rows: this.initialRows
    }
  },
  beforeUpdate() {
    if (this.forcePage === undefined) return
    if (this.forcePage !== this.selected) {
      this.selected = this.forcePage
    }
  },
  computed: {
    pages: function () {
      let items = {}
      if (this.pageCount <= this.pageRange) {
        for (let index = 0; index < this.pageCount; index++) {
          let page = {
            index: index,
            content: index + 1,
            selected: index === this.selected
          }
          items[index] = page
        }
      } else {
        const halfPageRange = Math.floor(this.pageRange / 2)
        let setPageItem = index => {
          let page = {
            index: index,
            content: index + 1,
            selected: index === this.selected
          }
          items[index] = page
        }
        let setBreakView = index => {
          let breakView = {
            disabled: true,
            breakView: true
          }
          items[index] = breakView
        }
        // 1st - loop thru low end of margin pages
        for (let i = 0; i < this.marginPages; i++) {
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
        for (let i = selectedRangeLow; i <= selectedRangeHigh && i <= this.pageCount - 1; i++) {
          setPageItem(i);
        }
        // Check if there is breakView in the left of selected range
        if (selectedRangeLow > this.marginPages) {
          setBreakView(selectedRangeLow - 1)
        }
        // Check if there is breakView in the right of selected range
        if (selectedRangeHigh + 1 < this.pageCount - this.marginPages) {
          setBreakView(selectedRangeHigh + 1)
        }
        // 3rd - loop thru high end of margin pages
        for (let i = this.pageCount - 1; i >= this.pageCount - this.marginPages; i--) {
          setPageItem(i);
        }
      }
      return items
    }
  },
  methods: {
    handlePageSelected(selected) {
      if (this.selected === selected) return
      this.selected = selected
      this.clickHandler(this.selected + 1)
    },
    prevPage() {
      if (this.selected <= 0) return
      this.selected--
      this.clickHandler(this.selected + 1)
    },
    nextPage() {
      if (this.selected >= this.pageCount - 1) return
      this.selected++
      this.clickHandler(this.selected + 1)
    },
    firstPageSelected() {
      return this.selected === 0
    },
    lastPageSelected() {
      return (this.selected === this.pageCount - 1) || (this.pageCount === 0)
    },
    selectFirstPage() {
      this.selected = 0
      this.clickHandler(this.selected + 1)
    },
    selectLastPage() {
      this.selected = this.pageCount
      this.clickHandler(this.selected)
    },
    changeRows(rows) {
      this.clickHandler(1, rows)
    }
  }
}
</script>

<style lang="css" scoped>
a {
  cursor: pointer;
}
</style>