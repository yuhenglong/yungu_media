<template>
    <div class="rightTopMenu">
        <screenFull></screenFull>
        <person></person>
    </div>
</template>

<script>
import screenFull from "@/components/dashboard/view/screenFull"
import person from "@/components/dashboard/view/person"
export default {
    name: "rightTopMenu",
    components: {
        screenFull,
        person
    },
    data() {
        return {}
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
.rightTopMenu{
    display:inline-block;
    float:right;
}
</style>
