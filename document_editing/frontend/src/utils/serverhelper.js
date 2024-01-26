import { json } from "react-router-dom"

export const makeunauthenticatedpost=async (route,body)=>{
    const response=await fetch("http://localhost:3002"+route,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(body)
    })
    const formatedresponse=await response.json()
    return formatedresponse
}

export const maketaskpost=async (route,body)=>{
    const response=await fetch("http://localhost:3002"+route,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(body)
    })
    const formatedresponse=await response.json()
    return formatedresponse
}

export const removetask=async (route,id)=>{
    const response=await fetch("http://localhost:3002"+route+`/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        },
    })
    const formatedresponse=await response.json()
    return formatedresponse
}
