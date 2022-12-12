import { useTranslation } from "react-i18next"

const SettingsNavigator = ({ setting, setSetting }) => {
  const { t } = useTranslation()

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
              {t('Public Information')}
            </option>
            <option value="other">
              {t('Other Information')}
            </option>
            <option value="private">
              {t('Private Information')}
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
          {t('Public Information')}
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
          {t('Other Information')}
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
          {t('Private Information')}
        </label>
      </div>
    </>
  )
}

export default SettingsNavigator