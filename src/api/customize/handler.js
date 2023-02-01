import request from '@/utils/request'

// 查询操作列表
export function listHandler(query) {
  return request({
    url: '/customize/handler/list',
    method: 'get',
    params: query
  })
}

// 查询操作详细
export function getHandler(handlerId) {
  return request({
    url: '/customize/handler/' + handlerId,
    method: 'get'
  })
}

// 新增操作
export function addHandler(data) {
  return request({
    url: '/customize/handler',
    method: 'post',
    data: data
  })
}

// 修改操作
export function updateHandler(data) {
  return request({
    url: '/customize/handler',
    method: 'put',
    data: data
  })
}

// 删除操作
export function delHandler(handlerId) {
  return request({
    url: '/customize/handler/' + handlerId,
    method: 'delete'
  })
}
