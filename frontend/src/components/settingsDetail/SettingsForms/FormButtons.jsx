const FormButtons = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center">
      <input
        type="submit"
        className="w-[200px] uppercase m-4 px-4 py-2 bg-primary rounded-full text-white font-medium hover:shadow-lg cursor-pointer"
        value="submit"
      />
      <button
        type="reset"
        className="w-[200px] uppercase m-2 px-4 py-2 bg-gray-300 rounded-full text-text font-medium hover:shadow-lg"
      >
        Cancel
      </button>
    </div>
  )
}

export default FormButtons