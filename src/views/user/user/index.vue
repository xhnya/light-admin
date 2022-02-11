<template>
  <div>
    <div style="margin: 30px">
      <el-button @click="dialogVisible=true" type="primary">添加</el-button>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="code"
          label="code"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="yesapiRySysUserStatus"
          label="状态"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="180">
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
      title="添加用户"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form ref="form" :model="userInfo" label-width="80px">
        <el-form-item
          label="用户名称"
        >
          <el-input v-model="userInfo.userName"></el-input>
        </el-form-item>
        <el-form-item label="用户代码">
          <el-input v-model="userInfo.code"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="userInfo.phonenumber"></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
          :rules="[
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]"
        >
          <el-input v-model="userInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="userInfo.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import user from '@/api/users';

export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      userInfo: {},
      multipleSelection: [],
      page: 1,
      limit: 10,
      total: 10
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    sizeChangeHandle(val) {
      this.limit = val
      this.page = 1
      this.getUserList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.page = val
      this.getUserList()
    },
    getUserList() {
      const userParams = {}
      userParams.page = this.page
      userParams.limit = this.limit
      user.getUserList(userParams).then((res) => {
        console.log(res)
        this.tableData = res.data.page.list
        this.page = res.data.page.currPage
        this.total = res.data.page.totalCount
        this.limit = res.data.page.pageSize
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    },
    onSubmit() {
      user.onSubmitUser(this.userInfo).then((res) => {
        this.$message({
          message: '添加成功！',
          type: 'success'
        });
        this.dialogVisible = false
        this.getUserList()
      })
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      const ids = []
      ids.push(row.id)
      user.handleDeleteUser(ids).then((res) => {
        this.$message({
          message: '删除成功！',
          type: 'success'
        });
        this.getUserList()
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>

<style scoped>
</style>
