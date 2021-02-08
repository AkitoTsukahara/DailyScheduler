<template>
    <header class="top-0 bg-lightblue w-full h-16 py-4 z-10">
      <div class="relative flex justify-between w-full">
        <h1 class="text-2xl font-semibold">DAILY SCHEDULER</h1>
        <div class="flex w-64 justify-between">
          <nuxt-link to="/login">ログイン</nuxt-link>
          <nuxt-link to="/register">新規登録</nuxt-link>
          <a @click="signOut">ログアウト</a>
        </div>
      </div>
    </header>
</template>
<script>
export default {
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