import { wrapperWithHeader } from '../../components'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Editor from '../../components/editor/Editor'

const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
  })
  .required()

const NewPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => console.log(data)

  return (
    <div className="flex mt-8 max-w-6xl mx-auto px-10">
      <div>
        <input type="file" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="border"
          {...register('firstName')}
          placeholder="Short description about your post"
        />
        <p>{errors.firstName?.message}</p>
        <input className="border" {...register('age')} />
        <p>{errors.age?.message}</p>

        <Editor />
        <input type="submit" />
      </form>
    </div>
  )
}

export default wrapperWithHeader(NewPost)
