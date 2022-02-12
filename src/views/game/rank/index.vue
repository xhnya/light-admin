<template>
  <div>
    <div style="margin: 30px">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>新游榜</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="addNew">添加</el-button>
              </div>
              <div style="margin-top: 10px;" v-for="item in newList" :key="item.id" class="text item">
                <span style="margin-right: 10px;">{{ item.sort }}</span>
                <span style="margin-right: 10px;">{{ item.gameName }}</span>
                <el-button size="mini" type="primary">编辑</el-button>
                <el-button size="mini" @click="deleteRank(item.id)" type="danger">删除</el-button>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>热门榜</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="addHost">添加</el-button>
              </div>
              <div style="margin-top: 10px;" v-for="item in hostList" :key="item.id" class="text item">
                <span style="margin-right: 10px;">{{ item.sort }}</span>
                <span style="margin-right: 10px;">{{ item.gameName }}</span>
                <el-button size="mini" type="primary">编辑</el-button>
                <el-button size="mini" @click="deleteRank(item.id)" type="danger">删除</el-button>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>期待榜</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="addExpect">添加</el-button>
              </div>
              <div style="margin-top: 10px;" v-for="item in expectList" :key="item.id" class="text item">
                <span style="margin-right: 10px;">{{ item.sort }}</span>
                <span style="margin-right: 10px;">{{ item.gameName }}</span>
                <el-button size="mini" type="primary">编辑</el-button>
                <el-button size="mini" @click="deleteRank(item.id)" type="danger">删除</el-button>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <el-dialog
        title="添加游戏"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <div>
          <div>
            <span style="margin-right: 10px;">游戏:</span>
            <el-select v-model="rank.gameId" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.gameName"
                :value="item.id"
              />
            </el-select>
          </div>
          <div style="margin-top: 30px;">
            <span style="margin-right: 10px;">位置:</span>
            <el-input-number v-model="rank.sort" :min="1" :max="10" label="描述文字"/>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import game from '@/api/game'

export default {
  data() {
    return {
      dialogVisible: false,
      type: 1,
      options: [],
      value: '',
      num: 1,
      rank: {},
      newList: [],
      hostList: [],
      expectList: []
    }
  },
  created() {
    this.gameListForSelect()
    this.getRankList()
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    addNew() {
      this.type = 1
      this.dialogVisible = true
    },
    addHost() {
      this.type = 2
      this.dialogVisible = true
    },
    addExpect() {
      this.type = 3
      this.dialogVisible = true
    },
    gameListForSelect() {
      game.gameListForSelect().then((res) => {
        this.options = res.data.gameList
      })
    },
    onSubmit() {
      this.rank.type = this.type
      game.addRank(this.rank).then(() => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.dialogVisible = false
        this.rank = {}
        this.getRankList()
      })
    },
    getRankList() {
      game.getRankList(1).then((res) => {
        this.newList = res.data.rankList
      })
      game.getRankList(2).then((res) => {
        this.hostList = res.data.rankList
      })
      game.getRankList(3).then((res) => {
        this.expectList = res.data.rankList
      })
    },
    deleteRank(val) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = []
        ids.push(val)
        game.deleteRank(ids).then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getRankList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
</style>
