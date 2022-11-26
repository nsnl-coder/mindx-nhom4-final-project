import { wrapperWithHeader, Feed } from '../../components'

const Home = () => {
  return (
    <div className="min-h-screen">
      <Feed apiUrl={`/api/post`} />
    </div>
  )
}

export default wrapperWithHeader(Home)
