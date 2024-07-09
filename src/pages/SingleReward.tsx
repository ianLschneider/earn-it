import { useMemo, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Nav from "../components/Nav"
import EIAddButton from "../components/EIAddButton"


interface Reward {
    id: number;
    earner: [number];
    reward: string;
    points: number;
    iconType: any;
}

// interface Props {
//     profiles: Reward[],
//     tasks: TaskProp[],
//     updateTasks: (id: number, completed: boolean) => void,
//     updatePoints: (id: number, points: number) => void,
//     getTasks: (id: number) => void,
// }

const SingleReward = ({rewards}: {rewards: Reward[]} ) => {

    const params = useParams() as any

    const blank =  useMemo<any>( ()=>( {id:0, name: '', age: 0} ), [] )

    const [currentReward, setCurrentReward] = useState<Reward>( blank )
    
    // const [tasks, setTasks] = useState<TaskProp[]>( [] )
    
    useEffect(()=>{

        const r: Reward | undefined = rewards.find( r => r.id === parseInt( params.id ) )

        if(!r){
            return
        }

        setCurrentReward( r )

    }, [params.id, rewards] )

    useEffect(()=>{
        // getTasks( params.id )
    }, [])
   
    // const currentPost = useMemo( () => posts.find( post => post.id === parseInt( params.id ) ), [params.id, posts])

    // const handleTaskCompleted = ( id: number, completed: boolean, points: number ) => {
    //     //console.log(id, completed)
    //     updateTasks(id, completed)
    //     updatePoints(id, points)
    // }

    const showAddTask = ( ) => {
        console.log("open task modal")
        
        
    }
    return (
        <>
        <Nav />
        <main className='w-full min-w-[300px] text-center h-full content-area bg-primary'>
            <div className='flex flex-col justify-center items-center h-full content-fill px-[10px]'>
                
                <div className='flex flex-col justify-end items-center rounded-[25px] w-full max-w-[400px] min-h-[200px] bg-white px-[20px] py-[50px] mt-[20px] mb-[30px]'>
                <div></div>
                    <h1 className='flex flex-col gap-2 justify-center items-center min-w-[200px] mb-[30px] aspect-square rounded-full border-8 border-primary bg-white text-primary font-semibold text-3xl break-all'>
                        {
                            currentReward.iconType ?
                            <FontAwesomeIcon icon={currentReward.iconType} className='text-6xl' />
                            : ''
                        }{currentReward.reward}
                    </h1>
                    <p className="mb-[20px]">Points: {currentReward.points}</p>

                    {/* { rewards.map( r => <Reward  key={r.id} id={r.id} reward={r.rask} iconType={r.iconType} points={t.points} handleTaskCompleted={handleTaskCompleted} />) } */}
                    <br className='my-[20px]' />
                    {/* <EIAddButton title={'Add Task'} click={showAddTask} /> */}
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

export default SingleReward