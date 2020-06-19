<template>
  <section class="hero is-primary is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div v-for="(g, i) in games" :key="i" class="column">
            <nuxt-link :to="g.page">
              <div class="card game">
                <div class="card-content">
                  <div class="content is-flex is-flex-column is-centered">
                    <b-icon
                      :icon="g.icon"
                      size="is-large"
                      icon-size="mdi-48px"
                    />
                    <p class="card-header-title is-size-4 is-centered">
                      {{ g.name }}
                    </p>
                  </div>
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      games: {
        shortestPath: {
          name: "Chemin le plus court",
          icon: "map-marker-path",
          page: "/shortest-path"
        },
        pathCoount: {
          name: "Nombre de chemins",
          icon: "routes",
          page: "/path-count"
        },
        baguenaudier: {
          name: "Baguenaudier",
          icon: "animation",
          page: "/baguenaudier"
        }
      }
    }
  }
}
</script>

<style lang="scss">
.game {
  .icon {
    width: 6rem;
    height: 6rem;
    .mdi:before {
      font-size: 6rem !important;
    }
  }

  &:hover {
    cursor: pointer;
    background-color: $light;
  }
}
</style>
