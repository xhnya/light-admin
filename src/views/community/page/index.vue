<template>
  <div class="community-page-body">
    <div>
      <el-button @click="gotoAddPage" type="primary">添加</el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="社区"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="发布人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="点击量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="标签">
        </el-table-column>
        <el-table-column
          prop="address"
          label="发布时间">
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
    </div>
  </div>
</template>

<script>
import community from '@/api/community'

export default {

  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    }
  },
  created() {
    this.getPageList()
  },
  methods: {
    gotoAddPage() {
      this.$router.push({path: '/community/add'})
    },
    getPageList() {
      const params = {}
      params.page = 1
      community.getPageList(params).then((res) => {
        console.log(res)
      })
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
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
