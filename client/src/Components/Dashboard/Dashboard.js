import React,{useState, useEffect} from 'react';
import './dashboard.css';
const Dashboard = () =>{
  const [roomcount, setRoomCount] = useState([]);
  const [rentercount, setRenterCount] = useState([]);

  //react ma sab kuch state nai hai
  // suruma first time faalse hunxa
  const RoomDataCount = async() =>{
    try{
        const res = await fetch('/roomcount',{
            method:"GET",
            headers:{
                "Content-Type" :"application/json"
            },
        });
        const data = await res.json();
        console.log(data);
        setRoomCount(data);       
    }catch(err){
        console.log(err);

    }
}

const RenterDataCount = async() =>{
    try{
        const res = await fetch('/rentercount',{
            method:"GET",
            headers:{
                "Content-Type" :"application/json"
            },
        });
        const data = await res.json();
        console.log(data);
        setRenterCount(data);       
    }catch(err){
        console.log(err);

    }

}

useEffect(()=>{
    RoomDataCount();
    RenterDataCount();
},[]);


    return(
        <div className="cards">
        <div className="card">
            <div className='card1'>
                <h4>Total Houses</h4>
                <div className="buttom_div1">
                   {roomcount}
                </div>
            </div>
            <div className='card2'>
            <h4>Total Renters</h4>
            <div className="buttom_div2">
                {rentercount}
            </div>

            </div>
            {/* <div className='card3'>
            <h4>Booked Rooms</h4>
            <div className="buttom_div3">30</div>

            </div> */}

        </div>

        </div>
    )
}

export default Dashboard;