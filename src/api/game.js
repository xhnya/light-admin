import request from '@/utils/request'

export default {
  // 游戏产商=======================
  getProductList(page, limit) {
    return request({
      url: '/game/produce/list',
      method: 'get',
      params: {
        page: page,
        limit: limit
      }
    })
  },
  addProduct(gameProduce) {
    return request({
      url: '/game/produce/save',
      method: 'post',
      data: gameProduce
    })
  },
  changeProduct(gameProduce) {
    return request({
      url: '/game/produce/update',
      method: 'post',
      data: gameProduce
    })
  },
  deleteProduct(ids) {
    return request({
      url: '/game/produce/delete',
      method: 'delete',
      data: ids
    })
  },
  // 游戏类型=======================
  getTypeList(page, limit) {
    return request({
      url: '/game/type/list',
      method: 'get',
      params: {
        page: page,
        limit: limit
      }
    })
  },
  addType(type) {
    return request({
      url: '/game/type/save',
      method: 'post',
      data: type
    })
  },
  changeType(type) {
    return request({
      url: '/game/type/update',
      method: 'post',
      data: type
    })
  },
  deleteType(ids) {
    return request({
      url: '/game/type/delete',
      method: 'delete',
      data: ids
    })
  },
  // 标签=======================
  getTagsList(page, limit) {
    return request({
      url: '/game/tags/list',
      method: 'get',
      params: {
        page: page,
        limit: limit
      }
    })
  },
  addTags(tags) {
    return request({
      url: '/game/tags/save',
      method: 'post',
      data: tags
    })
  },
  changeTags(tags) {
    return request({
      url: '/game/tags/update',
      method: 'post',
      data: tags
    })
  },
  deleteTags(ids) {
    return request({
      url: '/game/tags/delete',
      method: 'delete',
      data: ids
    })
  },
  // ==============添加
  saveGamInfo(game) {
    return request({
      url: '/game/game/save',
      method: 'post',
      data: game
    })
  }
}
