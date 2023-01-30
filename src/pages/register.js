import { useState } from "react";

export default function Register() {
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [repeatPassword, setRepeatPassword] = useState('');

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'repeatPassword':
        setRepeatPassword(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const data ={ name, email, password, repeatPassword }
    // try {
      await fetch('/api/signup',{method:'post',
    body:data});
      
      // formFieldsReset();
    // } catch (error) {
    //   alert(`error`);
    //   formFieldsReset();
    // }
  };

  // const formFieldsReset = () => {
  //   setName('');
  //   setEmail('');
  //   setPassword('');
  //   setRepeatPassword('');
  // };


    return (
      <div>
        
          <form onSubmit={handleSubmit}>
            <div>
              <label>Ім`я</label>
              <input type="text" name="name" value={name} onChange={handleChange}/>
            </div>
  
            <div>
              <label>Email</label>
              <input type="text" name="email" value={email} onChange={handleChange}/>
            </div>
  
            <div>
              <label>Пароль</label>
              <input type="password" name="password" value={password} onChange={handleChange}/>
            </div>

            <div>
              <label>Підтвердіть пароль</label>
              <input type="password" name="repeatPassword" value={repeatPassword} onChange={handleChange}/>
            </div>
  
            <button type="submit" >Зареєструватись</button>
          </form>
       
      </div>
    )
  }