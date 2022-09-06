import React, {useState} from 'react';
import './Register.css';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        name:"",email:"",phone:"",address:"",password:"",cpassword:""
    });

    const handleInputs = (e) =>{
        let name, value;
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]:value});
    }

    const PostData = async(e) =>{
        e.preventDefault();
        //     //object destructuring

        const {name, email, phone, address, password, cpassword} = user;
        const res = await fetch('/signup',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name, email, phone, address, password, cpassword
            })
        });

        const data = await res.json();
        if(res.status === 422 ||  !data){
            window.alert('invalid registration please fill the data');
            console.log("invalid registration");

        }else{
            window.alert("registration successful");
            console.log("Successful registration");
            history.push("/Login");

        }
    }

    
    return(
        <>
            <div className="register_container">
                <div className="register_main">
                <div className="form_data">
                    <form method="POST" className="myform" > 
                    <h2>Register</h2>
                        <div className="label1">
                        Name:<input type="name" name="name" placeholder="Email" autoComplete='off'
                        value={user.name}
                        onChange={handleInputs}
                         className="text1"/> <br/>
                        Email:<input type="email" name="email" placeholder="Email" autoComplete='off'
                        value={user.email}
                        onChange={handleInputs}
                         className="text1"/> <br/>
                        Phone:<input type="number" name="phone" placeholder='Mobile' autoComplete='off'
                        value={user.phone}
                        onChange={handleInputs}
                         className="text1"/>
                        Address:<input type="adress" name="address" placeholder="Address" autoComplete='off'
                        value={user.address}
                        onChange={handleInputs}
                         className="text1"/> <br/>
                        Password:<input type="password" name="password" placeholder='Password' autoComplete='off'
                        value={user.password}
                        onChange={handleInputs}
                         className="text1"/>
                        Current Password:<input type="password" name="cpassword" placeholder='Current Password' autoComplete='off' 
                         value={user.cpassword}
                        onChange={handleInputs}
                        className="text1"/>

                        </div>
                        <div className="login_label">
                        <div className="input1">
                        <input type='submit' name="submit" value="Login" placeholder='Email'/>
                        </div>
                        <div className="input2">
                        <input type='submit' name="submit" value="Sign Up" placeholder='Forgot' onClick={PostData}/>
                        </div>
                        </div>
                    </form> 

                </div>

                </div>

            </div>
        </>
    )
}

export default Register;