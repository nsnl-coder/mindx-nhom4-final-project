import React from 'react'

import Logo from '../../assets/logo-icon-small.svg'
const Verify = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[500px] shadow-md shadow-[#33333374] text-center border-[1px] border-[#33333338] rounded-sm p-5 relative">
        <img
          src={Logo}
          alt=""
          className="absolute -top-[30px] left-[50%] -translate-x-[50%] h-[60px]  "
        />
        <h2 className="text-xl font-semibold mb-5 mt-7">
          Please verify your email
        </h2>
        <p className="mb-5">
          You're almost there! We sent an email to{' '}
          <span className="font-bold">nguyenquochaolop91@gmail.com</span>
        </p>
        <p className="mb-5">
          Just click on the link that email to complete your signup.If you
          dont't see it, you may need to check your spam folder.
        </p>
        <p>Still can't the email?</p>
        <button className="w-[150px] h-[40px] bg-primary text-white rounded-md text-md font-roboto  mt-4 shadow-sm shadow-black active:shadow-none font-semibold">
          Resend Email
        </button>
      </div>
    </div>
  )
}

export default Verify
