<template>
  <div>
    <div class="game-score-card">
      <el-card>
        <el-button @click="openDialog(0)" type="primary">添加</el-button>
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
            prop="gameId"
            label="游戏名称"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
          >
          </el-table-column>
          <el-table-column
            prop="gameScore"
            label="分数"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="评分标题"
          >
          </el-table-column>
          <el-table-column
            prop="scoreName"
            label="评分机构"
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="评分时间"
          >
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
      <el-dialog
        title="添加评分"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="评分机构">
              <el-input v-model="form.scoreName"></el-input>
            </el-form-item>
            <el-form-item label="游戏">
              <el-select v-model="form.gameId" filterable placeholder="请选择游戏(可搜索)">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.gameName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="文章">
              <el-select v-model="form.pageId" filterable placeholder="请选择文章(可搜索)">
                <el-option
                  v-for="item in optionsPage"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分数">
              <el-input-number v-model="form.gameScore" :precision="1" :step="0.1" :max="10"></el-input-number>
            </el-form-item>
            <el-form-item label="排序">
              <el-input-number v-model="form.sort" :min="0" :max="10" label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item label="是否本站">
              <el-switch v-model="isLight"></el-switch>
            </el-form-item>
            <el-form-item label="评分描述">
              <el-input type="textarea" v-model="form.scoreDescribe"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button @click="cancelAdd">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import game from '@/api/game'
import community from '@/api/community'

export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      form: {
        id: 0,
        gameId: 0,
        gameScore: 0,
        type: 0,
        scoreName: '',
        scoreDescribe: '',
        sort: 0,
        pageId: 0
      },
      options: {},
      isLight: false,
      page: 1,
      limit: 10,
      total: 10,
      optionsPage: []
    }
  },
  created() {
    this.getScoreList()
  },
  methods: {
    sizeChangeHandle(val) {
      this.limit = val
      this.page = 1
      this.getGameBannerList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.page = val
      this.getGameBannerList()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.form = {}
        })
        .catch(_ => {
        })
    },
    getScoreList() {
      game.getScoreList(this.page, this.limit).then(({ data }) => {
        this.tableData = data.page.list
        this.page = data.page.currPage
        this.total = data.page.totalCount
      })
    },
    getGameList() {
      game.gameListForSelect().then((res) => {
        console.log(res)
        this.options = res.data.gameList
      })
    },
    openDialog(val) {
      this.dialogVisible = true
      this.getGameList()
      this.selectPage()
      if (val === 0) {
        this.form = {}
      }
    },
    cancelAdd() {
      this.dialogVisible = false
      this.form = {}
    },
    onSubmit() {
      if (this.isLight) {
        this.form.type = 0
      } else {
        this.form.type = 2
      }
      this.dialogVisible = false
      game.addScore(this.form).then((res) => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.form = {}
        this.getScoreList()
      })
    },
    selectPage() {
      community.reqSelectPage().then((res) => {
        this.optionsPage = res.data.result
      })
    }

  }
}
</script>

<style scoped>
.game-score-card {
  width: 75%;
  margin-left: 10px;
  margin-top: 30px;
}
</style>
