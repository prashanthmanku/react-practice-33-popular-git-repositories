import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const responsStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    actveTabId: languageFiltersData[0].id,
    repositoriesList: [],
    responseStatus: responsStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepositories()
  }

  onChangeActiveTab = id => {
    this.setState({actveTabId: id}, this.getRepositories)
  }

  getRepositories = async () => {
    this.setState({responseStatus: responsStatusConstants.inProgress})

    const {actveTabId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${actveTabId}`

    const response = await fetch(url)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const modifiedData = data.popular_repos.map(each => ({
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        id: each.id,
        issuesCount: each.issues_count,
        name: each.name,
        starsCount: each.stars_count,
      }))
      this.setState({
        repositoriesList: modifiedData,
        responseStatus: responsStatusConstants.success,
      })
    } else if (response.status === 502) {
      this.setState({responseStatus: responsStatusConstants.failure})
    }
  }

  renderSuccesrepView = () => {
    const {repositoriesList} = this.state
    return (
      <ul className="repository-list-container">
        {repositoriesList.map(each => (
          <RepositoryItem repository={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="went-wrong-text">somthing went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  rendeResultView = () => {
    const {responseStatus} = this.state
    switch (responseStatus) {
      case responsStatusConstants.inProgress:
        return this.renderLoadingView()
      case responsStatusConstants.success:
        return this.renderSuccesrepView()
      case responsStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {actveTabId} = this.state
    return (
      <div className="app-container">
        <div className="app-width-container">
          <h1 className="app-heading">Popular</h1>
          <ul className="languages-tabs-container">
            {languageFiltersData.map(each => (
              <LanguageFilterItem
                languageItem={each}
                key={each.id}
                actveTabId={actveTabId}
                onChangeActiveTab={this.onChangeActiveTab}
              />
            ))}
          </ul>
          {this.rendeResultView()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
