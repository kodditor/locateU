

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

export function verifyAdmin(adminEmail)
{   
    
    // Will outsource this to prod in the future.

    const allowedEmails = [
        "kobbyowusudarko@gmail.com"
    ] 

    return allowedEmails.includes(adminEmail)
}
