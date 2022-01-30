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
      <div class="block page">
        <el-pagination
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="page"
          :page-sizes="[10, 50, 100, 500]"
          :page-size.sync="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totals"
        >
        </el-pagination>
      </div>
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
          <el-image
            style="width: 100%; height: 300px"
            :src="bannerInfo.url"
            fit="fill"
          ></el-image>
        </el-card>
        <el-button @click="dialogVisible1 = true" type="primary">添加</el-button>
        <el-button @click="dialogVisible = true" type="primary">修改</el-button>
        <el-button @click="deleteGameBanner" type="primary">删除</el-button>
        <el-pagination
          small
          @current-change="changeBannerPage"
          layout="prev, pager, next"
          :page-size="1"
          :total="total"
          :current-page="smallPage"
        >
        </el-pagination>
      </el-dialog>
      <el-dialog
        title="上传图片"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-upload
          class="upload-demo"
          drag
          :action="url"
          :limit="1"
          :on-success="bannerUploadImg"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="changeBannerUrl"
          >确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="上传图片"
        :visible.sync="dialogVisible1"
        width="30%"
        :before-close="handleClose"
      >
        <el-input-number v-model="sort" @change="handleChange" :min="0" :max="10" label="描述文字"></el-input-number>
        <el-upload
          class="upload-demo"
          drag
          :action="url"
          :limit="1"
          :on-success="bannerUploadImg"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="addBannerUrl"
          >确 定</el-button>
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
      tableData: [],
      dialogTableVisible: false,
      bannerUrl: [],
      dialogTableVisible1: false,
      total: 10,
      gameId: 1,
      page: 1,
      limit: 10,
      totals: 10,
      bannerInfo: {
        id: 1,
        url: ''
      },
      smallPage: 1,
      dialogVisible: false,
      url: '',
      bannerImgUrl: '',
      dialogVisible1: false,
      sort: 0
    }
  },
  created() {
    this.getGameBannerList()
    this.url = process.env.VUE_APP_BASE_API + 'cloud/oss/upload'
  },
  methods: {
    handleChange(value) {
      this.sort = value
    },
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
    handleEdit(val) {
      this.dialogTableVisible1 = true
      this.gameId = val
      game.changeBannerPage(1, 1, this.gameId).then((res) => {
        console.log(res)
        this.bannerInfo = res.data.page.list[0]
        this.smallPage = res.data.page.currPage
        this.total = res.data.page.totalCount
      })
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    getGameBannerList() {
      game.getGameBannerList(this.page, this.limit).then(({ data }) => {
        console.log(data)
        this.tableData = data.page.list
        this.page = data.page.currPage
        this.totals = data.page.totalCount
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
      game.changeBannerPage(val, 1, this.gameId).then((res) => {
        this.bannerInfo = res.data.page.list[0]
        this.smallPage = res.data.page.currPage
        this.total = res.data.page.totalCount
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    bannerUploadImg(response, file) {
      this.bannerImgUrl = response.data.url
    },
    changeBannerUrl() {
      // 修改游戏banner==============
      const bannerEntity = {}
      bannerEntity.id = this.bannerInfo.id
      bannerEntity.resourcesUrl = this.bannerImgUrl
      game.changeBannerUrl(bannerEntity).then((res) => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.handleEdit(this.gameId)
        this.dialogVisible = false
      })
    },
    addBannerUrl() {
      const banner = {}
      banner.gameId = this.gameId
      banner.sort = this.sort
      banner.resourcesUrl = this.bannerImgUrl
      game.addBannerImageUrl(banner).then((res) => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.handleEdit(this.gameId)
        this.dialogVisible1 = false
      })
    },
    deleteGameBanner() {
      const ids = []
      ids.push(this.bannerInfo.id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        game.deleteGameBanner(ids).then((res) => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.handleEdit(this.gameId)
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
