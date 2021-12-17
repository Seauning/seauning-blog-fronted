<template>
  <div class="main">
    <div class="home_header">
      <div class="header_content">
        <div class="header_text">首页</div>
        <div class="blogger_detail">
          <a href="#"><i class="iconfont icon-github"></i></a>
          <a href="#"><i class="iconfont icon-weixin"></i></a>
          <a href="#"><i class="iconfont icon-qq"></i></a>
        </div>
      </div>
    </div>
    <div class="home_mess">
      <home-blogs></home-blogs>
    </div>
    <blog-record></blog-record>
  </div>
</template>

<script>
import HomeBlogs from '@/views/home/HomeBlogs.vue';

export default {
  name: 'BlogHome',
  components: { HomeBlogs },
};
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  height: 100%;
}

.home_header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  // 实现背景平铺
  background: url('@/assets/imgs/newsbackground.jpg') center center / cover no-repeat;
  background-attachment: fixed; // 背景相对于视口固定
  .header_content {
    .header_text {
      color: $themecolor;
      text-align: center;
      font-size: 27px;
      font-family: Lato;
      font-weight: 600;
    }
  }
}

.blogger_detail {
  width: 150px;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    flex: 1;
    display: inline-block;
    text-align: center;
    color: $themecolor;
    .iconfont {
      font-size: 25px;
    }
  }
}

.home_mess {
  padding-top: 105vh;
  padding-bottom: 0;
  padding-left: 1.8rem;
}
</style>
