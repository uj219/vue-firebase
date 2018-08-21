<template>
  <div class="add-modal">
    <v-dialog
      v-model="isShown"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click.stop="syncDialog(false)">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Add item</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1" editable>検索方法を選択してください</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 2" step="2">エリア選択</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3">追加アイテムの選択</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-list two-line>
                  <v-list-tile v-for="item in items1" :key="item.title" avatar @click="e1 = 2">
                    <v-list-tile-avatar>
                      <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-container fluid grid-list-xl>
                  <v-layout wrap align-center>
                    <v-flex xs12 d-flex>
                      <v-select
                        :items="items2"
                        label="large_service_area"
                        outline
                      ></v-select>
                    </v-flex>

                    <v-flex xs12 d-flex>
                      <v-select
                        :items="items3"
                        label="service_area"
                        outline
                      ></v-select>
                    </v-flex>

                    <v-flex xs12 d-flex>
                      <v-select
                        :items="items4"
                        label="large_area"
                        outline
                      ></v-select>
                    </v-flex>

                    <v-flex xs12 d-flex>
                      <v-select
                        :items="items5"
                        label="middle_area"
                        outline
                      ></v-select>
                    </v-flex>

                    <v-flex xs12 d-flex>
                      <v-select
                        :items="items6"
                        label="small_area"
                        outline
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-container>

                <v-btn
                  color="primary"
                  @click="e1 = 3"
                >
                  Continue
                </v-btn>

                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-layout row>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-list>
                      <v-list-tile
                        v-for="item in items7"
                        :key="item.title"
                        @click=""
                      >
                        <v-list-tile-avatar>
                          <img :src="item.avatar">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                          <v-list-tile-title v-html="item.title"></v-list-tile-title>
                          <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                          <v-icon :color="item.active ? 'teal' : 'grey'">add_circle</v-icon>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>

                    <v-divider></v-divider>
                  </v-flex>
                </v-layout>

                <v-btn
                  color="primary"
                  @click="e1 = 1"
                >
                  Continue
                </v-btn>

                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card-text>

        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddModal',
  props: ['isShown'],
  data () {
    return {
      e1: 0,
      items1: [
        { icon: 'place', iconClass: 'teal white--text', title: 'エリアから探す' },
        { icon: 'near_me', iconClass: 'teal white--text', title: '現在地から探す' }
      ],
      select: 'Programming',
      items2: [
        'Programming',
        'Design',
        'Vue',
        'Vuetify'
      ],
      items3: [],
      items4: [],
      items5: [],
      items6: [],
      items7: [
        {
          active: true,
          title: 'Jason Oner',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          subtitle: '<span class="text--primary">Ali Connors</span> &mdash; Ill be in your neighborhood doing errands this weekend. Do you want to hang out?'
        },
        { active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' }
      ]
    }
  },
  methods: {
    syncDialog (bool) {
      this.$emit('syncDialog', bool)
    }
  }
}
</script>

<style scoped>
.v-stepper__content {
  padding-right: 0;
  padding-left: 0;
}
</style>
