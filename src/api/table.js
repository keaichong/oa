import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

//获取用户接口（获取所有用户）
export function getUserListAll(type) {
  return request({
    url: `/getUserListAll/${type}`, 
    method: 'post'
  })
}
//根据type查询角色信息(无分页)
export function getRoleListsType(type) {
  return request({
    url: `/getRoleList/${type}`, 
    method: 'get'
  })
}
//查询菜单列表
export function getMenuListAll(type) {
  return request({
    url: `/getMenuList/${type}`, 
    method: 'get'
  })
}
//保存用户对应的菜单
export function saveUserMenus(userIDs, roleCode, companyCode) {
  return request({
    url: `/saveUserMenus/${userIDs}/${roleCode}/${companyCode}`, 
    method: 'post'
  })
}
//保存用户对应的角色
export function saveUserRoles(userIDs, roleCode, companyCode) {
  return request({
    url: `/saveUserRoles/${userIDs}/${roleCode}/${companyCode}`, 
    method: 'post'
  })
}
