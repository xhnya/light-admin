<template>
  <div>
    <div style="margin-right: 15%;margin-left: 15%;">
      <el-card>
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8}"
          placeholder="请输入内容"
          v-model="textarea"
        >
        </el-input>
        <el-button @click="pushEmail" type="primary">开始</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import admin from '@/api/admin'
export default {
  data() {
    return {
      textarea: ''
    }
  },
  methods: {
    pushEmail() {
      admin.reqPushEmail(this.textarea).then((res) => {
        this.$message({
          message: '推送成功',
          type: 'success'
        })
      })

    }
  }
}
</script>

<style scoped>

</style>
