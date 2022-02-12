<template>
  <div>
    <div style="width: 80%;margin-left: 50px;">
      <div style="margin-top: 30px;">
        <el-button @click="toAddGame" type="primary">添加游戏</el-button>
        <el-input
          placeholder="请输入名字"
          v-model="searchName"
          style="width: 300px;margin-left: 10px;"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button type="primary" @click="submitGameInfo" icon="el-icon-search">搜索</el-button>
        <el-button plain @click="submitGameInfo">重置</el-button>
      </div>

      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="80%"
      >
        <el-table-column
          prop="id"
          label="游戏id"
          width="120"
        >
        </el-table-column>
        <el-table-column
          label="名称"
          width="120"
        >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.gameNameChina }}</p>
              <div slot="reference" class="name-wrapper">
                <span>{{ scope.row.gameName }}</span>
              </div>
            </el-popover>
          </template>

        </el-table-column>
        <el-table-column
          prop="gameType"
          label="类型"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="gameIssue"
          label="发行"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="gameMaking"
          label="制作"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="isHot"
          label="是否热门"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="releaseTime"
          label="发行时间"
          width="300"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="120"
        >
          <template slot-scope="scope">
            <el-button
              @click="getGameInfo(scope.row)"
              type="text"
              size="small"
            >
              查看
            </el-button>
            <el-button
              @click="deleteRow(scope.row)"
              type="text"
              size="small"
            >
              修改
            </el-button>
            <el-button
              @click="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >
              移除
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
import game from '@/api/game'

export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      searchName: '',
      page: 1,
      limit: 10,
      total: 10
    }
  },
  created() {
    this.getGameList()
  },
  methods: {
    sizeChangeHandle(val) {
      this.limit = val
      this.page = 1
      this.getGameList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.page = val
      this.getGameList()
    },
    getGameList() {
      game.getGameList().then((res) => {
        this.tableData = res.data.page.list
        this.page = res.data.page.currPage
        this.total = res.data.page.totalCount
        console.log(res)
      })
    },
    deleteRow(val) {
      const ids = []
      ids.push(val)
      this.$confirm('是否删除游戏?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        game.deleteGame(ids).then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getGameList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    submitGameInfo() {
      console.log('====')
    },
    toAddGame() {
      this.$router.push({ path: '/game/add' })
    },
    getGameInfo(val) {
      this.$router.push({ path: `/game/info/${val.id}` })
    }

  }
}
</script>

<style scoped>

</style>
