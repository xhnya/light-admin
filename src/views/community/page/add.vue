<template>
  <div class="community-page-add">
    <div style="width: 75%;">
      <div style="margin-bottom: 30px;">
        <el-dropdown @command="changeType">
          <el-button type="primary">
            {{ typeName }}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="原创">原创</el-dropdown-item>
            <el-dropdown-item command="攻略">攻略</el-dropdown-item>
            <el-dropdown-item command="资讯">资讯</el-dropdown-item>
            <el-dropdown-item command="评测">评测</el-dropdown-item>
            <el-dropdown-item command="系统">系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-input style="width: 600px;" v-model="title" placeholder="请输入标题"></el-input>
      </div>
      <div style="margin-bottom: 30px;">
        <span>请选择分区:</span>
        <el-cascader
          v-model="value"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"
          filterable
        ></el-cascader>
        <el-upload
          class="upload-demo"
          :action="url"
          :on-success="addCover"
          :file-list="fileList"
          list-type="picture"
        >
          <el-button size="small" type="primary">上传封面</el-button>
        </el-upload>
      </div>
      <tinymce :height="600" v-model="content"></tinymce>
      <el-button @click="saveArticle" type="primary">立即创建</el-button>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import community from '@/api/community'

export default {
  components: {Tinymce},
  data() {
    return {
      content: `<h1 style="text-align: center;">Welcome to the light!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="https://exercise-xhn.oss-cn-beijing.aliyuncs.com/2021/12/10/99a3946b03b1433fa2cd6db0e1066c3bvae.jpg" alt="TinyMCE Logo" width="110" height="97" /><ul>
        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure light.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      </ul>`,
      value: '',
      title: '',
      options: [],
      typeName: '类型选择',
      parentId: 0,
      url: '',
      fileList: [],
      coverUrl: ''
    }
  },
  created() {
    this.getCascaderOptions()
    this.url = process.env.VUE_APP_BASE_API + 'cloud/oss/upload'
  },
  methods: {
    saveArticle() {
      const article = {}
      article.parentId = 1
      article.user = 1
      article.title = this.title
      article.content = this.content
      article.parentId = this.parentId
      if (this.typeName === '类型选择') {
        article.publishType = '原创'
      } else {
        article.publishType = this.typeName
      }
      if (this.coverUrl !== '') {
        article.coverImage = this.coverUrl
      }
      community.saveArticle(article).then((res) => {
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.$router.push({path: '/community/page'})
      })
    },
    handleChange(value) {
      this.parentId = value[1]
    },
    getCascaderOptions() {
      community.getCascaderOptionsData().then((res) => {
        this.options = res.data.result
      })
    },
    changeType(val) {
      this.typeName = val
    },
    addCover(response, file) {
      this.coverUrl = response.data.url
      this.$message({
        message: '上传成功',
        type: 'success'
      });

    }

  }
}
</script>

<style scoped>
.community-page-add {
  margin-left: 30px;
  margin-top: 30px;
}
</style>
