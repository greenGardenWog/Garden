// src/components/LanguageToggle.jsx
import { useTranslation } from 'react-i18next';

function LanguageToggle() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <select
      onChange={(e) => changeLanguage(e.target.value)}
      className="border border-gray-300 rounded px-2 py-1"
      defaultValue={i18n.language}
    >
      <option value="en">EN</option>
      <option value="am">አማ</option>
      {/* <option value="om">OM</option>
      <option value="ti">ትግ</option> */}
    </select>
  );
}

export default LanguageToggle;
