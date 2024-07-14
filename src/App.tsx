
/* eslint-disable */ 
//import hooks
import { useState, useEffect } from 'react'

//import components React Router
import { useNavigate, Route, Routes } from 'react-router-dom'

import Landing from './pages/Landing'
import Profiles from './pages/Profiles'
import Rewards from './pages/Rewards'
import SingleProfile from './pages/SingleProfile'
import Error404 from './components/Error404'
import SingleReward from './pages/SingleReward'

import {initIcons, taskIcons, rewardIcons} from './utils/icons'


import './App.css'

interface Profile {
  id: number;
  earner: number;
  name: string;
  age: number;
  points: number;
}

function App() {

  initIcons()

  const [currentTasks, setCurrentTasks] = useState<any>([])
  const [earners, setEarners] = useState<any>([])
  const [rewards, setRewards] = useState<any>([])
  
  const [apiErrors, setApiErrors] = useState<any>('')

  const API_URL = 'https://earn-it-f84b3a1e2606.herokuapp.com' //'http://localhost:8000'

  const navigate = useNavigate()

  const getEarners = async () => {
    try{
      const response = await fetch (`${API_URL}/earners/`)
      const data = await response.json()
      setEarners(data)
    }catch( error ){
      showErrors(error)
    }
  }

  const getTasks = async (id: number) => {
    try{
      const response = await fetch (`${API_URL}/${id}/tasks/`)
      const data = await response.json()
      setCurrentTasks(data)
    }catch( error ){
      showErrors(error)
    }
  }

  const getRewards = async () => {
    try{
      const response = await fetch (`${API_URL}/rewards/`)
      const data = await response.json()
      setRewards(data) 
    }catch( error ){
      showErrors(error)
    }
  }

  const showErrors = (error: unknown): void =>{
    setApiErrors(error)
    console.log(apiErrors)
  }
 
  useEffect(()=>{
    getEarners()
    getRewards()
  }, [])

  const updateProfile  = async (profile: Profile) => {
    try{
      await fetch (`${API_URL}/profiles/${profile.id}/`, {
        method: 'put',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
      })
    }catch( error ){
      showErrors(error)
    }
  }

  const updateTasks = async (id: number, completed: boolean) => {
   
    const currentTask: any = currentTasks.find( (task: any) => task.id === id)
 
    currentTask.completed = completed

    try{
      await fetch (`${API_URL}/tasks/${id}/`, {
        method: 'put',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(currentTask)
      })
    }catch( error ){
      showErrors(error)
    }

  }
  

  const updateCurrentProfilePoints = (id: number, points: number) => {
    const p: Profile | undefined  = earners.find( (earner: Profile) => earner.id === id )

    if(!p)return
    
    p.points = points
    
    updateProfile(p)

  }



  const handleFormSubmission = async (data: any, type: string, form: string = 'earners') => {
    if(type === "new"){ //create
      try{
        const response = await fetch (`${API_URL}/${form}/`, {
          method: 'post',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
    
        if (!response.ok) {
          throw new Error(`Failed to add ${form}`);
        }

        switch(form){
          case 'profiles':
            navigate(`/${form}/${data.id}/`)
            break;
          case 'rewards':
            navigate(`/${form}/`)
            getRewards()
            break;
          case 'tasks':
           getTasks(data.earner)
        }

        getEarners()
      }catch(error){
        showErrors(error)
      }
      
    }else{ //edit
      await fetch (`${API_URL}/${form}/${data.id}/`, {
        method: 'put',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      if(form !='tasks' ){
       navigate(`/profiles/${data.id}/`)
      }else{
        getTasks(data.earner)
      }
    }
  }

  const deleteProfile = async (id: number) => {
    try{
      await fetch(`${API_URL}/earners/${id}`, {
        method: 'delete'
      })
       navigate('/profiles')
    }catch(error){
      showErrors(error)
    }
  }

  const deleteReward = async (id: number) => {
    console.log("deleteReward")
    try{
      await fetch(`${API_URL}/rewards/${id}`, {
        method: 'delete'
      })
       navigate('/rewards')
       getRewards()
    }catch(error){
      showErrors(error)
    }
  }


  const deleteTask = async (id: number, profileId: number) => {
    console.log("deleteTask")
    try{
      await fetch(`${API_URL}/tasks/${id}`, {
        method: 'delete'
      })
       navigate(`/profiles/${profileId}`)
       getTasks(profileId)
    }catch(error){
      showErrors(error)
    }
  }

  return (
    <div>
      <Routes>
        <Route  
          path="/"
          element={<Landing />}
        />
        <Route
          path="/profiles/"
          element={<Profiles profiles={earners} handleFormSubmit={handleFormSubmission}/>}
        />
        <Route
          path="/profiles/:id"
          element={<SingleProfile profiles={earners} taskIcons={taskIcons} tasks={currentTasks} updateTasks={updateTasks} getTasks={getTasks} updatePoints={updateCurrentProfilePoints} handleFormSubmit={handleFormSubmission} deleteProfile={deleteProfile} deleteTask={deleteTask} />}
        />
        <Route
          path="/rewards/"
          element={<Rewards rewardIcons={rewardIcons} rewards={rewards} handleFormSubmit={handleFormSubmission}  />}
        />
        <Route
          path="/rewards/:id"
          element={<SingleReward rewards={rewards} deleteReward={deleteReward}/>}
        />
        <Route
          path="*"
          element={<Error404 />}
        />
      </Routes>
    </div>
  );
}

export default App
