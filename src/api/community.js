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
  },
  addCommunityType(type) {
    return request({
      url: '/community/type/save',
      method: 'post',
      data: type
    })
  },
  getCommunityTypeList(params) {
    return request({
      url: '/community/type/list',
      method: 'get',
      params: params
    })
  }
}
