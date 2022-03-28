<template>
  <div>
    <div style="margin: 30px">
      <el-button @click="dialogVisible=true" type="primary">添加</el-button>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          prop="id"
          label="id"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="code"
          label="code"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          label="状态"
          width="200"
        >
          <template slot-scope="scope">
            <div>
              <!--              @click="changeUserId(scope.row.id)"-->
              <el-switch
                v-model="scope.row.yesapiRySysUserStatus"
                active-value="0"
                inactive-value="1"
                active-text="正常"
                inactive-text="停用"
                @change="(val)=>{disableUser(val,scope.row.id)}"
              >
              </el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="180"
        >
        </el-table-column>
        <el-table-column label="操作">
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
      :before-close="handleClose"
    >
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
    <el-dialog
      title="选择封禁时长"
      :visible.sync="dialogVisible1"
      width="30%"
      :before-close="handleCloseBan"
    >
      <div>
        <el-button @click="quickChange(3,'小时')">3小时</el-button>
        <el-button @click="quickChange(1,'天')">1天</el-button>
        <el-button @click="quickChange(3,'天')">3天</el-button>
        <el-button @click="quickChange(1,'周')">1周</el-button>
        <el-button @click="quickChange(1,'月')">1月</el-button>
        <p>
          <el-button>自定义</el-button>
          <el-input style="width: 250px;margin-left: 10px;" placeholder="请输入内容" v-model="nums">
            <template slot="append">
              <el-dropdown @command="handleCommand">
                <el-button type="primary">
                  {{ viewType }}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="house">小时</el-dropdown-item>
                  <el-dropdown-item command="day">天</el-dropdown-item>
                  <el-dropdown-item command="week">星期</el-dropdown-item>
                  <el-dropdown-item command="month">月</el-dropdown-item>
                  <el-dropdown-item command="year">年</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-input>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="banUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import user from '@/api/users'

export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      userInfo: {},
      multipleSelection: [],
      page: 1,
      limit: 10,
      total: 10,
      dialogVisible1: false,
      nums: '',
      viewType: '小时',
      userId: 0
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
    handleCommand(command) {
      this.viewType = viewTypeContent(command)
    },
    quickChange(val, val1) {
      this.dialogVisible1 = false
      const ban = {}
      ban.userId = this.userId
      ban.nums = val
      ban.type = val1
      user.reqBanUser(ban).then((res) => {
        this.$message({
          message: '封禁成功！',
          type: 'success'
        })
      })
    },
    banUser() {
      this.dialogVisible1 = false
      const ban = {}
      ban.userId = this.userId
      ban.nums = this.nums
      ban.type = this.viewType
      user.reqBanUser(ban).then((res) => {
        this.$message({
          message: '封禁成功！',
          type: 'success'
        })
      })
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
          done()
        })
        .catch(_ => {
        })
    },
    handleCloseBan(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    onSubmit() {
      user.onSubmitUser(this.userInfo).then((res) => {
        this.$message({
          message: '添加成功！',
          type: 'success'
        })
        this.dialogVisible = false
        this.getUserList()
      })
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      const ids = []
      ids.push(row.id)
      user.handleDeleteUser(ids).then((res) => {
        this.$message({
          message: '删除成功！',
          type: 'success'
        })
        this.getUserList()
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    changeUserId(val) {
      this.userId = val
    },
    disableUser(val, userId) {
      this.userId = userId
      // eslint-disable-next-line eqeqeq
      if (val == 0) {
        this.relieveUser()
      } else {
        this.dialogVisible1 = true
      }
    },
    relieveUser() {
      console.log(this.userId)
      user.reqRelieveUser(this.userId).then((res) => {
        this.$message({
          message: '解除成功！',
          type: 'success'
        })
      })
    }
  }
}

function viewTypeContent(val) {
  if (val === 'house') {
    return '小时'
  }
  if (val === 'day') {
    return '天'
  }
  if (val === 'week') {
    return '星期'
  }
  if (val === 'month') {
    return '月'
  }
  if (val === 'year') {
    return '年'
  }
}
</script>

<style scoped>
.el-dropdown {
  vertical-align: top;
}

.el-dropdown + .el-dropdown {
  margin-left: 15px;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>
