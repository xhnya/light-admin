<template>
  <div style="margin-left: 30px;margin-right: 30px;">
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
      >

        <el-table-column
          prop="gameName"
          label="游戏名称"
          width="180"
        >
        </el-table-column>
        <el-table-column
          label="轮播图"
        >
          <template slot-scope="scope">
            <el-button @click="watchBanner(scope.row.gameId)" mini>点击查看</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="nums"
          label="数量"
        >
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更改时间"
          width="180"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row.gameId)"
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
      <el-dialog title="轮播图" :visible.sync="dialogTableVisible">
        <el-carousel height="300px">
          <el-carousel-item v-for="(item,index) in bannerUrl" :key="index">
            <el-image
              style="width: 100%; height: 100%"
              :src="item.url"
              fit="fill"
            ></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-dialog>
      <el-dialog title="轮播图修改" :visible.sync="dialogTableVisible1">
        <el-card>
          11
        </el-card>
        <el-pagination
          small
          @current-change="changeBannerPage"
          layout="prev, pager, next"
          :page-size="1"
          :total="total"
        >
        </el-pagination>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import game from '@/api/game'

export default {
  data() {
    return {
      tableData: [],
      dialogTableVisible: false,
      bannerUrl: [],
      dialogTableVisible1: false,
      total: 10
    }
  },
  created() {
    this.getGameBannerList()
  },
  methods: {
    handleEdit(val) {
      this.dialogTableVisible1 = true
      game.getGameBannerUrl(val).then((res) => {
        console.log(res)
      })
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    getGameBannerList() {
      game.getGameBannerList().then(({ data }) => {
        console.log(data)
        this.tableData = data.page.list
      })
    },
    watchBanner(val) {
      this.dialogTableVisible = true
      game.getGameBannerUrl(val).then((res) => {
        console.log(res)
        this.bannerUrl = res.data.result
      })
    },
    changeBannerPage(val) {
      console.log(val)


    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
