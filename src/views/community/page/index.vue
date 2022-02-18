<template>
  <div class="community-page-body">
    <div>
      <el-button @click="gotoAddPage" type="primary">添加</el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="parentName"
          label="社区"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="发布人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="clickNum"
          label="点击量"
          width="180">
        </el-table-column>
        <el-table-column
          label="标签">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="发布时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block page">
        <el-pagination
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="page"
          :page-sizes="[10, 50, 100, 500]"
          :page-size.sync="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import community from '@/api/community'

export default {

  data() {
    return {
      tableData: [],
      page: 1,
      limit: 10,
      total: 10
    }
  },
  created() {
    this.getPageList()
  },
  methods: {
    sizeChangeHandle(val) {
      this.limit = val
      this.page = 1
      this.getPageList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.page = val
      this.getPageList()
    },
    gotoAddPage() {
      this.$router.push({path: '/community/add'})
    },
    getPageList() {
      const params = {}
      params.page = 1
      community.getPageList(params).then((res) => {
        this.tableData = res.data.page.list
        this.page = res.data.page.currPage
        this.total = res.data.page.totalCount
      })
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      const ids = []
      ids.push(row.id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        community.deletePage(ids).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getPageList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    }

  }
}
</script>

<style scoped>
.community-page-body {
  margin-top: 30px;
  margin-left: 30px;
}
</style>
