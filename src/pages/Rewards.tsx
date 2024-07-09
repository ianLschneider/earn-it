import Nav from '../components/Nav'
import RewardLink from '../components/RewardLink'
import EIAddButton from '../components/EIAddButton'

interface Reward {
  earner: any
  id: number;
  reward: string;
  points: number
  iconType: any;
}

interface Props {
  rewards: Reward[];
  // addProfile: (prorefile: Reward) => void;
}

const Rewards = ({rewards}: Props) => {
  console.log("rewardssss:",rewards)
  const showAddRewardForm = () => {
    console.log("click")
  }

  return (
    <>
      <Nav />
      <main className='w-full min-w-[300px] text-center h-full min-h-screen bg-primary'>
        <div className='flex flex-col justify-center items-center min-h-screen'>
        <div className='flex flex-col justify-end items-center rounded-[25px] max-w-[600px] min-h-[200px] bg-white px-[20px] py-[50px] mt-[20px] mb-[80px]'>
            <ul>
              { rewards.map(r => <RewardLink id={r.id} reward={r.reward} iconType={r.iconType} spacing={"between"} key={r.id} /> ) }
            </ul>
            <EIAddButton title={'Add Profile'} click={showAddRewardForm} />
          </div>
        </div>
      </main>
    </>
  )
}

export default Rewards