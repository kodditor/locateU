

export function removeSpaces(string)
{
    if (string.startsWith(" "))
    {
        return removeSpaces(string.replace(" ", ""))
    }
    else{
        return string
    }
    
}