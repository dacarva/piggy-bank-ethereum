<template>
  <div>
    <h1 class="title">My Crypto Piggy Bank</h1>

    <img class="piggy-image" src="piggy-bank.jpg" alt="A piggy bank" />
    <div class="links">
      <div v-if="!isOwner">
        <p>You don't have a crypto piggy bank :(</p>
        <button @click="createPiggy()" class="button--grey">Get Yours!</button>
      </div>
      <div v-else>
        <p>
          Your current balance is:
          <span class="balance">{{ balance }}</span> ETH
        </p>
        <button @click="getBalance()" class="button--grey">
          Update Balance
        </button>
        <button @click="withdraw()" class="button--green">
          Withdraw Funds
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      balance: undefined,
    }
  },
  methods: {
    createPiggy() {
      this.$store.commit('page', 'contact')
    },
    async getBalance() {
      console.log('Request balance')
      this.$store.commit('loading', true)
      try {
        const balance = await web3.eth.getBalance(this.piggyBank._address)
        this.balance = web3.utils.fromWei(balance).toString()
      } catch (error) {
        console.error(error)
      }
      this.$store.commit('loading', false)
    },
    async withdraw() {
      console.log('Withdrawing funds')
      if (this.isOwner) {
        this.$store.commit('loading', true)
        try {
          await this.getBalance()
          if (this.balance !== '0') {
            await this.piggyBank.methods.withdraw().send({ from: this.account })
            window.alert(
              `${this.balance} ETH have been transferred to your account!`
            )
          } else {
            window.alert("'You don't have funds to withdraw")
          }

          this.$store.commit('loading', false)
        } catch (error) {
          this.$store.commit('loading', false)
          console.error(error)
          window.alert(error.message)
        }
      } else {
        window.alert(
          'You are not the owner address. You cannot withdraw these funds'
        )
      }
    },
  },

  computed: {
    ...mapGetters(['account', 'loading', 'piggyBank', 'isOwner']),
  },
  async created() {},
  async mounted() {
    await this.getBalance()
  },
}
</script>

<style scoped>
.piggy-image {
  animation: 1s appear;
  margin: auto;
}

.balance {
  color: crimson;
}
</style>