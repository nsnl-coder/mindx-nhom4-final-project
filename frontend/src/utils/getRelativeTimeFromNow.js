import intervalToDuration from 'date-fns/intervalToDuration'
import { useTranslation } from 'react-i18next'

const getRelativeTimeFromNow = (date) => {
  const { t } = useTranslation()

  const duration = intervalToDuration({
    start: new Date(date),
    end: new Date(),
  })
  const { months, days, hours, minutes, seconds } = duration

  let durationFromNow

  if (months !== 0)
    durationFromNow = `${months} ${months > 1 ? t('months') : t('month')} ${t(
      'ago'
    )}`
  else if (days !== 0)
    durationFromNow = `${days} ${days > 1 ? t('days') : t('day')} ${t('ago')}`
  else if (hours !== 0)
    durationFromNow = `${hours} ${hours > 1 ? t('hours') : t('hour')} ${t(
      'ago'
    )}`
  else if (minutes !== 0)
    durationFromNow = `${minutes} ${
      minutes > 1 ? t('minutes') : t('minute')
    } ${t('ago')}`
  else if (seconds !== 0)
    durationFromNow = `${seconds} ${
      seconds > 1 ? t('seconds') : t('second')
    } ${t('ago')}`
  return durationFromNow
}

export default getRelativeTimeFromNow
