<template>
    <div>
        <form class="mx-auto d-flex">
            <div class="input-group ">
                <input class="form-control border-secondary py-2 rounded-0" type="search" placeholder="Search"
                    aria-label="Search" :value="modelValue" @input="updateModelValue" @keyup.enter="submit">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary border-secondary rounded-0" type="submit">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: String,
            default: ""
        },
    },
    emits: ["submit", "update:modelValue"],
    methods: {
        updateModelValue(e) {
            this.$emit("update:modelValue", e.target.value);
        },
        submit() {
            this.$emit("submit");
        }
    },
};
</script>