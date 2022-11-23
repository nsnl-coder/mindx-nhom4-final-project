const Seperator = ({ text }) => {
  return (
    <div className="flex items-center space-x-4 text-sm text-gray-500">
      <div className="border-b flex-grow"></div>
      <h3 className="text-gray-400 uppercase">{text}</h3>
      <div className="border-b flex-grow"></div>
    </div>
  )
}

export default Seperator
