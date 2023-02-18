import React, { useState, createContext } from "react";

const DataContext = createContext();

const DataProvider = (props) => {
    const [todos, setTodos] = useState([
        {name: '생일파티 준비하기', date: '2022년 2월 27일 오후 5:00', complete: false},
        {name: '리액트 공부하기', date: '2022년 12월 12일 오전 10:50', complete: true}
    ]);

    return (
        <DataContext.Provider value={[todos, setTodos]}>
            {props.children}
        </DataContext.Provider>
    )
}

export {DataContext, DataProvider}