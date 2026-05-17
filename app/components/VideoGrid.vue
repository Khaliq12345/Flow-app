<template>
    <div
        class="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-[3px] overflow-hidden"
    >
        <div
            v-for="(cell, index) in cells"
            :key="index"
            class="relative overflow-hidden"
        >
            <video
                ref="videoRefs"
                :src="videoUrl"
                autoplay
                muted
                loop
                playsinline
                class="absolute inset-0 w-full h-full object-cover"
                :style="cell.style"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
const videoUrl = "https://www.pexels.com/fr-fr/download/video/32053942/";
const videoRefs = ref<HTMLVideoElement[]>([]);

// Each cell gets a transform to zoom/pan to a different region of the video
// and a playback offset so they don't look identical
const cells = [
    { style: { transform: "scale(1.4) translate(-12%, -10%)" } },
    { style: { transform: "scale(1.6) translate(5%, 8%)" } },
    { style: { transform: "scale(1.3) translate(14%, -6%)" } },
    { style: { transform: "scale(1.5) translate(-8%, 12%)" } },
    { style: { transform: "scale(1.4) translate(10%, -14%)" } },
    { style: { transform: "scale(1.6) translate(-5%, 6%)" } },
];

const offsets = [0, 4, 8, 13, 17, 22];

onMounted(() => {
    videoRefs.value.forEach((video, index) => {
        // All videos share the same src so the browser serves from cache after the first
        video.addEventListener("loadedmetadata", () => {
            video.currentTime = offsets[index] % video.duration;
        });
    });
});
</script>
