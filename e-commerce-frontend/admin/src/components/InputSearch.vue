<template>
    <div>
        <form class="d-flex">
            <div class="input-group p-0">
                <input class="form-control border-secondary mt-0" type="🔎 Search.... " placeholder="Search"
                aria-label="Search" :value="modelValue" @input="updateModelValue" @keyup.enter="submit">
              
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