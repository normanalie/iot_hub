<script>
import TheToggle from '../TheToggle.vue';
export default {
    components: {
        TheToggle,
    },
};
</script>

<template>
    <div
        class="MagnetLampCard max-w-sm rounded-md overflow-hidden shadow-lg bg-slate-600 m-2 p-2"
    >
        <div class="headline py-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="{1.5}"
                stroke="currentColor"
                className="w-2 h-2"
                class="max-w-[40px] inline-block mr-4"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                />
            </svg>

            <h1 class="inline-block bottom-0 text-lg">Magnet Lamp</h1>
        </div>
        <p class="pt-2 pb-4 pl-0 text-stone-200 text-ms">Chambre</p>

        <TheToggle />
    </div>
</template>
