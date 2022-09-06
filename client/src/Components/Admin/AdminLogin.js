import React, {useState} from 'react';
import {NavLink, useHistory } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
    const history = useHistory();
    const [adminlogin, setAdminLogin] = useState({
        email:"", password:""
    });

      // here e is ek mera form hai
      const handleInputs = (e) =>{
        let name, value;
          console.log(e);
          name = e.target.name;
          value = e.target.value;

          
    // in function ma object create kiya
    // so with the help of spread operator user ko jati pani data xa yesma required karliya
//and now we use square bracket dynamic data get garna saku
//[name] ma hamile name nai get karraha hu ra yesma e.target.name yesko 
//value get kar raha hu
setAdminLogin({...adminlogin, [name]:value});
      }

      const PostData = async (e)=>{
          e.preventDefault();
            //object destructuring
            const {email, password} = adminlogin;

            if(!email  || !password){

            }else{
                localStorage.setItem('admindata', JSON.stringify(adminlogin));
            }
        //with the help of fetch api
        const res = await fetch("/adminlogin",{ 
            method:"POST",
            headers: { 
              "Content-Type":"application/json",
            },
            //server le json data accept gardaina //tesile json lai string ma convert garnu parcha
            body:JSON.stringify({
                // email:email
                email, password
            })
        });

        const data = await res.json();
        console.log(data);
        if(res.status === 400 || !data){
            window.alert("invalid login please fill the data properly");
            console.log("invalid login");

        }else{
            //type matlap konsa action perform kar rahe ho ra payload means extra message
            window.alert("login successful");

            // for redirect

            history.push("/dashboard");
            window.location.reload();

        }
      }

    //   add data to local storage

    // useEffect(()=>{

        //jaba pani yo adminlogin ko value change hunxa
        //hame hamara local storage ma data ko save karna hai
// setItem and getItem ra yo key value pair ma work garchha
//and localStrogae ma da string format mai storage hunxa
// and valye kya hoki mera items

//all localstorage iskey value pair
// JSON.stringify le wrap garnu parchha
    //     localStorage.setItem('lists', JSON.stringify(adminlogin))

    // },[adminlogin])

    return(
        <>
            <div className="logincontainer">
                <div className="loginmain">
                <div className="formdata">
                    <form method="POST" className="my_form">
                    <h2>Admin Login Here </h2>
                        <div className="label1">
                            Email:<input type="email" name="email" placeholder="Email" autoComplete='off'
                            value={adminlogin.email}
                            onChange={handleInputs}
                            className="text1"/> <br/>
                            Password:<input type="password" name="password" placeholder='Password' autoComplete='off' 
                            value={adminlogin.password}
                            onChange={handleInputs}
                            className="text2"/>
                        </div>

                        <div className="login_label">
                            <div className="input1">
                            <input type='submit' name="submit" value="Login" placeholder='Email'
                                onClick={PostData}
                            />
                            </div>
                            <div className="input2">
                            <NavLink to="/adminregister">Create an account</NavLink>
                          
                            </div>
                        </div>
                    </form>

                </div>

                </div>

            </div>
        </>
    )
}

export default AdminLogin;