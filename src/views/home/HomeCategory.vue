<template>
  <div class="home_cate">
    <my-card>
      <template #title>
        分类
      </template>
      <template #default>
        <div class="cate_items">
          <div class="cate_item"
               v-for="item in types"
               :key="item.name">{{item.value}}
            <my-tag :utag_class="'my_tag'">
              {{item.count}}
            </my-tag>
          </div>
        </div>
      </template>
    </my-card>
  </div>
</template>

<script>
import MyCard from '@/components/MyCard.vue';
import MyTag from '@/components/MyTag.vue';

export default {
  name: 'HomeCategory',
  props: {
    types: {
      type: Array,
      required: true,
    },
  },
  components: {
    MyTag,
    MyCard,
  },
};
</script>

<style lang="scss" scoped>
.home_cate {
  .cate_items {
    border: 1px solid rgb(34 36 38 / 15%);
    border-radius: 0.2em;
    .cate_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 2.8125em;
      padding: 0.2em 1em;
      border-bottom: 1px solid rgb(34 36 38 / 15%);
      color: #666;
      cursor: pointer;
      transition: all 0.1s linear;
      &:hover {
        color: inherit;
        background-color: #f7f7f7;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
}

.cate_item {
  display: flex;
  justify-content: space-between;
  .cate_item_text {
  }

  .cate_item_label {
    text-align: right;
  }
}
.my_tag {
  border-color: #4183c4;
  color: #4183c4;
  &::before {
    border-color: #4183c4;
  }
}
</style>
