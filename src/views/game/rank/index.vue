<template>
  <div>
    <div style="margin: 30px">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>新游榜</span>
                <el-button @click="addNew" style="float: right; padding: 3px 0" type="text">添加</el-button>
              </div>
              <div v-for="item in newList" :key="item.id" class="text item">
                <span style="margin-right: 10px;">{{ item.sort }}</span><span>{{ item.gameName }}</span>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>热门游戏榜</span>
                <el-button @click="addHost" style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
              </div>
              <div v-for="item in hostList" :key="item.id" class="text item">
                <span style="margin-right: 10px;">{{ item.sort }}</span><span>{{ item.gameName }}</span>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>最受期待榜</span>
                <el-button @click="addExpect" style="float: right; padding: 3px 0" type="text">添加</el-button>
              </div>
              <div v-for="item in expectList" :key="item.id" class="text item">
                <span style="margin-right: 10px;">{{ item.sort }}</span><span>{{ item.gameName }}</span>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <el-dialog
        title="添加游戏"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <div>
          <div>
            <span style="margin-right: 10px;">游戏:</span>
            <el-select v-model="rank.gameId" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.gameName"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div style="margin-top: 30px;">
            <span style="margin-right: 10px;">位置:</span>
            <el-input-number v-model="rank.sort" :min="1" :max="10" label="描述文字"></el-input-number>
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
          done();
        })
        .catch(_ => {
        });
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
        });
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
    }
  }
}
</script>

<style scoped>
</style>
