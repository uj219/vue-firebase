<template>
  <div class="list">
    <v-container
      fluid
      grid-list-md
    >
      <v-layout row wrap>
        <v-flex
          v-for="item in list"
          v-bind="{
            [`xs${item.flexXs}`]: true,
            [`sm${item.flexSm}`]: true
          }"
          :key="item.id"
        >
          <v-card>
            <router-link :to="`/item/${item.id}`">
              <v-card-media
                :src="item.data.photo.pc.l"
                height="200px"
              >
                <v-container
                  fill-height
                  fluid
                  pa-2
                >
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span class="headline white--text" v-text="item.data.name"></span>
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
  </div>
</template>

<script>
export default {
  name: 'List',
  props: ['list']
}
</script>
