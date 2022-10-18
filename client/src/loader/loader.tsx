import styles from './loader.module.css'

export const Loader=()=>{
    return(
        <div className={styles.loader}>
            <svg className={styles.svg} viewBox="25 25 50 50">
            <circle className={styles.circle} r="20" cy="50" cx="50"></circle>
            </svg>
        </div>
    )
}