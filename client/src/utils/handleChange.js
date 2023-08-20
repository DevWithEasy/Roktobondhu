import getBirthday from "./getBirthday"

const handleChange=(e,value,setValue)=>{
    if (e.target.name == 'dob' || e.target.name == 'lastDonate'){
        let newValue = {...value}
        newValue[e.target.name] = getBirthday(e.target.value)
        setValue(newValue)
    }else{
        let newValue = { ...value }
        newValue[e.target.name] = e.target.value
        setValue(newValue)
    }
    
}

export default handleChange