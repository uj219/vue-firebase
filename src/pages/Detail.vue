<template>
  <div class="detail">
    <img
      class="mainImg"
      :src="item.data.photo.pc.l"
      alt="item.data.name"
    >
    <div class="data-box">
      <div class="data-box__item">
        <div class="data-box__item__inner">
          <span>{{item.data.budget.name}}</span>
          <v-icon size="18">brightness_3</v-icon>
        </div>
      </div>
      <div class="data-box__item">
        <div class="data-box__item__inner">
          <span>{{item.userFav.length}}</span>
          <v-icon size="18" :color="color">favorite</v-icon>
        </div>
      </div>
      <div class="data-box__item">
        <div class="data-box__item__inner">
          <span v-if="location.available">{{item.distance}}m</span>
          <span v-else>-</span>
          <v-icon size="18">place</v-icon>
        </div>
      </div>
    </div>
    <v-container>
      <p class="caption mb-1 mt-2">{{item.data.catch}}</p>
      <h1 class="headline mb-3">{{item.data.name}}</h1>
      <div class="mb-3">
        <v-chip small color="teal lighten-2" text-color="white">
          <v-avatar>
            <v-icon>restaurant</v-icon>
          </v-avatar>
          {{item.data.genre.catch}}
        </v-chip>
        <v-chip small color="teal lighten-2" text-color="white">
          <v-avatar>
            <v-icon>train</v-icon>
          </v-avatar>
          {{item.data.station_name}}
        </v-chip>
      </div>
      <p class="caption mb-4">
        <v-icon size="12">schedule</v-icon>
        {{item.data.open}}
      </p>
      <iframe
        width="100%"
        height="200"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        :src="`http://maps.google.co.jp/maps?q=${item.data.name}@${item.data.lat},${item.data.lng}&output=embed`"
      ></iframe>
      <p class="caption mb-4">
        <v-icon size="12">place</v-icon>
        {{item.data.address}}
      </p>
    </v-container>
    <v-footer fixed height="42">
      <btn-favorite-footer
        :currentUser="currentUser"
        :item="item"
        @addFav="addFav"
        @deleteFav="deleteFav"
        @syncLoginDialog="syncLoginDialog"
      />
    </v-footer>
  </div>
</template>

<script>
import BtnFavoriteFooter from '@/components/Detail/BtnFavoriteFooter'

export default {
  name: 'Detail',
  props: ['list', 'currentUser', 'location'],
  components: {
    'btn-favorite-footer': BtnFavoriteFooter
  },
  data () {
    return {
      item: {},
      pageTitle: '',
      isFav: false
    }
  },
  computed: {
    color: function () {
      if (this.$props.currentUser !== null && this.item.userFav.includes(this.$props.currentUser.uid)) {
        return 'pink'
      } else {
        return 'gray'
      }
    }
  },
  created () {
    this.getItem()
    this.$emit('syncHeader', this.pageTitle)
  },
  methods: {
    getItem () {
      this.item = this.$props.list.find((el) => {
        return el.id === this.$route.params.id
      })
      this.pageTitle = this.item.data.name
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

<style scoped>
.detail {
  padding-top: 56px;
  padding-bottom: 30px;
}
.v-footer {
  background: transparent;
}
.mainImg {
  width: 100%;
  vertical-align: top;
}
.data-box {
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  background: #fff;
}
.data-box__item {
  display: inline-flex;
  width: 100%;
  -ms-flex-negative: 1;
  flex-shrink: 1;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 auto;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  vertical-align: middle;
  padding: 10px 20px;
}
.data-box__item:not(:last-child) {
  border-right: 1px solid rgba(0,0,0,0.1);
}
.data-box__item__inner {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin: 0 auto;
  -webkit-box-orient: vertical;
  -webkit-box-direction: reverse;
  -ms-flex-direction: column-reverse;
  flex-direction: column-reverse;
  font-size: 16px;
  font-weight: 100;
  white-space: nowrap;
  will-change: font-size;
}
</style>
