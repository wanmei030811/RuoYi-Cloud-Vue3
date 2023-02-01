import request from '@/utils/request'

// 查询字典类型列表
export function listType(query) {
  return request({
    url: '/customize/type/list',
    method: 'get',
    params: query
  })
}

// 查询字典类型详细
export function getType(dictId) {
  return request({
    url: '/customize/type/' + dictId,
    method: 'get'
  })
}

// 新增字典类型
export function addType(data) {
  return request({
    url: '/customize/type',
    method: 'post',
    data: data
  })
}

// 修改字典类型
export function updateType(data) {
  return request({
    url: '/customize/type',
    method: 'put',
    data: data
  })
}

// 删除字典类型
export function delType(dictId) {
  return request({
    url: '/customize/type/' + dictId,
    method: 'delete'
  })
}
