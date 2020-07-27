import React,{Fragment ,useState} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
const Register =()=>{
    const [text, setText] = useState("");
    const [password, setPassword] = useState("");
    const [retypepassword, retypesetPassword] = useState("");
    function validateForm() {
        return text.length > 0 && password.length > 0;
      }
    return (
        <Fragment>
            <Helmet><title>register page</title></Helmet>
            <h2>Register</h2>
            <form className="login-container">
            <label>
                User Name:
                <input type="text" value={text} onChange={e => setText(e.target.value)} name="name" />
                Mail id:
                <input type="email" name="mail" />
                Set Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" />
                Retype Password: 
                <input type="password" value={retypepassword} onChange={e => retypesetPassword(e.target.value)}name="password" />
            </label>
            <Link to={validateForm()?{ pathname:"/play/instructions/",aboutProps:{text}} : {pathname:"/register"} } className="submit-button"  type="submit" value="Submit" >Submit</Link>            </form>
        </Fragment>
    );
};
export default Register;