import { useEffect } from 'react'
import ScrollToTop from 'react-scroll-to-top'
import { Link } from 'react-router-dom'
import { Spinner } from '..'
import iconUp from '../../assets/icon-angle-up.svg'
import useSearchUsers from '../../hooks/useSearchUsers.js'
import SearchCart from './ItemUser.jsx'

const SearchUsers = ({ search }) => {
  const { isLoading, users, lastElementRef, noResultFound } =
    useSearchUsers(search)

  useEffect(() => {
    console.log(document.body.offsetWidth)
  }, [document.body])
  function formatPhotoName(photoLink) {
    if (photoLink?.startsWith('http')) return photoLink
    else return `${import.meta.env.VITE_BACKEND_HOST}/images/` + photoLink
  }

  if (noResultFound) {
    return (
      <div className="h-[50vh] flex flex-col items-center justify-center">
        <h3 className="text-text font-semibold text-2xl">
          It seems there is no user.
        </h3>
      </div>
    )
  }

  return (
    <div className={`bg-white relative px-8 mt-10 `}>
      {users.length > 0 && (
        <div className="flex items-center  flex-wrap gap-4">
          {users.map((user) => {
            return (
              <div className={`${user.userPosts && 'basis-[100%]'}`}>
                <div
                  className="flex sm:gap-7 gap-2 sm:flex-nowrap flex-wrap items-center "
                  key={user._id}
                >
                  <Link to={`/profile/${user._id}`}>
                    <div className="flex items-center justify-center hover:bg-black/10 cursor-pointer  flex-col 2xl:h-[250px] 2xl:w-[250px] sm:w-[150px] w-[140px] h-[140px] sm:h-[150px] lg:w-[200px] lg:h-[200px] rounded-xl gap-2 text-center ">
                      <img
                        src={formatPhotoName(user?.profileImage)}
                        alt=""
                        className="rounded-full 2xl:h-[180px] 2xl:w-[180px] sm:w-[100px] sm:h-[100px] lg:w-[150px] lg:h-[150px] w-[100px] h-[100px] object-cover shadow-sm shadow-[#333] overflow-hidden  "
                      />
                      <h4 className="text-text 2xl:text-[1.5rem] text-xl font-semibold overflow truncate w-full ">
                        {user.username}
                      </h4>
                    </div>
                  </Link>
                  <div className="flex items-center flex-wrap  xl:gap-5 gap-2">
                    {user?.userPosts?.slice(0, 4)?.map((post) => {
                      return (
                        <div
                          className=" 2xl:h-[250px] 2xl:w-[250px] xl:h-[200px] xl:w-[200px] sm:w-[150px] sm:h-[170px] lg:w-[170px] lg:h-[180px] md:w-[160px] md:h-[160px] w-[140px] h-[140px] overflow-hidden"
                          key={post._id}
                        >
                          <SearchCart post={post} user={user} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
      <ScrollToTop
        smooth
        className="w-11 h-11 flex justify-center items-center rounded-full"
        component={<img src={iconUp} alt="icon-up" />}
      />
      {isLoading ? <Spinner /> : null}
      <div className="h-2 absolute bottom-0" ref={lastElementRef}></div>
    </div>
  )
}

export default SearchUsers
