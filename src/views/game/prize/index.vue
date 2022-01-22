<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      action="http://localhost:88/api/cloud/oss/upload"
      :on-success="getBannerUrl"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: ''
    }
  },
  methods: {
    getBannerUrl(response, file) {
      console.log(response.data.url)
      this.url = response.data.url
    }
  }
}
</script>

<style scoped>

</style>
