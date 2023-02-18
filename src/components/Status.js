import { useContext } from "react";
import { DataContext } from "./DataProvider";
import style from './Status.module.scss';

function Status() {
    
    const [todos] = useContext(DataContext);

    const newTodosComplete = () => {
        return todos.filter(todo => todo.complete === false);
    }

    return (
        <>
        { 
            todos.length === 0 || newTodosComplete().length === 0 ? 
            <p className={style.content}>남아있는 할 일이 없습니다!</p> : 
            <p className={style.content}>할 일 <b>{newTodosComplete().length}건</b> 남음</p>
        }
        </>
        
    )
}

export default Status;