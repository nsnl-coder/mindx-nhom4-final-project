import { useContext } from 'react'
import { MdEditNotifications } from 'react-icons/md'
import { useTranslation } from 'react-i18next'

//
import { NotifyContext } from '../../../contexts'
import NotifyItem from './NotifyItem'

const Notify = () => {
  const { otherNotify } = useContext(NotifyContext)
  const { t } = useTranslation()

  return (
    <div className="bg-white border-r flex-shrink-0 max-w-full w-80 shadow-md h-[80vh] overflow-y-auto small-scrollbar rounded-xl">
      <h2 className="font-bold text-2xl px-4 py-4">{t('notifications')}</h2>
      <div className="space-y-2 bg-base-100">
        {otherNotify.length > 0 &&
          otherNotify.map((noti) => <NotifyItem noti={noti} key={noti._id} />)}
        {otherNotify.length === 0 && (
          <div className="flex flex-col items-center mt-8 px-4 text-center">
            <div>
              <MdEditNotifications className="text-gray-300 text-8xl" />
            </div>
            <p className="px-4 text-center">{t('empty_notifications')}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notify
