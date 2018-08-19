<template>
  <div class="index">
    <list :cards="cards" />
    <bottom-nav :current="bottomNav" @syncHeader="syncHeader" @syncDialog="syncDialog" />
    <add-modal :isShown="dialog" @syncDialog="syncDialog" />
  </div>
</template>

<script>
import List from '@/components/Index/List'
import BottomNav from '@/components/Index/BottomNav'
import AddModal from '@/components/Index/AddModal'

export default {
  name: 'Index',
  components: {
    'list': List,
    'bottom-nav': BottomNav,
    'add-modal': AddModal
  },
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
    },
    syncDialog (bool) {
      this.dialog = bool
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
