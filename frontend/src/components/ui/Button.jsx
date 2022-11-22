const Button = ({ text, className, ...attribute }) => {
  return (
    <button
      {...attribute}
      className={`${className} bg-primary text-white px-3 py-2 rounded-lg uppercase text-sm`}
    >
      {text}
    </button>
  )
}

export default Button
