<template>
    <div
        class="relative w-full overflow-hidden rounded-2xl shadow-2xl ring ring-default"
    >
        <!-- Media : video ou image -->
        <video
            v-if="type === 'video'"
            :src="src"
            class="w-full h-full object-cover block"
            autoplay
            muted
            loop
            playsinline
        />
        <img
            v-else
            :src="src"
            :alt="headline"
            class="w-full h-full object-cover block"
        />

        <!-- Overlay gradient discret pour lisibilité -->
        <div
            class="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent pointer-events-none"
        />

        <!-- Headline + description overlay -->
        <div
            class="absolute inset-x-0 bottom-0 flex justify-center pb-6 sm:pb-8 md:pb-10 px-4 sm:px-6"
        >
            <div
                class="relative px-5 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl overflow-hidden border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl backdrop-saturate-150 bg-black/35 max-w-xs sm:max-w-md md:max-w-lg w-full"
            >
                <!-- Reflet lumineux top -->
                <div
                    class="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent"
                />

                <!-- Headline -->
                <p
                    class="text-white/90 text-base sm:text-xl md:text-2xl font-semibold tracking-[0.18em] sm:tracking-widest uppercase text-center drop-shadow-lg select-none"
                >
                    {{ headline }}
                </p>

                <!-- Description -->
                <p
                    v-if="description"
                    class="mt-1 sm:mt-2 text-white/60 text-xs sm:text-sm text-center tracking-wide leading-relaxed select-none"
                >
                    {{ description }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    src: string;
    type?: "video" | "image";
    headline: string;
    description?: string;
}>();
</script>
