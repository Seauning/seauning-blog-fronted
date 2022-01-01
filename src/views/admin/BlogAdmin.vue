<template>
  <div class="blog_admin">
    <el-header class="admin_header cl">
      <div class="left_title">
        <img :src="userinfo.avatar"
             alt=""
             class="my_avatar">
        <span class="title">{{userinfo.username}}</span>
      </div>
      <div class="right_logout"
           @click="goHome(false)">
        登出
      </div>
    </el-header>
    <el-container class="admin_body">
      <el-aside class="left_aside"
                :width="isCollapse ? '64px' : '240px'">
        <el-menu class="left_menu"
                 background-color="#434343"
                 text-color="#fff"
                 active-text-color="#434343"
                 unique-opened
                 :default-active="activePath"
                 :collapse="isCollapse"
                 :collapse-transition="false"
                 router>
          <el-sub-menu popper-class="my_popper"
                       :index="submenu.index"
                       @click="isCollapse = false"
                       v-for="submenu in menu"
                       :key="submenu.id">
            <template #title>
              <el-icon>
                <!-- 这部分动态渲染存在问题，目前只能采用这种方式进行解决 -->
                <Edit v-if="submenu.icon === 'Edit'" />
                <Avatar v-if="submenu.icon === 'Avatar'" />
              </el-icon>
              <span>{{submenu.title}}</span>
            </template>
            <el-menu-item :index="item.index"
                          v-for="item in submenu.children"
                          :key="item.id">
              <template #title>{{item.title}}</template>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item index="3"
                        @click="goHome">
            <template #title>
              <el-icon>
                <HomeFilled />
              </el-icon>
              首页
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="admin_main"
               @click="isCollapse = true">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {
  onBeforeMount, provide, reactive, readonly, ref, watchEffect,
} from 'vue';
import { useRouter } from 'vue-router';
import {
  HomeFilled, Edit, Avatar,
} from '@element-plus/icons';
import { getTagTypesApi } from '@/api/adminApi.js';
import { Message, getArticles } from '@/utils/tool.js';

export default {
  name: 'BlogAdmin',
  components: {
    HomeFilled,
    Edit,
    Avatar,
  },
  setup() {
    const menu = [
      {
        id: 1,
        index: '1',
        title: '信息管理',
        icon: 'Avatar',
        children: [
          { id: 11, index: '/admin/me', title: '个人信息' },
        ],
      },
      {
        id: 2,
        index: '2',
        title: '博客管理',
        icon: 'Edit',
        children: [
          { id: 21, index: '/admin/blogs', title: '博客列表' },
          { id: 22, index: '/admin/edit', title: '发布博客' },
          { id: 22, index: '/admin/draft', title: '我的草稿' },
        ],
      },
    ];
    const router = useRouter();
    // 是否折叠
    const isCollapse = ref(false);
    // 默认激活的链接
    const activePath = ref('');
    // 监听router中的path变化
    watchEffect(() => {
      activePath.value = router.currentRoute.value.path;
    });
    // 获取用户信息，将存储在session中的信息转为JSON数据
    const userinfo = reactive(JSON.parse(window.sessionStorage.getItem('user')));
    provide('userinfo', userinfo);
    // 获取标签及列表的数据
    const tags = ref([]);
    const types = ref([]);
    const getTagsTypesData = async () => {
      const { code, msg, data } = await getTagTypesApi();
      if (code !== 0) {
        return Message({
          message: msg,
        });
      }
      tags.value = data.tags;
      // 注意不能直接在data.tags后splice，splice会返回切割后的数组
      tags.value.splice(0, 1);
      types.value = data.types;
      return true;
    };
    provide('tags', readonly(tags));
    provide('types', readonly(types));
    // 获取博客文章数据
    // let articles = reactive([]);
    // provide('articles', articles);
    const goHome = (v) => {
      if (!v) window.sessionStorage.clear();
      router.push({
        name: 'Home',
      });
    };
    onBeforeMount(() => {
      getTagsTypesData();
      getArticles();
    });
    return {
      menu,
      isCollapse,
      activePath,
      goHome,
      userinfo,
    };
  },
};
</script>

<style lang="scss" scoped>
.blog_admin {
  height: 100%;
  background-color: #eaedf1;
}
.admin_header {
  height: 10vh;
  padding: 0;
  line-height: 10vh;
  color: #fff;
  font-size: 24px;
  background: linear-gradient(#000000, #434343);
  border-bottom: 1px solid #000;
  box-sizing: border-box;
  .left_title {
    margin-left: 10px;
    float: left;
    .my_avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
      vertical-align: middle;
    }
  }

  .right_logout {
    width: 80px;
    height: 100%;
    float: right;
    text-align: center;
    transition: all 0.2s linear;
    &:hover {
      cursor: pointer;
      color: #8fe1fa;
    }
  }
}
.admin_body {
  height: 90vh;
  .left_aside {
    height: 100%;
    display: inline-block;
    .left_menu {
      height: 100%;
    }
  }
}
.left_menu {
  .el-menu-item,
  .el-sub-menu {
    color: #fff;
    font-size: 20px;
    font-family: $ffLato;
    :deep(.el-sub-menu__title) {
      color: #fff;
      font-size: 20px;
    }
  }
}
.my_popper {
  .el-menu-item {
    &.is-active {
      color: #8fe1fa;
    }
  }
}
.admin_main {
  width: 100%;
}
</style>
