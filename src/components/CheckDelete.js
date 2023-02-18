import { useContext, useState, useCallback, useRef, useEffect } from "react";
import { DataContext } from "./DataProvider";
import { HiOutlineTrash } from "react-icons/hi";
import ReactCanvasConfetti from "react-canvas-confetti";
import './CheckDelete.scss';

function CheckDelete() {

    const [checkAll, setCheckAll] = useState(false);
    const [todos, setTodos] = useContext(DataContext);

    useEffect(() => {
        if(todos.filter(todo => todo.complete === true).length === todos.filter(todo => todo.name).length) {
            setCheckAll(true);
        } else {
            setCheckAll(false);
        }
    }, [todos]);

    const handleCheckAll = () => {
        const newTodos = [...todos]
        newTodos.forEach(todo => { 
            todo.complete = !checkAll;
        })
        setTodos(newTodos);
        setCheckAll(!checkAll);
    }

    const newTodosComplete = () => {
        return todos.filter(todo => todo.complete === false);
    }

    const deleteTodo = () => {

        let count = '';
        
        if(checkAll === true || newTodosComplete().length === 0) { 
            count = "전체를"; 
        } else { 
            count = "총 " + todos.filter(todo => todo.complete === true).length + "건을"; 
        }

        if(window.confirm(count + ' 삭제하시겠습니까?')) {
            setTodos(newTodosComplete());
            setCheckAll(false);
        }
    }

    const canvasStyles = {
        position: "absolute",
        pointerEvents: "none",
        width: "100vw",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    };

    const refAnimationInstance = useRef(null);

    const getInstance = useCallback((instance) => {
        refAnimationInstance.current = instance;
    }, []);

    const makeShot = useCallback((particleRatio, opts) => {
        refAnimationInstance.current &&
        refAnimationInstance.current({
            ...opts,
            origin: { y: 0.7 },
            particleCount: Math.floor(100 * particleRatio)
        });
    }, []);

    const fire = useCallback(() => {
        makeShot(0.25, {
            spread: 26,
            startVelocity: 55
        });

        makeShot(0.2, {
            spread: 60
        });

        makeShot(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 45
        });
    }, [makeShot]);

    if(newTodosComplete().length === 0) {
        fire();
    }
    
    return (
        <>
            <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
            <div className="row">
                {
                    todos.filter(todo => todo.name).length > 0 ?
                    <label htmlFor="all">
                        <input type="checkbox" name="all" id="all" onChange={handleCheckAll} checked={checkAll} />전체 선택
                    </label> 
                    : ''
                }
                { 
                    todos.filter(todo => todo.complete === true).length > 0 ? 
                    <button type="button" id="delete" onClick={deleteTodo}><HiOutlineTrash size={18} />삭제</button> : '' 
                }
            </div>
        </>
    )
}

export default CheckDelete;