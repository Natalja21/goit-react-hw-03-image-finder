import { Component } from 'react';
import styles from './Searchbar.module.css'
import { toast } from 'react-toastify'

export default class SearchBar extends Component {
    state = {
        keyword: ''
    };
    handelKeywordChange = (e) => {
        this.setState({ keyword: e.currentTarget.value.toLowerCase() });
    };
    handelSubmit = (e) => {
        e.preventDefault();
        if (this.state.keyword.trim() === "") {
            toast.warning("Please, enter keyword !",{ theme: 'colored', closeOnClick: true,}
            )
            return;
        }
        this.props.onSubmitSearchBar(this.state.keyword)
        this.setState({ keyword: '' });
    };
    
  render() {
    return (
      <header className={styles.Searchbar}>
        <form onSubmit={this.handelSubmit} className={styles.SearchForm}>        
          <input
            className={styles.SearchForm__input}
            name="keyword"
            type="text"
            autoComplete="off"
            value={this.state.keyword}        
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handelKeywordChange}        
                />
                 <button type="submit" className={styles.SearchForm__button}>
            <span className={styles.SearchForm__span}>Search</span>
          </button>
        </form>
      </header>
    );
  }
}
