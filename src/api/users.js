import request from '@/utils/request'

export default {
  getLevelList() {
    return request({
      url: '/user/level/list',
      method: 'get'
    })
  }
}
