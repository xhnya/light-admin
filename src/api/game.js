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
  selectTagsList() {
    return request({
      url: '/game/tags/tagsList',
      method: 'get'
    })
  },
  addGameTags(tagsList) {
    return request({
      url: '/game/gametags/saveList',
      method: 'post',
      data: tagsList
    })
  },
  // ==============添加
  saveGamInfo(game) {
    return request({
      url: '/game/game/save',
      method: 'post',
      data: game
    })
  },
  uploadFile(game) {
    return request({
      url: '/game/game/update',
      method: 'post',
      data: game
    })
  },
  addGameBanner(banner) {
    return request({
      url: '/game/banner/save',
      method: 'post',
      data: banner
    })
  },
  addComputerConfig(computerConfig) {
    return request({
      url: '/game/computerconfig/save',
      method: 'post',
      data: computerConfig
    })
  },
  getGameList(page, limit) {
    return request({
      url: '/game/game/gameList',
      method: 'get'
      // params: {
      //   page: page,
      //   limit: limit
      // }
    })
  },
  getGameInfo(id) {
    return request({
      url: '/game/game/gameList',
      method: 'get'
    })
  },
  // 获取游戏的banner列表
  getGameBannerList(page, limit) {
    return request({
      url: '/game/banner/getGameBannerList',
      method: 'get',
      params: {
        page: page,
        limit: limit
      }
    })
  },
  getGameBannerUrl(id) {
    return request({
      url: '/game/banner/getGameBannerUrl',
      method: 'get',
      params: {
        id: id
      }
    })
  },
  changeBannerPage(page, limit, gameId) {
    return request({
      url: '/game/banner/getGameBannerUrlByGameId',
      method: 'get',
      params: {
        page: page,
        limit: limit,
        gameId: gameId
      }
    })
  },
  changeBannerUrl(banner) {
    return request({
      url: '/game/banner/update',
      method: 'post',
      data: banner
    })
  },
  addBannerImageUrl(banner) {
    return request({
      url: '/game/banner/save',
      method: 'post',
      data: banner
    })
  },
  deleteGameBanner(ids) {
    return request({
      url: '/game/banner/delete',
      method: 'post',
      data: ids
    })
  },
  gameListForSelect() {
    return request({
      url: '/game/game/gameListForSelect',
      method: 'get'
    })
  },
  addScore(score) {
    return request({
      url: '/game/score/save',
      method: 'post',
      data: score
    })
  },
  getScoreList(page, limit) {
    return request({
      url: '/game/score/list',
      method: 'get',
      params: {
        page: page,
        limit: limit
      }
    })
  }
}
