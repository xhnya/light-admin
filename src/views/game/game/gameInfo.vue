<template>
  <div>
    <div class="gameinfo-body">

      <el-card>
        <el-page-header @back="goBack" content="游戏详情">
        </el-page-header>
      </el-card>
      <el-card class="game-info-card111">
        <el-descriptions class="margin-top" :column="3">
          <el-descriptions-item label="游戏id"></el-descriptions-item>
          <el-descriptions-item label="游戏名称"></el-descriptions-item>
          <el-descriptions-item label="类型">角色扮演</el-descriptions-item>
          <el-descriptions-item label="制作">角色扮演</el-descriptions-item>
          <el-descriptions-item label="发行">角色扮演</el-descriptions-item>
          <el-descriptions-item label="发行时间">角色扮演</el-descriptions-item>
          <el-descriptions-item label="本站评分">角色扮演</el-descriptions-item>
          <el-descriptions-item label="本站玩家评分">角色扮演</el-descriptions-item>
          <el-descriptions-item label="官网链接">角色扮演</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card class="game-info-card111">
        <div slot="header" class="clearfix">
          <span>游戏描述</span>
        </div>
        <div>
          《荒野大镖客2(Red Dead Redemption 2)》是由Rockstar Games制作发行的一款开放世界动作冒险类游戏，
          是人气游戏《荒野大镖客》的最新续作。本作讲述在美国无情的蛮荒大地上绽放出的生命诗篇。
          游戏庞大又细腻的世界，也将是全新多人游戏模式体验的最佳舞台。
        </div>
      </el-card>
      <!--      TODO: 图表显示,统计游戏数据-->
      <el-card class="game-info-card111">
        <LineMarker style="width: 500px;height: 300px;" ref="Chart"/>
      </el-card>
      <el-card class="game-info-card111">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">背景图</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">封面图</div>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import game from '@/api/game.js'
import LineMarker from '@/components/Charts/LineMarker'

export default {
  data() {
    return {
      gameInfo: {}
    }
  },
  components: {
    LineMarker
  },
  created() {
    this.getGameInfo()
  },
  methods: {
    goBack() {
      this.$router.push({path: '/game/index'})
    },
    getGameInfo() {
      game.getGameInfo(this.$route.params.id).then((res) => {

      })
    },
  }
}
</script>

<style scoped>
.gameinfo-body {
  margin-top: 30px;
  margin-left: 15%;
  margin-right: 15%;
}

.game-info-card111 {
  margin-top: 30px;
}
</style>
