import { Link } from 'react-router-dom'

const CommentContent = (props) => {
  const { text, mentionsId } = props

  const splitArray = text.split(/(@\[[a-zA-Z ]+\]\([a-zA-Z0-9]+\))/g)

  const jsx = splitArray.map((item) => {
    const id = item.match(/(?<=\()[a-zA-Z0-9]+(?=\))/g)

    if (id && mentionsId.includes(id[0])) {
      const mentionName = item.match(/(?<=@\[)[a-zA-Z0-9 ]+(?=\])/g)

      return (
        <Link
          to={`/profile/${id}`}
          className="bg-mention px-1"
          key={Math.random()}
        >
          {`@${mentionName}` || 'NotFound'}
        </Link>
      )
    } else {
      return <span key={Math.random()}>{` ${item} `}</span>
    }
  })

  return <div>{jsx}</div>
}

export default CommentContent
