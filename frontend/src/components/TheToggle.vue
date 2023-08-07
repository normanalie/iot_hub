<script>
export default {
    props: {
        modelValue: Boolean,
    },
    computed: {
        model: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            },
        },
    },
    methods: {
        click(e) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            this.$emit('click');
        },
    },
};
</script>

<template>
    <label
        class="relative inline-flex items-center cursor-pointer"
        @click="(e) => click(e)"
    >
        <input
            type="checkbox"
            :value="modelValue"
            v-model="model"
            class="sr-only peer"
            @click="$event.stopImmediatePropagation()"
        />
        <div
            class="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer dark:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-slate-100 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-100 after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-purple-600"
        ></div>
        <span class="ml-3 text-sm font-medium"><slot></slot></span>
    </label>
</template>
