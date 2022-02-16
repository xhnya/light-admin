<template>
  <div class="community-page-add">
    <div style="width: 75%;">
      <div style="margin-bottom: 30px;">
        <span>请输入标题:</span>
        <el-input style="width: 600px;" v-model="title" placeholder="请输入内容"></el-input>
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
  components: { Tinymce },
  data() {
    return {
      content: `<h1 style="text-align: center;">Welcome to the light!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="https://exercise-xhn.oss-cn-beijing.aliyuncs.com/2021/12/10/99a3946b03b1433fa2cd6db0e1066c3bvae.jpg" alt="TinyMCE Logo" width="110" height="97" /><ul>
        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure light.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      </ul>`,
      value: '',
      title: '',
      options: []
    }
  },
  methods: {
    saveArticle() {
      const article = {}
      article.parentId = 1
      article.user = 1
      article.title = this.title
      article.content = this.content
      community.saveArticle(article).then((res) => {
        console.log(res)
      })
    },
    handleChange(value) {
      console.log(value)
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
