<script>
import axios from 'axios';
import TheToggle from '../TheToggle.vue';
import ArrowRight from '../icons/ArrowRight.vue';
import LightBulb from '../icons/LightBulb.vue';
export default {
    data() {
        return {
            is_on: false,
        };
    },
    props: {
        device_id: String,
    },
    components: {
        TheToggle,
        ArrowRight,
        LightBulb,
    },
    computed: {
        fill() {
            return this.is_on ? 'white' : 'none';
        },
    },
    methods: {
        click() {
            axios
                .post(`/api/mqtt/devices/${this.device_id}`, {
                    is_on: this.is_on ? 0 : 1,
                })
                .then((res) => {
                    setTimeout(this.get, 1200);
                })
                .catch((err) => {
                    console.log(err);
                    this.is_on = false;
                });
        },
        update() {
            axios
                .get(`/api/mqtt/devices/${this.device_id}`)
                .then((res) => {
                    console.log(`Res data is_on: ${res.data.is_on}`);
                    this.is_on = res.data.is_on ? true : false;
                })
                .catch((err) => {
                    console.log(err);
                    this.is_on = false;
                });
        },
    },
};
</script>

<template>
    <div
        class="MagnetLampCard max-w-sm rounded-md overflow-hidden shadow-lg bg-slate-600 m-2 p-2 hover:bg-slate-500 flex"
    >
        <div class="content py-2 flex-1">
            <LightBulb :fill="fill" />
            <h1 class="inline-block bottom-0 text-lg">Magnet Lamp</h1>

            <p class="pt-2 pb-4 pl-0 text-stone-200 text-ms">Chambre</p>

            <TheToggle v-model="is_on" @click="click()" />
        </div>
        <ArrowRight class="my-auto h-full" />
    </div>
</template>
