const Button = ({ text, ...attribute }) => {
  return (
    <button
      {...attribute}
      className="bg-primary text-white px-3 py-2 rounded-lg uppercase text-sm"
    >
      {text}
    </button>
  )
}

export default Button
