<template lang='pug'>
    button.test-btn(@click='say()') {{txt}}
</template>

<style lang="scss" scoped>
.test-btn {
    background: green;
    color: #fff;
    padding: 10px 20px;
    outline: none;
}
</style>

<script>
export default {
    data() {
        return {
            txt: 'Test Button'
        }
    },
    methods: {
        say() {
            alert('hello')
        }
    }
}
</script>
