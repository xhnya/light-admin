<template>
  <div style="margin-left: 50px;margin-top: 30px;">
    <el-button style="margin-bottom: 30px;" type="primary" @click="dialogFormVisible = true">添加产商</el-button>

    <el-dialog title="产商添加" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="产商名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产商序号" :label-width="formLabelWidth">
          <el-input-number v-model="form.sort" :min="0" :max="10" label="序号"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="chanelChange">取 消</el-button>
        <el-button type="primary" @click="submitProduct">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="产商修改" :visible.sync="dialogFormVisible1">
      <el-form :model="form">
        <el-form-item label="产商名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产商序号" :label-width="formLabelWidth">
          <el-input-number v-model="form.sort" :min="0" :max="10" label="序号"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="chanelChange">取 消</el-button>
        <el-button type="primary" @click="changeProduct">确 定</el-button>
      </div>
    </el-dialog>

    <el-card style="width: 800px;">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
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
</template>

<script>
import product from '@/api/game'

export default {
  data() {
    return {
      tableData: [],
      gridData: [],
      dialogFormVisible: false,
      dialogFormVisible1: false,
      form: {},
      formLabelWidth: '120px',
      page: 1,
      limit: 10,
      total: 10,
      ids: []
    }
  },
  created() {
    this.getProductList()
  },
  methods: {
    sizeChangeHandle(val) {
      this.limit = val
      this.page = 1
      this.getBannerList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.page = val
      this.getBannerList()
    },
    getProductList() {
      product.getProductList(this.page, this.limit).then((res) => {
        this.tableData = res.data.page.list
        this.page = res.data.page.currPage
        this.total = res.data.page.totalCount
        console.log(res)
      })
    },
    chanelChange() {
      this.dialogFormVisible = false
      this.form = {}
    },
    submitProduct() {
      this.dialogFormVisible = false
      product.addProduct(this.form).then((res) => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.form = {}
        this.getProductList()
      })
    },
    handleEdit(index, row) {
      this.dialogFormVisible1 = true
      this.form = row
      this.id = row.id
    },
    handleDelete(index, row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.ids.push(row.id)
        console.log(this.ids)
        product.deleteProduct(this.ids).then((res) => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getProductList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      console.log(index, row)
    },
    changeProduct() {
      this.form.id = this.id
      product.changeProduct(this.form).then((res) => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.dialogFormVisible1 = false
        this.form = {}
        this.getProductList()
      })
    }
  }
}
</script>

<style scoped>

</style>
