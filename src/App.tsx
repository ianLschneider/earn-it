
//import hooks
import { useState, useEffect, useCallback } from 'react'

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
  const [rewardPoints, setRewardPoints] = useState<number>(-1)
  
  const [apiErrors, setApiErrors] = useState<any>('')

  const API_URL = 'https://earn-it-f84b3a1e2606.herokuapp.com' //'http://localhost:8000'

  const navigate = useNavigate()

  const showErrors = useCallback( (error: unknown): void =>{
    setApiErrors(error)
    console.log(apiErrors)
  }, [setApiErrors, apiErrors])

  const getEarners = useCallback( async () => {
    try{
      const response = await fetch (`${API_URL}/earners/`)
      const data = await response.json()
      setEarners(data)
    }catch( error ){
      showErrors(error)
    }
  }, [setEarners, showErrors])

  const getTasks = useCallback( async (id: number) => {
    try{
      const response = await fetch (`${API_URL}/${id}/tasks/`)
      const data = await response.json()
      setCurrentTasks(data)
    }catch( error ){
      showErrors(error)
    }
  }, [setCurrentTasks, showErrors])

  const getRewards = useCallback( async () => {
    try{
      const response = await fetch (`${API_URL}/rewards/`)
      const data = await response.json()
      setRewards(data)
      
      let points = data.map((r: any) => r.points )
      if(points.length < 1){
        setRewardPoints(-1)
      }else{
        points = Math.min(...points);
        setRewardPoints(points)
      }
      
    }catch( error ){
      showErrors(error)
    }
  }, [setRewards, showErrors])

  useEffect(()=>{
    getEarners()
    getRewards()
  }, [getEarners,getRewards])

  const updateProfile  = async (profile: Profile) => {
    try{
      await fetch (`${API_URL}/earners/${profile.id}/`, {
        method: 'put',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
      })
      getEarners()
    }catch( error ){
      showErrors(error)
    }
  }

  const updateReward = async (rewardId: number, profileId: number) => {

    const reward = rewards.find( (r: any) => r.id === rewardId)
    if(reward)reward.earner.push(Number( profileId ))

    try{
      await fetch (`${API_URL}/rewards/${rewardId}/`, {
        method: 'put',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reward)
      })
    }catch( error ){
      showErrors(error)
    }

    navigate(`/profiles/${profileId}?reward=${reward.reward.replaceAll(' ', '-')}`)
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
  

  const updateCurrentProfilePoints = (id: number, points: number, add: boolean) => {
  
    const p: Profile | undefined  = earners.find( (earner: Profile) => earner.id === Number( id ) )

    if(!p)return
    
      if(add){
        p.points += points
      }else{
        p.points -= points
        p.points = p.points < 0 ? 0 :  p.points
      }
      
    
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

      getEarners()

      if(form !=='tasks' ){
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

      getEarners()
      navigate('/profiles')

    }catch(error){
      showErrors(error)
    }
  }

  const deleteReward = async (id: number) => {
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

  const claimReward = (rewardId: number, profileId: number, points: number) => {
    updateReward(rewardId, profileId)
    updateCurrentProfilePoints(profileId, points, false)
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
          element={<SingleProfile 
              profiles={earners} 
              taskIcons={taskIcons} 
              tasks={currentTasks}
              rewardPoints={rewardPoints}
              updateTasks={updateTasks} 
              getTasks={getTasks}
              updatePoints={updateCurrentProfilePoints}
              handleFormSubmit={handleFormSubmission} 
              deleteProfile={deleteProfile}
              deleteTask={deleteTask} />}
        />
        <Route
          path="/rewards/"
          element={<Rewards rewardIcons={rewardIcons} rewards={rewards} handleFormSubmit={handleFormSubmission}  />}
        />
        <Route
          path=":profile/rewards/:points"
          element={<Rewards rewardIcons={rewardIcons} rewards={rewards} handleFormSubmit={handleFormSubmission}  />}
        />
        {/* <Route
          path="/rewards/:id"
          element={<SingleReward rewards={rewards} deleteReward={deleteReward}/>}
        /> */}

         <Route
          path="/:profile/rewards/:id/:points"
          element={<SingleReward rewards={rewards} deleteReward={deleteReward} claimReward={claimReward}/>}
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
