<template>
  <div class="index">
    <v-container
      fluid
      grid-list-md
    >
      <v-layout row wrap>
        <v-flex
          v-for="card in cards"
          v-bind="{
            [`xs${card.flexXs}`]: true,
            [`sm${card.flexSm}`]: true
          }"
          :key="card.title"
        >
          <v-card>
            <router-link :to="`/item/${card.id}`">
              <v-card-media
                :src="card.src"
                height="200px"
              >
                <v-container
                  fill-height
                  fluid
                  pa-2
                >
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span class="headline white--text" v-text="card.title"></span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
            </router-link>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>favorite</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>bookmark</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>share</v-icon>
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-footer fixed height="102">
      <v-btn
        absolute
        dark
        fab
        top
        right
        color="teal"
        @click.stop="dialog = true"
      >
        <v-icon>add</v-icon>
      </v-btn>

      <v-bottom-nav
        :active.sync="bottomNav"
        :value="true"
        absolute
        color="transparent"
      >
        <v-btn
          color="teal"
          flat
          value="recent"
          @click="syncHeader('recent')"
        >
          <span>Recent</span>
          <v-icon>history</v-icon>
        </v-btn>

        <v-btn
          color="teal"
          flat
          value="favorites"
          @click="syncHeader('favorites')"
        >
          <span>Favorites</span>
          <v-icon>favorite</v-icon>
        </v-btn>

        <v-btn
          color="teal"
          flat
          value="nearby"
          @click="syncHeader('nearby')"
        >
          <span>Nearby</span>
          <v-icon>place</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-footer>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog = false">Save</v-btn>
          </v-toolbar-items>
          <v-menu bottom right offset-y>
            <v-btn slot="activator" dark icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="(item, i) in items" :key="i" @click="">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-toolbar>
        <v-card-text>
          <v-btn color="primary" dark @click.stop="dialog2 = !dialog2">Open Dialog 2</v-btn>
          <v-tooltip right>
            <v-btn slot="activator">Tool Tip Activator</v-btn>
            Tool Tip
          </v-tooltip>
          <v-list three-line subheader>
            <v-subheader>User Controls</v-subheader>
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Content filtering</v-list-tile-title>
                <v-list-tile-sub-title>Set the content filtering level to restrict apps that can be downloaded</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Password</v-list-tile-title>
                <v-list-tile-sub-title>Require password for purchase or use password to restrict purchase</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-divider></v-divider>
          <v-list three-line subheader>
            <v-subheader>General</v-subheader>
            <v-list-tile avatar>
              <v-list-tile-action>
                <v-checkbox v-model="notifications"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Notifications</v-list-tile-title>
                <v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-action>
                <v-checkbox v-model="sound"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Sound</v-list-tile-title>
                <v-list-tile-sub-title>Auto-update apps at any time. Data charges may apply</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-action>
                <v-checkbox v-model="widgets"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Auto-add widgets</v-list-tile-title>
                <v-list-tile-sub-title>Automatically add home screen widgets</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>

        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      bottomNav: 'recent',
      dialog: false,
      cards: [
        { id: 1, title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flexXs: 12, flexSm: 12 },
        { id: 2, title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flexXs: 12, flexSm: 6 },
        { id: 3, title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flexXs: 12, flexSm: 6 },
        { id: 4, title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flexXs: 6, flexSm: 3 },
        { id: 5, title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flexXs: 6, flexSm: 3 },
        { id: 6, title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flexXs: 6, flexSm: 3 },
        { id: 7, title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flexXs: 6, flexSm: 3 }
      ]
    }
  },
  created () {
    this.syncHeader(this.bottomNav)
  },
  methods: {
    syncHeader (pageTitle) {
      this.$emit('syncHeader', pageTitle)
    }
  }
}
</script>

<style scoped>
.index {
  margin-top: 60px;
  margin-bottom: 80px;
}
</style>
