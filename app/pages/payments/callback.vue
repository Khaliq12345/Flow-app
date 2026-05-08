<script setup lang="ts">
const route = useRoute();

const transactionId = route.query.id as string;
const status = route.query.status as string;

console.log({
  transactionId,
  status,
});
</script>

<template>
  <div>
    Paiement : {{ status }}
  </div>
</template>