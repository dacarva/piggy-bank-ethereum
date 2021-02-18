import Web3 from 'web3'
import PiggyBank from '~/abis/PiggyBank.json'

const actions = {
  async loadBlockchainData({ commit }) {
    const web3 = window.web3
    commit('loading', true)

    //Load accounts
    try {
      const accounts = await web3.eth.getAccounts()
      commit('account', accounts[0])
      //Network ID
      const networkId = await web3.eth.net.getId()
      const networkData = PiggyBank.networks[networkId]

      if (networkData) {
        const piggyBank = new web3.eth.Contract(
          PiggyBank.abi,
          networkData.address
        )
        commit('piggyBank', piggyBank)
        commit('loading', false)
      } else {
        window.alert('SocialNetwork contract not deployed to detected network')
      }
    } catch (error) {
      console.error(error)
    }
  },
}

export default actions
