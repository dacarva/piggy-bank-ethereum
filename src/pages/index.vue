<template>
  <div class="container">
    <loading :active.sync="loading" :is-full-page="true"></loading>
    <div>
      <Logo />
      <h1 class="title">The best Piggy Bank</h1>
      <div class="links">
        <button @click="getBalance()" class="button--green">Get Balance</button>
        <button @click="deposit()" class="button--grey">Deposit 1 ETH</button>
        <button @click="withdraw()" class="button--green">
          Withdraw Funds
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { mapGetters } from 'vuex'

export default {
  components: {
    Loading,
  },

  methods: {
    async loadWeb3() {
      try {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
          console.log('Ethereum intialized!')
        } else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        } else {
          window.alert(
            'Non-Ethereum browser detected. You should consider trying MetaMask!'
          )
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getBalance() {
      console.log('Request balance')
      try {
        const balance = await web3.eth.getBalance(this.piggyBank._address)
        console.log(
          '🚀 ~ file: index.vue ~ line 53 ~ getBalance ~ balance',
          web3.utils.fromWei(balance)
        )
      } catch (error) {
        console.error(error)
      }
    },
    async deposit() {
      console.log('Making a deposit')
      this.$store.commit('loading', true)
      try {
        await this.piggyBank.methods
          .deposit()
          .send({
            from: this.account,
            value: window.web3.utils.toWei('1', 'Ether'),
          })
          .once('receipt', (receipt) => {
            this.$store.commit('loading', false)
          })
      } catch (error) {
        console.error(error)
      }
    },
    async withdraw() {
      console.log('Withdrawing funds')

      this.$store.commit('loading', true)
      try {
        await this.piggyBank.methods.withdraw().send({ from: this.account })

        this.$store.commit('loading', false)
      } catch (error) {
        console.error(error)
      }
    },
  },

  computed: {
    ...mapGetters(['account', 'loading', 'piggyBank']),
  },

  async mounted() {
    await this.loadWeb3()
    await this.$store.dispatch('loadBlockchainData')
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
