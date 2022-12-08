import React from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaRegCheckCircle } from 'react-icons/fa'
import { BiErrorCircle } from 'react-icons/bi'
import useCallApi from '../../hooks/useCallApi'
import { LoadingSpinner } from '../../components'
const VerifySuccess = () => {
  const { t } = useTranslation()
  const { sendRequest, error, isLoading } = useCallApi()
  const { id, token } = useParams()
  const [success, setSuccess] = useState(true)
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
    <div className="flex items-center justify-center h-screen text-center">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {success ? (
            <div className="flex items-center flex-col">
              <FaRegCheckCircle className="text-9xl text-primary mb-5" />
              <h2 className="text-2xl font-semibold mb-3">
                {t('verify-successfully')}
              </h2>
              <Link to="/auth/login">
                <button className="rounded-[50px] text-white font-semibold shadow-sm shadow-black active:shadow-none bg-primary w-[150px] py-2">
                  {t('login')}
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center flex-col">
              <BiErrorCircle className="text-9xl text-primary mb-5" />
              <h2 className="text-2xl font-semibold mb-3">
                {t('verify-failure')}
              </h2>
              <Link to="/auth/register">
                <button className="rounded-[50px] uppercase text-white font-semibold shadow-sm shadow-black active:shadow-none bg-primary w-[150px] py-2">
                  {t('register')}
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default VerifySuccess
