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
      <my-pagination></my-pagination>
    </div>
  </el-card>
</template>

<script>
import BlogArticle from './BlogArticle.vue';

export default {
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
