import { useMemo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Nav from '../components/Nav'

interface Reward {
    id: number;
    name: string;
    points: number;
    iconType: any;
}

interface Props {
    rewards: Reward[];
    claimReward:(rewardId: number, rewardName: string, profileId: number, points: number) => void;
    deleteReward: (id: number) => void;
}

const SingleReward = (props: Props ) => {

    const params = useParams() as any

    const blank =  useMemo<any>( ()=>( {id:0, name: '', points: 0} ), [] )

    const [currentReward, setCurrentReward] = useState<Reward>( blank )

    const [currentProfile, setCurrentProfile] = useState<number>( 0 )
   
    const [currentPoints, setCurrentPoints] = useState<number>( 0 )

    const deleteReward = () => {
        props.deleteReward(currentReward.id)
    }
    
    const claimReward = ()=>{
      
        props.claimReward(currentReward.id, currentReward.name, params.profile, currentReward.points )
    }
    useEffect(()=>{

        const r: Reward | undefined = props.rewards.find( r => r.id === parseInt( params.id ) )

        if(!r){
            return
        }

        setCurrentReward( r )

        setCurrentProfile(params.profile)
        setCurrentPoints(params.points)

    }, [params.id, props.rewards, params.profile, params.points] )
   
    return (
        <>
        <Nav />
        <main className='w-full min-w-[300px] text-center h-full content-area bg-primary'>
            <div className='flex flex-col justify-center items-center h-full content-fill px-[10px]'>
                <div className='flex flex-col justify-end items-center rounded-[25px] w-full max-w-[400px] min-h-[200px] bg-white px-[20px] py-[50px] mt-[20px] mb-[30px]'>
                    <Link to={`/${params.profile}/claim-rewards/${params.points}`} className='self-start text-secondary'>
                        <FontAwesomeIcon icon='arrow-left' className='text-secondary' /> Back
                    </Link>

                    <h1 className='flex flex-col gap-2 justify-center items-center min-w-[200px] mb-[30px] aspect-square rounded-full border-8 border-primary bg-white text-primary font-semibold text-3xl break-all'>
                    {currentReward.iconType ?
                        <FontAwesomeIcon icon={currentReward.iconType} className='text-6xl' />
                        : ''
                        }{currentReward.name}
                    </h1>
                    <p className='mb-[40px]'>Points: {currentReward.points}</p>                   
                    {currentProfile > 0 && currentPoints >= currentReward.points && 
                        <button
                        type='button'
                        className='ei-link mt-[20px] bg-secondary text-white hover:opacity-80 flex justify-center px-[40px]'
                        onClick={claimReward}
                        >Claim Reward</button>
                    }
                    {currentProfile < 1 && 
                        <button
                        type='button'
                        className='ei-link mt-[20px] bg-secondary text-white hover:opacity-80 flex justify-center px-[40px]'
                        onClick={deleteReward}
                        >Delete</button>
                    }
                    
                </div>

                
            </div>
        </main>
        </>
    )
}

export default SingleReward