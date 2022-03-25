import { useEffect, useState } from "react";
import indFlag from "./images/ind_flag.svg";
import "./form.css";
import RadioButton from "./RadioButton";
import Alert from "./Alert";


const getLocalStorage = ()=>{
  let list = localStorage.getItem("list");
  return list ? JSON.parse(list) : []
}


const Form = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    question1: "",
    question2: "",
    question3: "",
    question4: "",
  });

  const [errors, setErrors] = useState({})
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  const [flag, setFlag] = useState(false);
  const [list, setList] = useState(getLocalStorage());

  const handleChange = (eve)=>{
    let {name, value} = eve.target;
    if(name === "question1_good" ||  name === "question1_fair" || name === "question1_bad"){
      name = "question1";
    }
    if(name === "question2_good" ||  name === "question2_fair" || name === "question2_bad"){
      name = "question2"
    }
    if(name === "question3_good" ||  name === "question3_fair" || name === "question3_bad"){
      name = "question3"
    }
    if(name === "question4_good" ||  name === "question4_fair" || name === "question4_bad"){
      name = "question4"
    }

    setFormValues({...formValues, [name]: value})
  }

  const handleSubmit = (eve)=>{
    eve.preventDefault();
    setErrors(validate(formValues))
    setIsReadyToSubmit(true);
  }
  const validate = (values)=>{
    const validations = {};
    const validMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const validPhone = /^[0-9]*$/;

    if(!values.name){
      validations.name = "Error: This is mendatory field";
    }
    if(!values.email){
      validations.email = "Error: This is mendatory field";
    }else if(!validMail.test(values.email)){
      validations.email = "Error: Email is not valid!";
    }
    
    if(!values.phone){
      validations.phone = "Error: This is mendatory field";
    }else if(values.phone.length !== 10 || !validPhone.test(values.phone)){
      validations.phone = "Error: Phone number is not valid!";
    }
    if(!values.question1){
      validations.question1 = "Error: This is mendatory field";
    }
    if(!values.question2){
      validations.question2 = "Error: This is mendatory field";
    }
    if(!values.question3){
      validations.question3 = "Error: This is mendatory field";
    }
    if(!values.question4){
      validations.question4 = "Error: This is mendatory field";
    }
    return validations;
  } 


  useEffect(()=>{
    if(Object.keys(errors).length === 0 && isReadyToSubmit){
      const newItem = {id: new Date().getTime().toString(), ...formValues};
      setList([...list, newItem]);
      setFormValues({
        name: "",
        email: "",
        phone: "",
        question1: "",
        question2: "",
        question3: "",
        question4: "",
      })
      setFlag(true)
      setIsReadyToSubmit(false);
    }
  }, [errors])

  useEffect(()=>{
    localStorage.setItem("list", JSON.stringify(list));
  }, [list])

  return (
    <main className="main">
      <div className="container">
        <h3 className="heading">Aromatic Bar</h3>
        <p className="desc">
          We are committed to providing you with the best dining experience
          possible, so we welcome your comments. Please fill out this
          questionnaire. Thank you.
        </p>
      </div>
      <form className="container frm" onSubmit={handleSubmit}>
        <div className="frm-text-sec">
          <div className={`frm-control ${errors.name && "rm-margin"}`}>
            <label htmlFor="name">Name<sup className={errors.name && "danger-sup" } >*</sup></label>
            <input
              type="text"
              placeholder="name"
              id="name"
              name="name"
              className={`normal-inp ${errors.name && "danger-inp"}`}
              value={formValues.name}
              onChange={handleChange}
            />
            { errors.name &&  <p className="err">{errors.name}</p>}
          </div>
          <div className={`frm-control ${errors.email && "rm-margin"}`}>
            <label htmlFor="name">Email<sup className={errors.email && "danger-sup" } >*</sup></label>
            <input
              type="email"
              placeholder="email"
              id="email"
              name="email"
              className={`normal-inp ${errors.email && "danger-inp"}`}
              value={formValues.email}
              onChange={handleChange}
            />
            { errors.email &&  <p className="err">{errors.email}</p>}
          </div>
          <div className={`frm-control ${errors.email && "rm-margin"}`}>
            <label htmlFor="name">Phone<sup className={errors.phone && "danger-sup" } >*</sup></label>
            <div className={`pass-inp ${errors.phone && "danger-inp"}`}>
              <img src={indFlag} alt="#" className="frm-control__img" />
              <input 
              type="text" 
              placeholder="phone" 
              id="phone" 
              name="phone" 
              value={formValues.phone}
              onChange={handleChange}
              />
            </div>
            { errors.phone &&  <p className="err">{errors.phone}</p>}
          </div>
        </div>
        <div className="frm-checkbox-sec">
          {<RadioButton name="question1" formValues={formValues} handleChange={handleChange} errors={errors}  />}
          {<RadioButton name="question2" formValues={formValues} handleChange={handleChange} errors={errors} />}
          {<RadioButton name="question3" formValues={formValues} handleChange={handleChange} errors={errors} />}
          {<RadioButton name="question4" formValues={formValues} handleChange={handleChange} errors={errors} />}
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      {flag && <Alert setFlag={setFlag} />}
    </main>
  );
};

export default Form;
