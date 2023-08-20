export default 
function enableDonate(date) {
    const date1 = new Date(date)
    const date2 = new Date()
    const timeDiff = Math.abs(date2 - date1);
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    if(daysDiff >= 90){
        return true
    }else{
        return false
    }
}