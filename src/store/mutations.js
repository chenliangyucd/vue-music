import * as types from './mutation-types';

const mutations = {
  [types.SET_SINGER] (state, { singer }) {
    console.info('打印传入进来的singer');
    console.info(singer);
    state.singer = singer;
  }
};

export default mutations;
