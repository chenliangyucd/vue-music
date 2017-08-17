import jsonp from 'common/js/jsonp';
import axios from 'axios';
import {commonParams, options} from './config';

export function getSliderList () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  });

  return jsonp(url, data, options);
}

// 有的接口不能直接调用,
export function getRecommendList () {
  const url = '/api/getRecommendList';

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  });

  return axios({
    method: 'get',
    params: data,
    url: url,
    responseType: 'json'
  }).then((response) => {
    return response.data;
  });
}
