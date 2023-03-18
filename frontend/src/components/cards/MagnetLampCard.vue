<script>
import TheToggle from '../TheToggle.vue';
import ArrowRight from '../icons/ArrowRight.vue';
import LightBulb from '../icons/LightBulb.vue';
export default {
    components: {
        TheToggle,
        ArrowRight,
        LightBulb,
    },
};
</script>

<template>
    <div
        class="MagnetLampCard max-w-sm rounded-md overflow-hidden shadow-lg bg-slate-600 m-2 p-2 hover:bg-slate-500 flex"
    >
        <div class="content py-2 flex-1">
            <LightBulb fill="none" />
            <h1 class="inline-block bottom-0 text-lg">Magnet Lamp</h1>

            <p class="pt-2 pb-4 pl-0 text-stone-200 text-ms">Chambre</p>

            <TheToggle />
        </div>
        <ArrowRight class="my-auto h-full" />
    </div>
</template>
