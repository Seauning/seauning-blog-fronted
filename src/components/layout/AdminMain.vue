<template>
  <header class="detail_header">
    <span class="left_menu_info">
      <span class="sub_info">{{menuItems[0].name}}</span>
      <span class="item_info">{{menuItems[1][menuItems[1].length-1].name}}</span>
    </span>
    <el-breadcrumb separator="/"
                   class="right_nav">
      <el-breadcrumb-item :to="{ path: menuItems[0].path }">
        {{menuItems[0].name}}
      </el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in menuItems[1]"
                          :key="item.id">
        {{item.name}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </header>
  <main class="detail_main">
    <slot name="default"></slot>
  </main>
</template>

<script>
export default {
  name: 'AdminMain',
  props: ['menuItems'],
};
</script>

<style lang="scss" scoped>
.detail_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left_menu_info {
    font-family: $ffYahei;
    .sub_info {
      margin-right: 5px;
      color: #000;
      font-size: 30px;
      font-weight: 500;
    }
    .item_info {
      color: rgba(78, 77, 77, 0.87);
      font-size: 20px;
    }
  }

  .right_nav {
    .el-breadcrumb__item {
      font-size: 16px;
    }
  }
}
.detail_main {
  height: 100%;
  border-top: 5px solid;
  border-color: linear-gradient(#000000, #434343);
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  box-sizing: border-box;
}
</style>
