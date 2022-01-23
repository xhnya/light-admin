<template>
  <div>
    <div style="margin-left: 15%;margin-right: 15%;margin-top: 30px;">

      <el-steps :active="2">
        <el-step description="添加游戏基本信息" title="步骤 1" icon="el-icon-edit">
        </el-step>
        <el-step description="上传游戏相关文件" title="步骤 2" icon="el-icon-upload"></el-step>
        <el-step description="配置游戏其他信息" title="步骤 3" icon="el-icon-collection-tag"></el-step>
      </el-steps>
      <el-button @click="next" type="primary">下一步</el-button>
      <el-row style="margin-top: 30px;" :gutter="20">
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span>封面图</span>
            </div>
            <el-upload
              class="upload-demo"
              :action="url"
              :on-success="gameFile"
              :file-list="fileList"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span>游戏背景图</span>
            </div>
            <el-upload
              class="upload-demo"
              :action="url"
              :on-success="gameFile1"
              :file-list="fileList1"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-card>
        </el-col>
      </el-row>
      <el-row style="margin-top: 30px;" :gutter="20">
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span>视频</span>
            </div>
            <el-upload
              class="upload-demo"
              :action="url"
              :on-success="gameFile3"
              :file-list="fileList3"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span>游戏主要图</span>
            </div>
            <el-upload
              class="upload-demo"
              :action="url"
              :on-success="gameFile4"
              :file-list="fileList4"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-card>
        </el-col>
      </el-row>
      <el-card style="margin-top: 30px;">
        <div slot="header" class="clearfix">
          <span>游戏banner</span>
        </div>
        <el-button type="text" @click="dialogFormVisible = true">添加轮播图</el-button>
        <div style="margin-right: 10%;margin-left: 10%;">
          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in fileList5" :key="item">
              <el-image
                style="width:100%; height: 100%;"
                :src="item"
                fit="fill"
              ></el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-card>

    </div>
    <el-dialog title="轮播图" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="轮播图序号" :label-width="formLabelWidth">
          <el-input-number v-model="form.sort" :min="0" :max="10" label="序号"></el-input-number>
        </el-form-item>
        <el-form-item label="上传" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            drag
            :action="url"
            :on-success="gameFile5"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitBanner">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import game from '@/api/game'

export default {
  data() {
    return {
      gameId: 0,
      fileList: [],
      fileList1: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
      fileList5: [],
      game: {},
      url: '',
      dialogFormVisible: false,
      form: {
        type: 0,
        resourcesUrl: '',
        sort: 0,
        gameId: 0
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    this.gameId = this.$route.params.id
    this.url = process.env.VUE_APP_BASE_API + 'cloud/oss/upload'
  },
  methods: {
    next() {
      this.$router.push({
        name: 'GameTags',
        params: {
          id: this.gameId
        }
      })
    },
    gameFile(response, file) {
      this.game.id = this.gameId
      this.game.coverUrl = response.data.url
      this.fileList1.push(response.data.url)
      game.uploadFile(this.game).then((res) => {
        this.$message({
          message: '添加封面图片成功',
          type: 'success'
        })
        this.game = {}
      })
    },
    gameFile1(response, file) {
      this.game.id = this.gameId
      this.game.bgUrl = response.data.url
      this.fileList1.push(response.data.url)
      game.uploadFile(this.game).then((res) => {
        this.$message({
          message: '添加背景图片成功',
          type: 'success'
        })
        this.game = {}
      })
    },
    gameFile3(response, file) {
      this.game.id = this.gameId
      this.game.videoUrl = response.data.url
      this.fileList3.push(response.data.url)
      game.uploadFile(this.game).then((res) => {
        this.$message({
          message: '添加视频成功',
          type: 'success'
        })
        this.game = {}
      })
    },
    gameFile4(response, file) {
      this.game.id = this.gameId
      this.game.imgUrl = response.data.url
      this.fileList4.push(response.data.url)
      game.uploadFile(this.game).then((res) => {
        this.$message({
          message: '添加图片成功',
          type: 'success'
        })
        this.game = {}
      })
    },
    gameFile5(response, file) {
      this.fileList5.push(response.data.url)
      this.form.resourcesUrl = response.data.url
    },
    submitBanner() {
      console.log(this.fileList5)
      this.dialogFormVisible = false
      this.form.gameId = this.gameId
      this.form.type = 0
      game.addGameBanner(this.form).then((res) => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
      })
      this.form = {}
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
