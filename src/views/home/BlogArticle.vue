<template>
  <div class="blog_item">
    <div class="blog_article">
      <a href="#"
         class="a_underline">
        <div class="article_content">
          <h1 class="article_title">入站须知</h1>
          <div class="article_desc text_moh">
            如何获取源码地址？入站有什么注意事项?进来便知!
            如何获取源码地址？入站有什么注意事项?进来便知!
            如何获取源码地址？入站有什么注意事项?进来便知!
            如何获取源码地址？入站有什么注意事项?进来便知!
            如何获取源码地址？入站有什么注意事项?进来便知!
            如何获取源码地址？入站有什么注意事项?进来便知!
            如何获取源码地址？入站有什么注意事项?进来便知!
            如何获取源码地址？入站有什么注意事项?进来便知!
          </div>
        </div>
      </a>
      <div class="user_info">
        <div class="left_wrap">
          <a href="#"
             class="avatar_wrap a_underline">
            <img class="user_avatar"
                 src="../../assets/imgs/avatar.jpg" />
            <span class="user_name">
              Seauning
            </span>
          </a>
          <span class="article_date_wrap">
            <i class="iconfont icon-rili"></i>
            <span class="article_date">2021-02-03 20:00</span>
          </span>
          <span class="article_views_wrap">
            <i class="iconfont icon-guankan_guankan"></i>
            <span class="article_views">525</span>
          </span>
        </div>
        <div class="right_wrap">
          <a href="#"
             class="a_underline article_tag">生活</a>
          <a href="#"
             class="a_underline article_tag">科技</a>
        </div>
      </div>
    </div>
    <div class="img_wrap">
      <a href="#">
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
             class="image" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogArticle',
};
</script>

<style lang="scss" scoped>
.blog_item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  padding: 0.24rem 0;
  padding-bottom: 0.24rem;
  border-bottom: 1px solid #e4e7ed;

  .blog_article {
    width: 5rem;
    padding-right: 30px;
  }
  .img_wrap {
    overflow: hidden;
    width: 3rem;
    border-radius: 5px;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 2rem;
    }
  }
}

.blog_article {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .article_content {
    font-family: $ffYahei;
    .article_title {
      font-size: 22px;
      font-weight: 800;
      margin-bottom: 20px;
    }
    .article_desc {
      color: $color666;
      font-size: 16px;
    }
  }
}

.user_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  .left_wrap {
    font-family: $ffYahei;
    font-weight: 400;
    .iconfont {
      margin-left: 10px;
      margin-right: 5px;
      font-size: 14px;
      color: $color666;
    }
    .article_date {
      color: $colorebbb;
    }
    .article_views {
      color: $colorebbb;
    }
  }
  .avatar_wrap {
    color: $color0e83d1;
    .user_avatar {
      width: 25px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .user_name {
      font-size: 14px;
      font-weight: $fw600;
    }
  }

  .right_wrap {
    transition: all 0.3s linear;
    .article_tag {
      display: inline;
      cursor: pointer;
      padding: 5px;
      margin-left: 0.066666rem;
      border: 1px solid $coloreccc;
      border-radius: 4px;
      font-size: 10px;
      color: $color6ab3cc;
      font-weight: $fw600;
      text-align: center;
    }
  }
}

@media screen and(max-width:1300px) {
  .blog_item {
    .blog_article {
      width: 100%;
    }
    .img_wrap {
      display: none;
    }
  }
}

@media screen and(max-width:952px) {
  .blog_item {
    .right_wrap {
      display: none;
    }
  }
}

@media screen and(max-width:660px) {
  .article_date_wrap {
    .article_date {
      font-size: 0.36rem;
    }
  }
  .article_views_wrap {
    display: none;
  }
}
</style>
