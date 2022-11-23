const OtherMessage = ({ message }) => {
  return (
    <div className="flex justify-start">
      <div className="text-text/70 bg-white px-4 py-3 rounded-lg">
        {message.content}
      </div>
    </div>
  )
}

export default OtherMessage
