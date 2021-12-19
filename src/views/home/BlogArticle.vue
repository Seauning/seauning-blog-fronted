<template>
  <div class="blog_item">
    <div class="blog_article">
      <a href="#"
         class="a_underline">
        <div class="article_content">
          <h1 class="article_title">入站须知</h1>
          <div class="article_desc text_soh">
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
  height: 100%;
  box-sizing: border-box;
  padding: 0.16rem 0;
  border-bottom: 1px solid #e4e7ed;
  .blog_article {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 68.75%;
    height: 100%;
    margin-right: 30px;
  }
  .img_wrap {
    display: flex;
    align-items: center;
    width: 31.25%;
    box-sizing: border-box;
    a {
      display: block;
      width: 100%;
      height: 2rem;
    }
    .image {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
}
.blog_article {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .article_content {
    font-family: $ffYahei;
    margin-bottom: 80px;
    .article_title {
      font-size: 26px;
      font-weight: 800;
      margin-bottom: 20px;
    }
    .article_desc {
      color: $color666;
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
}
.user_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.16rem;
  .left_wrap {
    display: inline-block;
    cursor: pointer;
    height: 100%;
    font-family: $ffYahei;
    font-weight: 400;
    .iconfont {
      margin-left: 10px;
      margin-right: 5px;
      font-size: 0.2rem;
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
    width: 31.25%;
    height: 100%;
    text-align: right;
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

@media screen and(max-width:746px) {
  .blog_item {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    padding: 0 0 20px 0;
    .blog_article {
      width: 100%;
      margin-right: 0;
      .article_content {
        margin-bottom: 20px;
      }
    }
    .img_wrap {
      width: 100%;
      padding: 20px 0;
      margin-bottom: 10px;
      a {
        height: 8rem;
      }
    }
  }
}
</style>
