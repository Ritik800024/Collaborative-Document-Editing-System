import { Icon } from '@iconify/react';
import Textinput from '../components/shared/textinput';
import Passwordinput from '../components/shared/passwordinput';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { makeunauthenticatedpost } from '../utils/serverhelper';
const Logincomponent=()=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
    const login=async ()=>{
        const data={email,password}
        const response=await makeunauthenticatedpost(
            "/auth/login",
            data
        )
        if(response && !response.err){
            console.log(response)
            localStorage.setItem("token",response.token)
            navigate("/home")
        }
        else{
            alert("Fail")
        }
    }
    return <div className="w-full h-full flex flex-col items-center">
        <div className='logo p-4 border-b border-solid border-gray-300 w-full flex justify-center'>
        <Icon icon="file-icons:microsoft-word" color="green" width="120"/><span className='mt-20 ml-3 font-semibold text-xl text-green-700'>Document Editor</span>
        </div>
        <div className='inputRegion w-1/2 py-6 flex items-center justify-center flex-col'>
            <div className='font-bold mb-12 w-full text-center'>To continue, Log In  </div>
            <Textinput 
                placeholder="email or username" 
                label="Email or Username" 
                value={email} 
                setValue={setEmail}
            />
            <Passwordinput 
                placeholder="Enter your password" 
                label="Password" 
                value={password} 
                setValue={setPassword}
            />
            <div className='w-full flex items-center justify-end my-10'>
            <button className='bg-green-300 font-semibold p-3 px-4 rounded-full'
            onClick={(e)=>{
                e.preventDefault
                login()
            }}>LOG IN</button>
            </div> 
            <div className='w-full border border-solid border-gray-300'></div>
            <div className='my-6 font-semibold text-xl'>Don't have an account?</div>
            <div className='border border-gray-400 w-full flex items-center justify-center py-4 rounded-full text-gray-500 font-bold'>
                <Link to="/signup">SIGN UP</Link>
            </div>
        </div>
    </div>
}

export default Logincomponent