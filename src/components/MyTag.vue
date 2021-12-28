<template>
  <a :class="['se_tag', utag_class]">
    <slot name="default">
    </slot>
  </a>
</template>

<script>
export default {
  name: 'MyTag',
  // 用户自定义类名
  props: ['utag_class'],
};
</script>

<style lang="scss" scoped>
.se_tag {
  display: inline-block;
  position: relative;
  min-height: 0.5em;
  padding: 0.28em 0.7em;
  text-align: left;
  border: 1px solid #09a0939d;
  border-radius: 0.32em;
  font-size: 16px;
  color: #09a0939d;
  white-space: nowrap;
  cursor: pointer;
  // 用一个只有两条边的方形覆盖在原方形上
  &::before {
    position: absolute;
    left: 0;
    top: 50%;
    content: '';
    display: block;
    width: 0.5em;
    height: 0.5em;
    background-color: #fff;
    border: 1px solid #09a0939d;
    border-top: none;
    border-right: none;
    transform: translate(-58%, -50%) rotate(45deg);
  }
}
</style>
