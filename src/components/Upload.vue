<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <!-- Upload Dropbox-->
    <div class="p-6">
      <div
        class="
          w-full
          px-10
          py-20
          rounded
          text-center
          cursor-pointer
          border border-dashed border-gray-400
          text-gray-400
          transition
          duration-500
          hover:text-white
          hover:bg-green-400
          hover:border-green-400 hover:border-solid
        "
        :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="is_dragover = false"
        @dragover.prevent.stop="is_dragover = true"
        @dragenter.prevent.stop="is_dragover = true"
        @dragleave.prevent.stop="is_dragover = false"
        @drop.prevent.stop="upload($event)"
      >
        <h5>Drop your files here</h5>
      </div>

      <input type="file" multiple @change="upload($event)" />

      <hr class="my-6" />
      <!-- Progress Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <div class="font-bold text-sm" :class="upload.text_class">
          <i :class="upload.icon"></i>
          {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <div
            class="transition-all progress-bar"
            :class="upload.variant"
            :style="{ width: upload.current_progress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage, auth, songsCollection } from "@/includes/firebase";

export default {
  name: "Upload",
  data() {
    return {
      is_dragover: false,
      uploads: [],
    };
  },
  methods: {
    upload($event) {
      this.is_dragover = false;

      // check on dataTransfer to understand id file is uploaded whit dragndrop
      const files = $event.dataTransfer
        ? [...$event.dataTransfer.files]
        : [...$event.target.files]; // ...convert an object in an array

      files.forEach((file) => {
        // DA DECOMMENTARE, ORA ACCETTA TUTTO
        // if (file.type !== "audio/mpeg") {
        //   return;
        // }

        const storageRef = storage.ref(); // corrisponde a vue-music-app-b3506.appspot.com
        const songsRef = storageRef.child(`songs/${file.name}`);
        const task = songsRef.put(file);

        const uploadIndex =
          this.uploads.push({
            task,
            current_progress: 0,
            name: file.name,
            variant: "bg-blue-400",
            icon: "fas fa-spinner fa-spin",
            text_class: "",
          }) - 1;

        // .on() is a firebase method
        task.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 200; // snapshot rapresent the current state of the upload
            this.uploads[uploadIndex].current_progress = progress;
          },
          (error) => {
            this.uploads[uploadIndex].variant = "bg-red-400";
            this.uploads[uploadIndex].icon = "fas fa-times";
            this.uploads[uploadIndex].text_class = "text-red-400";
            console.log(error);
          },
          async () => {
            const song = {
              uid: auth.currentUser.uid,
              display_name: auth.currentUser.displayName,
              original_name: task.snapshot.ref.name,
              modified_name: task.snapshot.ref.name,
              genre: "",
              comment_count: 0,
            };

            song.url = await task.snapshot.ref.getDownloadURL();
            await songsCollection.add(song);

            this.uploads[uploadIndex].variant = "bg-green-400";
            this.uploads[uploadIndex].icon = "fas fa-check";
            this.uploads[uploadIndex].text_class = "text-green-400";
          }
        );
      });

      console.log(files);
    },
    cancelUploads() {
      this.uploads.forEach((upload) => {
        upload.task.cancel();
      });
    },
  },
  // cancel upload if user changes page
  // beforeUnmount() {
  //   this.uploads.forEach((upload) => {
  //     upload.task.cancel();
  //   });
  // },
};
</script>