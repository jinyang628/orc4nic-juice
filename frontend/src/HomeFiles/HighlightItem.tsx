import React from "react"

export default function HighlightItem({image, price, full_stars, half_stars, soldOut}: 
    {image: string, price: string, full_stars: number, half_stars: number, soldOut: boolean}){
    let fullStars = [];
    for (let i = 0; i < full_stars; i++) {
        fullStars.push(<i className="fa fa-star" key={i}/>)
    }
    return (
        <div>
            <table className="cardStats">
                <tbody>
                    <tr>
                        <td className="singleCell">
                            {  soldOut && <div className="soldOutBadge">SOLD OUT</div>}
                            <img src={image} className="cardimage"></img>
                        </td>
                    </tr>
                    <tr className="ratingLine">
                        <td>
                            <div className="stars">{fullStars}</div>
                            <div className="stars">{half_stars == 1 && <i className="fa fa-star-half"></i>}</div>
                        </td>
                        <td className="price">
                            <p>${price}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

