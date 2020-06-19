<template>
  <auth title="Connexion">
    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left">
        <b-icon icon="email" size="is-small" icon-size="mdi-24px" />
        <input class="input" type="email" placeholder="Email" />
      </div>
    </div>
    <div class="field">
      <label class="label">Mot de passe</label>
      <div class="control has-icons-left">
        <b-icon icon="lock" size="is-small" icon-size="mdi-24px" />
        <input class="input" type="password" placeholder="Mot de passe" />
      </div>
    </div>
    <div class="control">
      <button class="button is-primary">
        Connexion
      </button>
    </div>
  </auth>
</template>

<script>
import Auth from "~/components/Auth.vue"

export default {
  components: { Auth }
}
</script>
