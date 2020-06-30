<template>
  <auth title="Connexion">
    <p v-if="err" class="p has-text-danger">
      {{ err }}
    </p>
    <form @submit.prevent="userLogin">
      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left">
          <b-icon icon="email" size="is-small" icon-size="mdi-24px" />
          <input
            v-model="login.username"
            class="input"
            type="email"
            placeholder="Email"
            required
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Mot de passe</label>
        <div class="control has-icons-left">
          <b-icon icon="lock" size="is-small" icon-size="mdi-24px" />
          <input
            v-model="login.password"
            class="input"
            type="password"
            placeholder="Mot de passe"
            required
          />
        </div>
      </div>
      <div class="control">
        <button class="button is-primary" type="submit">
          Connexion
        </button>
      </div>
    </form>
    <p class="p">
      Vous ne possédez pas encore de compte ?
      <nuxt-link to="/register">
        Inscrivez-vous !
      </nuxt-link>
    </p>
  </auth>
</template>

<script>
import Auth from "~/components/Auth.vue"

export default {
  components: { Auth },
  transition: "fade",
  data() {
    return {
      login: {
        username: "",
        password: ""
      },
      err: null
    }
  },
  methods: {
    async userLogin() {
      this.err = null
      try {
        await this.$auth.loginWith("local", {
          data: this.login
        })
      } catch (err) {
        this.err = err
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.p {
  margin-top: 0.5rem;
}
</style>
