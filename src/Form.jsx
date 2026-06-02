import React, { useEffect } from 'react'
import { useState , useRef} from 'react'

const Form = () => {
    

    useEffect(()=>{
        console.log("useeffect run");
        
         const get = async()=>{
            try{
                const rawdata = await fetch("https://69ce111433a09f831b7cd927.mockapi.io/User")
                const res = await rawdata.json() 
                console.log(res)
            }
            catch(error){
                console.log("Error",error)
            }
         }

         get()
    },[]);
  

    let [name, setName] = useState("")
    let email = useRef()
    let password = useRef()
    let confirmPassword = useRef()
    let[error,setError]=useState("")

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    

    

    const handleSubmit=(e)=>{
        e.preventDefault()
        setError("")

        const payload = {
            name:name,
            email:email.current.value,
            password:password.current.value,
            confirmPassword:confirmPassword.current.value
        }
        

        if(!(payload.name.length>=3)){
            setError("Name must be at least 3 characters long ")
            return
        }

        if(emailRegex.test(email.current.value)===false){
            setError("Please enter a valid email address")
            return
        }

        if(!(passwordRegex.test(password.current.value))){
            setError("Password must be at least 8 characters long and contain at least one letter and one number")
            return
        }
        if(payload.password!==payload.confirmPassword){
            setError("Password and confirm password must match")
            return
        }

        // const payload={
        //     Name:name,
        //     Email:email.current.value,
        //     password:password.current.value,
        //     ConfirmPassword:confirmPassword.current.value
        // }
        
        fetch("https://69ce111433a09f831b7cd927.mockapi.io/User",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(payload)
        })
        .then((res)=>res.json())
        .then((res)=>{
            console.log("edhu res",res)
            console.log("res works perfectly fine")
        })
        .catch((err)=>{
        console.log("error",err);
        })


        // console.log(data);

        alert("Data submitted successfully")
        setName("")
        email.current.value=""
        password.current.value=""
        confirmPassword.current.value=""
        
    }
    
    
  return (
    <div>
        <h1>Hello {name } Welcome to the Login Page</h1>
        <form onSubmit={handleSubmit}>

            <input value={name} placeholder='Type Something' 
            onChange={(e)=>{setName(e.target.value)
                if(e.target.value.length>=3){
                    setError("")
                }
            }}/>


        <input ref={email} type="email" placeholder='Enter email' onChange={(e)=>{
            if(emailRegex.test(e.target.value)){
                setError("")
            }
        }} />

        <input ref={password} type="password" placeholder='Enter password' onChange={(e)=>{
            if(passwordRegex.test(e.target.value)){
                setError("")
            }
        }} />
        <input ref={confirmPassword} type="Password" placeholder='Enter confrim password' onChange={(e)=>{
            if(e.target.value===password.current.value){
                setError("")
            }
        }} />
        {error && <p style={{color:"red"}}>{error}</p>}
        <p>Total Character : {name.length}</p>
        <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Form