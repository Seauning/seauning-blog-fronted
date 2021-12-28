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
        <my-tag v-for="(item, idx) in [1,2,3,4,5]"
                :key="idx"
                :utag_class="'my_tag'">Java
          <span class="tag_number">11</span>
        </my-tag>
      </template>
    </my-card>
  </div>
</template>

<script>
import MyCard from '@/components/MyCard.vue';
import MyTag from '@/components/MyTag.vue';

export default {
  name: 'HomeCategory',
  components: {
    MyCard,
    MyTag,
  },

};
</script>

<style lang="scss" scoped>
.home_tag {
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
