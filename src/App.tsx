

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



import { library } from '@fortawesome/fontawesome-svg-core'
import { faAward, faTrophy, faChildReaching, faIceCream, faHand } from '@fortawesome/free-solid-svg-icons'
//import { faHand } from '@fortawesome/free-regular-svg-icons'


import './App.css'

interface Profile {
  id: number;
  earner: number;
  name: string;
  age: number;
}

function App() {

  library.add( faAward, faHand, faTrophy, faChildReaching, faIceCream )

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
    await fetch (`${API_URL}/profiles/${profile.id}/`, {
      method: 'put',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(profile)
    })
  }

  const updateTasks = async (id: number, completed: boolean) => {
   
    const currentTask: any = currentTasks.find( (task: any) => task.id === id)
 
    currentTask.completed = completed

    const response = await fetch (`${API_URL}/tasks/${id}/`, {
      method: 'put',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(currentTask)
    })

    const data = await response.json()
    console.log(data)
  }

  const updateCurrentProfilePoints = (id: number, points: number) => {
    const p: Profile | undefined  = earners.find( (earner: Profile) => earner.id === id )

    if(!p)return
    updateProfile(p)

  }



  const handleProfileFormSubmission = async (data: any, type: string) => {
    if(type === "new"){ //create
      try{
        const response = await fetch (`${API_URL}/earners/`, {
          method: 'post',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
        if (!response.ok) {
          throw new Error('Failed to add profile');
        }else{
         
        }
      }catch(error){
        showErrors(error)
      }
      
    }else{ //edit
      await fetch (`${API_URL}/earners/${data.id}/`, {
        method: 'put',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      navigate(`/profiles/${data.id}/`)
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
          element={<Profiles profiles={earners} handleFormSubmit={handleProfileFormSubmission}/>}
        />
        <Route
          path="/profiles/:id"
          element={<SingleProfile profiles={earners} tasks={currentTasks} updateTasks={updateTasks} getTasks={getTasks} updatePoints={updateCurrentProfilePoints}/>}
        />
        <Route
          path="/rewards/"
          element={<Rewards rewards={rewards} />}
        />
        <Route
          path="/rewards/:id"
          element={<SingleReward rewards={rewards} />}
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
