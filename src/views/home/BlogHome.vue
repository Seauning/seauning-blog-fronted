<template>
  <div class="main"
       v-cloak>
    <div class="home_header"
         ref="headerRef">
      <div class="header_content">
        <div class="header_text animate__animated animate__zoomInUp">首页</div>
        <div class="blogger_detail animate__animated animate__zoomInUp">
          <a href="https://gitee.com/zeng-shaocheng"
             target="_blank"><i class="iconfont icon-github"></i></a>
          <a href="javascript::void(0)"
             title="lightsme"><i class="iconfont icon-weixin"></i></a>
          <a href="javascript::void(0)"
             title="1648449524"><i class="iconfont icon-qq"></i></a>
        </div>
      </div>
      <div class="header_to_bottom"
           @click="rollDown">
        向下滚动<el-icon>
          <arrow-down-bold />
        </el-icon>
      </div>
    </div>
    <div class="home_mess">
      <div class="left_mess">
        <home-blogs :articleList="articles.data"></home-blogs>
      </div>
      <div class="right_mess">
        <home-category :types="types.data"></home-category>
        <home-tag :tags="tags.data">
        </home-tag>
      </div>
    </div>
    <blog-record></blog-record>
  </div>
</template>

<script>
import { ArrowDownBold } from '@element-plus/icons';
import {
  ref, reactive, onMounted,
} from 'vue';
import { Message } from '@/utils/tool.js';
import { getAllArticlesApi } from '@/api/homeApi.js';
import { getTagTypesApi } from '@/api/adminApi.js';
import HomeBlogs from '@/views/home/HomeBlogs.vue';
import HomeCategory from '@/views/home/HomeCategory.vue';
import HomeTag from '@/views/home/HomeTag.vue';

export default {
  name: 'BlogHome',
  components: {
    HomeBlogs, HomeCategory, HomeTag, ArrowDownBold,
  },
  setup () {
    // 头部标题的ref
    const headerRef = ref(null);
    // 向下滚动
    const rollDown = () => {
      // 获取页面卷曲高度
      const scrollHeight = window.pageYOffset;
      // 获取头部图片的高度
      const headerHeight = headerRef.value.clientHeight;
      // scrollBy按指定的偏移量进行滚动,
      // 参数top，behavior
      // top滚动的距离
      // behavior滚动的方式smooth平滑滚动,instant瞬间滚动
      window.scrollBy({
        top: headerHeight - scrollHeight,
        behavior: 'smooth',
      });
    };
    const articles = reactive({ data: [] });
    const getArticleList = async () => {
      const { code, msg, data } = await getAllArticlesApi();
      if (code !== 0) {
        Message({
          message: msg,
          type: 'error',
        });
        return;
      }
      articles.data = reactive(data);
    };
    const tags = reactive({ data: [] });
    const types = reactive({ data: [] });
    const getTypeAndTags = async () => {
      const { code, msg, data } = await getTagTypesApi();
      if (code !== 0) {
        Message({
          message: msg,
          type: 'error',
        });
        return;
      }
      tags.data = data.tags;
      // 注意不能直接在data.tags后splice，splice会返回切割后的数组
      tags.data.splice(0, 1);
      types.data = data.types;
    };
    onMounted(() => {
      getArticleList();
      console.log(articles.data.length)
      getTypeAndTags();
    });
    return {
      articles,
      tags,
      types,
      rollDown,
      headerRef,
      getArticleList,
    };
  },
};
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  height: 100%;
}

.home_header {
  position: relative;
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
  .header_to_bottom {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    text-align: center;
    color: #fff;
    font-size: 20px;
    font-family: Lato;
    font-weight: 600;
    cursor: pointer;
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
  padding-left: 80px;
  padding-right: 80px;
  display: flex;
  justify-content: space-evenly;
  .left_mess {
    margin-left: 10px;
    flex: 3 1 auto;
  }
  .right_mess {
    flex: 1 5 auto;
    margin-left: 10px;
  }
}

@media screen and(max-width:746px) {
  .home_mess {
    display: block;
    padding-left: 40px;
    padding-right: 40px;
    .left_mess {
      max-width: 100%;
      margin-left: 0;
    }
    .right_mess {
      max-width: 100%;
      margin-left: 0;
      margin-top: 20px;
    }
  }
}
</style>
