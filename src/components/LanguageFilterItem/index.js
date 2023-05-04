import './index.css'

const LanguageFilterItem = props => {
  const {languageItem, actveTabId, onChangeActiveTab} = props
  const {id, language} = languageItem

  const onChangeTab = () => {
    onChangeActiveTab(id)
  }

  const tabClassName =
    id === actveTabId ? 'filter-button selected-tab-button' : 'filter-button'

  return (
    <li className="language-filter-item-container">
      <button type="button" className={tabClassName} onClick={onChangeTab}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
