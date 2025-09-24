<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="card">
      <h1 class="text-4xl font-bold text-gray-100 mb-4">Tentang Command Prompt Maker</h1>
      <p class="text-lg text-gray-300 mb-6">
        Command Prompt Generator adalah sebuah proyek pribadi yang lahir dari kebutuhan untuk mengelola dan mengingat sintaks perintah dari berbagai *cybersecurity tools*. Seringkali, setiap tool memiliki banyak *flag* dan opsi yang rumit. Proyek ini bertujuan untuk menyediakan antarmuka web yang interaktif dan intuitif untuk membangun baris perintah yang kompleks tanpa perlu menghafal setiap detailnya.
      </p>

      <h2 class="text-2xl font-semibold text-green-400 mb-3">Bagaimana Ini Bekerja?</h2>
      <p class="text-gray-300 mb-6">
        Fitur paling unik dari proyek ini adalah alur kerjanya yang didukung oleh Discord. Semua definisi tool—mulai dari deskripsi, cara instalasi, hingga struktur perintah untuk form interaktif—awalnya ditulis sebagai catatan di dalam server Discord pribadi. Dua skrip Node.js kemudian digunakan untuk:
      </p>
      <ol class="list-decimal list-inside space-y-2 text-gray-300 mb-6">
        <li><strong>Fetch</strong>: Mengambil semua catatan dari thread di channel Discord yang relevan melalui Discord API.</li>
        <li><strong>Format</strong>: Mengubah catatan berformat Markdown tersebut menjadi file data TypeScript yang terstruktur secara otomatis.</li>
      </ol>
      <p class="text-gray-300">
        Data yang sudah terstruktur inilah yang kemudian dibaca oleh aplikasi Nuxt.js untuk merender halaman-halaman tool secara dinamis.
      </p>

      <h2 class="text-2xl font-semibold text-green-400 mb-3 mt-8">Teknologi</h2>
      <p class="text-gray-300">
        Proyek ini dibangun menggunakan:
      </p>
      <ul class="list-disc list-inside space-y-2 text-gray-300 mt-2">
        <li>Nuxt.js 3</li>
        <li>Vue.js 3 (Composition API)</li>
        <li>Tailwind CSS</li>
        <li>Discord.js</li>
        <li>TypeScript</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'About - Command Prompt Generator'
});
</script>