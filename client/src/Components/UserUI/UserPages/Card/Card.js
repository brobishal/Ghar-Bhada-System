import React , {useState, useEffect}from 'react';
import './Card.css';
const Card = (props) => {
  
  //server bata hamile lyayera useState ma rakhkne ani paxi client ma
  //dekhaune
  //retrive data from server
  const [roomList, setRoomList] = useState([]);
  //react ma sab kuch state nai hai// suruma first time faalse hunxa
  const userHomePage = async () => {
    try {
      const res = await fetch("/roomdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setRoomList(data);

      //jab mujhe data milda hai teti bela true kardunga
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userHomePage();
  }, []);
  return (
      <>
            <div className="card">
              <div className="image">
                <img src={props.imgsrc} alt="img" />
              </div>

              <div className="cardheader">
                <h2>{props.housename}</h2>
              </div>
              <div className="cardbody">
              <p>{props.address}</p>
              <p>{props.price}</p>
              <p>{props.value}</p>
              </div>
            </div>
        </>
  )
}

export default Card;