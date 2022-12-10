import { AiOutlineFileAdd } from 'react-icons/ai'
import { useEffect, useMemo, useState } from 'react'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage'
//
import useCallApi from '../../hooks/useCallApi'
import { storage } from '../../../firebase'
import { showToastError, showToastSuccess } from '../../utils/toast'
import {
  wrapperWithHeader,
  Editor,
  PageContainer,
  loggedInOnly,
} from '../../components'
import MemoImg from './MemoImg'

const NewPost = () => {
  const [selectedPhoto, setSelectedPhoto] = useState()
  const [title, setTitle] = useState('')
  const navigate = useNavigate()
  const [formError, setFormError] = useState({})
  const { error, isLoading, sendRequest } = useCallApi()
  const { t } = useTranslation()

  const editor = useEditor({
    extensions: [StarterKit],
    content: ``,
    onUpdate: () => {
      setFormError((prev) => {
        return { ...prev, content: '' }
      })
    },
  })

  const photoChangeHandler = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedPhoto(e.target.files[0])
    }
  }

  const titleChangeHandler = (e) => {
    setTitle(e.target.value)
    setFormError((prev) => {
      return { ...prev, title: '' }
    })
  }

  const applyApiData = (data) => {
    showToastSuccess(t('posted_success'))
    navigate(`/post/${data._id}`)
  }

  const onSubmitHandler = async (event) => {
    const image = event.target[0].files[0]
    event.preventDefault()
    const formData = new FormData()
    const html = editor.getHTML()
    const errors = { ...formError }

    if (!title || title.trim().length < 5) {
      errors.title = t('title_required')
    }

    if (title && title.trim().length > 100) {
      errors.title = t('post_max_length')
    }

    if (html.replaceAll(' ', '') === '<p></p>') {
      errors.content = t('content_required')
    }

    if (!selectedPhoto) {
      errors.photo = t('image_required')
    }

    setFormError((prev) => {
      return { ...prev, ...errors }
    })

    if (errors.title || errors.photo || errors.content) {
      showToastError(t('invalid_toast_content'))
      return
    }
    const mountainsRef = ref(storage, `images/image-${image.lastModified}`)
    uploadBytes(mountainsRef, image)
    const images = await getDownloadURL(mountainsRef)

    formData.append('photo', images)
    formData.append('content', html)
    formData.append('title', title)
    sendRequest(
      {
        method: 'post',
        url: '/api/post',
        data: formData,
      },
      applyApiData
    )
  }
  useEffect(() => {
    if (error) {
      showToastError('Something wentwrong! Please try again later')
    }
  }, [error])

  useEffect(() => {
    console.log(formError)
  }, [formError])

  const imageUrl = useMemo(() => {
    if (selectedPhoto) return URL.createObjectURL(selectedPhoto)
    return ''
  }, [selectedPhoto])

  return (
    <PageContainer title={t('new_post_page_title')}>
      <form onSubmit={onSubmitHandler} className="py-12">
        <div className="flex flex-col md:flex-row mx-auto gap-x-8 gap-y-12">
          <div className="w-full md:w-5/12">
            <div
              className={
                selectedPhoto
                  ? 'self-start'
                  : 'self-start bg-gray-100 rounded-xl text-center py-24'
              }
            >
              {selectedPhoto && (
                <>
                  <MemoImg
                    link={imageUrl}
                    alt="selected photo for new post"
                    setFormError={setFormError}
                    errorMessage={t('wrong_image_dimen')}
                  />
                  <label
                    htmlFor="uploadPhoto"
                    className="cursor-pointer font-bold"
                  >
                    <a className="border flex gap-x-2 ml-auto mt-4 py-4 px-2 items-center w-full justify-center hover:bg-text hover:text-white">
                      <AiOutlineFileAdd fontSize={24} />
                      {t('change_image')}
                    </a>
                  </label>
                </>
              )}
              {!selectedPhoto && (
                <>
                  <label
                    htmlFor="uploadPhoto"
                    className="flex flex-col items-center gap-y-1.5 cursor-pointer w-full justify-center "
                  >
                    <h3 className="font-bold">{t('choose_image')}</h3>
                    <span className=" inline-block my-4"></span>
                    <button className=" pointer-events-none bg-primary text-white px-6 py-2 rounded-md flex items-center gap-x-3">
                      <AiOutlineFileAdd />
                      {t('add_file')}
                    </button>
                    <h4 className=" font-bold text-sm mt-10">
                      {t('supported_files')}
                    </h4>
                    <p>jpg, png, webp</p>
                  </label>
                </>
              )}
              <input
                type="file"
                className="hidden"
                name="uploadPhoto"
                id="uploadPhoto"
                accept="image/*"
                defaultValue=""
                onChange={photoChangeHandler}
              />
            </div>
            {formError.photo && (
              <div className="bg-white text-red-400 mt-2 ml-2 text-sm">
                {formError.photo}
              </div>
            )}
          </div>

          <div className="md:w-7/12 flex flex-col">
            <div className="mb-8">
              <input
                type="text"
                className="outline-0 py-4 px-4 w-full border-b"
                placeholder={t('title')}
                value={title}
                onChange={titleChangeHandler}
              />
              {formError.title && (
                <div className="bg-white text-red-400 mt-2 ml-2 text-sm">
                  {formError.title}
                </div>
              )}
            </div>
            <Editor editor={editor} />
            {formError.content && (
              <div className="bg-white text-red-400 mt-2 ml-2">
                {formError.content}
              </div>
            )}
            <button
              className={
                isLoading
                  ? 'bg-primary/50 text-white py-2 px-12 rounded-full mt-4 self-end'
                  : 'bg-primary text-white py-2 px-12 rounded-full mt-4 self-end'
              }
              disabled={isLoading ? true : false}
            >
              {isLoading ? t('posting') : t('post')}
            </button>
          </div>
        </div>
      </form>
    </PageContainer>
  )
}

export default loggedInOnly(wrapperWithHeader(NewPost))
