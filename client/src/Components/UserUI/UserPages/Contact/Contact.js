import React, {useEffect,useState} from 'react';
import './Contact.css';
const Contact = () =>{
    const [userData, setUserData] = useState({name:"", email:"", phone:"", message:""});

    const CallContactPage = async() =>{
        try{
            const res = await fetch('/getdata ',{
                method:"GET",
                headers:{
                    "Content-Type" :"application/json"
                },
            });

            const data = await res.json();
            console.log(data);
            // set  data sabai data chaidaina
            setUserData({...userData, name:data.name, email:data.email, phone:data.phone});
            if(!res.status ===200){
                const error = new Error(res.error);
                throw error;
            }


        }catch(err){
            console.log(err);

        }

    }

    // first time contact page ko open gardai check kare user 
    //authenticate hai ya or nai
    useEffect(()=>{
        // useEffect ko help mata ek function ko call kiya

        CallContactPage();
    },[]);

    // we are storing the dara in states

    let name, value;
    const handleInput = (e) =>{
         name = e.target.name;
         value = e.target.value;

        //  dynamic data jobi howa wo put kardunga
         setUserData({...userData, [name]:value})
        //value ma put kardunga
        // setData({...userData, [name]:value})

    }

    // send the data to backend

    const contactForm = async (e) =>{
        e.preventDefault();

        const {name, email, phone, message } = userData;

        const res = await fetch('/contact',{
            method:"POST",
            headers:{
                "Content-Type":"application/js"
            },
            body:JSON.stringify({
                // same as like as name:name, email:email
                name, email, phone, message
            })
        });


        //pending stage ma najawos vanna ko lagi
        const data = await res.json();
        if(!data){
            console.log("message not send");
        }else{
            alert("message send");
            // user ka jo email, name, phone as it is nai raha chaiye
            //and user le je pani message lekheko chha teslai comepletly delete kardena hai
             setUserData({...userData, message:""});
             
        }



    }


  return(
    <>
      {/* contact us form */}
      <div className="contact_form">
             <div className="main_contact">
                        <div className="contact_form_title">
                             Get in Touch
                            </div>
                            <div className="contact_form_data">
                            <form method="POST">
                                <div className="contact-form-name">
                                    <input type="text" name="name" id="contact-form-name"
                                     className="contact-form-name input-field"
                                     value={userData.name}
                                     onChange={handleInput}
                                    placeholder='Your name' required="true"/>

                                    <input type="email" name="email" id="contact-form-email"
                                     className="contact-form-email input-field"
                                     onChange={handleInput}
                                     value={userData.email}

                                    placeholder='Your Email' required="true"/>

                                    <input type="number" name="phone" id="contact-form-phone"
                                     className="contact-form-phone input-field"
                                     onChange={handleInput}
                                     value={userData.phone}

                                    placeholder='Your phone Number' required="true"/>
                                </div>


                                <div className="contact-form-text">
                                    <textarea className="text-field contact-form-message" 
                                    name="message"  
                                    cols="70" rows="10" 
                                    value={userData.message}
                                    onChange={handleInput} 
                                    ></textarea>


                                </div>
                                <div className="contact-form-button">
                                    <button type="submit"
                                     className="button contact-submit-button" 
                                     onClick={contactForm}>Send Message</button>

                                </div>      

                            </form>
                            </div>
             

      </div>
</div>

    

    </>

  );
};

export default Contact;

