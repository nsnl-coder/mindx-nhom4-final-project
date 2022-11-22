import deleteIcon from '../../assets/icon-delete.svg'

const Error = () => {
  return (
    <div className="w-full h-[90.5%] bg-white p-4 flex flex-col items-center justify-center">
      <div className="scale-[2] -translate-y-10">
        <img src={deleteIcon} alt="error" />
      </div>
      <h3 className="text-primary font-semibold text-2xl">
        Oops! Something went wrong.
      </h3>
    </div>
  )
}

export default Error
