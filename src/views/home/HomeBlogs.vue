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
      <my-pagination :totalSize="data.articles.length"></my-pagination>
    </div>
  </el-card>
</template>

<script>
import { reactive } from 'vue';
import BlogArticle from './BlogArticle.vue';

export default {
  data() {
    return {
      articles: {
        type: Array,
        default: [],
      },
    };
  },
  setup() {
    const articles = [1, 2, 3, 4, 6, 7, 10];
    const data = reactive({ articles });
    // 数据记得返回，否则templates找不到
    return {
      data,
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
