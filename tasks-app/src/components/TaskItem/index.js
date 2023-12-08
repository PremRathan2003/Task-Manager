import { MdDelete } from "react-icons/md";
import './index.css'

const TaskItem = props => {
  const {taskDetails, deleteTask, editTask} = props
  const {id, title, description, date,priority, status} = taskDetails
  
  const onDeleteTask = () => {
    deleteTask(id)
  }
  const onEditTask = () => {
    editTask(id)
  }

  return (
    <li className="task-item">
      <p className="task-item-heading">Titile: {title}</p>
      <p className='task-item-heading'>Description: {description}</p>
      <p className="task-item-heading">DueDate: {date}</p>
      <p className="task-item-heading">Priority: {priority}</p>
      <p className="task-item-heading">Status: {status}</p>
      <div className="delete-container">
      <button className="edit-button" type="button" onClick={onEditTask}>
          Edit
        </button>
        <button
          className="delete-button"
          type="button"
          onClick={onDeleteTask}
          data-testid="delete"
        >
          <MdDelete className="delete"/>
        </button>
      </div>
    </li>
  )
}

export default TaskItem