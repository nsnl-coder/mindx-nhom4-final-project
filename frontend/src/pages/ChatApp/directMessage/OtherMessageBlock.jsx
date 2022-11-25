import OtherMessage from './OtherMessage'

const OtherMessageGroup = ({ messages, receiver }) => {
  return (
    <div className="space-y-4 mr-20">
      <div className="flex space-x-2 items-center">
        <img
          src={receiver?.profileImage}
          alt="Profile image"
          className="w-6 h-6 object-cover object-center rounded-full"
        />
        <p className="font-medium whitespace-nowrap">{receiver?.username}</p>
      </div>
      <div className="ml-8 space-y-1.5">
        {messages.map((message) => (
          <OtherMessage key={message._id} message={message} />
        ))}
      </div>
    </div>
  )
}

export default OtherMessageGroup
