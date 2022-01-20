<template>
  <div>
    <div style="margin-left: 50px;">
      <div>
        <el-radio-group v-model="radio1">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="正在显示"></el-radio-button>
          <el-radio-button label="下架图片"></el-radio-button>
        </el-radio-group>
      </div>
      <div style="margin-top: 30px;">
        <el-button @click="dialogFormVisible = true" type="primary">添加</el-button>
        <el-button @click="dialogFormVisible = true" type="success">修改</el-button>
        <el-button type="danger">删除</el-button>
        <el-input
          placeholder="请输入内容"
          v-model="input4"
          style="width: 300px;margin-left: 10px;"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>

      </div>
      <!--弹出层-->
      <el-dialog title="首页轮播图" :visible.sync="dialogFormVisible">
        <el-form :model="addBanner">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="addBanner.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序" :label-width="formLabelWidth">
            <el-input-number v-model="addBanner.sort" :min="0" :max="10" label="显示序号"></el-input-number>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-switch
              v-model="addBanner.start"
              inactive-value="1"
              active-value="0"
              active-text="启动"
              inactive-text="下架"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="文件" :label-width="formLabelWidth">
            <el-upload
              class="upload-demo"
              drag
              action="http://localhost:88/api/cloud/oss/upload"
              :on-success="getBannerUrl"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitBannerInfo">确 定</el-button>
        </div>
      </el-dialog>

      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="id"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import adminApi from '@/api/admin'

export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      radio1: '全部',
      input4: '',
      addBanner: {
        name: '',
        id: 0,
        coverUrl: '',
        sort: 0,
        start: 0
      },
      dialogFormVisible: false,
      formLabelWidth: '120px'

    }
  },
  created() {
    this.getBannerList()
  },
  methods: {
    getBannerList() {
      adminApi.getBannerList().then(res => {
        console.log(res)
      })
    },
    getBannerUrl(response, file) {
      console.log(response.data.url)
      this.addBanner.coverUrl = response.data.url
    },
    submitBannerInfo() {
      this.dialogFormVisible = false
      adminApi.addBanner(this.addBanner).then(res => {
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        })
        this.addBanner = {}
      })
    }
  }
}
</script>

<style scoped>

</style>
