import MyMessage from './MyMessage'

const MyMessageBlock = ({ messages }) => {
  return (
    <div className="space-y-4 mt-auto ml-20">
      <div className="flex space-x-2 items-center justify-end">
        <p className="font-medium text-sm">You</p>
        <img
          src="https://themumbaicity.com/wp-content/uploads/2022/04/201-1.jpg"
          alt="Profile image"
          className="w-6 h-6 object-cover object-center rounded-full"
        />
      </div>
      <div className="space-y-1.5 mr-8">
        {messages.map((message) => (
          <MyMessage key={message._id} message={message} />
        ))}
      </div>
    </div>
  )
}

export default MyMessageBlock
