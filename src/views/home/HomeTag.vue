<template>
  <div class="home_tag">
    <my-card :ucard_class="'my_card'">
      <template #icon>
        <i class="iconfont icon-24gf-tags"></i>
      </template>
      <template #title>
        标签
      </template>
      <template #default>
        <my-tag v-for="item in tags"
                :key="item.name"
                :utag_class="'my_tag'">{{item.value}}
          <span class="tag_number">{{item.count}}</span>
        </my-tag>
      </template>
    </my-card>
  </div>
</template>

<script>

export default {
  name: 'HomeCategory',
  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.home_tag {
  min-width: 240px;
  font-family: Lato;
  font-weight: 600;
}
.my_tag {
  margin: 6px;
  .tag_number {
    margin-left: 1em;
  }
}

:deep(.my_card) {
  .se_card_header {
    .card_more {
      color: #09a0939d;
    }
  }
}
</style>
