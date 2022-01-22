<template>
  <div>
    <div style="width: 80%;margin-left: 50px;">
      <div style="margin-top: 30px;">
        <el-button @click="toAddGame" type="primary">添加游戏</el-button>
        <el-input
          placeholder="请输入名字"
          v-model="searchName"
          style="width: 300px;margin-left: 10px;"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button type="primary" @click="submitGameInfo" icon="el-icon-search">搜索</el-button>
        <el-button plain @click="submitGameInfo">重置</el-button>
      </div>

      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="80%"
      >
        <el-table-column
          fixed
          prop="date"
          label="日期"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="province"
          label="省份"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="city"
          label="市区"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="300"
        >
        </el-table-column>
        <el-table-column
          prop="zip"
          label="邮编"
          width="120"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
      dialogFormVisible: false,
      searchName: ''
    }
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    submitGameInfo() {
      console.log('====')
    },
    toAddGame() {
      this.$router.push({ path: '/game/add' })
    }

  }
}
</script>

<style scoped>

</style>
