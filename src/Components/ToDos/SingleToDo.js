import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import axios from 'axios'
import ToDoEdit from './ToDoEdit'

export default function SingleToDo(props) {
  const { name, done, toDoId } = props.resource

  //the two hooks below are added for Edit functionality
  const { currentUser } = useAuth()
  //this hook below tracks whether the Edit form is shown/hidden
  const [showEdit, setShowEdit] = useState(false);

  //below is our delete function
  const deleteToDo = (id) => {
    if(window.confirm(`Are you sure you want to delete ${name}`)){
      //We only enter these scopes if our user clicks "OK"
      axios.delete(`https://localhost:7285/api/ToDos/${id}`).then(() => {
        props.getToDos()//this refreshes the resources tiled view
      })
    }
  }

  return (
    <div className='singleToDo col-md-5 m-4'>
      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div>
          <button id="editLink" onClick={() => setShowEdit(true)}>
            <FaEdit />
          </button>
          <button id="deleteLink" onClick={() => deleteToDo(toDoId)}>
            <FaTrashAlt />
          </button>
          {showEdit &&
            <ToDoEdit
              showEdit={showEdit}
              setShowEdit={setShowEdit}
              getToDos={props.getToDos}
              toDo={props.toDo} />
          }
        </div>
      }
      <h3>{name}</h3>
      <Field name='done' type="checkbox">{done}</Field>
    </div>
  )
}
