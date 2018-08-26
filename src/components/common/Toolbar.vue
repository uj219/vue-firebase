<template>
  <div id="toolbar">
    <v-toolbar fixed>
      <v-btn icon v-if="hasBackLink">
        <router-link to="/">
          <v-icon>arrow_back</v-icon>
        </router-link>
      </v-btn>

      <v-toolbar-title>{{pageTitle}}</v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'Toolbar',
  props: ['pageTitle', 'hasBackLink']
}
</script>
