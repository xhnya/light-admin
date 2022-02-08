import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/index/rotation',
    name: 'AdminIndex',
    meta: { title: '管理', icon: 'el-icon-document' },
    children: [{
      path: 'index',
      name: 'AdminIndex',
      component: () => import('@/views/admin/index'),
      meta: { title: '页面管理', icon: 'el-icon-document' },
      children: [
        {
          path: 'rotation',
          name: 'GameRotation',
          component: () => import('@/views/admin/index/rotation'),
          meta: { title: '首页轮播图', icon: 'el-icon-picture' }
        }
      ]
    }]
  },
  {
    path: '/game',
    component: Layout,
    redirect: '/game/index',
    name: 'GameIndex',
    meta: { title: '游戏管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'GameIndex',
        component: () => import('@/views/game/game'),
        meta: { title: '游戏', icon: 'el-icon-coordinate' }
      },
      {
        path: 'info/:id',
        name: 'GameInfo',
        component: () => import('@/views/game/game/gameInfo.vue'),
        // meta: { title: '游戏', icon: 'el-icon-coordinate' }
        hidden: true
      },
      {
        path: 'add',
        name: 'GameAdd',
        component: () => import('@/views/game/game/add.vue'),
        // meta: { title: '游戏', icon: 'el-icon-coordinate' }
        hidden: true
      },
      {
        path: 'file',
        name: 'GameFile',
        component: () => import('@/views/game/game/file.vue'),
        // meta: { title: '游戏', icon: 'el-icon-coordinate' }
        hidden: true
      },
      {
        path: 'tags',
        name: 'GameTags',
        component: () => import('@/views/game/game/tags.vue'),
        // meta: { title: '游戏', icon: 'el-icon-coordinate' }
        hidden: true
      },
      {
        path: 'prize',
        name: 'GamePrize',
        component: () => import('@/views/game/prize'),
        meta: { title: '奖项', icon: 'el-icon-trophy' }
      },
      {
        path: 'attribute',
        name: 'GameAttribute',
        component: () => import('@/views/game/other'),
        meta: { title: '属性', icon: 'el-icon-more-outline' },
        children: [
          {
            path: 'banner',
            name: 'GameAttributeBanner',
            component: () => import('@/views/game/attribute/banner'),
            meta: { title: '游戏轮播图', icon: 'el-icon-picture-outline' }
          },
          {
            path: 'type',
            name: 'GameType',
            component: () => import('@/views/game/attribute/score'),
            meta: { title: '游戏评分', icon: 'el-icon-star-on' }
          },
          {
            path: 'tags',
            name: 'GameTags',
            component: () => import('@/views/game/other/tags'),
            meta: { title: '游戏标签', icon: 'el-icon-collection-tag' }
          }
        ]
      },
      {
        path: 'other',
        name: 'GameOther',
        component: () => import('@/views/game/other'),
        meta: { title: '其他', icon: 'el-icon-menu' },
        children: [
          {
            path: 'product',
            name: 'GameOtherProduct',
            component: () => import('@/views/game/other/producers'),
            meta: { title: '游戏厂商', icon: 'el-icon-office-building' }
          },
          {
            path: 'type',
            name: 'GameType',
            component: () => import('@/views/game/other/type'),
            meta: { title: '游戏类型', icon: 'el-icon-folder' }
          },
          {
            path: 'tags',
            name: 'GameTags',
            component: () => import('@/views/game/other/tags'),
            meta: { title: '游戏标签', icon: 'el-icon-collection-tag' }
          }
        ]
      }
    ]
  },
  {
    path: '/community',
    component: Layout,
    redirect: '/community/index',
    name: 'Community',
    meta: { title: '社区管理', icon: 'el-icon-house' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
