<template>
  <div>
    <div class="gameinfo-body">

      <el-card>
        <el-page-header @back="goBack" content="游戏详情">
        </el-page-header>
      </el-card>
      <el-card style="margin-top: 30px;">
        <el-descriptions class="margin-top" :column="3">
          <el-descriptions-item label="游戏id">{{ }}</el-descriptions-item>
          <el-descriptions-item label="游戏名称">18100000000</el-descriptions-item>
          <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
          <el-descriptions-item label="游戏详情">
            <el-tag size="small">学校</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
  </div>
</template>

<script>
import game from '@/api/game.js'

export default {
  data() {
    return {
      gameInfo: {}
    }
  },
  created() {
    this.getGameInfo()
  },
  methods: {
    goBack() {
      this.$router.push({ path: '/game/index' })
    },
    getGameInfo() {
      game.getGameInfo(this.$route.params.id).then((res) => {

      })
    }
  }
}
</script>

<style scoped>
.gameinfo-body {
  margin-top: 30px;
  margin-left: 15%;
  margin-right: 15%;
}
</style>
