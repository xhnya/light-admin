homeRecommend<template>
  <div>
    <div style="margin: 30px;">
      <el-button @click="add" type="primary">添加</el-button>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="id"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="游戏"
          width="180"
        >
        </el-table-column>
        <el-table-column
          label="状态"
          width="180"
        >
          <template slot-scope="scope">
            <div>
              <el-tag v-if="scope.row.state==0">正常</el-tag>
              <el-tag v-if="scope.row.state==1">停用</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="时间"
          width="180"
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
              @click="handleEdit(scope.$index, scope.row)"
            >停用
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
    <el-dialog
      title="添加"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <div>
          <span>游戏：</span>
          <el-select v-model="value" filterable placeholder="请选择游戏">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.gameName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRecommend()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import game from '@/api/game'

export default {
  data() {
    return {
      dialogVisible: false,
      options: [],
      value: '',
      tableData: [],
      page: 1,
      limit: 10,
      total: 10
    }
  },
  created() {
    this.getRecommendList()
  },
  methods: {
    sizeChangeHandle(val) {
      this.limit = val
      this.page = 1
      this.getRecommendList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.page = val
      this.getRecommendList()
    },
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
    getGameList() {
      game.gameListForSelect().then((res) => {
        this.options = res.data.gameList
      })
    },
    add() {
      this.dialogVisible = true
      this.getGameList()
    },
    getRecommendList() {
      const params = {}
      params.page = this.page
      params.limit = this.limit
      params.type = 1
      game.getGameRecommendList(params).then((res) => {
        this.tableData = res.data.page.list
        this.page = res.data.page.currPage
        this.total = res.data.page.totalCount
      })
    },
    addRecommend() {
      const recommend = {}
      recommend.gameId = this.value
      recommend.type = 1
      this.dialogVisible = false
      game.addGameRecommend(recommend).then((res) => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.value = ''
        this.getRecommendList()
      })
    }
  }
}
</script>

<style scoped>

</style>
