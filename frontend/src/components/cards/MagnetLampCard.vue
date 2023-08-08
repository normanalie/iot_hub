<script>
import axios from 'axios';
import TheToggle from '../TheToggle.vue';
import ArrowRight from '../icons/ArrowRight.vue';
import LightBulb from '../icons/LightBulb.vue';
import ColorPicker from '@radial-color-picker/vue-color-picker';
import { reactive } from 'vue';

const HSLToRGB = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
};

export default {
    data() {
        const HSLcolor = reactive({
            hue: 50,
            saturation: 100,
            luminosity: 50,
            alpha: 1,
        });
        const RGBcolor = reactive({
            r: 255,
            g: 255,
            b: 255,
        });
        return {
            HSLcolor,
            RGBcolor,
            is_on: false,
            updateColor(hue) {
                HSLcolor.hue = hue;
                [RGBcolor.r, RGBcolor.g, RGBcolor.b] = HSLToRGB(
                    HSLcolor.hue,
                    HSLcolor.saturation,
                    HSLcolor.luminosity
                );
            },
        };
    },
    props: {
        device_id: String,
    },
    components: {
        TheToggle,
        ArrowRight,
        LightBulb,
        ColorPicker,
    },
    computed: {
        fill() {
            return this.is_on ? 'white' : 'none';
        },
    },
    methods: {
        change(hue = this.HSLcolor.hue) {
            this.updateColor(hue);
            console.log(this.is_on);
            axios
                .post(`/api/mqtt/devices/${this.device_id}`, {
                    r: this.RGBcolor.r,
                    g: this.RGBcolor.g,
                    b: this.RGBcolor.b,
                    is_on: this.is_on ? 1 : 0,
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
                    this.is_on = res.data.is_on ? true : false;
                })
                .catch((err) => {
                    console.log(err);
                    this.is_on = false;
                });
            setTimeout(this.update, 3100);
        },
    },
    mounted() {
        this.update();
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

            <TheToggle v-model="is_on" @click="change()" />
            <color-picker v-bind="HSLcolor" @input="change"></color-picker>
        </div>
    </div>
</template>

<style>
@import '@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';
</style>
