<script setup>
import { reactive } from 'vue';
import TopNavBar from '@/components/layout/TopNavBar.vue';

const navItems = [
  {
    id: 0, name: '首页', url: '/home', icon: 'icon-shouye',
  },
  {
    id: 1, name: '音乐', url: '/music', icon: 'icon-yinle1',
  },
  {
    id: 2, name: '登录', url: '/login', icon: 'icon-geren',
  },
];

const data = reactive({ navItems });

</script>

<template>
  <top-nav-bar :navItems="data.navItems"></top-nav-bar>
  <router-view></router-view>
</template>

<style lang="scss" scoped>
</style>
