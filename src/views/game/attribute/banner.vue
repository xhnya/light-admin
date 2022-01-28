<template>
  <div style="margin-left: 30px;margin-right: 30px;">
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
      >

        <el-table-column
          prop="name"
          label="游戏名称"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="轮播图"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="状态"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="180"
        ></el-table-column>
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
    </div>
  </div>
</template>

<script>
import game from '@/api/game'

export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getGameBannerList()
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    getGameBannerList() {
      game.getGameBannerList().then(({ data }) => {
        console.log(data)
        this.tableData = data.page.list
      })
    }
  }
}
</script>

<style scoped>

</style>
