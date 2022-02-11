import request from '@/utils/request'

export default {
  getBannerList(page, limit, params, searchName) {
    return request({
      url: '/admin/banner/list',
      method: 'get',
      params: {
        page: page,
        limit: limit,
        start: params,
        name: searchName
      }
    })
  },
  addBanner(banner) {
    return request({
      url: '/admin/banner/save',
      method: 'post',
      data: banner
    })
  },
  changeBanner(banner) {
    return request({
      url: '/admin/banner/update',
      method: 'post',
      data: banner
    })
  },
  deleteBanner(ids) {
    return request({
      url: '/admin/banner/delete',
      method: 'post',
      data: ids
    })
  }
}
