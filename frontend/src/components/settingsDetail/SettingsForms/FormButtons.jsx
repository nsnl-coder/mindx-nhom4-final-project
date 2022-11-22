const FormButtons = ({ onClear }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2 md:gap-4">
      <button
        type="submit"
        className="w-[200px] uppercase my-4 px-4 py-2 bg-primary rounded-full text-white font-medium hover:shadow-lg cursor-pointer"
        value="submit"
      >
        Submit
      </button>
      <button
        type="reset"
        className="w-[200px] uppercase my-2 px-4 py-2 bg-gray-300 rounded-full text-text font-medium hover:shadow-lg"
        onClick={onClear}
      >
        Cancel
      </button>
    </div>
  )
}

export default FormButtons