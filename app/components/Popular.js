import React from 'react'
import Proptypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'

function LanguagesNav ({selected, onUpdateLanguage}) {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
        
    return (
        <ul className='flex-center'>
            {languages.map((language) => (
                <li key={language}>
                    <button className='btn-clear nav-link'
                            style={language === selected ? {color: 'rgb(187,46,31)'} : null}
                            onClick={()=> onUpdateLanguage(language)}>
                        {language}
                    </button>
                </li>
            ))}
        </ul>
    )
}

LanguagesNav.propTypes = {
    selected: Proptypes.string.isRequired,
    onUpdateLanguage: Proptypes.func.isRequired
}

export default class Popular extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedLanguage: 'All',
            repos: null,
            error: null
        }

        this.updateLanguage = this.updateLanguage.bind(this)
        this.isLoading = this.isLoading.bind(this)
    }
    updateLanguage (selectedLanguage) {
        this.setState({
            selectedLanguage,
            repos: null,
            error: null
        })

        fetchPopularRepos(selectedLanguage)
            .then((repos) => this.setState({
                repos,
                error: null
            }))
            .catch(() => {
                console.warn('Error fetching repos: ', error)
    
                this.setState({
                    error: `There was an error fetching the repos.`
                })
            })
    }
    isLoading() {
        return this.state.repos === null && this.state.error === null
    }
    render () {
        const { selectedLanguage, repos, error } = this.state

        return (
            <React.Fragment>
                <LanguagesNav 
                    selected = {selectedLanguage}
                    onUpdateLanguage = {this.updateLanguage}
                />

                {this.isLoading() && <p>LOADING</p>}
                {error && <p>{error}</p>}
                {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
            </React.Fragment>
        )
    }
}