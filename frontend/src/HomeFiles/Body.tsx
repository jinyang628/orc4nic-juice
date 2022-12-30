import React from "react"
import quotesData from "./QuotesData"
import Quote from "./Quotes"

//This is where I want to organise the entire quotes section s
export default function FrontPageContent(){
    const quotesElements = quotesData.map((quote, index) => {
        return <Quote 
            statement={quote.statement} 
            author={quote.author}
            key={index}/>
    })
    return(
        <div className="quoteBlock">
            {quotesElements}
        </div>
    )
}

