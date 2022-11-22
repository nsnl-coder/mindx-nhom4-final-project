import { useEffect, useState } from 'react'
import dompurify from 'dompurify'
import { BsThreeDotsVertical } from 'react-icons/bs'

import {
  Error,
  LoadingSpinner,
  PageContainer,
  wrapperWithHeader,
} from '../../components'
import useGetPostDetail from '../../hooks/useGetPostDetail'
import Comments from './Comments'
import SavedUsers from './SavedUsers'
import ProfileImageAndName from './ProfileImageAndName'

const PostDetail = () => {
  const { isLoading, error, post } = useGetPostDetail()
  const [currentTab, setCurrentTab] = useState('comment')

  if (error) return <Error />
  if (isLoading)
    return (
      <PageContainer>
        <LoadingSpinner />
      </PageContainer>
    )

  return (
    <PageContainer>
      <div className="flex flex-col md:flex-row py-6 gap-x-6">
        <div className="w-full md:w-1/2 mb-8">
          <img src={post?.photo} alt="post image" />
        </div>
        <div className="flex flex-col flex-grow max-w-2xl h-[800px] w-full">
          <div className="overflow-y-auto mb-6 min-h-[160px] max-h-[280px]">
            <ProfileImageAndName user={post?.author} date={post?.createdAt} />
            <div
              dangerouslySetInnerHTML={{
                __html: dompurify.sanitize(post?.content),
              }}
              className="mt-5"
            />
          </div>
          <div className="flex items-center">
            <button
              className={`${
                currentTab === 'comment' ? 'border-primary' : ''
              } flex-grow py-4 hover:bg-gray-100 border-b-2`}
              onClick={() => setCurrentTab('comment')}
            >
              Comments ({post?.comments.length})
            </button>
            <button
              className={`${
                currentTab === 'save' ? 'border-primary' : ''
              } flex-grow py-4 hover:bg-gray-100 border-b-2`}
              onClick={() => setCurrentTab('save')}
            >
              Save ({post?.savedUsers.length})
            </button>
            <div>
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="m-1 px-4 py-4 block cursor-pointer hover:bg-gray-100 rounded-lg"
                >
                  <BsThreeDotsVertical fontSize={20} />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a>Collapse</a>
                  </li>
                  <li>
                    <a>Expanse</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="h-[450px] flex-grow overflow-y-auto space-y-8 py-6 px-8 border mt-4 flex flex-col">
            {currentTab === 'comment' && (
              <Comments comments={post?.comments || []} />
            )}
            {currentTab === 'save' && (
              <SavedUsers savedUsers={post?.savedUsers || []} />
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default wrapperWithHeader(PostDetail)
