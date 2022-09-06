import React, {useState} from 'react';
import {NavLink, useHistory } from 'react-router-dom';
import './Login.css';

const Login = () => {

    const history = useHistory();
    const [user, setUser] = useState({
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
        setUser({...user, [name]:value});


      }

      const PostData = async (e)=>{
          e.preventDefault();
            //object destructuring
            const {email, password} =user;

            if(!email  || !password){

            }else{
                localStorage.setItem('userdata', JSON.stringify(user));
            }

        //with the help of fetch api

        const res = await fetch("/signin",{ 
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
        if(res.status === 400 || !data){
            window.alert("invalid login please fill the data properly");

        }else{
            //type matlap konsa action perform kar rahe ho ra payload means extra message

            window.alert("login successful");
            // for redirect
            history.push("/");
        }
      }

    return(
        <>
            <div className="logincontainer">
                <div className="loginmain">
                <div className="formdata">
                    <form method="POST" className="my_form">
                    <h2>Login </h2>
                        <div className="label1">
                            Email:<input type="email" name="email" placeholder="Email" autoComplete='off'
                            value={user.email}
                            onChange={handleInputs}
                            className="text1"/> <br/>
                            Password:<input type="password" name="password" placeholder='Password' autoComplete='off' 
                            value={user.password}
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
                            </div>
                        </div>
                    </form>

                </div>

                </div>

            </div>
        </>
    )
}

export default Login;