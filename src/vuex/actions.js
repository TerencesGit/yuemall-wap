export const changeLogin = ({ commit }, status) => {
	commit('CHANGE_LOGIN', status)
}
export const saveUserInfo = ({ commit }, userInfo) => {
	commit('SAVE_USERINFO', userInfo)
}
export const saveStoreInfo = ({ commit }, storeInfo) => {
	commit('SAVE_STOREINFO', storeInfo)
}
export const saveSelfInfo = ({ commit }, selfInfo) => {
	commit('SAVE_SELFINFO', selfInfo)
}
export const saveAddress = ({ commit }, address) => {
	commit('SAVE_ADDRESS', address)
}