import { useMemo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Nav from '../components/Nav'

interface Reward {
    id: number;
    earners: number[];
    reward: string;
    points: number;
    iconType: any;
}

interface Props {
    rewards: Reward[];
    deleteReward: (id: number) => void;
}

const SingleReward = (props: Props ) => {

    const params = useParams() as any

    const blank =  useMemo<any>( ()=>( {id:0, reward: '', points: 0} ), [] )

    const [currentReward, setCurrentReward] = useState<Reward>( blank )
    
    const deleteReward = () => {
        props.deleteReward(currentReward.id)
    }
    
    useEffect(()=>{

        const r: Reward | undefined = props.rewards.find( r => r.id === parseInt( params.id ) )

        if(!r){
            return
        }

        setCurrentReward( r )

    }, [params.id, props.rewards] )
   
    return (
        <>
        <Nav />
        <main className='w-full min-w-[300px] text-center h-full content-area bg-primary'>
            <div className='flex flex-col justify-center items-center h-full content-fill px-[10px]'>
                
                <div className='flex flex-col justify-end items-center rounded-[25px] w-full max-w-[400px] min-h-[200px] bg-white px-[20px] py-[50px] mt-[20px] mb-[30px]'>
                    <Link to={`/rewards`} className='self-start text-secondary'>
                        <FontAwesomeIcon icon='arrow-left' className='text-secondary' /> Back
                    </Link>

                    <h1 className='flex flex-col gap-2 justify-center items-center min-w-[200px] mb-[30px] aspect-square rounded-full border-8 border-primary bg-white text-primary font-semibold text-3xl break-all'>
                    {currentReward.iconType ?
                        <FontAwesomeIcon icon={currentReward.iconType} className='text-6xl' />
                        : ''
                        }{currentReward.reward}
                    </h1>
                    <p className='mb-[40px]'>Points: {currentReward.points}</p>                   

                    <button
                    type='button'
                    className='ei-link mt-[20px] bg-secondary text-white hover:opacity-80 flex justify-center px-[40px]'
                    onClick={deleteReward}
                    >Delete</button>
                    
                </div>

                
            </div>
        </main>
        </>
    )
}

export default SingleReward