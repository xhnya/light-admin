import request from '@/utils/request'

export default {
  getBannerList() {
    return request({
      url: '/admin/banner/list',
      method: 'post'
    })
  },
  addBanner(banner) {
    return request({
      url: '/admin/banner/save',
      method: 'post',
      data: banner
    })
  }
}
