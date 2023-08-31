

export function currDate()
{
    var today = new Date()
    //console.log(today.getMonth(), today.getDate()+1, today.getHours())
    const dateString = today.getFullYear().toString() + (((today.getMonth() + 1) < 10) ? `0${today.getMonth() + 1}`: (today.getMonth() + 1))  + ((today.getDate() < 10) ? `0${today.getDate()}`: today.getDate().toString()) + ((today.getHours() < 10) ? "0" + today.getHours().toString(): today.getHours().toString())
    console.log(dateString)
    return dateString
}