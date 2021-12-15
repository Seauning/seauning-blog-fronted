<template>
  <div class="top_nav cl">
    <ul class="nav_content">
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
  methods: {

  },
};
</script>

<style lang="scss" scoped>
$color: #666;
.top_nav {
  position: fixed;
  top: 10px;
  right: 10px;
  .nav_content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.nav_item {
  position: relative;
  flex: 1;
  margin-right: 0.1rem;
  padding: 0.1rem 0.1rem 0 0.1rem;
  &::after {
    display: block;
    position: absolute;
    content: '';
    bottom: -8px;
    left: 0;
    width: 0;
    height: 3px;
    background-color: #80c8f8;
    transition: all 0.3s ease-in-out;
  }
  &:hover::after {
    width: 100%;
  }
  .item_link {
    position: relative;
    display: block;

    &:hover {
      text-decoration: none;
    }

    .iconfont {
      margin-right: 3px;
      color: $color;
      font-size: 0.16rem;
      vertical-align: baseline; /*字体图标与文字基线对齐*/
    }

    .nav_text {
      color: $color;
      font-size: 0.15rem;
    }
  }
}
</style>
