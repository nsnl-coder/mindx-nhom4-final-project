import { wrapperWithHeader, Feed } from '../../components'

const Home = () => {
  return (
    <div className="min-h-screen">
      <Feed />
    </div>
  )
}

export default wrapperWithHeader(Home)
