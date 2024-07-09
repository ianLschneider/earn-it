import { useMemo, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Nav from "../components/Nav"
import Task from "../components/Task"
import EIAddButton from "../components/EIAddButton"


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
    profiles: Profile[],
    tasks: TaskProp[],
    updateTasks: (id: number, completed: boolean) => void,
    updatePoints: (id: number, points: number) => void,
    getTasks: (id: number) => void,
}

const SingleProfile = ({profiles, tasks, updateTasks, getTasks, updatePoints}: Props ) => {

    const params = useParams() as any

    const blank =  useMemo<any>( ()=>( {id:0, name: '', age: 0} ), [] )

    const [currentProfile, setCurrentProfile] = useState<Profile>( blank )
    
    // const [tasks, setTasks] = useState<TaskProp[]>( [] )
    
    useEffect(()=>{

        const p: Profile | undefined = profiles.find( profile => profile.id === parseInt( params.id ) )

        if(!p){
            return
        }

        setCurrentProfile( p )

    }, [params.id, profiles] )

    useEffect(()=>{
        getTasks( params.id )
    }, [])
   
    // const currentPost = useMemo( () => posts.find( post => post.id === parseInt( params.id ) ), [params.id, posts])

    const handleTaskCompleted = ( id: number, completed: boolean, points: number ) => {
        //console.log(id, completed)
        updateTasks(id, completed)
        updatePoints(id, points)
    }

    const showAddTask = ( ) => {
        console.log("open task modal")
        
        
    }
    return (
        <>
        <Nav />
        <main className='w-full min-w-[300px] text-center h-full content-area bg-primary'>
            <div className='flex flex-col justify-center items-center h-full content-fill px-[10px]'>
                
                <div className='flex flex-col justify-end items-center rounded-[25px] w-full max-w-[400px] min-h-[200px] bg-white px-[20px] py-[50px] mt-[20px] mb-[30px]'>
                    <h1 className='flex justify-center items-center min-w-[200px] mb-[30px] aspect-square rounded-full border-8 border-primary bg-white text-primary font-semibold text-3xl'>{currentProfile.name}</h1>
                    <p className="mb-[20px]">Age: {currentProfile.age}</p>
                    <p className="mb-[20px]">Points: {currentProfile.points}</p>

                    { tasks.map( t => <Task  key={t.id} id={t.id} task={t.task} iconType={t.iconType} completed={t.completed} points={t.points} handleTaskCompleted={handleTaskCompleted} />) }
                    <br className='my-[20px]' />
                    <EIAddButton title={'Add Task'} click={showAddTask} />
                </div>

                
                {/* <Link to={`/edit/${params.id}`}>
                    <button type="button">Edit Post</button>
                </Link>
                <Link to={`/profiles`}>
                    <button type="button">Go Back</button>
                </Link> */} 
            </div>
        </main>
        </>
    )
}

export default SingleProfile