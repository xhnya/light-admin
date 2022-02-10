<template>
  <div>
    <div class="user-level-body">
      <el-row :gutter="50">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>等级列表</span>
                <el-button @click="dialogVisible = true" style="float: right; padding: 3px 0" type="text">添加</el-button>
              </div>
              <div v-for="itme in levelList" :key="itme.id" class="text item user-level-card-text">
                {{ itme.levelName }}
                <el-button size="mini">修改</el-button>
                <el-button size="mini">删除</el-button>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>等级排行榜</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
              </div>
              <div v-for="o in 4" :key="o" class="text item">
                {{ '列表内容 ' + o }}
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="添加等级"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div> 等级名称:
        <el-input style="width:60%" v-model="level.levelName" placeholder="请输入内容"></el-input>
      </div>
      <div style="margin-top: 30px;">
        级别:
        <el-input-number v-model="level.levelSort" :min="1" label="描述文字"></el-input-number>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addLevels">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addLevel } from '@/api/user'
import user from '@/api/users'

export default {
  data() {
    return {
      level: {},
      dialogVisible: false,
      levelList: []
    }
  },
  created() {
    this.getLevelList()
  },
  methods: {
    getLevelList() {
      user.getLevelList().then((res) => {
        console.log(res)
        this.levelList = res.data.page.list
      })
    },
    addLevels() {
      addLevel(this.level).then((res) => {
        console.log(res)
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.dialogVisible = false
        this.level = {}
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    }
  }
}
</script>

<style scoped>
.user-level-body {
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 30px;
}

.user-level-card-text {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
