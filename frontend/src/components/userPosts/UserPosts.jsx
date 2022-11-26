import Feed from "../feed/Feed"

const UserPosts = ({ user, userId, collection }) => {
  return (
    <Feed user={user} userId={userId} collection={collection} apiUrl={`/api/post/name/${userId}`} />
  )
}

export default UserPosts