import NotifyItem from './NotifyItem'

const Notify = () => {
  return (
    <div className="flex-grow bg-white h-screen border-r md:w-96">
      <h2 className="font-bold text-2xl px-4 py-4">Notifications</h2>
      <div className="space-y-2">
        <NotifyItem />
        <NotifyItem />
        <NotifyItem />
        <NotifyItem />
        <NotifyItem />
        <NotifyItem />
      </div>
    </div>
  )
}

export default Notify
