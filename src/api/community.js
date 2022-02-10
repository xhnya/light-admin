import request from '@/utils/request'

export default {
  saveArticle(article) {
    return request({
      url: '/community/article/save',
      method: 'post',
      data: article
    })
  },
  getPageList(params) {
    return request({
      url: '/community/article/pageAdminList',
      method: 'get',
      params: params
    })
  }
}
