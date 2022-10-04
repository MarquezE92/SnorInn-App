import styles from "./Paginated.module.css";

type Props = {
    roomsPerPage: number;
    rooms: number;
    paginated: (n:number)=> void
};

const Paginated = ({roomsPerPage, rooms, paginated}:Props)=> {
	const pageNumbers = [];
       for(let i= 0; i<Math.ceil(rooms/ roomsPerPage); i++) pageNumbers.push(i+1);
       return (
        <div className={styles.pageNumbers}>
     {
      pageNumbers?.map(number=>(
        <button onClick={()=>paginated(number)} key={number} className={styles.numbers}>{number}</button>
        ))
      }
        </div>
        ) 
}

export default Paginated