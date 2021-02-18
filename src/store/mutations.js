const mutations = {
  account(state, account) {
    state.account = account
  },
  loading(state, loading) {
    state.loading = loading
  },
  piggyBank(state, piggyBank) {
    state.piggyBank = piggyBank
  },
  page(state, page) {
    state.page = page
  },
  isOwner(state, isOwner) {
    state.isOwner = isOwner
  },
}

export default mutations
