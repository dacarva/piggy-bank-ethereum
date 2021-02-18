<template>
  <div>
    <h1 class="title">Contact Us</h1>

    <!-- <img class="deposit-image" src="deposit.jpg" alt="A piggy bank" /> -->
    <div>
      <b-form @submit.prevent="submit()">
        <div class="form-row">
          <b-form-group
            id="input-group-1"
            label="Name"
            label-for="input-1"
            class="col"
          >
            <b-form-input
              id="input-1"
              placeholder="John Doe"
              v-model="form.name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Email"
            label-for="input-2"
            class="col"
          >
            <b-form-input
              id="input-2"
              placeholder="john@company.com"
              type="email"
              v-model="form.email"
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <b-form-group
          id="input-group-3"
          label="Your message"
          label-for="input-3"
          class="col"
        >
          <b-textarea
            id="input-3"
            placeholder="Your message"
            rows="4"
            v-model="form.message"
            required
          ></b-textarea>
        </b-form-group>

        <button class="button--green">Send message</button>
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
        name: '',
        email: '',
        message: '',
      },
    }
  },
  methods: {
    async submit() {
      console.log('Sending form', this.form)
    },
    computed: {
      ...mapGetters(['account', 'loading', 'piggyBank', 'isOwner']),
    },
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