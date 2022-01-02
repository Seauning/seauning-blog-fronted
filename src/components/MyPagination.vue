<template>
  <div class="blog_pagination">
    <span class="pagination__total">共{{totalPage}}页</span>
    <!-- 前进按钮 -->
    <div class="paginator">
      <button type="button"
              :class="['btn-prev', current === 1? 'fobid' : '']"
              @click="changePage(-1)">
        <i class="iconfont icon-left"></i>
      </button>
      <ul class="pagination_pages">
        <li v-for="(p, i) in totalPage"
            :key="i"
            :class="['pagination_e', current === p?'active': '']"
            @click="current = p">{{p}}
        </li>
      </ul>
      <!-- 后退按钮 -->
      <button type="button"
              :class="['btn-prev', current === totalPage? 'fobid' : '']"
              @click="changePage(1)">
        <i class="iconfont icon-right"></i>
      </button>
    </div>
    <span class="pagination_jump">
      <span>跳转到</span>
      <input type="text"
             class="pagination_editor"
             v-model.number.lazy="current">
    </span>
  </div>
</template>

<script>
/* import {
  inject, ref, toRefs, watch,
} from 'vue'; */

export default {
  name: 'MyPagination',
  emits: ['getPageSize', 'getCurrentPage'],
  // 如果需要响应式的变量如current，改变如下方法为2的方法
  props: {
    totalSize: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      totalPage: {
        type: Number,
        default: 0,
      },
      current: 1,
      disabled: {
        type: Number,
        default: 1,
      },
    };
  },
  /* setup(props, context) {
    // 1.如果需要结构props通过toRefs使其不失去响应性，转化为ref后响应访问它的值需要通过.value
    const { totalSize } = toRefs(props);
    const pageSize = ref(3);
    const totalPage = ref(Math.ceil(totalSize.value / pageSize.value));
    console.log(totalPage.value, Math.ceil(totalSize.value / pageSize.value));
    context.emit('getPageSize', pageSize);
    // 2.在父组件中使用protect在子组件中使用inject可以实现父向子响应式传值(在子组件中更改值父组件也会改变)
    const current = inject('current');
    watch(current, (newV, oldV) => {
      console.log(newV, oldV);
    });
    // 这里返回的current虽然时ref但是会自动解包所以在templates中无需.value
    return {
      totalPage,
      current,
    };
  }, */
  methods: {
    changePage(v) {
      if ((v < 0 && this.current > 1 && this.current <= this.totalPage)
        || (v > 0 && this.current > 0 && this.current < this.totalPage)) {
        this.current += v;
      }
    },
  },
  watch: {
    totalSize(v) {
      this.totalPage = Math.ceil(v / this.pageSize);
    },
    current(newV) {
      this.$emit('getCurrentPage', newV);
    },
  },
  mounted() {
    this.$emit('getPageSize', this.pageSize);
    this.totalPage = this.totalSize / this.pageSize;
  },
};
</script>

<style lang="scss" scoped>
.blog_pagination {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 30px;
  font-family: $ffYahei;
  .pagination__total {
    color: #444;
    font-size: 0.9em;
    &:hover {
      cursor: default;
    }
  }
}

.paginator {
  display: flex;
  .pagination_pages {
    display: flex;
    justify-content: space-around;
    color: #000;
    .pagination_e {
      padding: 10px;
      font-size: 0.8em;
      font-weight: 500;
      font-family: VERDANA;
      cursor: pointer;
      transition: all 0.2s linear;
      &.active {
        color: #3fc5f1;
      }
      &:hover {
        color: #6ab3cc;
      }
    }
  }
}

.pagination_jump {
  height: 2em;
  line-height: 2em;
  font-size: 24px;
  span {
    vertical-align: top;
    margin-right: 10px;
  }
  .pagination_editor {
    width: 3em;
    height: 1.6em;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    padding: 0 3px;
    text-align: center;
    font-size: 20px;
    vertical-align: middle;
    outline: none;
    outline-color: #dcdfe6;
    transition: all 0.2s linear;
    box-sizing: border-box;
    &:hover {
      cursor: text;
    }
    &:focus {
      outline: 1px solid#409eff;
    }
  }
}

@media screen and(max-width:1220px) {
  .blog_pagination {
    font-size: 25px;
  }
  .pagination_jump {
    font-size: 20px;
  }
}

@media screen and(max-width:724px) {
  .blog_pagination {
    font-size: 20px;
  }
  .pagination_jump {
    display: none;
  }
}
</style>
