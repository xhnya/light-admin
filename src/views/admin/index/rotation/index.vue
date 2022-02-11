<template>
  <div>
    <div style="margin-left: 50px;margin-right: 50px;">
      <div>
        <el-radio-group @change="changeShowStart" v-model="radio1">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="正在显示"></el-radio-button>
          <el-radio-button label="下架图片"></el-radio-button>
        </el-radio-group>
      </div>
      <div style="margin-top: 30px;">
        <el-button @click="dialogFormVisible = true" type="primary">添加</el-button>
        <el-input
          placeholder="请输入名字"
          v-model="searchName"
          style="width: 300px;margin-left: 10px;"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button type="primary" @click="searchByName" icon="el-icon-search">搜索</el-button>
        <el-button plain @click="resetPage">重置</el-button>
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
              v-model="value1"
              active-text="启动"
              inactive-text="停用"
              @change="changeStart"
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
      <el-dialog title="首页轮播图" :visible.sync="dialogFormVisible1">
        <el-form :model="addBanner">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="addBanner.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序" :label-width="formLabelWidth">
            <el-input-number v-model="addBanner.sort" :min="0" :max="10" label="显示序号"></el-input-number>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-switch
              v-model="value1"
              active-text="启动"
              inactive-text="停用"
              @change="changeStart"
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
          <el-button type="primary" @click="changeBannerInfo">确 定</el-button>
        </div>
      </el-dialog>

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
          label="名称"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="start"
          label="状态"
          width="180"
        >
          <template slot-scope="scope">
            <span v-text="scope.row.start===0?'正常':'停用'"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sort"
          label="序号"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="coverUrl"
          label="图片"
        >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <el-image
                style="width: 300px; height: 300px;"
                :src="scope.row.coverUrl"
                fit="fill"
              ></el-image>
              <div slot="reference" class="name-wrapper">
                <el-button type="text">查看图片</el-button>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
        >
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
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
  </div>
</template>

<script>
import adminApi from '@/api/admin'

export default {
  data() {
    return {
      tableData: [],
      radio1: '全部',
      addBanner: {
        name: '',
        coverUrl: '',
        sort: 0,
        start: 0
      },
      dialogFormVisible: false,
      dialogFormVisible1: false,
      formLabelWidth: '120px',
      gridData: [],
      value1: true,
      page: 1,
      limit: 10,
      total: 10,
      searchName: ''
    }
  },
  created() {
    this.getBannerList()
  },
  methods: {
    getBannerList(params) {
      adminApi.getBannerList(this.page, this.limit, params, this.searchName).then(res => {
        this.tableData = res.data.page.list
        this.page = res.data.page.currPage
        this.total = res.data.page.totalCount
        console.log(res)
      })
    },
    sizeChangeHandle(val) {
      this.limit = val
      this.page = 1
      this.getBannerList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.page = val
      this.getBannerList()
    },
    getBannerUrl(response, file) {
      console.log(response.data.url)
      this.addBanner.coverUrl = response.data.url
    },
    submitBannerInfo() {
      this.dialogFormVisible = false
      adminApi.addBanner(this.addBanner).then(res => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.addBanner = {}
        this.getBannerList()
      })
    },
    changeBannerInfo() {
      this.dialogFormVisible1 = false
      adminApi.changeBanner(this.addBanner).then(res => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.addBanner = {}
        this.getBannerList()
      })
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.dialogFormVisible1 = true
      this.addBanner = row
      if (this.addBanner.start === 1) {
        this.value1 = true
      } else {
        this.value1 = false
      }
    },
    handleDelete(index, row) {
      const banner = []
      banner.push(row.id)
      adminApi.deleteBanner(banner).then((res) => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getBannerList()
      })
    },
    changeStart() {
      if (this.value1) {
        this.addBanner.start = 0
      } else {
        this.addBanner.start = 1
      }
    },
    changeShowStart() {
      this.page = 1
      if (this.radio1 === '全部') {
        this.getBannerList()
      }
      if (this.radio1 === '正在显示') {
        this.getBannerList(0)
      }
      if (this.radio1 === '下架图片') {
        this.getBannerList(1)
      }
    },
    searchByName() {
      this.getBannerList()
    },
    resetPage() {
      this.searchName = ''
      this.radio1 = '全部'
      this.getBannerList()
    }
  }
}
</script>

<style scoped>
.page {
  float: right;
  margin-right: 30px;
}
</style>
