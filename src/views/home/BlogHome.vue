<template>
  <div class="main">
    <div class="home_header">
      <div class="header_content">
        <div class="header_text animate__animated animate__zoomInUp">首页</div>
        <div class="blogger_detail animate__animated animate__zoomInUp">
          <a href="#"><i class="iconfont icon-github"></i></a>
          <a href="#"><i class="iconfont icon-weixin"></i></a>
          <a href="#"><i class="iconfont icon-qq"></i></a>
        </div>
      </div>
    </div>
    <div class="home_mess cl">
      <div class="left_mess">
        <home-blogs></home-blogs>
      </div>
      <div class="right_mess">
        <home-category></home-category>
        <home-tag></home-tag>
      </div>
    </div>
    <blog-record></blog-record>
  </div>
</template>

<script>
import HomeBlogs from '@/views/home/HomeBlogs.vue';
import HomeCategory from '@/views/home/HomeCategory.vue';
import HomeTag from '@/views/home/HomeTag.vue';

export default {
  name: 'BlogHome',
  components: { HomeBlogs, HomeCategory, HomeTag },
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
  animation: header-effect 1s;
  .header_content {
    .header_text {
      color: $themecolor;
      text-align: center;
      font-size: 36px;
      font-family: Lato;
      font-weight: 600;
    }
  }
}

.blogger_detail {
  width: 280px;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation-duration: 1.1s;
  a {
    flex: 1;
    display: inline-block;
    text-align: center;
    color: $themecolor;
    cursor: default;
    .iconfont {
      font-size: 26px;
    }
  }
}

.home_mess {
  padding-top: 105vh;
  padding-bottom: 0;
  .left_mess {
    float: left;
    width: 68%;
    padding-left: 0.7rem;
    box-sizing: border-box;
  }
  .right_mess {
    float: right;
    width: 32%;
    padding: 0 30px;
    box-sizing: border-box;
  }
}

@media screen and(max-width:746px) {
  .home_mess {
    padding-left: 20px;
    padding-right: 20px;
    .left_mess {
      float: none;
      width: 100%;
      padding-left: 0;
    }
    .right_mess {
      float: none;
      width: 100%;
      margin-top: 20px;
      margin-right: 0;
    }
  }
}
</style>
