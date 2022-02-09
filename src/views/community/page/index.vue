<template>
  <div class="community-page-body">
    <div>
      <el-button @click="gotoAddPage" type="primary">添加</el-button>
    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {}
  },
  methods: {
    gotoAddPage() {
      this.$router.push({ path: '/community/add' })
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
