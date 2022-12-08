import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useParams, Link } from 'react-router-dom'
import Countdown from 'react-countdown'
import Logo from '../../assets/logo-icon-small.svg'
import useCallApi from '../../hooks/useCallApi'
import { showToastSuccess, showToastError } from '../../utils/toast'
import IconReturn from '../../assets/icon-return.svg'

const Verify = () => {
  const { id } = useParams()
  const { error, isLoading, sendRequest } = useCallApi()
  const [delay, setDelay] = useState(false)
  const location = useLocation()
  const { t } = useTranslation()
  const applyData = (data) => {
    showToastSuccess(t('send-email-successfully'))
    setTimeout(() => {
      setDelay(false)
    }, 10000)
    setDelay(true)
  }
  const resendEmail = () => {
    sendRequest(
      {
        method: 'post',
        url: `/api/auth/resendEmail/${id}`,
      },
      applyData
    )
  }
  useEffect(() => {
    if (error) {
      showToastError(t('send-email-failed'))
    }
  }, [error])
  return (
    <div className="flex items-center justify-center h-screen">
      <Link to="/auth/register">
        <img
          src={IconReturn}
          alt=""
          className="cursor-pointer absolute md:top-10 md:left-20 top-0 left-0"
        />
      </Link>
      <div className="w-[500px]  shadow-md shadow-[#33333374] text-center border-[1px] border-[#33333338] rounded-md p-5 relative">
        <img
          src={Logo}
          alt=""
          className="absolute -top-[30px] left-[50%] -translate-x-[50%] h-[60px]  "
        />
        <h2 className="text-xl font-semibold mb-5 mt-7">{t('verify-email')}</h2>
        <p className="mb-5">
          {t('verify-email-address')}
          <span className="font-bold">{location.state.email}</span>
        </p>
        <p className="mb-5">{t('veirfy-email-content')}</p>
        <p>{t('still-not-email')}</p>
        <button
          disabled={delay || isLoading ? true : false}
          onClick={resendEmail}
          className={` disabled:opacity-50 relative w-[150px] h-[40px] bg-primary text-white rounded-md text-md font-roboto  mt-4 shadow-sm shadow-black active:shadow-none font-semibold`}
        >
          {t('resend-email')}
        </button>

        {delay && (
          <p className="mt-2">
            {t('count-seconds-content')}
            <Countdown
              date={Date.now() + 15000}
              renderer={(props) => (
                <div className="text-xl font-bold text-primary">
                  {Math.round(props.total / 1000)}
                </div>
              )}
            />
          </p>
        )}
      </div>
    </div>
  )
}

export default Verify
