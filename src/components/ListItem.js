import { useState, useRef } from "react";
import { MdEdit, MdDone } from "react-icons/md";
import moment from "moment/moment";
import 'moment/locale/ko';
import './ListItem.scss';

function ListItem({todo, id, checkComplete, handleEditTodos}) {

    const [onEdit, setOnEdit] = useState(false);
    const [editValue, setEditValue] = useState(todo.name);
    const todoInput = useRef();
    const editDate = moment().format('LLL');

    const handleOnEdit = () => {
        setOnEdit(true);
    }

    const handleSave = id => {
        setOnEdit(false);
        if(editValue) {
            handleEditTodos(editValue, editDate, id);
        } else if(editValue === '') {
            alert('내용이 비어있습니다. 텍스트를 입력하세요.');
            setOnEdit(true);
            todoInput.current.focus();
        } else {
            setEditValue(todo.name);
        }
    }

    const handleOnKeyPress = e => {
        if(e.key === 'Enter') {
            handleSave(id);
        }
    }

    if(onEdit) {
        return (
            <li>
                <input type="text" name="editValue" id="editValue" ref={todoInput} value={editValue} onChange={e => setEditValue(e.target.value)} onKeyDown={handleOnKeyPress} autoComplete="off" autoFocus />
                <button id="save" onClick={() => handleSave(id)}><MdDone size={20} /></button>
            </li>
        )
    } else {
        return (
            <li className={todo.complete ? 'off' : ''}>
                <div className="checkbox-field">
                    <input type="checkbox" id={id} checked={todo.complete} onChange={() => checkComplete(id)} />
                    <label htmlFor={id} className={todo.complete ? 'active' : ''}>
                    <p className="name">{todo.name}</p><span className="date">{todo.date}</span>
                    </label>
                    {todo.complete ? '' : <button id="edit" disabled={todo.complete} onClick={handleOnEdit}><MdEdit size={20} /></button>}
                </div>
            </li>
        )
    }
}

export default ListItem;