import React, {useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import './Category.css';
const Category = () =>{
    
    const history = useHistory();

    const [category, setCategory] = useState([]);
  
    let name, value;
    // here e is ek mera form hai
    const handleInputs = (e) =>{
      console.log(e);
      name=e.target.name; 
      // console.log(e.target.name);
      value = e.target.value;
      setCategory({...category, [name]:value}); 
    }
     
    const PostData = async (e) =>{
      e.preventDefault();  

      const {name} = category;

      //................with the help of fetch api
      const res = await fetch("/categorypage",{
        method:"POST",
        headers: { 
          "Content-Type":"application/json",  
        },
        body:JSON.stringify({
            name
        })
      });
  
      const data = await res.json(); 
      if(res.status === 422 || !data){
        window.alert("category add failed"); 
        console.log("category add failed");
      }else{
        window.alert("add category details successful"); 
        console.log("category add success");
        // history.push("/category");
        window.location.reload();
      }
  
    }

    // selecting data from the server

    const [categoryList, setCategoryList] = useState([]);

  //react ma sab kuch state nai hai
  // suruma first time faalse hunxa
  const userCategoryPage = async() =>{
    try{
        const res = await fetch('/categorydata',{
            method:"GET",
            headers:{
                "Content-Type" :"application/json"
            },
        });

        const data = await res.json();
        console.log(data);
        setCategoryList(data);

        

        //jab mujhe data milda hai teti bela true kardunga
    }catch(err){
        console.log(err);

    }

}

useEffect(()=>{
  userCategoryPage();
},[]);

// for updating category

const updateCategory = async(id) =>{
  const newName = prompt("Enter a New Category Name");

  const res = await fetch('/categoryupdate',{
    method:"PUT",
    headers:{
      "Content-Type" :"application/json"
    },
    body:JSON.stringify({
      newName:newName,
      id:id 
    })


  })

   res.json();
  setCategory(category.map((val, key)=>{
    return val._id ===id ? {_id:id, name:newName} : val;
  }))
}

const deleteCategory = async(id) =>{
  const res = await fetch(`/categorydelete/${id}`,{
    method:"DELETE",
    headers:{
      "Content-Type" :"application/json"
    }
  });

  res.json(); 
// filter doest it you can filter through every element and you determine
//which ones should stay and which shouldnot
setCategory(category.filter((val)=>{
  // funciton will be rturn boolean

  //it going to keep only the elements in the list which dont 
  //satisfy this condition which means its going to keep
  //everything but going to set the list equal to temporarly list
  return val._id !==id
}));
//


}


// step for search
// ................... searching

const [search, setSearch] = useState("");

const handleSearchChange = (e) =>{
    setSearch(e.target.value);
}

const filtered = !search ? categoryList : categoryList.filter((val)=>{
  return val.name.toLowerCase().includes(search.toLowerCase())
});

    return(
        <>
            <div className="category_container">
                <div className="category_main">
                    <div className="category_form">
                    
                        <form method="POST">      
                            Name: <input type="name" name="name"
                            value={category.name}
                            onChange={handleInputs}
                             placeholder="Category Name"/><br/>
                           <div className="submit_group">
                            <input type="submit" name="submit" value="Add" onClick={PostData}/>
                            {/* <input type="submit" name="submit" value="Cancel" /> */}
                            </div>
                        </form>
                    </div>
                    
                    <div className="categorylist">
{/* search bar */}
                    <form>
                    <input type="search" 
                     name="search"
                     value={search}
                     onChange={handleSearchChange}
                      placeholder='search'/>
                    </form>
                    <h2>List of House Category</h2>
                    
                    <form method="GET">
                    {/* <input type="search" name="search"
                     onChange={this.handelSearchArea}/
                     > */}

                        <table>  
                               <thead>
                            
                                   <tr>
                                       <td>#</td>
                                       <td>Name</td>
                                       <td>Action</td>

                                   </tr>
                               </thead>
                               <tbody>
                               {filtered.map((val, key)=>{
                                 return <tr>
                                   <td>{val._id}</td> 
                                   <td>{val.name}</td> 

                                   <button
                                    onClick={()=>{
                                     updateCategory(val._id);
                                   }}
                                   style={{color:"green"}}>Update</button>

                                   <button
                                   onClick={()=>{
                                     deleteCategory(val._id);
                                   }}
                                   style={{color:"red"}}>Delete</button>
                                 </tr>
                               })}  
                               </tbody>
                        </table>
                        
                    </form>
                    </div>
                </div>
                

            </div>
        </>
    )
}


export default Category;