// Settings for slides script
const [currentSlide, setCurrentSlide] = useState(0);
const [autoplay, setAutoplay] = useState(true);

//Setting Up Script
//Text Cards
const initialBackground = {
    displayColorPicker: false,
    color: {
      r: '242',
      g: '242',
      b: '242',
      a: '1',
    },
}
const initialTextColor = {
    displayColorPicker: false,
    color: {
      r: '0',
      g: '0',
      b: '0',
      a: '1',
    },
}
const [cards, setCards] = useState([])
const [cardText, setCardTextState] = useState('');
const [speed, setSpeed] = useState(1)
const [backgroundColor, setBackgroundColor] =useState(initialBackground);
const [textColor, setTextColor] =useState(initialTextColor);







// API call to BE to get updated user info to input fields




const addCard = () => {
    if(cardText === ''){
        alert("Invalid Card format")
        return
    }
    let newCard ={
        textColor: textColor.color,
        backGroundColor: backgroundColor.color,
        speed: speed * 1000,
        text: cardText,
    }
    //set input back to default
    setBackgroundColor(initialBackground);
    setTextColor(initialTextColor);
    setCardTextState('');
    setSpeed(1);
    setCards([...cards, newCard])
}
const noScript = () => {
    setStage(4);
}

  //Background Color Picker Function
  const openBackgroundColor = () => {
    setBackgroundColor({ displayColorPicker: !backgroundColor.displayColorPicker, color: backgroundColor.color });
  };
  const closeBackgroundColor = () => {
    setBackgroundColor({ displayColorPicker: false, color: backgroundColor.color });
  };
  const setColorBackground = (color) => {
    setBackgroundColor({ displayColorPicker: backgroundColor.displayColorPicker, color: color.rgb });
  };

  //Text Color Picker Function
  const openTextColor = () => {
    setTextColor({ displayColorPicker: !textColor.displayColorPicker, color: textColor.color });
  };
  const closeTextColor = () => {
    setTextColor({ displayColorPicker: false, color: textColor.color });
  };
  const setColorText = (color) => {
    console.log(color)
    setTextColor({ displayColorPicker: textColor.displayColorPicker, color: color.rgb });
  };