import './index.css'

const RepositoryItem = props => {
  const {repository} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = repository
  return (
    <li className="repository-item-container">
      <img src={avatarUrl} alt={name} className="repository-img" />
      <h1 className="rep-name">{name}</h1>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="stars-img"
        />
        <p className="stars-count">{starsCount} stars</p>
      </div>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="stars-img"
        />
        <p className="stars-count">{forksCount} forks</p>
      </div>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="stars-img"
        />
        <p className="stars-count">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
