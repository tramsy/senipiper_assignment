import { useEffect } from "react";
import "./alert.css"
const Alert = ({setFlag})=>{

    useEffect(()=>{
        const timeOut = setTimeout(()=>{
            setFlag(false)
        }, 1500);
        return ()=>clearTimeout(timeOut);
    }, [])

    return(<>
        <div className="alert">
            <p> Thank you for completing the information</p>
        </div>
    </>)
}

export default Alert;