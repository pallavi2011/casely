"use client"

import { useQuery } from '@tanstack/react-query'
import React, {useState, useEffect} from 'react'
import { getAuthStatus } from './action'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const page = () => {
  const [configId, setConfigId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
      const configurationId = localStorage.getItem("configurationId")
      if(configurationId) setConfigId(configurationId)
  }, [])

  const {data} = useQuery({
    queryKey:["auth-callback"],
    queryFn: async() => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
    
  })

  if(data?.success){
    if(configId){
        localStorage.removeItem("configurationId")
        router.push(`/configure/preview?id=${configId}`)
    }
    else{
      router.push("/")
    }
  }


  return (
    <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col gap-2 items-center'>
        <Loader2 className='size-8 animate-spin text-zinc-500'/>
        <h3 className='font-semibold text-xl'>Logging you in...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  )
}

export default page


