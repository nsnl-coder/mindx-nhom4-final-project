import Feed from "../feed/Feed"

const SavedPosts = ({ user, userId, collection }) => {
  return (
    <Feed user={user} userId={userId} collection={collection} />
  )
}

export default SavedPosts