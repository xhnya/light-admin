import request from '@/utils/request'

export default {
  getLevelList() {
    return request({
      url: '/user/level/list',
      method: 'get'
    })
  },
  onSubmitUser(user) {
    return request({
      url: '/user/user/save',
      method: 'post',
      data: user
    })
  },
  getUserList(user) {
    return request({
      url: '/user/user/list',
      method: 'get',
      params: {
        page: user.page,
        limit: user.limit
      }
    })
  },
  handleDeleteUser(ids) {
    return request({
      url: '/user/user/delete',
      method: 'post',
      data: ids
    })
  }
}
