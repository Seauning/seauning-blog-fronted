<template>
  <div class="blog_list">
    <admin-main :menuItems="menuItems">
    </admin-main>
  </div>
</template>

<script>
import AdminMain from '@/components/layout/AdminMain.vue';

export default {
  name: 'BlogList',
  components: {
    AdminMain,
  },
  setup() {
    // 头部面包屑菜单
    const menuItems = [
      {
        id: 0,
        name: '博客管理',
        path: '/admin/blogs',
      },
      [
        {
          id: 1,
          name: '博客列表',
        },
      ],
    ];
    return { menuItems };
  },
};
</script>

<style lang="scss" scoped>
.blog_list {
  padding: 0 20px;
}
</style>
