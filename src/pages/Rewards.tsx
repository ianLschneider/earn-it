import { useState } from 'react'
import { useParams } from 'react-router-dom'

import Nav from '../components/Nav'
import RewardLink from '../components/RewardLink'
import EIAddButton from '../components/EIAddButton'
import RewardForm from '../components/RewardForm'

interface Reward {
  earner: any
  id: number;
  reward: string;
  points: number
  iconType: any;
}

interface Props {
  rewards: Reward[];
  rewardIcons: string[];
  handleFormSubmit: (data: any, type: string)=>void;
}

const Rewards = (props: Props) => {

  const [showForm, setShowForm] = useState<boolean>(false)

  const showAddRewardForm = () => {
    setShowForm(true)
  }
  const hideAddRewardForm = () => {
    setShowForm(false)
  }

  const params = useParams() as any


  return (
    <>
      <Nav />
      <main className='w-full min-w-[300px] text-center h-full min-h-screen bg-primary'>
        <div className='flex flex-col justify-center items-center min-h-screen'>
        <div className='flex flex-col justify-end items-center rounded-[25px] max-w-[600px] min-h-[200px] bg-white px-[20px] py-[50px] mt-[20px] mb-[80px]'>

          {!showForm ?
              <>
              <ul>
                { props.rewards.map(r => <RewardLink profile={params.profile} points={params.points} id={r.id} reward={r.reward} iconType={r.iconType} spacing={'between'} key={r.id} /> ) }
              </ul>
              <EIAddButton title={'Add Profile'} click={showAddRewardForm} />
              </>
            :   

              <RewardForm 
                  icons={props.rewardIcons}
                  buttonLabel='Add Reward'
                  hideForm={hideAddRewardForm}
                  handleSubmit={props.handleFormSubmit}
              />

            }
          </div>
        </div>
      </main>
    </>
  )
}

export default Rewards