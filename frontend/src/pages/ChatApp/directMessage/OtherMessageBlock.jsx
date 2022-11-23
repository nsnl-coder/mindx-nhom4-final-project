import OtherMessage from './OtherMessage'

const OtherMessageGroup = () => {
  return (
    <div className="space-y-4 mr-20">
      <div className="flex space-x-2 items-center">
        <img
          src="https://themumbaicity.com/wp-content/uploads/2022/04/201-1.jpg"
          alt="Profile image"
          className="w-6 h-6 object-cover object-center rounded-full"
        />
        <p className="font-medium whitespace-nowrap">Nancy momoland</p>
      </div>
      <div className="ml-8 space-y-1.5">
        <OtherMessage />
        <OtherMessage />
        <OtherMessage />
        <OtherMessage />
      </div>
    </div>
  )
}

export default OtherMessageGroup
