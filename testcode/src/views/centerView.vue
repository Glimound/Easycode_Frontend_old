<template>
   
    <div class="wrapper" @dragover="dragOver" @drop="drop" @click="checkComp">
        <!-- 设置组件挂载点 -->
        <div :id="item.info.id" v-for="(item,index) in components" :key="index"></div>     
        <div class="borderStyle" v-if="currComp" :style="setBorderStyle"></div>
    </div>
    </template>
    
    <script>
    import { mapState } from 'vuex'
    import {genId} from '../utils/index'
    import {mountedComponent} from '../utils/index'
    import getComponent from '../templates/index'
    export default{
        methods:{
            checkComp(e){
                let reg=/\w{8}-\w{4}/;
                let node=e.target;
                let count=0;
                while(node&&reg.test(node.id)){
                    count++;
                    if(count>20){
                        return;
                    }
                    node=node.parentNode;
                }
                if(node&&node.id){
                    this.currComp=this.components.find(item=>{
                        if(item.info.id===node.id){
                            return item
                        }
                    })
                }
            },
            //拖拽到画布的回调
            dragOver(e){
                e.preventDefault();
                
            },
            //鼠标松开的回调
            drop(e){
                e.preventDefault()
                let info=JSON.parse(e.dataTransfer.getData('info'))
                info.id=genId();
                let component=getComponent(info);
                this.zIndex++;
    
                //决定组件定位
                let compWidth=0;
                let compHeight=0;
                
                component.attribute.forEach(item => {
                    if(item.key=='width'){
                        compWidth=item.value;
                    }
                    if(item.key=='height'){
                        compHeight=item.value;
                    }
                })
                let left=e.offsetX-compWidth/2;
                let top=e.offsetY-compHeight/2;
                if(left<0){
                    left=0
                }
                if(top<0){
                    top=0
                }
                component.position={left,top,zIndex:this.zIndex}
                if (this.isFirstComponentDragged) {
            this.components.push(component);
            // 挂载组件
            mountedComponent(component);
          } else {
            // 如果是第一个组件，设置初始的left和top值
            this.components.push(component);
            component.position = { left: 50, top: 50, zIndex: this.zIndex }; // 设置初始值，可以根据需要调整
            // 挂载第一个组件
            mountedComponent(component);
            this.isFirstComponentDragged = true;
          }
        
      
    
                // this.components.push(component)
                // //挂载组件
                // mountedComponent(component)
               
            }
        },
        data(){ 
            return{
                // components:[],
                zIndex:0,
                currComp:null,
                isFirstComponentDragged: false,
            };
        },
        computed:{
            ...mapState({
                components: state => state.layoutList
            }),
            setBorderStyle(){
                let compWidth=0;
                let compHeight=0;
                if(this.currComp){
                    this.currComp.attribute.forEach(item=>{
                        if(item.key==='width'){
                            compWidth=item.value
                        }
                        if(item.key==='height'){
                            compHeight=item.value
                        }
                    })
                    return{
                        width:`${compWidth}px`,
                        height:`${compHeight}px`,
                        left:`${this.currComp.position.left}px`,
                        top:`${this.currComp.position.top}px`,
                        zIndex:`${this.currComp.position.zIndex}px`
                    }
                }else{
                    return{}
                }
            }
        },
        created() {
            // 从远程获取布局
            // this.$store.dispatch('initLayoutListFromRemote')
        }
    }
    </script>

    <style scoped lang="less">
    .wrapper{
        flex: 1;
        background: #eee;
        position: relative;
        .borderStyle{
            border:1px solid black;
            position:absolute;
        }
    }
    </style>