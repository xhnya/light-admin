<template>
  <div>
    <div style="margin-left: 15%;margin-right: 15%;margin-top: 30px;">
      <el-steps :active="active">
        <el-step description="添加游戏基本信息" title="步骤 1" icon="el-icon-edit">
        </el-step>
        <el-step description="上传游戏相关文件" title="步骤 2" icon="el-icon-upload"></el-step>
        <el-step description="配置游戏其他信息" title="步骤 3" icon="el-icon-collection-tag"></el-step>
      </el-steps>
      <!--      第一步================-->
      <div v-if="active===1" style="margin-top: 30px;">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="游戏名称">
            <el-input style="width: 300px;" v-model="form.gameName"></el-input>
          </el-form-item>
          <el-form-item label="游戏别名">
            <el-input style="width: 300px;" v-model="form.gameNameChina"></el-input>
          </el-form-item>
          <el-form-item label="游戏类型">
            <el-select filterable v-model="form.gameType" placeholder="请输入游戏类型">
              <el-option
                v-for="type in gameTypeSelect"
                :key="type.id"
                :value="type.id"
                :label="type.typeName"
              ></el-option>
            </el-select>
            <el-tooltip
              style="margin-left: 5px;font-size: 20px;"
              class="item"
              effect="dark"
              content="可搜索"
              placement="top"
            >
              <i class="el-icon-info"></i>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="游戏制作商">
            <el-select filterable v-model="form.gameMaking" placeholder="请选择游戏制作商">
              <el-option
                v-for="item in gameMakingSelect"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="游戏发行商">
            <el-select filterable v-model="form.gameIssue" placeholder="请选择游戏发行商">
              <el-option
                v-for="item in gameIssueSelect"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="热门">
            <el-switch @change="changeIsHost" v-model="isHot"></el-switch>
          </el-form-item>
          <el-form-item label="发行日期">
            <el-date-picker
              v-model="form.releaseTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="价格">
            <el-input-number v-model="form.price" :precision="2" :step="1" :min="0" :max="100000000"></el-input-number>
          </el-form-item>
          <el-form-item label="游戏官网链接">
            <el-input v-model="form.website"></el-input>
          </el-form-item>
          <el-form-item label="游戏描述">
            <el-input type="textarea" v-model="form.gameDescribe"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import addGame from '@/api/game'

export default {
  data() {
    return {
      active: 1,
      form: {},
      gameTypeSelect: {},
      isHot: false,
      gameMakingSelect: {},
      gameIssueSelect: {},
      gameId: 0
    }
  },
  created() {
    this.getTypeList()
    this.getProductList()
  },
  methods: {
    onSubmit() {
      addGame.saveGamInfo(this.form).then((res) => {
        this.$message({
          message: '添加成功，请继续完善',
          type: 'success'
        })
        console.log(res)
        this.gameId = res.data.gameId
        this.$router.push({
          name: 'GameFile',
          params: {
            id: this.gameId
          }
        })
      })
    },
    getTypeList() {
      addGame.getTypeList().then((res) => {
        this.gameTypeSelect = res.data.page.list
      })
    },
    changeIsHost(val) {
      if (val === true) this.form.isHot = 1
      if (val === false) this.form.isHot = 0
    },
    getProductList() {
      addGame.getProductList().then((res) => {
        this.gameMakingSelect = res.data.page.list
        this.gameIssueSelect = res.data.page.list
      })
    }
  }
}
</script>

<style scoped>

</style>
