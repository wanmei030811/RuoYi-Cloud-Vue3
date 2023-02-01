import request from '@/utils/request'

// 查询系统列表
export function listSystems(query) {
  return request({
    url: '/customize/systems/list',
    method: 'get',
    params: query
  })
}

// 查询系统详细
export function getSystems(systemId) {
  return request({
    url: '/customize/systems/' + systemId,
    method: 'get'
  })
}

// 新增系统
export function addSystems(data) {
  return request({
    url: '/customize/systems',
    method: 'post',
    data: data
  })
}

// 修改系统
export function updateSystems(data) {
  return request({
    url: '/customize/systems',
    method: 'put',
    data: data
  })
}

// 删除系统
export function delSystems(systemId) {
  return request({
    url: '/customize/systems/' + systemId,
    method: 'delete'
  })
}
