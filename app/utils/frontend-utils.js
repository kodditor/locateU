"use client"

import { changePopup } from "../components/Popup";

  

export function shareText(url)
{
    if (navigator) {
        navigator
        .clipboard.writeText(url)
        .then(() => {
            changePopup("Link copied");
        })
        .catch((error) => {
            console.error("Something went wrong", error);
        });
    }
}