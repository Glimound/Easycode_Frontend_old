import getAttrStr from '../utils/index'
let handle =()=>{
    let attribute=[{
        key:"width",
        name:"宽度",
        value:'100',
        type:'input',
        placeholder:'请输入宽度'
    },{
        key:"height",
        name:"高度",
        value:'40',
        type:'input',
        placeholder:'请输入高度'
    },
    {
        key:"color",
        name:"文本颜色",
        value:'#ff0000',
        type:'color',
        placeholder:'请选择颜色'
    },
    {
        key:"fontSize",
        name:"字体大小",
        value:'14',
        type:'input',
        placeholder:'请输入字体大小'
    }
]
    let data ={txt:'默认文本'}
    let template=`<textComp ${getAttrStr(attribute)}  :data='${JSON.stringify(data)}'></textComp>`
    return {attribute,data,template}
}
export default handle