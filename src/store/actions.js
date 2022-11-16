// 给action注册事件处理函数。当这个函数被触发时候，将状态提交到mutations中处理
// export function modifyAName({ commit }, name) {
//     return commit("modifyAName", name);
// }
// export function modifyBName({ commit }, name) {
//     return commit("modifyBName", name);
// }

export function addStudent({ commit }, user) {
    return commit("addStudent", user);
}

export function updateStudent({ commit }, user) {
    return commit("updateStudent", user);
}

export function delStudent({ commit }, user) {
    return commit("delStudent", user);
}


export function addBooking({ commit }, booking) {
    return commit("addBooking", booking);
}

export function delBooking({ commit }, booking) {
    return commit("delBooking", booking);
}