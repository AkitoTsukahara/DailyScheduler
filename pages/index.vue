<template>
  <Calendar />
</template>
<script>
import Calendar from '@/components/Calendar'
export default {
  name: 'TOP',
  components: {
    Calendar
  },
  methods: {
    signOut: function(err) {
      this.$store
        .dispatch('signOut')
        .then(() => {
          this.$router.push({
            name: 'login'
          })
        })
        .catch((err) => {
          alert(err.message)
        })
    }
  }
}
</script>