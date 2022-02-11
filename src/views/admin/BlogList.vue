<template>
  <div class="blog_list">
    <admin-main :menuItems="menuItems">
      <el-table v-if="articleList.length >= 1"
                current-row-key="id"
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
        <el-table-column property="type.value"
                         label="类型"
                         align="center"></el-table-column>
        <el-table-column prop="state"
                         label="状态"
                         align="center"></el-table-column>
        <!-- <el-table-column prop="tag.value"
                         label="标签"
                         align="center"></el-table-column> -->
        <el-table-column prop="modifiedDate"
                         :formatter="getFormateDate"
                         label="更新时间"
                         align="center"></el-table-column>
        <el-table-column label="管理"
                         align="center">
          <template v-slot="scope">
            <el-popconfirm confirm-button-text="确定"
                           @confirm="handleDelete(scope.row)"
                           cancel-button-text="取消"
                           icon-color="red"
                           title="你确定要删除这篇文章吗?">
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
      <!-- <el-pagination class="pagiantion"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="pagination.currentPage"
                     :page-sizes="[2,5,10,15]"
                     :page-size="pagination.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="pagination.total">
      </el-pagination> -->
    </admin-main>
  </div>
</template>

<script>
import {
  reactive,
} from 'vue';
import { Message } from '@element-plus/icons';
import { useRouter } from 'vue-router';
import { deleteArticleApi } from '@/api/adminApi.js';
import { myFormateDate, getArticles } from '@/utils/tool.js';

export default {
  name: 'BlogList',
  setup() {
    // 头部面包屑菜单
    const menuItems = [
      {
        id: 0,
        name: '博客管理',
        path: '/admin/blogs',
      },
      [
        {
          id: 1,
          name: '博客列表',
        },
      ],
    ];
    // 数据列表
    const articleList = reactive(JSON.parse(window.sessionStorage.getItem('articles')));
    // 分页相关模型数据
    const pagination = reactive({
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示的记录数
      total: 0, // 总记录数
    });
    // 改变每页大小
    const handleSizeChange = () => {
    };
    //
    const handleCurrentChange = () => {
    };
    // 获取格式化日期
    const getFormateDate = (row, column, cellValue) => myFormateDate(cellValue);
    // 删除该文章
    const handleDelete = async (row) => {
      const { code, msg } = await deleteArticleApi(row.id);
      if (code !== 0) {
        return Message({
          message: msg,
          type: 'error',
        });
      }
      articleList.splice(articleList.indexOf(row), 1);
      getArticles();
      return true;
    };
    const router = useRouter();
    // 编辑文章
    const handleUpdate = async (row) => {
      window.sessionStorage.setItem('editArticle', JSON.stringify(row));
      // 如果使用params传参需要使用name而不是path
      router.push({ path: '/admin/edit', name: 'Edit' });
    };
    return {
      menuItems,
      articleList,
      pagination,
      getFormateDate,
      handleSizeChange,
      handleCurrentChange,
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
