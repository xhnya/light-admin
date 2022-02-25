<template>
  <div>
    <div style="margin: 30px">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>热门游戏</span>
                <el-button @click="add(2)" style="float: right; padding: 3px 0" type="text">添加</el-button>
              </div>
              <div v-for="item in indexHot" :key="item.id" class="text item">
                <span style="margin-right: 5px;">{{ item.name }}</span>
                <el-button size="mini" type="primary">编辑</el-button>
                <el-button @click="removeR(item.id)" size="mini" type="danger">删除</el-button>
                <el-divider></el-divider>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>最受期待</span>
                <el-button @click="add(3)" style="float: right; padding: 3px 0" type="text">添加</el-button>
              </div>
              <div v-for="item in indexE" :key="item.id" class="text item">
                <span style="margin-right: 5px;">{{ item.name }}</span>
                <el-button size="mini" type="primary">编辑</el-button>
                <el-button @click="removeR(item.id)" size="mini" type="danger">删除</el-button>
                <el-divider></el-divider>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>优惠促销</span>
                <el-button @click="add(1)" style="float: right; padding: 3px 0" type="text">添加</el-button>
              </div>
              <div v-for="item in indexYh" :key="item.id" class="text item">
                <span style="margin-right: 5px;">{{ item.name }}</span>
                <el-button size="mini" type="primary">编辑</el-button>
                <el-button @click="removeR(item.id)" size="mini" type="danger">删除</el-button>
                <el-divider></el-divider>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>最近热门</span>
                <el-button @click="add(4)" style="float: right; padding: 3px 0" type="text">添加</el-button>
              </div>
              <div v-for="item in indexC" :key="item.id" class="text item">
                <span style="margin-right: 5px;">{{ item.name }}</span>
                <el-button size="mini" type="primary">编辑</el-button>
                <el-button @click="removeR(item.id)" size="mini" type="danger">删除</el-button>
                <el-divider></el-divider>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
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
  </div>
</template>

<script>
import game from "@/api/game";

export default {
  data() {
    return {
      type: 0,
      indexHot: [],
      indexYh: [],
      indexE: [],
      indexC: [],
      allList: [],
      dialogVisible: false,
      options: [],
      value: ''
    }
  },
  created() {
    this.getAll()
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
    getGameList() {
      game.gameListForSelect().then((res) => {
        this.options = res.data.gameList
      })
    },
    add(val) {
      this.dialogVisible = true
      this.type = val
      this.getGameList()
    },
    getAll() {
      this.getRecommendList1()
      this.getRecommendList2()
      this.getRecommendList3()
      this.getRecommendList4()
    },
    getRecommendList1() {
      const params = {}
      params.page = this.page
      params.limit = this.limit
      params.type = 1
      game.getGameRecommendList(params).then((res) => {
        this.indexYh = res.data.page.list
      })
    },
    getRecommendList2() {
      const params = {}
      params.page = this.page
      params.limit = this.limit
      params.type = 2
      game.getGameRecommendList(params).then((res) => {
        this.indexHot = res.data.page.list
      })
    },
    getRecommendList3() {
      const params = {}
      params.page = this.page
      params.limit = this.limit
      params.type = 3
      game.getGameRecommendList(params).then((res) => {
        this.indexE = res.data.page.list
      })
    },
    getRecommendList4() {
      const params = {}
      params.page = this.page
      params.limit = this.limit
      params.type = 4
      game.getGameRecommendList(params).then((res) => {
        this.indexC = res.data.page.list
      })
    },
    addRecommend() {
      const recommend = {}
      recommend.gameId = this.value
      recommend.type = this.type
      this.dialogVisible = false
      game.addGameRecommend(recommend).then((res) => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.value = ''
        this.getAll()
      })
    },
    removeR(val) {
      const ids = []
      ids.push(val)
      game.deleteRecommend(ids).then((res) => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getAll()
      })
    }
  }
}
</script>

<style scoped>
</style>
