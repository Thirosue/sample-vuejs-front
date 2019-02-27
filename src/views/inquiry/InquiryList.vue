<template>
<div>
  <sample-navbar></sample-navbar>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          問い合わせ一覧
        </h1>
      </div>
    </div>
  </section>
  <div class="container is-fullhd">
    <div class="notification">

      <form-select
        id="category"
        v-model.trim="form.items.category.value"
        v-bind:formItem="form.items.category"
        label="カテゴリ"
      />

      <form-multi-checkbox
        id="genre"
        v-model.trim="form.items.genre.value"
        v-bind:formItem="form.items.genre"
        label="ジャンル"
      />

      <form-input
        id="title"
        v-model.trim="form.items.title.value"
        v-bind:formItem="form.items.title"
        label="タイトル"
        v-bind:searchHandler="search"
      />

      <div class="field is-grouped is-grouped-right">
        <button id="form-submit" class="button is-link" type="submit" v-on:click.stop.prevent="search(1)">Search</button>
      </div>
    </div>

    <hr>

    <div class="sample-result-list" v-if="0 < results.length">
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
        </div>

        <!-- Right side -->
        <div class="level-right">
          <p class="level-item">
            <form-select
              id="rows"
              v-model.trim="form.items.rows.value"
              v-bind:formItem="form.items.rows"
              v-on:input="search(1)"
            />
          </p>
        </div>
      </nav>

      <sample-pager v-bind:initial-page="page" v-bind:page-count="totalPage" v-bind:click-handler="search" :resultCount="count"></sample-pager><!-- pager -->
      <hr>

      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" style="table-layout: fixed;">
        <thead>
          <tr>
            <th>#</th>
            <th>タイトル</th>
            <th>カテゴリ</th>
            <th>ジャンル</th>
            <th>名前</th>
            <th>Email</th>
            <th>内容</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(result, index) in results" v-bind:key="index">
            <td>{{index+1}}</td>
            <td>{{result.title}}</td>
            <td>{{ displayCategory(result.category) }}</td>
            <td>{{ displayGenre(result.genre) }}</td>
            <td>{{result.name}}</td>
            <td>{{result.email}}</td>
            <td class="ellipsis">{{result.body}}</td>
            <td><a href="" @click.prevent="openModal(result.body)">詳細</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <transition name="bounce">
    <div class="modal is-active" v-if="showModal">
      <div class="modal-background" v-on:click.stop.prevent="showModal = !showModal"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">問い合わせ内容</p>
          <button class="delete" aria-label="close" v-on:click.stop.prevent="showModal = !showModal"></button>
        </header>
        <section class="modal-card-body">
          <p style="white-space: pre-line;">{{content}}</p>
        </section>
        <footer class="modal-card-foot">
        </footer>
      </div>
    </div>
  </transition>
  <sample-footer></sample-footer>
</div>
</template>

<script>
import store from '@/store';
import { InquirySearchForm } from '@/forms';
import { inquiryApi } from '@/module/api';
import { decode } from '@/helpers/code';
import BaseList from '@/views/base/List';

const { inquiryCategories } = store.state.master;
const { inquiryGenre } = store.state.master;

export default {
  name: 'InquriyList',
  mixins: [BaseList],

  data() {
    const form = new InquirySearchForm(this.$router.history.current.query, inquiryCategories, inquiryGenre);
    return {
      form,
      showModal: false,
      content: '',
    };
  },

  methods: {
    callApi: where => inquiryApi.findAll(where), // <--- 個別に定義
    displayCategory(category) {
      return decode(category, inquiryCategories);
    },
    displayGenre(genreList) {
      if (!genreList) return '';
      return this.$_.join(genreList.map(genre => decode(genre, inquiryGenre)), ', ');
    },
    openModal(content) {
      this.content = content;
      this.showModal = !this.showModal;
    },
  },

  computed: {
    screenId: () => 'INQURITY_LIST', // <--- 個別に定義
    namespace: () => 'inqurity', // <--- 個別に定義
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-card-title {
  font-size: 1.25em;
}
.bounce-enter-active {
  animation: bounce-in .75s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

/*セルに収まらない場合に省略する*/
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
