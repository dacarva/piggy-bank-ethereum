<template>
  <b-navbar fixed sticky toggleable="sm" type="dark" variant="dark">
    <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

    <b-collapse id="nav-text-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item @click="setPage('account')" :active="accountActive"
          >My Piggy</b-nav-item
        >
        <b-nav-item @click="setPage('deposit')" :active="depositActive"
          >Deposit</b-nav-item
        >
        <b-nav-item @click="setPage('contact')" :active="contactActive"
          >Contact</b-nav-item
        >
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    swap() {
      console.log('Account clicked')
    },
    setPage(page) {
      this.$store.commit('page', page)
      this.accountActive = false
      this.contactActive = false
      this.depositActive = false
      if (page === 'account') this.accountActive = true
      if (page === 'contact') this.contactActive = true
      if (page === 'deposit') this.depositActive = true
    },
  },
  data() {
    return {
      accountActive: true,
      contactActive: false,
      depositActive: false,
    }
  },
}
</script>