<script>
import MagnetLampCard from '../components/cards/MagnetLampCard.vue';
import TheTitle from '../components/TheTitle.vue';
export default {
    data() {
        return {
            user: {
                username: 'TestUser',
            },
        };
    },
    components: {
        MagnetLampCard,
        TheTitle,
    },
};
</script>

<template>
    <TheTitle class="mt-3 mb-8 pt-2 pl-2">Bonjour {{ user.username }}</TheTitle>
    <MagnetLampCard device_id="640dbe495fa4428971cf3bfa" />
</template>
