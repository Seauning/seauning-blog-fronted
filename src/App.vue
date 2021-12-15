<template>
  <TopNavBar :navItems="navItems"></TopNavBar>
  <router-view></router-view>
</template>

<script>
import TopNavBar from '@/components/layout/TopNavBar.vue';

export default {
  data() {
    return {
      navItems: [
        {
          id: 0, name: '首页', url: '/home', icon: 'icon-shouye',
        },
        {
          id: 1, name: '音乐', url: '/music', icon: 'icon-faxian1',
        },
        {
          id: 2, name: '登录', url: '/login', icon: 'icon-geren',
        },
      ],
    };
  },
  methods: {
  },
  mounted() {
  },
  components: {
    TopNavBar,
  },
};

</script>

<style lang="scss" scoped>
</style>
