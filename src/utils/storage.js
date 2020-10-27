//优化本地存储的代码
 const getItem=name=>{
    const data=window.localStorage.getItem(name)
    try {
        //尝试把data转换为Object
        return JSON.parse(data)
    } catch (error) {
        //如果data不是字符串格式就原样返回
        return data
    }
}
 const setItem=(name,value)=>{
    
    if(typeof value==='object'){
        value=JSON.stringify(value)
        
    }
    window.localStorage.setItem(name,value)
}
 const removeItem=(name)=>{
    window.localStorage.removeItem(name)
}
export { getItem,setItem,removeItem}