const SettingsNavigator = ({ setting, setSetting }) => {
  const handleChange = (e) => {
    setSetting(e.target.value)
  }

  return (
    <>
      <div className="md:hidden">
        <div className="py-4 flex justify-center items-center">
          <select
            className="select select-ghost w-full max-w-xs text-text focus:text-text text-center text-lg font-medium bg-gray-50"
            onChange={handleChange}
          >
            <option value="public">
              Public Information
            </option>
            <option value="other">
              Other Information
            </option>
            <option value="private">
              Private Information
            </option>
          </select>
        </div>
      </div>
      <div className="hidden md:flex flex-col h-full bg-white p-2 border-r-2">
        <input
          type="radio"
          name="info"
          id="public"
          value="public"
          className="hidden"
          checked={setting === "public"}
          onChange={handleChange}
        />
        <label
          htmlFor="public"
          className={`cursor-pointer m-6 text-lg text-text ${setting === "public" ? "font-medium" : "font-normal"}`}
        >
          Public Information
        </label>
        <input
          type="radio"
          name="info"
          id="other"
          value="other"
          className="hidden"
          checked={setting === "other"}
          onChange={handleChange}
        />
        <label
          htmlFor="other"
          className={`cursor-pointer m-6 text-lg text-text ${setting === "other" ? "font-medium" : "font-normal"}`}
        >
          Other Information
        </label>
        <input
          type="radio"
          name="info"
          id="private"
          value="private"
          className="hidden"
          checked={setting === "private"}
          onChange={handleChange}
        />
        <label
          htmlFor="private"
          className={`cursor-pointer m-6 text-lg text-text ${setting === "private" ? "font-medium" : "font-normal"}`}
        >
          Private Information
        </label>
      </div>
    </>
  )
}

export default SettingsNavigator