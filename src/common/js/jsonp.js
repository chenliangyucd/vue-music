import originJsonp from 'jsonp';

function dataParam (data) {
  let params = '';
  for (let key in data) {
    let value = data[key];
    params += `&${key}=${value}`;
  }
  console.log('打印params: ', params);
  return params.substring(1);
}
// jsonp统一封装调用。
export default function (url, data, opts) {
  url = url.indexOf('?') !== -1 ? url : url + '?';
  url += dataParam(data);
  return new Promise(function (resolve, reject) {
    originJsonp(url, opts, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
