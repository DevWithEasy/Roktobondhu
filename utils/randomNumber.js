const randomNumber=()=>{
    const number = Math.ceil(Math.random() * 999999)
    if((number.toString().length) < 6){
        return `0${number}`
    }else{
        return number.toString()
    }
}

module.exports = randomNumber