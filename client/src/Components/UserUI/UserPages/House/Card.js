import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Card.css";

const Card = () => {
  //server bata hamile lyayera useState ma rakhkne ani paxi client ma
  //dekhaune
  //retrive data from server
  const [roomList, setRoomList] = useState([]);
  //react ma sab kuch state nai hai
  // suruma first time faalse hunxa
  const userHomePage = async () => {
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
    userHomePage();
  }, []);

  // ................... searching

  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filter = !search
    ? roomList
    : roomList.filter((val) => {
        return val.roomname.toLowerCase().includes(search.toLowerCase());
      });

  // for button click search
  const [mydata, setMyData] = useState();

  const [address, setAddress] = useState();
  const filterResult = (roomsdata) => {
    {
    }
  };

  // ,,,,,,,,,,,,,searching

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(roomList);
  console.log(data);
  console.log(searchText);

  // exclude column list from filter
  const excludeColumns = [];

  // handle change event of search input
  const handleChange = (value) => {
    setSearchText(value);
    filterData(value);
  };

  // filter records by search text
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setData(roomList);
    else {
      const filteredData = roomList.filter((item) => {
        return Object.keys(item).some((key) =>
          excludeColumns.includes(key)
            ? false
            : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setData(filteredData);
    }
  };

  return (
    <>
      <div className="house_container">
      
        <div className="house_main">
          {/* search data */}
          <div className="search_main">
            <form>
              <input
                type="search"
                name="search"
                value={searchText}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="search"
              />
            </form>
          </div>
          <h1>List of Houses</h1>
          <hr/>

          {/* home cards for card of houses */}

          <div className="home_cards">

            {/* for searching */}
            {/* search bar */}

            {/* checked add and remove */}
            {!searchText
              ? roomList.map((val) => {
                  return (
                    <div className="card_part">
                      <div className="card">
                        <img
                          src={`http://localhost:5000/images/${val.roomImage}`}
                          width="90px"
                          height="50px"
                          alt={val.roomImage}
                        />
                        <p>House Name : {val.roomname}</p>
                        <p>Rent Price : {val.price}</p>
                        <p>Location : {val.address}</p>
                        <button>
                          <NavLink to={`housedetails/${val._id}`}>
                            House Details
                          </NavLink>
                        </button>
                      </div>
                    </div>
                  );
                })
              : data.map((roomdd) => {
                  return (
                    <div className="card_part">
                      <div className="card">
                        <img
                          src={`http://localhost:5000/images/${roomdd.roomImage}`}
                          width="90px"
                          height="50px"
                          alt={roomdd.roomImage}
                        />
                        <p>House Name : {roomdd.roomname}</p>
                        <p>Rent Price : {roomdd.price}</p>
                        <p>Location : {roomdd.address}</p>
                        <button>
                          <NavLink to={`housedetails/${roomdd._id}`}>
                            House Details
                          </NavLink>
                        </button>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
