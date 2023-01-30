import { useRouter } from "next/router";
import { useState } from "react";


export default  function Register() {
  const router = useRouter()
  const [userData, setUserData] = useState({
    name:'',
    email:'',
    password:'',
    repeatPassword:'',
  });
const submitForm = async (e) =>{
e.preventDefault()

try{
const response = await fetch("/api/signup",
 {
  headers:{
    'Content-Type':'application/json',
  },
   body: JSON.stringify({
    name:userData.name,
    email: userData.email,
    password: userData.password,
    repeatPassword: userData.repeatPassword
   }),
   method:'POST',
  },
  alert('Користувач створений!'),
  router.push('/login')
);
} catch (error) {
  console.error(error);
}
};

const handleChange = (e) => {
const { name, value } = e.target;
setUserData({ ...userData, [name]: value });
};

    return (
      <div>
        <h1>Реєстрація</h1>
        <form
          onSubmit={submitForm}>
            <div>
              <label htmlFor="name">Ім`я</label>
              <input type="text" name="name"  onChange={(e) => handleChange(e)}
              required/>
            </div>
  
            <div>
              <label htmlFor="email">Email</label>
              <input type="text" name="email"  onChange={(e) => handleChange(e)}
              required/>
            </div>
  
            <div>
              <label htmlFor="password">Пароль</label>
              <input type="password" name="password"  onChange={(e) => handleChange(e)}
              required/>
            </div>

            <div>
              <label htmlFor="repeatPassword">Підтвердіть пароль</label>
              <input type="password" name="repeatPassword"  onChange={(e) => handleChange(e)}
              required/>
            </div>
  
            <button type="submit" >Зареєструватись</button>
     </form>
        
      </div>
    )
  }