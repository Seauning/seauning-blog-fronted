<template>
  <div class="main"
       v-if="'user' in article.data">
    <div class="blog_detail_header">
      <h1 class="header_content">
        博客详情
      </h1>
    </div>
    <div class="blog_detail_body">
      <div class="body_header">
        <router-link to="#"
                     class="user_link">
          <img class="user_avatar"
               :src="article.data.user.avatar" />
          <span class="user_name">
            {{article.data.user.name}}
          </span>
        </router-link>
        <i class="iconfont icon-rili"></i>
        <span>{{formatTime()}}</span>
        <i class="iconfont icon-guankan_guankan"></i>
        <span>{{article.data.views}}</span>
      </div>
      <div class="body_pic_area"
           v-if="article.data.bgPath !== ''">
        <img :src="article.data.bgPath"
             alt="">
      </div>
      <div class="body_content_area">
        <md-editor v-model="article.data.text"
                   previewOnly
                   :theme="theme"></md-editor>
      </div>
      <div class="body_record_area cl">
        <ul>
          <li>作者：{{article.data.user.name}}</li>
          <li>发表时间：{{formatTime}}</li>
          <li>版权声明：自由转载-非商用-非衍生-保持署名（创意共享3.0许可证）</li>
          <li>公众号转载：请在文末添加作者公众号二维码</li>
        </ul>
        <img src="../assets/imgs/mmqrcode1641126628868.png"
             alt="微信">
      </div>
      <div class="body_comment_area">
        <div class="comment_detail"></div>
        <el-input class="comment_text"
                  v-model="comment"
                  :autosize="{ minRows: 10, maxRows: 40 }"
                  type="textarea"
                  placeholder="请输入评论信息...">
        </el-input>
        <el-button type="primary"
                   class="comment_publish">
          <el-icon>
            <edit></edit>
          </el-icon>发布
        </el-button>
      </div>
    </div>
    <blog-record></blog-record>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { Edit } from '@element-plus/icons';
import { reactive, ref } from 'vue';
import { Message, myFormateDate, Loading } from '@/utils/tool.js';
import { getCurrentArticleApi, updateViewsApi } from '@/api/homeApi.js';

export default {
  components: { Edit, MdEditor },
  props: {
    id: {
      type: String,
      requeired: true,
    },
  },
  setup () {
    // markdown主题
    const theme = ref('light');
    const comment = ref('');
    const article = reactive({ data: {} });
    const route = useRoute();
    async function getCurrentArticle () {
      const loading = Loading({
        fullscreen: true,
      });
      const { id } = route.params;
      const { code, msg, data } = await getCurrentArticleApi(id);
      if (code !== 0) {
        return Message({
          message: msg,
        });
      }
      article.data = data;
      article.data.views += 1;
      // 增加观看人数
      await updateViewsApi(article.data.id, article.data.views);
      loading.close();
      return true;
    }
    getCurrentArticle();
    const formatTime = () => myFormateDate(article.data.createdTime);

    return {
      formatTime,
      article,
      comment,
      theme,
    };
  },
};
</script>

<style lang="scss" scoped>
// 添加这个代码会导致浏览器的html高度100%失效
.main {
  height: 100%;
}
.blog_detail_header {
  height: 60vh;
  background: url('@/assets/imgs/blogdetail.png') center center / cover no-repeat;
  background-attachment: fixed; // 背景相对于视口固定
  text-align: center;
  line-height: 60vh;
  .header_content {
    color: $themecolor;
    text-align: center;
    font-size: 36px;
    font-family: Lato;
    font-weight: 600;
    cursor: default;
  }
}
.blog_detail_body {
  width: 10rem;
  margin: 12vh auto;
  background-color: #fff;
  font-size: 24px;
  .body_header {
    height: 5em;
    padding: 0 1.25em;
    border-bottom: 1px solid #ccc;
    line-height: 5em;
    color: #999;
    font-weight: $fw600;
    font-size: 16px;
    box-sizing: border-box;
    cursor: default;
    .user_link {
      color: $color0e83d1;
      font-family: $ffLato;
      .user_avatar {
        border-radius: 50%;
        width: 30px;
        height: 30px;
      }
    }
    .iconfont {
      margin: 0 8px;
    }
  }

  .body_pic_area {
    height: 6rem;
    padding: 15px;
    border-bottom: 1px solid #ccc;
    img {
      border-radius: 5px;
      width: 100%;
      height: 100%;
    }
  }

  .body_content_area {
    padding: 1.5em;
  }

  .body_record_area {
    padding: 60px 30px 30px;
    background-color: #fcfff5;
    border: 1px solid #a3c293;
    border-bottom: 1px solid #ccc;
    font-size: 18px;
    font-family: $ffYahei;
    color: #2c662d;
    cursor: default;
    ul {
      display: inline-block;
      li {
        position: relative;
        list-style-type: none;
        margin: 0 0 0.3em 1em;
        padding: 0;
        color: inherit;
        &::before {
          position: absolute;
          content: '•';
          left: -1em;
          height: 100%;
          vertical-align: baseline;
        }
      }
    }
    img {
      width: 100px;
      height: 100%;
      float: right;
    }
  }

  .body_comment_area {
    padding: 20px;
    text-align: center;
    .comment_text {
      font-size: 16px;
    }
    .comment_publish {
      margin-top: 20px;
      font-size: 20px;
    }
  }
}
</style>
