import React, { useState, useEffect} from 'react'
import './ToDos.css'
import axios from 'axios'
import Container from 'react-bootstrap/Container'

export default function ToDo(){
    const [toDo, setToDo] = useState([]);

    const { currentUser } = useAuth()
    const [showCreate, setShowCreate] = useState(false);

    const [filter, setFilter] = useState(0);

    const getToDos = () => {
      axios.get(`https://localhost:7285/api/ToDos`).then(response => {
        console.log(response)
        setToDos(response.data)
      })
    }

    useEffect(() => {
        getToDos()
    }, []);

    return (
      <section className="todos">
        <article className="bg-info p-5">
          <h1 className="text-center">Resources Dashboard</h1>
        </article>
        {/* BEGIN CREATE UI */}
        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
          <div className="bg-dark p-2 mb-3 text-center">
            <button className="btn btn-info" onClick={() => setShowCreate(!showCreate)}>
              {!showCreate ? 'Create New Task' : 'Close Form'}
            </button>
            <div className="createContainer">
              {showCreate &&
                //Below we render the Create form when showCreate is true
                <TodoCreate setShowCreate={setShowCreate} getToDos={getToDos} />
              }
            </div>
          </div>
        }
        {/* END CREATE UI */}
        <FilterToDo setFilter={setFilter} />
        <Container>
          <article className="toDoGallery row justify-content-center">
            {/* Below we write conditional rendering to see if the user is trying to filter results or not, and display the right resources according to what they want. */}
            {filter === 0 ? toDos.map(r =>
              //Below we .map our SingleResource component for each resource in our collection
              <SingleToDo key={r.toDoId} toDo={r} getToDos={getToDos} />  
            ) :
            toDos.filter(r => r.categoryId === filter).map(r =>
              <SingleToDo key={r.toDoId} resource={r} getToDos={getToDos} />
            ) }
            {/* Below we throw a message to the user if there are no resources in the category */}
            {filter !== 0 && toDos.filter(r => r.categoryId === filter).length === 0 &&
              <h2 className="alert alert-warning text-dark">
                There are no results for this category.
              </h2>
            }
  
          </article>
        </Container>
      </section>
    )
}