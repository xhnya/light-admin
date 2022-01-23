<template>
  <div>
    <div style="margin-left: 15%;margin-right: 15%;margin-top: 30px;">

      <el-steps :active="3">
        <el-step description="添加游戏基本信息" title="步骤 1" icon="el-icon-edit">
        </el-step>
        <el-step description="上传游戏相关文件" title="步骤 2" icon="el-icon-upload"></el-step>
        <el-step description="配置游戏其他信息" title="步骤 3" icon="el-icon-collection-tag"></el-step>
      </el-steps>
      <el-button @click="next" style="margin-top: 30px;" type="primary">完成</el-button>
      <div style="margin-top: 30px;">
        <el-card>
          <span>选择游戏类型：</span>
          <el-select @change="testChange" style="width: 80%" v-model="value1" multiple filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.tagName"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-button @click="addGameTags" type="primary">确定</el-button>
        </el-card>

        <el-tabs style="margin-top: 30px;" type="border-card">
          <el-tab-pane label="最低配置">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="操作系统">
                <el-input v-model="form.systemOs"></el-input>
              </el-form-item>
              <el-form-item label="CPU">
                <el-input v-model="form.computerCpu"></el-input>
              </el-form-item>
              <el-form-item label="内存">
                <el-input v-model="form.computerRam"></el-input>
              </el-form-item>
              <el-form-item label="显卡">
                <el-input v-model="form.computerVram"></el-input>
              </el-form-item>
              <el-form-item label="硬盘">
                <el-input v-model="form.computerHard"></el-input>
              </el-form-item>
              <el-form-item label="网络">
                <el-input v-model="form.computerNetwork"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit(0)">立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="推荐配置">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="操作系统">
                <el-input v-model="form.systemOs"></el-input>
              </el-form-item>
              <el-form-item label="CPU">
                <el-input v-model="form.computerCpu"></el-input>
              </el-form-item>
              <el-form-item label="内存">
                <el-input v-model="form.computerRam"></el-input>
              </el-form-item>
              <el-form-item label="显卡">
                <el-input v-model="form.computerVram"></el-input>
              </el-form-item>
              <el-form-item label="硬盘">
                <el-input v-model="form.computerHard"></el-input>
              </el-form-item>
              <el-form-item label="网络">
                <el-input v-model="form.computerNetwork"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit(1)">立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import game from '@/api/game'

export default {
  data() {
    return {
      options: [],
      value1: [],
      gameId: 0,
      form: {
        type: 0,
        computerNetwork: '',
        computerCpu: '',
        computerHard: '',
        computerVram: '',
        computerRam: '',
        systemOs: '',
        gameId: 0
      }
    }
  },
  created() {
    this.selectTagsList()
    this.gameId = this.$route.params.id
  },
  methods: {
    next() {
      this.$router.push({ path: '/game/index' })
    },
    selectTagsList() {
      game.selectTagsList().then((res) => {
        this.options = res.data.list
      })
    },
    testChange() {
      console.log(this.value1)
    },
    addGameTags() {
      const tagsList = {}
      tagsList.gameId = this.gameId
      tagsList.tagsList = this.value1
      game.addGameTags(tagsList).then((res) => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.value1 = []
      })
    },
    onSubmit(val) {
      this.form.type = val
      this.form.gameId = this.gameId
      game.addComputerConfig(this.form).then((res) => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.form = {}
      })
    }
  }
}
</script>

<style scoped>

</style>
