<template>
  <div>
    <h1 class="title">Deposit</h1>

    <img class="deposit-image" src="deposit.jpg" alt="A piggy bank" />
    <div>
      <b-form @submit.prevent="deposit()">
        <div class="form-row">
          <b-form-group
            id="input-group-1"
            label="Your Address"
            label-for="input-1"
            class="col"
          >
            <b-form-input
              id="input-1"
              :placeholder="account"
              disabled
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Piggy Bank Address"
            label-for="input-2"
            class="col"
          >
            <b-form-input
              id="input-2"
              :placeholder="piggyBank._address"
              disabled
            ></b-form-input>
          </b-form-group>
        </div>

        <b-form-group
          id="input-group-3"
          label="Amount in ETH"
          label-for="input-3"
          class="col"
        >
          <b-form-input
            id="input-3"
            v-model="form.amount"
            placeholder="1.0"
            required
          ></b-form-input>
        </b-form-group>

        <button class="button--green">Deposit {{ form.amount }} ETH</button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      form: {
        amount: 0,
      },
    }
  },
  methods: {
    async getBalance() {
      console.log('Request balance')
      try {
        const balance = await web3.eth.getBalance(this.piggyBank._address)
        const balanceStr = web3.utils.fromWei(balance).toString()
        console.log(
          '🚀 ~ file: index.vue ~ line 53 ~ getBalance ~ balance',
          balanceStr
        )
        if (balanceStr !== '0') {
          window.alert(`The piggy bank has ${balanceStr} ETH`)
        } else window.alert('There are funds in this piggy bank :(')
        return balanceStr
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
            value: window.web3.utils.toWei(
              this.form.amount.toString(),
              'Ether'
            ),
          })
          .once('receipt', (receipt) => {
            this.$store.commit('loading', false)
            window.alert(`Successfull deposit of ${this.form.amount} ETH`)
          })
      } catch (error) {
        this.$store.commit('loading', false)
        window.alert('Error in the deposit')

        console.error(error)
      }
    },
  },
  computed: {
    ...mapGetters(['account', 'loading', 'piggyBank', 'isOwner']),
  },
}
</script>

<style scoped>
.deposit-image {
  animation: 1s appear;
  margin: auto;
  max-width: 600px;
}
</style>