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
        <li :class="['pagination_e', current === 1?'active': '']"
            @click="selectPage(1)">1
        </li>
        <li :class="['pagination_e', current === 2?'active': '']"
            @click="selectPage(2)">2
        </li>
        <li :class="['pagination_e', current === 3?'active': '']"
            @click="selectPage(3)">3
        </li>
        <li :class="['pagination_e', current === 4?'active': '']"
            @click="selectPage(4)">4
        </li>
      </ul>
      <!-- 后退按钮 -->
      <button type="button"
              :class="['btn-prev', current === 4? 'fobid' : '']"
              @click="changePage(1)">
        <i class="iconfont icon-right"></i>
      </button>
    </div>
    <span class="pagination_jump">
      <span>跳转到</span>
      <input type="text"
             class="pagination_editor"
             v-model.number="current">
    </span>
  </div>
</template>

<script>
import { toRefs } from 'vue';

export default {
  name: 'MyPagination',
  props: {
    totalSize: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    // 通过toRefs使其不失去响应性
    const { totalSize } = toRefs(props);
    const totalPage = Math.ceil(totalSize.value / 3);
    return { totalPage };
  },
  data() {
    return {
      current: 1,
      disabled: {
        type: Number,
        default: 1,
      },
    };
  },
  methods: {
    changePage(v) {
      if ((v < 0 && this.current > 1 && this.current <= 4)
        || (v > 0 && this.current > 0 && this.current < 4)) {
        this.current += v;
      }
    },
    selectPage(v) {
      this.current = v;
    },
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
