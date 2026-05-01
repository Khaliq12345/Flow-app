<template>
  <div>
    {{ contentType || "this is none" }}
  </div>
  <TemplateContentChoice
    :open="showContentTypeChoice"
    @confirm="handleConfirm"
  />
</template>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();

const contentType = computed(() => route.query.contentType as string);
const showContentTypeChoice = computed(() => !route.query.contentType);

function handleConfirm(value: string) {
  router.push({ query: { ...route.query, contentType: value } });
}
</script>