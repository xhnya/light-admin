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
  },
  getCommunityList(params) {
    return request({
      url: '/community/community/list',
      method: 'get',
      params: {
        page: params.page,
        limit: params.limit
      }
    })
  },
  getCascaderOptionsData() {
    return request({
      url: '/community/community/getCommunityCascader',
      method: 'get'
    })
  },
  addCommunityEntity(community) {
    return request({
      url: '/community/community/save',
      method: 'post',
      data: community
    })
  },
  deletePage(ids) {
    return request({
      url: '/community/article/delete',
      method: 'post',
      data: ids
    })
  },
  reqSelectPage() {
    return request({
      url: '/community/article/getSelectPage',
      method: 'get'
    })
  }
}
