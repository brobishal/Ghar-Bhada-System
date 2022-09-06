import React, { useEffect, useState } from "react";
// import bishalimg from '../Assets/Image/about.jpg';
// import logo from '../Assets/Image/logo.jpeg';

import { useHistory } from "react-router-dom";
const About = () => {
  const history = useHistory();

  //server bata hamile lyayera useState ma rakhkne ani paxi client ma
  //dekhaune

  const [userData, setUserData] = useState({});

  //malai kisibi tara se about us page ko jab open karu
  //maile about wala root ko call karna hai and mujhe authenticate ma check karwana hai ki
  //ki user login hai ki nai and token verify hota hai ani uske basis ma
  //user ko data sara data get karle fill karna hai
  const CallAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // yaha header ma ab cookie pani sent karna hai
        //aba ya credentials pani lekhnu parcha ra credential ma include
        //lekhnu parcha kina ki hamro yo jun cookies xa backend samma jaye barabar

        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      // data pass gardeko user ko all data lai
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }

      //if user le login kiya hi nai
    } catch (err) {
      console.log(err);
      history.push("/Login");
    }
  };
  useEffect(() => {
    // the moment maile page ko first time open garchhau vane
    //automatic yo function call hunxa
    //[] this array depedency ek hi var chalega
    CallAboutPage();
  }, []);

  return (
    <>
      <div className="container emp-profile">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                {/* <img src={userData.name ==="Laxmi Shrestha" ? bishalimg : logo} alt="bishal" /> */}
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>{userData.name}</h5>
                <h6>{userData.work}</h6>
                <p className="profile-rating mt-3 mb-5">
                  RANKINGS : <span>1/10</span>
                </p>

                <ul ClassName="nav nav-tabs" role="tablist">
                  <li ClassName="nav-item">
                    <a
                      ClassName="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      role="tab"
                      href="#home"
                    >
                      About
                    </a>
                  </li>
                  <li ClassName="nav-item">
                    <a
                      ClassName="nav-link active"
                      id="profile-tab"
                      data-toggle="tab"
                      role="tab"
                      href="#profile"
                    >
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-2">
              <input
                type="submit"
                className="profile-edit-btn"
                name="btnAddMore"
                value="Edit Profile"
              />
            </div>
          </div>
          <div className="row">
            {/* left side url */}

            <div className="col-md-4">
              <div className="profile-work">
                <p>WORK LINKS</p>
                <a href="https://lyricalsansar.com/" target="_bishal">
                  Youtube
                </a>
                <br />
                <a href="https://lyricalsansar.com/" target="_bishal">
                  Instagram
                </a>
                <br />
                <a href="https://lyricalsansar.com/" target="_bishal">
                  Bishal Shrestha
                </a>
                <br />
                <a href="https://lyricalsansar.com/" target="_bishal">
                  Wbsitetechno
                </a>
                <br />
                <a href="https://lyricalsansar.com/" target="_bishal">
                  Web Developer
                </a>
                <br />
                <a href="https://lyricalsansar.com/" target="_bishal">
                  Figma
                </a>
                <br />
              </div>
            </div>
            {/* right side data toggle */}
            <div className="col-md-8 pl-5 about-info">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  area-labeledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label> User ID</label>
                    </div>

                    <div className="col-md-6">
                      <p>{userData._id}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Name:</label>
                    </div>

                    <div className="col-md-6">
                      <p>{userData.name}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Email :</label>
                    </div>

                    <div className="col-md-6">
                      <p>{userData.email}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>phone</label>
                    </div>

                    <div className="col-md-6">
                      <p>{userData.phone}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Pofession</label>
                    </div>

                    <div className="col-md-6">
                      <p>{userData.work}</p>
                    </div>
                  </div>
                </div>

                {/*..................*/}
                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  area-labeledby="profile-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>Experience</label>
                    </div>

                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Name:</label>
                    </div>

                    <div className="col-md-6">
                      <p>Bishal Shrestha</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label> User ID</label>
                    </div>

                    <div className="col-md-6">
                      <p>jsdfhjsdhf</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
