<template>
  <div class="top_nav">
    <ul class="nav_content cl">
      <li class="nav_item"
          v-for="item in navItems"
          :key="item.id">
        <router-link :to="item.url"
                     class="item_link">
          <i :class="['iconfont', item.icon]"></i>
          <span class="nav_text">{{item.name}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TopNavBar',
  props: ['navItems'],
};
</script>

<style lang="scss" scoped>
.top_nav {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 100%;
  height: 30px;
  z-index: 2000;
  .nav_content {
    position: absolute;
    top: 0;
    right: 0;
    display: inline-block;
  }
}
.nav_item {
  float: left;
  position: relative;
  flex: 1;
  margin-right: 0.1rem;
  // 实现导航下的动态蓝条
  &::after {
    display: block;
    position: absolute;
    content: '';
    bottom: -8px;
    left: 0;
    width: 0;
    height: 3px;
    background-color: $color80c8f8;
    transition: all 0.3s ease-in-out;
  }
  &:hover::after {
    width: 100%;
  }
  .item_link {
    position: relative;
    display: block;
    padding: 0.1rem 0.2rem 0 0.2rem;
    color: $themecolor;
    .iconfont {
      margin-right: 3px;
      font-size: 20px;
      font-family: $ffVERDANA;
      vertical-align: baseline; /*字体图标与文字基线对齐*/
    }
    .nav_text {
      font-size: 20px;
      font-family: $ffVERDANA;
    }
  }
}
</style>
