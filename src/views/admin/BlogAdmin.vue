<template>
  <div class="blog_admin">
    <el-header class="admin_header cl">
      <div class="left_title">
        <img :src="userAvatar"
             alt=""
             class="my_avatar">
        <span class="title">我的后台管理</span>
      </div>
      <div class="right_logout"
           @click="goHome(-1)">
        登出
      </div>
    </el-header>
    <el-container class="admin_body">
      <el-aside class="left_aside"
                :width="isCollapse ? '64px' : '200px'">
        <el-menu class="left_menu"
                 background-color="#434343"
                 text-color="#fff"
                 active-text-color="#409EFF"
                 unique-opened
                 :collapse="isCollapse"
                 :collapse-transition="false"
                 router>
          <el-sub-menu index="1"
                       @click="isCollapse = false">
            <template #title>
              <el-icon>
                <avatar />
              </el-icon>
              <span>信息管理</span>
            </template>
            <el-menu-item index="1-1">
              <template #title>个人信息</template>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2"
                       @click="isCollapse = false">

            <template #title>
              <el-icon>
                <edit />
              </el-icon>
              <span>博客管理</span>
            </template>
            <el-menu-item index="2-1">
              <template #title>发布博客</template>
            </el-menu-item>
            <el-menu-item index="2-2">
              <template #title>编辑博客</template>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item index="3"
                        @click="goHome">
            <el-icon>
              <home-filled />
            </el-icon>
            <template #title>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  HomeFilled, Edit, Avatar,
} from '@element-plus/icons';

export default {
  name: 'BlogAdmin',
  components: {
    HomeFilled,
    Edit,
    Avatar,
  },
  setup() {
    const router = useRouter();
    const userAvatar = ref('https://i.picsum.photos/id/962/100/100.jpg?hmac=1R-Ep4_VzvNYC_FbmfgTK6cMjpkCs7TjjQC8JhVyNpA');
    // 是否折叠
    const isCollapse = ref(false);
    // 被激活的链接
    const activePath = ref('');
    const goHome = (v) => {
      isCollapse.value = false;
      if (v === -1) window.localStorage.removeItem('token');
      router.push({
        name: 'Home',
      });
    };
    return {
      userAvatar,
      isCollapse,
      activePath,
      goHome,
    };
  },
};
</script>

<style lang="scss" scoped>
.blog_admin {
  height: 100%;
}
.admin_header {
  height: 10vh;
  padding: 0;
  line-height: 10vh;
  color: #fff;
  font-size: 24px;
  background: linear-gradient(#000000, #434343);
  box-sizing: border-box;
  .left_title {
    margin-left: 10px;
    float: left;
    .my_avatar {
      width: 50px;
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
    &:hover {
      cursor: pointer;
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
      // background: linear-gradient(#000000, #434343);
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
.admin_main {
  width: 100%;
}
</style>
