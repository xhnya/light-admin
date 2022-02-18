import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/admin/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/user/info',
    method: 'get',
    params: {token}
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function addLevel(level) {
  return request({
    url: '/user/level/save',
    method: 'post',
    data: level
  })
}
