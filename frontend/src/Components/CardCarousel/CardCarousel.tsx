import { current } from "@reduxjs/toolkit";
import {useEffect, useState } from "react";
import { Carousel as Caro } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useAppSelector } from "../../Redux/hooks";
import {Card} from '../../util/Interfaces'

// Importing CSS
import '../CardCarousel/CardCarousel.css';

const CardCarousel = () => {
    const scriptCards: Card[] = useAppSelector(state => state.cardArraySlice);

    // Variables determining interval of card
    var idx = 0;
    var next:Card;  
    const [intervalZ, setIntervalZ] = useState((scriptCards.length > 0)? scriptCards[0].speed : 3000);

    // Function gets next card in carousel
    const getNext = (index:number) => {
        var idx = index+1;
        if (idx > scriptCards.length-1)
            idx = 0;
        return scriptCards[idx];
    }
      
    // Sets speed of next card in carousel when card changes
    const onChange = (index: number, item: any) => {
        next = getNext(index);
        
        setIntervalZ(next.speed);

    };

    // Call on initial render to set speed of second card
    useEffect(() => {
        if(scriptCards.length > 0) {
            next = getNext(idx);
            setIntervalZ(next.speed);
        }
    }, []);

    return (
    <div className="container" id="cardCarousel-container">
        <Caro
            onChange={onChange}
            autoPlay={true} 
            showThumbs={false} 
            dynamicHeight={false} 
            interval={intervalZ}
            infiniteLoop={true} 
        > 
        
        {scriptCards.map((card,index) => {		
			return <div data-interval={card.speed} className='card-display' key={index} style={{                 
                background: `rgba(${card.backgroundColor.r}, ${card.backgroundColor.g}, ${card.backgroundColor.b}, ${card.backgroundColor.a})`,
                backgroundImage: `url(${card.imageURL})`,
				color: `rgba(${card.textColor.r}, ${card.textColor.g}, ${card.textColor.b}, ${card.textColor.a})`,
                width: '100%', 
                height: '100%',
				}}>
                <h1>{card.text}</h1>
            </div>})}

        </Caro>
    </div>
    )
}

export default CardCarousel;
