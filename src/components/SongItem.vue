<template>
  <router-link :to="{ name: 'song', params: { id: song.docID } }">
    <li
      class="
        flex
        justify-between
        items-center
        p-3
        pl-6
        cursor-pointer
        transition
        duration-300
        hover:bg-gray-50
      "
    >
      <!-- <div>
        <router-link
          :to="{ name: 'song', params: { id: song.docID } }"
          class="font-bold block text-gray-600"
          >{{ song.modified_name }}</router-link
        >
        <span class="text-gray-500 text-sm">{{ song.name }}</span>
      </div> -->

      <div class="font-bold block text-gray-600">
        {{ song.modified_name }}
        <span class="text-gray-500 text-sm">{{ song.name }}</span>
      </div>

      <div class="text-gray-600 text-lg">
        <!-- <router-link custom :to="{ name: "song", params: {id: song.docID}, hash: "#comments" }" v-slot="{ navigate }"> -->
        <span class="comments">
          <i class="fa fa-comments text-gray-600"></i>
          {{ song.comment_count }}
        </span>
        <!-- </router-link> -->
      </div>
    </li>
  </router-link>
</template>

<script>
export default {
  name: "SongItem",
  props: ["song"],
};
</script>

<style>
</style>