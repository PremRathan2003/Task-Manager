import { Component } from 'react'
import TabItem from './components/TabItem'
import TaskItem from './components/TaskItem'
import PriorityFilter from './components/PriorityFilter'
import {v4} from 'uuid'
import {format} from 'date-fns'
import './App.css'

const priorityTypeOptions = [
  {
    priorityId: 'HIGH',
    displayText: 'High',
  },
  {
    priorityId: 'LOW',
    displayText: 'Low',
  },
]

const statusTypeOptions = [
  {
    statusId: 'COMPLETED',
    displayStatus: 'Completed',
  },
  {
    statusId: 'IN PROGRESS',
    displayStatus: 'In Progress',
  },
]

const tabsList = [
  {tabId: 'COMPLETED', displayTab: 'Completed'},
  {tabId: 'IN PROGRESS', displayTab: 'In Progress'},
]

class App extends Component{
  state = {
    titleInput: '',
    dueDateInput: '',
    descriptionInput: '',
    priorityId: priorityTypeOptions[0].priorityId,
    statusId: statusTypeOptions[0].statusId,
    tasksList: [],
    searchInput: '',
    editingTaskId: null,
    activeTabId: tabsList[0].tabId,
  }

  componentDidMount(){
    this.getFilteredTasksList()
  }

  editTask = (id) => {
    const { tasksList } = this.state;
    const taskToEdit = tasksList.find((eachTask) => eachTask.id === id);
    this.setState({
      titleInput: taskToEdit.title,
      dueDateInput: taskToEdit.date,
      descriptionInput: taskToEdit.description,
      priorityId: priorityTypeOptions.find(
        (each) => each.displayText === taskToEdit.priority
      ).priorityId,
      statusId: statusTypeOptions.find(
        (each) => each.displayStatus === taskToEdit.status
      ).statusId,
      editingTaskId: id,
    });
};

  deleteTask = (id) => {
    const {tasksList} = this.state
    const updatedTasksList = tasksList.filter(
      eachTask => id !== eachTask.id,
    )
    this.setState({
      tasksList: updatedTasksList,
    })
  }
  
  filterByPriority = (priority) => {
    const filteredTasks = this.state.tasksList.filter(
      (task) => priority === 'ALL' || task.priorityId === priority
    );

    this.setState({
      filteredTasksList: filteredTasks,
    });
  };

  getSearchResults = () => {
    const {searchInput, tasksList} = this.state
    const searchResults = tasksList.filter(eachTask =>
      eachTask.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return searchResults
  }

  setActiveTabId = (tabValue) => {
    this.setState({ activeTabId: tabValue });
  };
  

  onChangeTitleInput = (event) => {
    this.setState({titleInput: event.target.value})
  }
  onChangeDateInput = (event) => {
    this.setState({dueDateInput: event.target.value})
  }
  onChangeDescriptionInput = (event) => {
    this.setState({descriptionInput: event.target.value})
  }
  onChangePriorityId = (event) => {
    this.setState({priorityId: event.target.value})
  }
  onChangeStatusId = (event) => {
    this.setState({statusId: event.target.value})
  }
  onChangeSearchInput = (event) => {
    this.setState({searchInput: event.target.value})
  }

  onAddTask = (event) => {
    event.preventDefault()
    const {titleInput, descriptionInput, dueDateInput, priorityId, statusId, tasksList, editingTaskId} = this.state
    const priorityType = priorityTypeOptions.find(each => each.priorityId === priorityId)
    const {displayText} = priorityType
    const statusType = statusTypeOptions.find(each => each.statusId === statusId)
    const {displayStatus} = statusType

    let formattedDate = '';
      if (dueDateInput) {
        const parsedDate = new Date(dueDateInput);
        if (!isNaN(parsedDate)) {
          formattedDate = format(parsedDate, 'dd MMMM yyyy, EEEE');
        }
      }
    
    if (editingTaskId) {
      // Editing an existing task
      const updatedTasksList = tasksList.map((task) => {
        if (task.id === editingTaskId) {
          return {
            ...task,
            title: titleInput,
            description: descriptionInput,
            date: formattedDate,
            priority: displayText,
            status: displayStatus,
          };
        }
        return task;
      });
  
      this.setState({
        tasksList: updatedTasksList,
        titleInput: '',
        descriptionInput: '',
        dueDateInput: '',
        priorityId: priorityTypeOptions[0].priorityId,
        statusId: statusTypeOptions[0].statusId,
        editingTaskId: null,
      });
    } else {
      const newTask = {
        id: v4(),
        title: titleInput,
        description: descriptionInput,
        date: formattedDate,
        priority: displayText,
        status: displayStatus,
        isFilterActive: false,
      };
    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, newTask],
      titleInput: '',
      descriptionInput: '',
      dueDateInput: '',
      priorityId: priorityTypeOptions[0].priorityId,
      status: statusTypeOptions[0].statusId
    }))
  }}

  getFilteredTasksList = () => {
    const {tasksList, searchInput, activeTabId} = this.state
    let filteredList = tasksList;

    if (activeTabId === 'COMPLETED' || activeTabId === 'IN PROGRESS') {
      filteredList = tasksList.filter(
        eachTask => eachTask.tabId === activeTabId
      );
    }

    if (searchInput) {
      filteredList = filteredList.filter(eachTask =>
        eachTask.title.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    filteredList.sort((task1, task2) => {
      const priorityOrder = {
        HIGH: 1,
        LOW: 2,
      };
      return priorityOrder[task1.priorityId] - priorityOrder[task2.priorityId];
    });
  
    return filteredList
  }

  render(){
    const {titleInput, dueDateInput,descriptionInput, priorityId, statusId, searchInput, activeTabId} = this.state
    const searchResults = this.getSearchResults()
    const filteredTasksList = searchResults

    return(
      <div className="app-container">
        <h1 className='heading'>Task Manager</h1>
        <div className='responsive-container'>
          <div className='task-container'>
          <div className='add-task-container'>
          <form className="form" onSubmit={this.onAddTask}>
          <h1 className="task-heading">Add Task</h1>
          <label htmlFor="title" className="label">TITLE</label>
          <input
            type="text"
            id="title"
                  value={titleInput}
                  onChange={this.onChangeTitleInput}
                  className="input"
                  placeholder="Title"
          />
          <label htmlFor="descrption" className="label">DESCRIPTION</label>
          <input
            type="textbox"
            id="descrption"
                  value={descriptionInput}
                  onChange={this.onChangeDescriptionInput}
                  className="input"
                  placeholder="Description"
          />
            <label htmlFor="date" className="label">
                  DUE DATE
                </label>
            <input
                  type="date"
                  id="date"
                  value={dueDateInput}
                  onChange={this.onChangeDateInput}
                  className="input date"
            />
            <label className="label" htmlFor="select">
                PRIORITY
              </label>
              <select
                id="select"
            className="input"
                value={priorityId}
                onChange={this.onChangePriorityId}
              >
                {priorityTypeOptions.map(eachOption => (
                  <option key={eachOption.priorityId} value={eachOption.priorityId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <label className="label" htmlFor="select">
                STATUS
              </label>
              <select
                id="select"
                className="input"
                value={statusId}
                onChange={this.onChangeStatusId}
              >
                {statusTypeOptions.map(eachOption => (
                  <option key={eachOption.statusId} value={eachOption.statusId}>
                    {eachOption.displayStatus}
                  </option>
                ))}
              </select>
            <button type="submit" className="add-button">
                  Add
            </button>
        </form>
        </div>
        <div className='alltask-container'>
            <h1 className="tasks-heading">Tasks</h1>  
            <div className="search-input-container">
            <input
              type="search"
              placeholder="Search Task"
              className="search-input"
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/app-store/app-store-search-img.png"
              alt="search icon"
              className="search-icon"
            />         
          </div>
          <div className='priority-filter'>
            <PriorityFilter filterByPriority={this.filterByPriority} /> 
          </div>
          <ul className="tabs-list">
            {tabsList.map(eachTab => (
              <TabItem
                key={eachTab.tabId}
                tabDetails={eachTab}
                setActiveTabId={this.setActiveTabId}
                isActive={activeTabId === eachTab.tabId}
              />
            ))}
          </ul>
          <ul className="tasks-list">
            {filteredTasksList.map(eachTask => (
              <TaskItem key={eachTask.id} taskDetails={eachTask} deleteTask={this.deleteTask} editTask={this.editTask}  />
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
    )
  }
}
export default App