<template>
  <div class="list">
    <v-container
      v-show="!listLoading"
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
            [`xs${itemSize[index] ? itemSize[index].flexXs : 6}`]: true,
            [`sm${itemSize[index] ? itemSize[index].flexSm : 3}`]: true
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
              <div class="v-card__actions__left">
                <span>
                  <v-icon>place</v-icon> {{item.distance}} m
                </span>

                <span>
                  <v-icon>schedule</v-icon> {{getTimeago(item.data._created_at)}}
                </span>
              </div>
              <v-spacer></v-spacer>
              <btn-favorite :currentUser="currentUser" :item="item" @addFav="addFav" @deleteFav="deleteFav" @syncLoginDialog="syncLoginDialog"/>
            </v-card-actions>

          </v-card>
        </v-flex>
      </v-layout>

      <v-layout
        v-else
      >
        <no-item layout="fixed" text="表示できるアイテムがありません" />
      </v-layout>
    </v-container>

    <v-container v-show="listLoading">
      <loader layout="fixed"/>
    </v-container>
  </div>
</template>

<script>
import moment from 'moment'
import BtnFavorite from '@/components/common/BtnFavorite'
import NoItem from '@/components/common/NoItem'
import Loader from '@/components/common/Loader'
moment.locale('ja')

export default {
  name: 'List',
  props: ['list', 'listLoading', 'currentUser'],
  components: {
    'btn-favorite': BtnFavorite,
    'no-item': NoItem,
    'loader': Loader
  },
  data () {
    return {
      itemSize: [
        {flexXs: 12, flexSm: 12},
        {flexXs: 6, flexSm: 6},
        {flexXs: 6, flexSm: 6}
      ]
    }
  },
  methods: {
    getTimeago (datetime) {
      return moment(datetime).fromNow()
    },
    addFav (itemId, userId) {
      this.$emit('addFav', itemId, userId)
    },
    deleteFav (itemId, userId) {
      this.$emit('deleteFav', itemId, userId)
    },
    syncLoginDialog (bool) {
      this.$emit('syncLoginDialog', bool)
    }
  }
}
</script>

<style>
.v-card__media__content {
  background: rgba(0,0,0,0.3);
}
.v-card__actions__left {
  font-size: 10px;
}
.v-card__actions__left .v-icon {
  font-size: 15px;
}
.v-card__actions__left span {
  display: block;
}
.v-card__actions__left span:not(:last-child) {
  margin-bottom: 3px;
}
</style>
