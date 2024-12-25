import { useMemo, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Nav from '../components/Nav'
import Task from '../components/Task'
import EIAddButton from '../components/EIAddButton'

import ProfileForm from '../components/ProfileForm'
import TaskForm from '../components/TaskForm'

import EILink from '../components/EILink'


interface Profile {
    id: number;
    earner: number;
    name: string;
    age: number;
    points: number;
}

interface TaskProp {
    id: number,
    earner: number;
    task: string;
    iconType: string;
    completed: boolean;
    points: number;
    createdDate: number;
    modifiedDate?: number | null;
    completedDate: number | null;
    completedByDate: number;
}

interface Props {
    profiles: Profile[];
    tasks: TaskProp[];
    taskIcons: string[];
    rewardPoints: number,
    updateTasks: (id: number, completed: boolean) => void;
    updatePoints: (id: number, points: number, add: boolean) => void;
    getTasks: (id: number) => void;
    handleFormSubmit: (data: any, type: string)=>void;
    deleteProfile: (id: number)=>void;
    deleteTask: (id: number, profileId: number)=>void;
}

const SingleProfile = ({profiles, rewardPoints, taskIcons, tasks, updateTasks, getTasks, updatePoints, handleFormSubmit, deleteProfile,deleteTask}: Props ) => {
    const params = useParams() as any

    const [searchParams, setSearchParams] = useSearchParams();

    const blank =  useMemo<any>( ()=>( {id:0} ), [] )

    const [currentProfile, setCurrentProfile] = useState<Profile>( blank )

    const [currentTask, setCurrentTask] = useState<TaskProp>( blank )
    
    const [shouldShowEditProfileForm, setShouldShowEditProfileForm] = useState<boolean>(false)

    const [shouldShowEditTaskForm, setShouldShowEditTaskForm] = useState<boolean>(false)

    const [shouldShowAddTaskForm, setShouldShowAddTaskForm] = useState<boolean>(false)
    
    const [shouldShowClaimRewardsBtn, setShouldShowClaimRewardsBtn] = useState<boolean>(currentProfile.points > 0)

    const [rewardCaimed, setRewardCaimed] = useState<string>( '' )


    
    // const checkTask = () => typeof tasks[currentTask] !== 'undefined'

    const showEditProfileForm = () => {
        setShouldShowEditProfileForm(true)
    }
    const hideEditProfileForm = () => {
        setShouldShowEditProfileForm(false)
    }
    
    const showAddTaskForm = () => {
        setShouldShowAddTaskForm(true)
    }
    const hideAddTaskForm = () => {
        setShouldShowAddTaskForm(false)
    }
    

    const showEditTaskForm = (id: number) => {
        const tsk = tasks.find( tsk => tsk.id === id)
       
        if(tsk)setCurrentTask(tsk)  

        setShouldShowEditTaskForm( true )
    }
    const hideEditTaskForm = () => {
        setShouldShowEditTaskForm( false )
    }

    const showRewardClaimed = (r: string) => {
        setRewardCaimed(r)
        // setTimeout( ()=>{
        //     setRewardCaimed('')
        // }, 2000 )
    }   
    useEffect(()=>{

        const p: Profile | undefined = profiles.find( profile => profile.id === parseInt( params.id ) )

        // const rp: number | undefined = profiles.find( profile => profile.id === parseInt( params.id ) )

        if(!p){
            return
        }

        setCurrentProfile( p )

        const reward = searchParams.get('reward')
        if(reward){
            showRewardClaimed(reward)
            searchParams.delete('reward')
            setSearchParams(searchParams)
        }  

        setShouldShowClaimRewardsBtn(rewardPoints > 0 && p.points >= rewardPoints )

    }, [params.id, profiles, rewardPoints, setShouldShowClaimRewardsBtn, searchParams, setSearchParams] )

    useEffect(()=>{
        getTasks( params.id )
    }, [ getTasks, params.id])
 
    const handleTaskCompleted = ( id: number, completed: boolean, points: number ) => {
        updateTasks(id, completed)
        updatePoints(currentProfile.id, points, completed)
        setShouldShowClaimRewardsBtn(rewardPoints > 0 && currentProfile.points >= rewardPoints)
    }

    const handleDeleteProfile = () => {
        deleteProfile(currentProfile.id)
    }

    const handleDeleteTask = (taskId: number) => {
        deleteTask(taskId, currentProfile.id)
    }
    return (
        <>
        <Nav />
       
        <main className='w-full min-w-[300px] text-center h-full content-area bg-primary'>
            <div className='flex flex-col justify-center items-center h-full content-fill px-[10px]'>
                {shouldShowClaimRewardsBtn &&
                    <div className='bg-primary'><EILink url={`/${currentProfile.id}/claim-rewards/${currentProfile.points}`} text='Claim Rewards' /></div>
                }
                <div className='relative flex flex-col justify-end items-center rounded-[25px] w-full max-w-[400px] min-h-[200px] bg-white px-[20px] py-[50px] mt-[20px] mb-[30px]'>

                    {!shouldShowEditProfileForm ?

                        <>
                        <button 
                            className='absolute top-[20px] right-[20px] text-primary'
                            type='button'
                            title='Edit Profile'
                            onClick={showEditProfileForm}>
                            <FontAwesomeIcon icon='pencil' className='text-2xl' />
                        </button>

                        <h1 className='flex justify-center items-center min-w-[200px] mb-[30px] aspect-square rounded-full border-8 border-primary bg-white text-primary font-semibold text-3xl'>{currentProfile.name}</h1>
                        <p className='mb-[20px]'>Age: {currentProfile.age}</p>
                        <p className='mb-[20px]'>Points: {currentProfile.points}</p>

                        
                        {!shouldShowAddTaskForm && !shouldShowEditTaskForm ?
                            <>
                                {!tasks.length && 
                                    <p className='font-semibold'>Add a task!</p>
                                }
                           
                            {/* <h2 className='font-bold self-start mb-[10px]'>Tasks:</h2> */}
                            <ul>
                            {tasks.map(t => (
                                <li key={t.id} className='flex gap-2 items-center mx-auto my-[10px]'>

                                    <Task id={t.id} task={t.task} iconType={t.iconType} completed={t.completed} points={t.points} handleTaskCompleted={handleTaskCompleted} />
                                    <button
                                        className='text-primary'
                                        type='button'
                                        title='Edit Task'
                                        onClick={ () => { showEditTaskForm( t.id ) } }
                                    >
                                        <FontAwesomeIcon icon='pencil' className='text-primary' />
                                    </button>

                                </li>
                            ))}
                            </ul>
                            {rewardCaimed !== '' &&
                                <p className='pt-[50px] font-bold'>A <span className='uppercase'>{rewardCaimed.replaceAll('-', ' ')}</span> has been claimed!</p>
                            }
                            <br className='my-[20px]' />
                            <EIAddButton title={'Add Task'} spacing='0px' clickHandler={showAddTaskForm} />
                            </>
                        :   
                            <>
                            {!shouldShowEditTaskForm ?
                                <TaskForm 
                                buttonLabel='Add Task'
                                formType='new'
                                icons={taskIcons}
                                task={currentTask}
                                earner={currentProfile.id}
                                hideForm={hideAddTaskForm} 
                                handleSubmit={handleFormSubmit}
                                />
                            :
                                <TaskForm 
                                buttonLabel='Edit Task'
                                formType='edit'
                                icons={taskIcons}
                                task={currentTask}
                                earner={currentProfile.id}
                                hideForm={hideEditTaskForm} 
                                handleSubmit={handleFormSubmit}
                                deleteTask={(taskId: number) => {
                                    handleDeleteTask(taskId)
                                    hideEditTaskForm()
                                }}
                                />
                            }
                            </>
                        }
                            
                        </>
                    :
                        <>
                        <ProfileForm 
                            formType='edit' 
                            buttonLabel='Edit Profile' 
                            id={currentProfile.id} 
                            name={currentProfile.name}  
                            age={currentProfile.age} 
                            points={currentProfile.points} 
                            hideForm={hideEditProfileForm} 
                            handleSubmit={handleFormSubmit}
                        />                            
                        <button
                        type='button'
                        className='ei-link mt-[20px] bg-secondary text-white hover:opacity-80 flex justify-center px-[40px]'
                        onClick={handleDeleteProfile}
                        >Delete</button>
                        </>
                    }
                </div>
            </div>
        </main>
        </>
    )
}

export default SingleProfile