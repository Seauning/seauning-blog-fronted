<template>
  <div class="blog_item">
    <div class="blog_article">
      <router-link to="/blog"
                   class="a_underline">
        <div class="article_content">
          <h1 class="article_title">{{article.title}}</h1>
          <p class="article_desc text_moh">
            {{article.text}}
          </p>
        </div>
      </router-link>
      <div class="user_info">
        <div class="left_wrap">
          <router-link to="#"
                       class="avatar_wrap a_underline">
            <img class="user_avatar"
                 src="../../assets/imgs/avatar.jpg" />
            <span class="user_name">
              Seauning
            </span>
          </router-link>
          <span class="article_date_wrap">
            <i class="iconfont icon-rili"></i>
            <span class="article_date">{{formateDate}}</span>
          </span>
          <span class="article_views_wrap">
            <i class="iconfont icon-guankan_guankan"></i>
            <span class="article_views">{{article.views}}</span>
          </span>
        </div>
        <div class="right_wrap"
             v-if="article.tag.length !== 0">
          <router-link to="#"
                       class="a_underline article_tag"
                       v-for="tag in article.tag"
                       :key="tag.name">{{tag.value}}</router-link>
        </div>
      </div>
    </div>
    <div class="img_wrap"
         v-if="article.bgPath !== ''">
      <router-link to="/blog">
        <img :src="article.bgPath"
             class="image" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { myFormateDate } from '@/utils/tool.js';

export default {
  name: 'BlogArticle',
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formateDate() {
      return myFormateDate(this.article.createdTime);
    },
  },
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
    padding: 0 5px;
    margin-right: 30px;
    box-sizing: border-box;
  }
  .img_wrap {
    display: flex;
    align-items: center;
    width: 31.25%;
    box-sizing: border-box;
    a {
      display: block;
      width: 100%;
      height: 1.8rem;
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
      color: $color777;
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
}
.user_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  .left_wrap {
    display: inline-block;
    cursor: pointer;
    height: 100%;
    font-family: $ffYahei;
    font-weight: 400;
    color: $colorebbb;
    .iconfont {
      margin-left: 10px;
      margin-right: 5px;
      // font-size: 0.2rem;
      color: $color666;
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
      display: inline-block;
      cursor: pointer;
      padding: 5px;
      margin-left: 0.066666rem;
      margin-bottom: 0.05rem;
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
