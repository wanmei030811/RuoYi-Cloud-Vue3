import request from '@/utils/request'

// 查询字段列表
export function listField(query) {
  return request({
    url: '/customize/field/list',
    method: 'get',
    params: query
  })
}

// 查询字段详细
export function getField(fieldId) {
  return request({
    url: '/customize/field/' + fieldId,
    method: 'get'
  })
}

// 新增字段
export function addField(data) {
  return request({
    url: '/customize/field',
    method: 'post',
    data: data
  })
}

// 修改字段
export function updateField(data) {
  return request({
    url: '/customize/field',
    method: 'put',
    data: data
  })
}

// 删除字段
export function delField(fieldId) {
  return request({
    url: '/customize/field/' + fieldId,
    method: 'delete'
  })
}
