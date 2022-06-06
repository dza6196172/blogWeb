<template>
  <div class="edit">
    <div class="editorwrap">
      <editor></editor>
    </div>
  </div>
</template>

<script>
import editor from '@/components/editor/index.vue'
export default {
  name: "edit",
  components:{
    editor
  }
}
</script>

<style lang="scss" scoped>
.edit{
  min-height: calc(100vh - 200px);
}
</style>
