<template>
<div class="wrapper" :style="setStyle">
    <span>{{data.txt}}</span>
</div>

</template>
<script>
export default{
    components:{

    },
    props:{
        width:{
            type:[String,Number]
        },
        height:{
            type:[String,Number]
        },
        color:{
            type:[String]
        },
        fontSize:{
            type:[String,Number]
        },
        data:{
            type:Object
            
        }
    },
    data(){
        return{

        };
    },
    computed:{
        // 实现从外面赋值
        setStyle(){
            return{
                width:this.width+'px',
                height:this.height+'px',
                fontSize:this.fontSize+'px',
                color:this.color
            }
        }
    }
}

</script>

<style scoped lang="less">

</style>