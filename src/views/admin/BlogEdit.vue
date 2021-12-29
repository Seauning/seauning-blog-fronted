<template>
  <md-editor v-model="text"
             :theme="theme"></md-editor>
</template>

<script>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { ref } from 'vue';

export default {
  name: 'BlogEdit',
  // props: ['id'],
  components: {
    MdEditor,
  },
  setup() {
    // const { id } = toRefs(props);
    const text = ref('');
    const theme = 'light';
    // const getBlogDetail = () => {
    //   text.value = id.value;
    // };
    // onMounted(() => {
    //   getBlogDetail();
    // });
    return {
      text, theme,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
