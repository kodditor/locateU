

export function currDate()
{
    const today = new Date()
    const dateString = today.getFullYear().toString() + ((today.getMonth() < 10) ? "0" + today.getMonth().toString(10): today.getMonth().toString(10))  + ((today.getDay() < 10) ? "0" + today.getDay().toString(10): today.getDay().toString(10)) + ((today.getHours() < 10) ? "0" + today.getHours().toString(10): today.getHours().toString(10))
    return dateString
}