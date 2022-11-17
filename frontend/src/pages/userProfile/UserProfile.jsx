import { loggedInOnly, wrapperWithHeader } from '../../components'

const UserProfile = () => {
  return (
    <>
      <h1>UserProfile</h1>
    </>
  )
}

export default loggedInOnly(wrapperWithHeader(UserProfile))
