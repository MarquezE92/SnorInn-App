
import styles from './searchbar.module.css'

const SearchBar = () => {

    return (
    <div className={styles.searchBar}>
    <input type="text" placeholder='Search by name...'  className={styles.inputSearch} />
    {/* <button type='submit'  className={styles.button} onClick={() => handleSubmit()}>Search</button> */}
    </div>
  )
}

export default SearchBar