import { Carousel as Caro } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useAppSelector } from "../../Redux/hooks";
import {Card} from '../../util/Interfaces'

// Importing CSS
import '../CardCarousel/CardCarousel.css';

const CardCarousel = () => {
    const scriptCards: Card[] = useAppSelector(state => state.cardArraySlice);

    return (
    <div className="container" id="cardCarousel-container">
        <Caro autoPlay={true} showThumbs={false} infiniteLoop={true} 
            dynamicHeight={false} interval={10000}
        > 
        
        {scriptCards.map((card,index) => {				
			return <div className='card-display' key={index} style={{ 
				background: `rgba(${card.backgroundColor.r}, ${card.backgroundColor.g}, ${card.backgroundColor.b}, ${card.backgroundColor.a})`,
                backgroundImage: `url(${card.url})`,
				color: `rgba(${card.textColor.r}, ${card.textColor.g}, ${card.textColor.b}, ${card.textColor.a})`,
                width: '100%', 
                height: '100%',
				}}>
                {card.text}
            </div>})}

        </Caro>
    </div>
    )
}

export default CardCarousel;