import request from '@/utils/request'

// 查询回调列表
export function listBack(query) {
  return request({
    url: '/customize/back/list',
    method: 'get',
    params: query
  })
}

// 查询回调详细
export function getBack(callBackId) {
  return request({
    url: '/customize/back/' + callBackId,
    method: 'get'
  })
}

// 新增回调
export function addBack(data) {
  return request({
    url: '/customize/back',
    method: 'post',
    data: data
  })
}

// 修改回调
export function updateBack(data) {
  return request({
    url: '/customize/back',
    method: 'put',
    data: data
  })
}

// 删除回调
export function delBack(callBackId) {
  return request({
    url: '/customize/back/' + callBackId,
    method: 'delete'
  })
}
