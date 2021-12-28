<template>
  <div :class="['se_card','se_card_shadow', ucard_class]">
    <div class="se_card_header">
      <div class="card_title">
        <span class="card_icon">
          <slot name="icon">
            <i class="iconfont icon-fenlei1">
            </i>
          </slot>
        </span>
        <span class="card_title_text">
          <slot name="title">
            卡片
          </slot>
        </span>
      </div>
      <div class="card_more">
        <a href="">
          <span class="card_more_text">
            更多
          </span>
          <i class="iconfont icon-gengduo1">
          </i>
        </a>
      </div>
    </div>
    <div class="se_card_body">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyCard',
  // 用户自定义类名
  props: ['ucard_class'],
};
</script>

<style lang="scss" scoped>
/* 盒子hover时添加阴影 */
.se_card_shadow {
  transition: all 0.15s linear;
}

.se_card_shadow:hover {
  border-radius: 5px;
  box-shadow: 0 0 10px 10px #dbdadaec;
}

.se_card {
  font-size: 16px;
  max-width: 30em;
  width: 100%;
  margin: 0 auto 20px;
  font-family: 'Lato';
  box-sizing: border-box;
  box-shadow: 0 0 5px 5px #ededed;
  .se_card_header {
    height: 3.25em;
    padding-left: 1.4em;
    padding-right: 1.4em;
    background-color: #f3f4f5;
    border: 1px solid rgb(34 36 38 / 15%);
    border-radius: 0.2em 0.2em 0 0;
    line-height: 3.25em;
    box-sizing: border-box;
    .card_title {
      display: inline-block;
      width: 50%;
      color: #666;
      text-align: left;
      cursor: default;
    }
    .card_more {
      display: inline-block;
      width: 50%;
      color: #4183c4;
      text-align: right;
      font-weight: 600;
    }
  }
  .se_card_body {
    background-color: #fff;
    margin-top: -1px;
    padding: 15px;
    border: 1px solid rgb(34 36 38 / 15%);
    border-radius: 0 0 0.2em 0.2em;
  }
}

.card_title {
  .card_icon {
    .iconfont {
    }
  }
  .card_title_text {
  }
}

.card_more {
  a {
    color: inherit;
  }
  .card_more_text {
    cursor: pointer;
  }
  .iconfont {
    cursor: pointer;
  }
}
</style>
