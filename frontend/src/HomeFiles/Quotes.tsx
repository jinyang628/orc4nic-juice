import React from "react"

//This is where I script how I want each individual quote to be showcased 
export default function Quote({statement, author}:
    {statement: string, author: string}){
    return (
        <div>
            <p className="quote">{statement}</p>
            <p className="author">{author}</p>
        </div>
    )
}