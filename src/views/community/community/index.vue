<template>
  <div class="community-page-body">
    <div>
      <el-button @click="dialogVisible=true" type="primary">添加</el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="社区"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="创建时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
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
    <el-dialog
      title="添加"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div>
        <div>社区名：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
        <div>
          <span>请选择类型：</span>
          <el-radio-group v-model="radio">
            <el-radio :label="0">游戏</el-radio>
            <el-radio :label="1">推荐</el-radio>
            <el-radio :label="2">系统</el-radio>
          </el-radio-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import community from '@/api/community'

export default {

  data() {
    return {
      tableData: [],
      page: 1,
      limit: 10,
      total: 10,
      dialogVisible: false,
      input: '',
      radio: 0
    }
  },
  created() {
    this.getCommunityLists()
  },
  methods: {
    sizeChangeHandle(val) {
      this.limit = val
      this.page = 1
      this.getCommunityLists()
    },
    // 当前页
    currentChangeHandle(val) {
      this.page = val
      this.getCommunityLists()
    },
    getCommunityLists() {
      const params = {}
      params.page = this.page
      params.limit = this.limit
      community.getCommunityList(params).then((res) => {
        console.log(res)
        this.tableData = res.data.page.list
        this.page = res.data.page.currPage
        this.total = res.data.page.totalCount
      })
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    },
    add() {
      const communityEntity = {}
      communityEntity.type = this.radio
      communityEntity.name = this.input
      this.dialogVisible = false
      community.addCommunityEntity(communityEntity).then((res) => {
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
        this.getCommunityLists()
      })
    }

  }
}
</script>

<style scoped>
.community-page-body {
  margin-top: 30px;
  margin-left: 30px;
}
</style>
