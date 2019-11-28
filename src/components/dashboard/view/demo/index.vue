<template>
    <div class="demo">
        我是一头猪
    </div>
</template>

<script>
export default {
    name: "demo",
    components: {},
    data() {
        return {}
    },
    methods: {
        async testResult(){
            let result = await this.doubleAfter2seconds(20);
            console.log(result);
            // return 'hello world';
        },
        doubleAfter2seconds(num){
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    resolve(2*num)
                },2000)
            })
        }
        // con(){
        //     console.log(this.timeout());
        // }
    },
    mounted(){
        this.testResult();
    }
}
</script>

<style lang="scss" scoped>
.demo{
    color:#666;
}
</style>
