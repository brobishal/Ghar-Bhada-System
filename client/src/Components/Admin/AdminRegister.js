import React, {useState} from 'react';
import './AdminRegister.css';
import { useHistory } from 'react-router-dom';

const AdminRegister = () => {
    const history = useHistory();
    const [admin, setAdmin] = useState({ name:"", email:"" , password:"", cpassword:""});
    const handleInputs = (e) =>{
        let name, value;
        name = e.target.name;
        value = e.target.value;
        setAdmin({...admin, [name]:value});
    }

    const PostData = async(e) =>{
        e.preventDefault();
        //object destructuring

        const {name, email, password, cpassword} = admin;
        const res = await fetch('/adminregister',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name, email, password, cpassword
            })
        });

        const data = await res.json();
        if(res.status === 422 ||  !data){
            window.alert('invalid registration please fill the data');
            console.log("invalid registration");

        }else{
            window.alert("registration successful");
            console.log("Successful registration");
            history.push("/LoginAdmin");
        }    }
   
    return(
        <>
            <div className="register_container">
                <div className="register_main">
                <div className="form_data">
                    <form method="POST" className="myform" > 
                    <h2>Admin Register</h2>
                        <div className="label1">
                        Name:<input type="name" name="name" placeholder="name" autoComplete='off'
                        value={admin.name}
                        onChange={handleInputs}
                         className="text1"/> <br/>
                        Email:<input type="email" name="email" placeholder="Email" autoComplete='off'
                        value={admin.email}
                        onChange={handleInputs}
                         className="text1"/> <br/>
                        Password:<input type="password" name="password" placeholder='Password' autoComplete='off'
                        value={admin.password}
                        onChange={handleInputs}
                         className="text1"/>
                        Current Password:<input type="password" name="cpassword" placeholder='Current Password' autoComplete='off' 
                         value={admin.cpassword}
                        onChange={handleInputs}
                        className="text1"/>

                        </div>
                        <div className="login_label">
                        <div className="input2">
                        <input type='submit' name="submit" value="Sign Up" placeholder='signup' onClick={PostData}/>
                        </div>
                        </div>
                    </form> 

                </div>

                </div>

            </div>
        </>
    )
}

export default AdminRegister;