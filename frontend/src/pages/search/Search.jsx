import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchPost, wrapperWithHeader, SearchUser } from '../../components'
const Search = () => {
  const [searchParam, setSearchParam] = useSearchParams()
  const [menu, setMenu] = useState('post')

  return (
    <div className="min-h-screen">
      <div className="mt-5 flex items-center gap-5 ml-9">
        <button
          onClick={() => setMenu('post')}
          className={`${
            menu === 'post' ? 'bg-primary text-white' : 'bg-[#d9d9d9] text-text'
          } w-20 h-8 cursor-pointer rounded-[50px]`}
        >
          POST
        </button>
        <button
          onClick={() => setMenu('user')}
          className={`${
            menu === 'user' ? 'bg-primary text-white' : 'bg-[#d9d9d9] text-text'
          } w-20 h-8 cursor-pointer rounded-[50px]`}
        >
          USER
        </button>
      </div>
      {menu === 'post' ? (
        <SearchPost search={searchParam.get('q')} />
      ) : (
        <SearchUser search={searchParam.get('q')} />
      )}
    </div>
  )
}

export default wrapperWithHeader(Search)
