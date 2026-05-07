<template>
  <div></div>
</template>

<script lang="ts" setup>
const generationId = useState("generationId");

// Fallback si l'état est vide (accès direct ou refresh)
if (!generationId.value) {
  await navigateTo("/generations");
}
console.log("ID de génération reçu :", generationId.value);
</script>

<style></style>
