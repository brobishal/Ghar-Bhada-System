import React, {useState} from 'react';

const CheckBox = ({categories, handleFilters}) => {
 const [checked, setChecked] = useState([])
 const handleToggle = c=>()=>{
  const currentCategoryId = checked.indexOf(c)
  const newCheckedCategoryId =[...checked]
  if(currentCategoryId === -1){
   newCheckedCategoryId.push(c)
  }
  else{
   newCheckedCategoryId.splice(currentCategoryId, 1)
  }
  setChecked(newCheckedCategoryId)
  handleFilters(newCheckedCategoryId,1)
 }
  return (
  <>
  {categories.map((c,i)=>(
   <div className="form_check" key={i}>
   <input className="form_check_input" type="checkbox"
   onChange={handleToggle(c._id)}
   value={checked.indexOf(c._id === -1)}/>
   <label className="form_check_label">
       {c.name}
   </label>
 </div>
  ))}
  </>
  );
};

export default CheckBox;
