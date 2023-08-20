const getBirthday = (birthdate) => {
    const date = new Date(birthdate)
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    const year = date.getFullYear()
    return `${year}-${month}-${day}`
}

export default getBirthday