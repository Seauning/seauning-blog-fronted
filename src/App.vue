<script setup>
import { ref, toRefs, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import TopNavBar from '@/components/layout/TopNavBar.vue';

const { path } = toRefs(useRoute());
const TopNavBarIsShow = ref('');
// console.log(path.value);
// 刷新后路由会找不到需要通过watch进行监听
watchEffect(() => {
  TopNavBarIsShow.value = !path.value.startsWith('/admin');
});
// 导航栏列表无需响应
const homeNavItems = [
  {
    id: 0, name: '首页', url: '/home', icon: 'icon-shouye',
  },
  // {
  //   id: 1, name: '音乐', url: '/music', icon: 'icon-yinle1',
  // },
  {
    id: 2, name: '登录', url: '/login', icon: 'icon-geren',
  },
];

const options = {
  autoPlay: true,
  background: { position: '50% 50%', repeat: 'no-repeat', opacity: 1 },
  fullScreen: { enable: true, zIndex: 1 },
  detectRetina: true,
  duration: 0,
  fpsLimit: 60,
  particles: {
    bounce: {
      horizontal: { random: { enable: false, minimumValue: 0.1 }, value: 1 },
      vertical: { random: { enable: false, minimumValue: 0.1 }, value: 1 },
    },
    collisions: {
      bounce: {
        horizontal: { random: { enable: false, minimumValue: 0.1 }, value: 1 },
        vertical: { random: { enable: false, minimumValue: 0.1 }, value: 1 },
      },
      enable: false,
      mode: 'bounce',
      overlap: { enable: true, retries: 0 },
    },
    color: {
      value: '#83ebff',
      animation: {
        h: {
          count: 0, enable: false, offset: 0, speed: 1, sync: true,
        },
        s: {
          count: 0, enable: false, offset: 0, speed: 1, sync: true,
        },
        l: {
          count: 0, enable: false, offset: 0, speed: 1, sync: true,
        },
      },
    },
    destroy: {
      mode: 'none',
      split: {
        count: 1,
        factor: { random: { enable: false, minimumValue: 0 }, value: 3 },
        rate: { random: { enable: false, minimumValue: 0 }, value: { min: 4, max: 9 } },
        sizeOffset: true,
      },
    },
    life: {
      count: 0,
      delay: { random: { enable: false, minimumValue: 0 }, value: 0, sync: false },
      duration: { random: { enable: false, minimumValue: 0.0001 }, value: 0, sync: false },
    },
    move: {
      angle: { offset: 0, value: 90 },
      attract: { distance: 200, enable: false, rotate: { x: 600, y: 1200 } },
      decay: 0,
      distance: {},
      direction: 'none',
      drift: 0,
      enable: true,
      gravity: {
        acceleration: 9.81, enable: false, inverse: false, maxSpeed: 50,
      },
      path: {
        clamp: true,
        delay: { random: { enable: false, minimumValue: 0 }, value: 0 },
        enable: false,
        options: {},
      },
      outModes: {
        default: 'destroy', bottom: 'destroy', left: 'destroy', right: 'destroy', top: 'destroy',
      },
      random: false,
      size: false,
      speed: 5,
      spin: { acceleration: 0, enable: false },
      straight: false,
      vibrate: false,
      warp: false,
    },
    number: { density: { enable: true, area: 100, factor: 100 }, limit: 0, value: 0 },
    opacity: {
      random: { enable: false, minimumValue: 0.1 },
      value: 1,
      animation: {
        count: 0, enable: false, speed: 3, sync: false, destroy: 'none', startValue: 'random', minimumValue: 0.1,
      },
    },
    orbit: {
      animation: {
        count: 0, enable: false, speed: 1, sync: false,
      },
      enable: false,
      opacity: 1,
      rotation: { random: { enable: false, minimumValue: 0 }, value: 45 },
      width: 1,
    },
    reduceDuplicates: false,
    repulse: {
      random: { enable: false, minimumValue: 0 },
      value: 0,
      enabled: false,
      distance: 1,
      duration: 1,
      factor: 1,
      speed: 1,
    },
    shape: { options: {}, type: 'circle' },
    size: {
      random: { enable: false, minimumValue: 1 },
      value: { min: 0.1, max: 12 },
      animation: {
        count: 0, enable: true, speed: 2, sync: true, destroy: 'max', startValue: 'min', minimumValue: 0.1,
      },
    },
    stroke: { width: 0 },
    tilt: {
      random: { enable: false, minimumValue: 0 }, value: 0, animation: { enable: false, speed: 0, sync: false }, direction: 'clockwise', enable: false,
    },
    twinkle: {
      lines: { enable: false, frequency: 0.05, opacity: 1 },
      particles: { enable: false, frequency: 0.05, opacity: 1 },
    },
    wobble: { distance: 5, enable: false, speed: 50 },
  },
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
  emitters: {
    autoPlay: true,
    life: { wait: false },
    rate: { quantity: 1, delay: 0.5 },
    shape: 'square',
    startCount: 10,
    size: { mode: 'percent', height: 0, width: 100 },
    direction: 'top',
    position: { x: 50, y: 100 },
  },
};

</script>

<template>
  <div class="app">
    <!-- 动态背景不在后台显示 -->
    <Particles v-if="TopNavBarIsShow"
               id="particles"
               :options="options" />
    <top-nav-bar v-if="TopNavBarIsShow"
                 :navItems="homeNavItems"></top-nav-bar>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.app {
  position: relative;
  height: 100%;
  .particles {
    width: 100%;
    height: 100%;
    z-index: -999999;
  }
}
</style>
