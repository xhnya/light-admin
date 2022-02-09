<template>
  <div class="community-page-add">
    <div style="width: 75%;">
      <div style="margin-bottom: 30px;">
        <span>请输入标题:</span>
        <el-input style="width: 600px;" v-model="title" placeholder="请输入内容"></el-input>
      </div>
      <div style="margin-bottom: 30px;">
        <span>请选择游戏分区:</span>
        <el-select v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
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
      content: `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="https://exercise-xhn.oss-cn-beijing.aliyuncs.com/2021/12/10/99a3946b03b1433fa2cd6db0e1066c3bvae.jpg" alt="TinyMCE Logo" width="110" height="97" /><ul>
        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      </ul>`,
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      value: '',
      title: ''
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
