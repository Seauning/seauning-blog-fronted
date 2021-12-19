<template>
  <!-- 博客动态 -->
  <el-card>
    <template #header>
      <div class="card-header hover-shadow">
        <span>博客</span>
      </div>
    </template>
    <div class="home_blogs cl">
      <blog-article></blog-article>
      <blog-article></blog-article>
      <blog-article></blog-article>
    </div>
    <div class="card_footer">
      <my-pagination :totalSize="articles.length"></my-pagination>
    </div>
  </el-card>
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
    // 想要在当前页面到的templates中使用的数据记得返回，否则templates找不到
    return {
      articles,
    };
  },
  components: {
    BlogArticle,
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  display: inline-block;
  .card-header {
    color: skyblue;
    font-size: 20px;
    font-weight: 600;
  }
}

.home_blogs {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  flex-wrap: wrap;
  width: 8rem;
}

.card_footer {
  padding-top: 0.24rem;
}
</style>
