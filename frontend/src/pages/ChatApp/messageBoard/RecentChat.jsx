const RecentChat = () => {
  const [isActive, isTyping, message] = [true, true, 'see you tommorow']

  return (
    <div className="flex gap-x-3 py-3 hover:bg-gray-message cursor-pointer">
      <div className="relative w-12 h-12">
        <img
          src="https://themumbaicity.com/wp-content/uploads/2022/04/201-1.jpg"
          alt="Profile image"
          className="w-full h-full object-cover object-center rounded-full"
        />
        {isActive && (
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full absolute right-0.5 -bottom-0.5"></div>
        )}
      </div>
      <div className="text-sm">
        <p className="font-bold">Kathryn</p>
        {!isTyping && <p className="text-text-message">See you tommorow!</p>}
        {isTyping && <p className="text-blue-message">typing....</p>}
      </div>
    </div>
  )
}

export default RecentChat
