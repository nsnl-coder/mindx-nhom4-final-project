const MyMessage = ({ message }) => {
  return (
    <div className="flex justify-end">
      <div className="text-white bg-blue-message px-4 py-3 rounded-lg">
        {message.content}
      </div>
    </div>
  )
}

export default MyMessage
