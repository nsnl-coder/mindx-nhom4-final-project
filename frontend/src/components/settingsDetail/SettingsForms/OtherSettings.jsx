import { useForm } from 'react-hook-form'

import FormButtons from './FormButtons'

const OtherSettings = ({ setValue }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    setValue(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-8 flex flex-col mx-12 text-text text-lg font-medium">
        <h3>Gender:</h3>
        <div className="flex justify-between font-normal">
          <label className="label cursor-pointer">
            <input
              {...register("gender", { required: true })}
              type="radio"
              value="male"
              className="radio checked:bg-primary mr-2 sm:mr-4"
            />
            <span>Male</span>
          </label>
          <label className="label cursor-pointer">
            <input
              {...register("gender", { required: true })}
              type="radio"
              value="female"
              className="radio checked:bg-primary mr-2 sm:mr-4"
            />
            <span>Female</span>
          </label>
          <label className="label cursor-pointer">
            <input
              {...register("gender", { required: true })}
              type="radio"
              value="other"
              className="radio checked:bg-primary mr-2 sm:mr-4"
            />
            <span>Other</span>
          </label>
        </div>
        {errors.gender && <span className="text-primary font-light">This field is required</span>}
        <label htmlFor="dateOfBirth" className="mt-16">
          Date of Birth:
        </label>
        <input
          {...register("dateOfBirth", { required: true })}
          type="date"
          id="dateOfBirth"
          className="bg-white text-text font-normal outline-none border-gray-300 border-[2px] my-2 p-2 rounded-lg"
        />
        {errors.dateOfBirth && <span className="text-primary font-light">This field is required</span>}
      </div>
      <FormButtons />
    </form>
  )
}

export default OtherSettings