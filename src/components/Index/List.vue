<template>
  <div class="list">
    <v-container
      fluid
      grid-list-md
    >
      <v-layout
        v-if="list.length > 0"
        row
        wrap
      >
        <v-flex
          v-for="(item, index) in list"
          v-bind="{
            [`xs${itemSize[index].flexXs ? itemSize[index].flexXs : 6}`]: true,
            [`sm${itemSize[index].flexSm ? itemSize[index].flexSm : 3}`]: true
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

      <v-layout
        v-else
      >
        <no-item text="表示できるアイテムがありません" height="400px"/>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import NoItem from '@/components/common/NoItem'

export default {
  name: 'List',
  props: ['list'],
  components: {
    'no-item': NoItem
  },
  data () {
    return {
      itemSize: [
        {flexXs: 12, flexSm: 12},
        {flexXs: 6, flexSm: 6},
        {flexXs: 6, flexSm: 6}
      ]
    }
  }
}
</script>
