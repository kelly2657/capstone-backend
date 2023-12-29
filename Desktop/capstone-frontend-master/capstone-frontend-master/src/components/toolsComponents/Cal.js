import * as React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/todo.css';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { Button, Checkbox } from '@mui/material';
import axios from 'axios';
import useUser from '../../hooks/useUser';

export default function Cal() {
  const [date, setDate] = React.useState(dayjs());
  const [inputValue, setInputValue] = React.useState('');
  const [todos, setTodos] = React.useState({});

  const [showTodo, setShowTodo] = React.useState([]);
  const selectedDate = dayjs(date).format('YYYY-MM-DD');
  const writer_id = useUser().uid;
  const [selectedTodoId, setSelectedTodoId] = React.useState(null);
  const [editValue, setEditValue] = React.useState('');
  // 날짜 변경
  const onChange = (date) => {
    setDate(date);
  };

  // input내용 변경
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // todolist추가
const handleAddTodo = () => {
    if (!inputValue) return;

    axios.post(`http://3.34.108.172/todo/new?writer_id=${writer_id}`, { task: inputValue, date: selectedDate })
        .then((res) => {
            console.log('todo 추가 성공');
            setTodos((prevTodos) => ({
                ...prevTodos,
                [selectedDate]: [
                    ...(prevTodos[selectedDate] || []),
                    { id: res.data.id, task: inputValue, isCompleted: 0 },
                ],
            }));
        })
        .catch((error) => console.error(error));

    setInputValue('');
};

// todo 삭제
const deleteTodo = (id) => {
    axios.delete(`http://3.34.108.172/todo/delete/${id}`)
        .then((res) => {
            console.log('todo 삭제 성공');
            setTodos((prevTodos) => ({
                ...prevTodos,
                [selectedDate]: prevTodos[selectedDate].filter(todo => todo.id !== id),
            }));
        })
        .catch((error) => console.error(error));
};

// todo 더블클릭
const doubleClickTodo = (id) => deleteTodo(id);

// todo 완료/미완료 처리
const handleToggleTodo = (id) => {
    setTodos((prevToDos)=>{
      let newToDos={...prevToDos};
      let targetIndex=newToDos[selectedDate].findIndex(todo=>todo.id===id);
      
      if(targetIndex>=0){
         let targetItem={...newToDos[selectedDate][targetIndex]};
         targetItem.isCompleted=!targetItem.isCompleted;

         axios.put(`http://3.34.108.172/todo/edit/${id}`, { isCompleted: targetItem.isCompleted })
         .then(res => console.log('todo 완료 여부 반영 성공'))
         .catch(error => console.error(error));

         newToDos[selectedDate][targetIndex]=targetItem;
         
         return newToDos; 
       }
       return prevToDos; 
     });
};


// Todo 클릭시 실행되는 함수
const handleSelectTodo = (id, task) => {
  setSelectedTodoId(id);
  setEditValue(task);
};

// todo 내용 수정
const handleEditTodo = (id, newTask) => {
  setTodos((prevToDos)=>{
    let newToDos={...prevToDos};
    let targetIndex=newToDos[selectedDate].findIndex(todo=>todo.id===id);
    
    if(targetIndex>=0){
       let targetItem={...newToDos[selectedDate][targetIndex]};
       targetItem.task = newTask;

       axios.put(`http://3.34.108.172/todo/edit/${id}`, { task: newTask })
       .then(res => console.log('todo 수정 성공'))
       .catch(error => console.error(error));
       
       newToDos[selectedDate][targetIndex]=targetItem;
       
       return newToDos; 
     }
     return prevToDos; 
   });
};

// Todo 수정 후 서버에 반영하는 함수
const handleEditSubmit = () => {
  if (!editValue) return;

  handleEditTodo(selectedTodoId, editValue);

  setSelectedTodoId(null);
  setEditValue('');
};

React.useEffect(() => {
  axios.get(`http://3.34.108.172/todo/`).then((res) => setShowTodo(res.data.filter(showtodo => showtodo.writer_id === writer_id)))
}, []);

React.useEffect(() =>{
  let todosobj={};
  showTodo.forEach(showto=>{
      if(!Object.keys(todosobj).includes(showto.date)){
          todosobj[showto.date]=[{
            id : showto.id,
              task : showto.task,
              isCompleted:showto.isCompleted,
          }];
      }else{
           todosobj[showto.date].push({
            id : showto.id ,
            task : showto.task,
             isCompleted:showto.isCompleted,
          });
       }
   })
   setTodos(todosobj);

},[showTodo]);

  // 캘린더 내부에 todo 개수 넣기( 내용 넣기엔 지저분할 수도 )
  const getTileContent = ({ date, view }) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    const todoCount = todos[formattedDate]?.length;
    if (view === 'month' && todoCount) {
      return <p className="dot">{todoCount}</p>;
    }
    return null;
  };

  return (
    <div style={{ margin: '23px' }}>
      <h2>My To Do Lists</h2>
      <div style={{ display: 'flex' }}>
        <Calendar
          locale="en-EN" //한국어 : "ko-KO"
          onChange={onChange}
          tileContent={getTileContent}
          value={date}
          calendarType="US"
        />
        {/* 캘린더 아래 내용 */}
        <div style={{ marginLeft: '23px' }}>
          <TextField
            value={selectedTodoId ? editValue : inputValue}
            onChange={(e) => selectedTodoId ? setEditValue(e.target.value) : setInputValue(e.target.value)}
            label="To-Do"
            variant="standard"
            size="small"
          />
          <Button onClick={selectedTodoId ? handleEditSubmit : handleAddTodo} style={{ margin: '10px' }}>
          {selectedTodoId ? 'Update Todo' : 'Add Todo'}
          </Button>
          {todos[selectedDate] && (
          <div>
            {todos[selectedDate].map((todo) => (
              <li
                key={todo.id}
                onDoubleClick={() => doubleClickTodo(todo.id)}
                style={{ listStyle: 'none', textDecoration: todo.isCompleted ? 'line-through' : 'none'}}
              >
              <Checkbox checked={todo.isCompleted} onChange={() => handleToggleTodo(todo.id)} />
              <span onClick={() => handleSelectTodo(todo.id, todo.task)}>{todo.task}</span>
            </li>
          ))}
        </div>
         )}
       </div>
     </div>
   </div>
 );
};
