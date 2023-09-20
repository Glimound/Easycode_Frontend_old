//import Vue from "vue"
import Vue from 'vue'
import { nanoid } from 'nanoid'

let getAttrStr=(attrs)=>{
    let attrStr=''
    attrs.forEach(item => {
        attrStr+=item.key+"="+item.value+"  "
    })
    return attrStr
}

export const genId=()=>{ //获取随机ID
    // function s4(){
    //     return Math.floor((1+Math.random())*0x10000)   //1-2
    //     .toString(16)
    //     .substring(1);
    // }
    // return s4()+s4()+'-'+s4();  //生成四位数随机数
    return nanoid()
}
  
  

export const mountedComponent=(component)=>{


    let data={}
    let id=component.info.id;
    let compWidth =0;
    let compHeight=0;
    if(component.attribute){
        component.attribute.forEach(item=>{
            data[item.key]=item.value
            if(item.key=='width'){
                compWidth=item.value
            }
            if(item.key=='height'){
                compHeight=item.value
            }
        })
    }

    setTimeout(() => {
        new Vue({
            name: id.toString(),
            data() {
                return data;
            },
            el:document.getElementById(id),
            template: component.template,
            mounted() {
                this.$el.id = id;
                this.$el.style.position = "absolute";
                this.$el.style.cursor = "pointer";
                this.$el.style.left = `${component.position.left}px`;
                this.$el.style.top = `${component.position.top}px`;
                this.$el.style.zIndex = component.position.zIndex;
                this.$el.style.width = `${compWidth}px`;
                this.$el.style.height = `${compHeight}px`;
            },
        })
    }, 500);
    
}

export default getAttrStr