import React, {useState} from 'react';

const RadioBox = ({prices, handleFilters}) => {
 const [value, setValue] = useState('')
 const handleChange = e =>{
  handleFilters(e.target.value)
  setValue(e.target.value)
 }
  return (
  <>
  {prices.map((p,i)=>(
   <div className="form_check" key={i}>
   <input className="form_check_input" type="radio" name='flexRadio'
   onChange={handleChange}
   value={`${p._id}`}/>
   <label className="form_check_label">
       {p.name}
   </label>
 </div>
  ))}

  </>
  );
};

export default RadioBox;
