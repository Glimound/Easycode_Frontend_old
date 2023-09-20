import textComp from './textComp'

let obj={
    textComp
}

let getComponent =(info)=>{
    let component= obj[info.type]()
    //info.type组件名称
    component.info=info
    return component
   
}


export default getComponent