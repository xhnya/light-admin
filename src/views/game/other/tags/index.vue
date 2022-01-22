<template>
  <div style="margin-left: 50px;margin-top: 30px;">
    <el-button style="margin-bottom: 30px;" type="primary" @click="dialogFormVisible = true">添加标签</el-button>

    <el-dialog title="游戏标签添加" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标签名称" :label-width="formLabelWidth">
          <el-input v-model="form.tagName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签序号" :label-width="formLabelWidth">
          <el-input-number v-model="form.sort" :min="0" :max="10" label="序号"></el-input-number>
        </el-form-item>
        <el-form-item label="标签序号" :label-width="formLabelWidth">
          <el-radio v-model="form.start" label="0">正常</el-radio>
          <el-radio v-model="form.start" label="1">停用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="chanelChange">取 消</el-button>
        <el-button type="primary" @click="submitTags">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="游戏标签修改" :visible.sync="dialogFormVisible1">
      <el-form :model="form">
        <el-form-item label="标签名称" :label-width="formLabelWidth">
          <el-input v-model="form.tagName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签序号" :label-width="formLabelWidth">
          <el-input-number v-model="form.sort" :min="0" :max="10" label="序号"></el-input-number>
        </el-form-item>
        <el-form-item label="标签序号" :label-width="formLabelWidth">
          <el-radio v-model="form.start" label="0">正常</el-radio>
          <el-radio v-model="form.start" label="1">停用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="chanelChange">取 消</el-button>
        <el-button type="primary" @click="changeTags">确 定</el-button>
      </div>
    </el-dialog>

    <el-card style="width: 1000px;">
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
          prop="tagName"
          label="名称"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
        >
        </el-table-column>
        <el-table-column
          label="状态"
        >
          <template slot-scope="scope">
            <el-tag v-show="scope.row.start===0" type="success">正常</el-tag>
            <el-tag v-show="scope.row.start===1" type="danger">停用</el-tag>
          </template>
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
import tagsApi from '@/api/game'

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
    this.getTagsList()
  },
  methods: {
    sizeChangeHandle(val) {
      this.limit = val
      this.page = 1
      this.getTagsList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.page = val
      this.getTagsList()
    },
    getTagsList() {
      tagsApi.getTagsList(this.page, this.limit).then((res) => {
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
    submitTags() {
      this.dialogFormVisible = false
      tagsApi.addTags(this.form).then((res) => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.form = {}
        this.getTagsList()
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
        tagsApi.deleteTags(this.ids).then((res) => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getTagsList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      console.log(index, row)
    },
    changeTags() {
      this.form.id = this.id
      tagsApi.changeTags(this.form).then((res) => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.dialogFormVisible1 = false
        this.form = {}
        this.getTagsList()
      })
    }
  }
}
</script>

<style scoped>

</style>
