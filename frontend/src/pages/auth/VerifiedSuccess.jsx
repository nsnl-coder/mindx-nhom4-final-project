import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useCallApi from '../../hooks/useCallApi'
const VerifySuccess = () => {
  const { sendRequest, error, isLoading } = useCallApi()
  const { id, token } = useParams()
  const [success, setSuccess] = useState(false)
  const applyApiData = () => {
    setSuccess(true)
  }
  useEffect(() => {
    sendRequest(
      {
        method: 'get',
        url: `${
          import.meta.env.VITE_BACKEND_HOST
        }/api/auth/verify/${id}/${token}`,
      },
      applyApiData
    )
  }, [])

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h2>Verified {success ? 'successfully' : 'error'} </h2>
        <button className="rounded-[50px] bg-primary w-[150px] py-2">
          LOGIN
        </button>
      </div>
    </div>
  )
}

export default VerifySuccess
