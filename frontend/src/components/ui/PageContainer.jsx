import { useEffect } from 'react'

const PageContainer = (props) => {
  const { title, className } = props

  useEffect(() => {
    if (title) {
      document.title = title
    }
  }, [])

  return (
    <div className={`max-w-6xl px-10 mx-auto ${className}`}>
      {props.children}
    </div>
  )
}

export default PageContainer
