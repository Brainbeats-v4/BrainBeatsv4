import CardCarousel from '../../../CardCarousel/CardCarousel';

// Import CSS
import './RecordCards.css'

const RecordCards = () => {

    return (
        <div className='container' id='record-track-container'>
            <div>
                <div id='record-track-info-div'>
                    <div id='display-record-card-div'>
                        Displaying Cards:
                        <CardCarousel></CardCarousel>
                    </div>
                </div>
            </div>          
        </div>
    );
}

export default RecordCards;