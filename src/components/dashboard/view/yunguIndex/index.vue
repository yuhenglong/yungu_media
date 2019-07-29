<template>
    <div class="yunguIndex">
        <p style="color:#333">我是云股傳媒</p>
    </div>
</template>
<script>
export default {
    name:'yunguIndex',
    mounted(){
        console.log(this.$route.params.id)
        console.log(this.$route.params.person)
    }
}
</script>
<style lang="scss" scoped>
    
</style>