import './index.css'

const TabItem = props => {
  const { tabDetails, setActiveTabId, isActive } = props;
  const { tabId, displayTab } = tabDetails;

  const onClickTab = () => {
    setActiveTabId(tabId);
  };

  const tabBtnClassName = isActive ? 'tab-button active' : 'tab-button';

  return (
    <li className="tab-item">
      <button type="button" onClick={onClickTab} className={tabBtnClassName}>
        {displayTab}
      </button>
    </li>
  );
};
export default TabItem