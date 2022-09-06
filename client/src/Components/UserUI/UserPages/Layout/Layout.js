import React, { useState, useEffect } from "react";
import "./Layout.css";
import houseimg from "../../../../Assets/Images/house.jpeg";
import homepageimg from "../../../../Assets/Images/homepage.jpg";
import { NavLink } from "react-router-dom";
const Layout = () => {


    const [roomList, setRoomList] = useState([]);

    //react ma sab kuch state nai hai
    // suruma first time faalse hunxa
    const roomPage = async () => {
      try {
        const res = await fetch("/roomdata", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const data = await res.json();
        setRoomList(data);
  
        //jab mujhe data milda hai teti bela true kardunga
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
        roomPage();
      }, []);
    // .........

  const [userName, setUserName] = useState("");

  //react ma sab kuch state nai hai
  // suruma first time faalse hunxa
  const [show, setShow] = useState(false);
  const userHomePage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      // set  data sabai data chaidaina
      setUserName(data.name);

      //jab mujhe data milda hai teti bela true kardunga
      setShow(true);
    } catch (err) {
      console.log(err);
    }
  };

  // first time contact page ko open gardai check kare user
  //authenticate hai ya or nai
  useEffect(() => {
    // useEffect ko help mata ek function ko call kiya

    userHomePage();
  }, []);


//   searching
const [searchText, setSearchText] = useState("");
const [data, setData] = useState(roomList);
console.log(data);
console.log(searchText);

// exclude column list from filter
const excludeColumns = [];

// handle change event of search input
const handleChange = value => {
  setSearchText(value);
  filterData(value);
};

// filter records by search text
const filterData = (value) => {
  const lowercasedValue = value.toLowerCase().trim();
  if (lowercasedValue === "") setData(roomList);
  else {
    const filteredData = roomList.filter(item => {
      return Object.keys(item).some(key =>
        excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)
      );
    });
    setData(filteredData);
  }
}


  return (
    <>
      <div className="layout_container">
        <div className="layout_main">
          <div className="one_top_block">
          <h1>{userName}</h1>
            {/* for userle login kiya toh ye nahi toh ye */}
            <h2>
              {show ? "welcome back" : "Take a House in your nearer"}
            </h2>
          <div className="search_img">
   
        
            <div className="image_part">
              {/* <img src={homepageimg} /> */}
            </div>
      
             
             {/*  */}
             
             {/*  */}

            </div>

            <div className="center_block">
              <div className="cards">
                <h1>Feature Post</h1>

                <div className="card">
                  <div className="card1">
                    <img src={houseimg} alt="houseimage" />
                  </div>
                  <div className="card1"></div>
                  <div className="card1"></div>
                  <div className="card1"></div>
                  <div className="card1"></div>
                </div>
                <div className="card">
                  <div className="card1"></div>
                  <div className="card1"></div>
                  <div className="card1"></div>
                  <div className="card1"></div>
                  <div className="card1"></div>
                </div>
                <div className="card">
                  <div className="card1"></div>
                  <div className="card1"></div>
                  <div className="card1"></div>
                  <div className="card1"></div>
                  <div className="card1"></div>
                </div>
              </div>
            </div>
            {/* for one flex box */}
          </div>

          {/* mid */}
          {/* <div className="mid_block">
                        <div className="featured">
                            <h2>Similar Houses</h2>
                            <div className="featured_post">
                                <div className="post1"></div>
                                <div className="post1"></div>
                                <div className="post1"></div>
                                <div className="post1"></div>
                                <div className="post1"></div>
                            </div>

                        </div>
                    </div> */}
          <div className="bottom"></div>
        </div>
      </div>
    </>
  );
};

export default Layout;
