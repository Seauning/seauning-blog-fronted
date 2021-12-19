<template>
  <!-- 博客动态 -->
  <div class="my_card">
    <div class="card_header hover-shadow">
      <span class="title">博客</span>
      <span class="">共<span class="number">{{articles.length}}</span>篇</span>
    </div>
    <div class="home_blogs hover-shadow">
      <blog-article v-for="(item, i) in pageSize"
                    :key="i"></blog-article>
    </div>
    <div class="card_footer hover-shadow">
      <my-pagination :totalSize="articles.length"
                     @getPageSize="getPageSize"></my-pagination>
    </div>
  </div>
</template>

<script>
import {
  provide, ref,
} from 'vue';
import BlogArticle from './BlogArticle.vue';

export default {
  setup() {
    // 文章列表在首页中不能改变，所以不是响应式的(后续可以将响应的文章列表挂载到vuex上，以便在其他页面中修改时首页的数据也会动态修改)
    const articles = [1, 2, 3, 4, 6, 7, 10]; // 在此处通过axios获取后端的值(此处模拟)
    // 用ref创建原始值的响应对象，用reactive创建[],{}的响应对象
    const current = ref(1);
    provide('current', current);
    const pageSize = ref(0);
    const getPageSize = (data) => {
      pageSize.value = data.value;
    };
    // 想要在当前页面到的templates中使用的数据记得返回，否则templates找不到
    return {
      articles,
      pageSize,
      getPageSize,
    };
  },
  components: {
    BlogArticle,
  },
};
</script>

<style lang="scss" scoped>
.my_card {
  width: 68.75%;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #fff;
  .card_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 0.2rem;
    border-bottom: 1px solid #d4d4d5;
    font-size: 24px;
    color: skyblue;
    box-sizing: border-box;
    .title {
      font-weight: 600;
    }
  }
}
.home_blogs {
  width: 100%;
  padding: 0.2rem 0.2rem 0 0.2rem;
  box-sizing: border-box;
  &:hover {
    border: 20px;
  }
}

@media screen and(max-width:746px) {
  .my_card {
    width: 100%;
    .card_header {
      padding: 0.3rem;
    }
    .home_blogs {
      padding: 0 0.4rem 0 0.4rem;
    }
  }
}

.card_footer {
  padding: 0.1rem;
}
</style>
