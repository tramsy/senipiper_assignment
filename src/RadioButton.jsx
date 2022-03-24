const RadioButton = ({ name, formValues, handleChange, errors }) => {
  return (
    <>
      <div  className={`frm-control`}>
        <p>
          Please rate the quality of the service you received from your host
        </p>
        <div className="check-options">
          <div className="frm-check-control">
            <input
              type="radio"
              id="host-ex"
              name={name}
              value="excellent"
              onChange={handleChange}
              checked={formValues[name] === "excellent"}
            />
            <label htmlFor="host-ex">Excellent</label>
          </div>
          <div className="frm-check-control">
            <input
              type="radio"
              id="host-good"
              name={`${name}_good`}
              value="good"
              onChange={handleChange}
              checked={formValues[name] === "good"}
            />
            <label htmlFor="host-good">Good</label>
          </div>
          <div className="frm-check-control">
            <input
              type="radio"
              id="host-fair"
              name={`${name}_fair`}
              value="fair"
              onChange={handleChange}
              checked={formValues[name] === "fair"}
            />
            <label htmlFor="host-fair">Fair</label>
          </div>
          <div className="frm-check-control">
            <input
              type="radio"
              id="host-bad"
              name={`${name}_bad`}
              value="bad"
              onChange={handleChange}
              checked={formValues[name] === "bad"}
            />
            <label htmlFor="host-bad">Bad</label>
          </div>
        </div>
        {errors[name] && <p className="err">{errors[name]}</p> }
      </div>
    </>
  );
};

export default RadioButton;
