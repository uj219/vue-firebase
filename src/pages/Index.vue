<template>
  <div class="index">
    <list :list="list" />
    <bottom-nav :current="bottomNav" @syncHeader="syncHeader" @syncAddModal="syncAddModal" />
    <add-modal :isShown="addModal" @syncAddModal="syncAddModal" />
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
      list: [
        { id: 1, title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flexXs: 12, flexSm: 12 },
        { id: 2, title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flexXs: 12, flexSm: 6 },
        { id: 3, title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flexXs: 12, flexSm: 6 },
        { id: 4, title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flexXs: 6, flexSm: 3 },
        { id: 5, title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flexXs: 6, flexSm: 3 },
        { id: 6, title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flexXs: 6, flexSm: 3 },
        { id: 7, title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flexXs: 6, flexSm: 3 }
      ],
      bottomNav: 'recent',
      addModal: false
    }
  },
  created () {
    this.syncHeader(this.bottomNav)
  },
  methods: {
    syncHeader (pageTitle) {
      this.$emit('syncHeader', pageTitle)
    },
    syncAddModal (bool) {
      this.addModal = bool
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
