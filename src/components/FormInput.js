import { useState, useContext, useRef, useEffect } from "react";
import { DataContext } from "./DataProvider";
import { HiOutlinePencilAlt } from "react-icons/hi";
import moment from "moment/moment";
import 'moment/locale/ko';
import './FormInput.scss';

function FormInput() {
    const [todos, setTodos] = useContext(DataContext);
    const [todoName, setTodoName] = useState('');
    const todoInput = useRef();
    const inputDate = moment().format('LLL');
    

    const addTodo = e => {
        e.preventDefault();
        setTodos([...todos, {name: todoName, date: inputDate, complete: false}]);
        setTodoName('');
        todoInput.current.focus();
    }
    
    const handleOnKeyPress = e => {
        if(e.key === 'Enter') {
            addTodo();
        }
    }
    
    useEffect(() => {
        todoInput.current.focus();
    }, []);

    return (
        <form autoComplete="off" onSubmit={addTodo}>
            <div className="add">
                <input type="text" name="todos" id="todos" ref={todoInput} value={todoName} onChange={e => setTodoName(e.target.value)} onKeyDown={handleOnKeyPress} placeholder="버튼 또는 엔터로 등록이 가능해요 :)" required />
                <button type="submit"><HiOutlinePencilAlt size={22} /></button>
            </div>
        </form>
    )
}

export default FormInput;