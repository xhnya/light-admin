<template>
  <div style="margin: 30px">
    <div>
      <el-button @click="dialogVisible = true" type="primary">添加</el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          label="id"
          width="180"
          prop="id"
        >
        </el-table-column>
        <el-table-column
          label="名称"
          width="180"
          prop="typeName"
        >
        </el-table-column>
        <el-table-column
          label="状态"
          width="180"
        >
          <template slot-scope="scope">
            <el-tag v-if=" scope.row.isDel===0">正常</el-tag>
            <el-tag v-if=" scope.row.isDel!==0" type="danger">停用</el-tag>
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
    </div>
    <el-dialog
      title="添加"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <span>请输入分类名：</span>
        <el-input style="width: 300px;" v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>排序</span>
        <el-input-number v-model="num" :min="0" :max="10" label="描述文字"></el-input-number>
      </div>
      <div>
        <span>备注：排序字段默认为0，为0则用户可见</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import community from '@/api/community'

export default {
  data() {
    return {
      dialogVisible: false,
      input: '',
      num: 0,
      tableData: [],
      page: 1,
      limit: 10,
      total: 10
    }
  },
  created() {
    this.getCommunityTypeLists()
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    add() {
      this.dialogVisible = false
      const type = {}
      type.typeName = this.input
      type.sort = this.num
      community.addCommunityType(type).then((res) => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
      })
    },
    sizeChangeHandle(val) {
      this.limit = val
      this.page = 1
      this.getCommunityTypeLists()
    },
    // 当前页
    currentChangeHandle(val) {
      this.page = val
      this.getCommunityTypeLists()
    },
    getCommunityTypeLists() {
      const params = {}
      params.page = this.page
      params.limit = this.limit
      community.getCommunityTypeList(params).then((res) => {
        this.tableData = res.data.page.list
        this.page = res.data.page.currPage
        this.total = res.data.page.totalCount
      })
    }
  }
}
</script>

<style scoped>
</style>
