<template>
  <div>
    <ComponentWrapper
      v-for="(item, index) in copyData"
      :key="index"
      :config="item"
    />
  </div>
</template>

<script>
  import ComponentWrapper from '@/components/Editor/ComponentWrapper'
  import { deepCopy } from '@/utils/utils'
  import { mapState } from 'vuex'

  export default {
    name: 'Deploy',
    components: {
      ComponentWrapper
    },
    data() {
      return {
        copyData: []
      }
    },
    computed: {
      ...mapState(['componentData'])
    },
    created() {
      this.$store.commit('setComponentData', JSON.parse(localStorage.getItem('canvasData')))
      this.$set(this, 'copyData', deepCopy(this.componentData))
    },
    destroyed() {
      this.$store.commit('setComponentData', [])
    }
  }
</script>

<style>

</style>