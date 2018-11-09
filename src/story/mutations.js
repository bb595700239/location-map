import * as types from './mutation-types.js'

export default {

  //设置滚动条位置
  [types.SET_POSITION](state, routeName) {
    state.arrPageName=routeName
    for(const attr in state.position){
      if(routeName==attr){
        for(const item in state.position[attr]){
          state.position[attr][item].scroller.scrollTop = state.position[attr][item].top
        }

      }
    }
  },
  //设置滚动条位置
  [types.SAVE_PAGE](state,scroller) {
    let target = scroller.target
    let ref = scroller.ref
    if(!state.position[state.arrPageName]){
      state.position[state.arrPageName] = {}
    }
    state.position[state.arrPageName][ref]={top: target.scrollTop, scroller: target}

  }

}
