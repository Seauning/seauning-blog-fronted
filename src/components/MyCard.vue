<template>
  <div class="se_card">
    <div class="se_card_header">
      <div class="card_title">
        <span class="card_icon">
          <i class="iconfont"></i>
        </span>
        <span class="card_title_text"></span>
      </div>
      <div class="card_more">
        <span class="card_more_text">
          更多
        </span>
        <i class="iconfont">
        </i>
      </div>
    </div>
    <div class="se_card_body">

    </div>
  </div>
</template>

<script>
export default {
  name: 'MyCard',
};
</script>

<style lang="scss" scoped>
.se_card {
  .se_card_header {
    height: 48px;
    background-color: #f3f4f5;
    border-bottom: 1px solid #ededed;
    box-sizing: border-box;
    .card_title {
      display: flex;
      justify-content: center;
      align-self: start;
      width: 50%;
      height: 100%;
    }
    .card_more {
      display: flex;
      justify-content: center;
      align-self: start;
      width: 50%;
      height: 100%;
    }
  }
  .se_card_body {
    background-color: #fff;
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
  .card_more_text {
  }

  .iconfont {
  }
}
</style>
