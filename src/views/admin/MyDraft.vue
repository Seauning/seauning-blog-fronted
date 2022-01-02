<template>
  <div class="blog_list">
    <admin-main :menuItems="menuItems">
      <el-table v-if="articleList.length >= 1"
                :data="articleList"
                stripe
                highlight-current-row>
        <!--                        id,用户名，真实姓名，角色，备注，最后登录时间，创建时间-->
        <el-table-column type="index"
                         width="50"
                         align="center"
                         label="序号"></el-table-column>
        <el-table-column prop="title"
                         label="标题"
                         align="center"></el-table-column>
        <el-table-column property="type"
                         label="类型"
                         align="center"></el-table-column>
        <el-table-column prop="state"
                         label="状态"
                         align="center"></el-table-column>
        <!-- <el-table-column prop="tag.value"
                         label="标签"
                         align="center"></el-table-column> -->
        <el-table-column label="管理"
                         align="center">
          <template v-slot="scope">
            <el-popconfirm confirm-button-text="确定"
                           @confirm="handleDelete(scope.row)"
                           cancel-button-text="取消"
                           icon-color="red"
                           title="你确定要删除这篇草稿吗?">
              <template #reference>
                <el-button size="mini"
                           type="danger">删除</el-button>
              </template>
            </el-popconfirm>
            <el-button size="mini"
                       type="primary"
                       @click="handleUpdate(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </admin-main>
  </div>
</template>

<script>
import {
  reactive,
} from 'vue';
import { useRouter } from 'vue-router';
import { myFormateDate } from '@/utils/tool.js';
import AdminMain from '@/components/layout/AdminMain.vue';

export default {
  name: 'MyDraft',
  components: {
    AdminMain,
  },
  setup() {
    // 头部面包屑菜单
    const menuItems = [
      {
        id: 0,
        name: '博客管理',
        path: '/admin/draft',
      },
      [
        {
          id: 1,
          name: '我的草稿',
        },
      ],
    ];
    // 数据列表
    const articleList = reactive(JSON.parse(window.localStorage.getItem('draftArticles') || '[]'));
    // 获取格式化日期
    const getFormateDate = (row, column, cellValue) => myFormateDate(cellValue);
    // 删除该文章
    const handleDelete = (row) => {
      // 从草稿文章中删除
      articleList.splice(articleList.indexOf(row), 1);
      window.localStorage.setItem('draftArticles', JSON.stringify(articleList));
    };
    const router = useRouter();
    // 编辑文章
    const handleUpdate = async (row) => {
      // 通过JSON实现深拷贝
      const newRow = JSON.parse(JSON.stringify(row));
      newRow.type = {};
      newRow.tag = [];
      newRow.tag.push({ name: row.tag });
      newRow.type.name = row.type;
      // 加入到编辑文章中
      window.sessionStorage.setItem('editArticle', JSON.stringify(newRow));
      // 从草稿文章中删除
      handleDelete(row);
      // 如果使用params传参需要使用name而不是path
      router.push({ path: '/admin/edit', name: 'Edit' });
    };
    return {
      menuItems,
      articleList,
      getFormateDate,
      handleDelete,
      handleUpdate,
    };
  },

};
</script>

<style lang="scss" scoped>
.pagiantion {
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
}
</style>
