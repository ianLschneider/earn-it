import EILink from '../components/EILink'
import EarnItLogo from '../assets/earn-it-logo.svg';
const Landing = () => {
  return (
    <main className='w-full min-w-[300px] h-full min-h-full bg-primary text-center'>
      <div className='flex flex-col justify-center items-center min-h-screen'>
          <h1><img src={EarnItLogo} alt='EarnIt Rewards Chart' className='w-[100%] max-w-[500px] mx-auto' /></h1>
          <EILink url={'/profiles/'} text={'Get Started'} />
      </div>
    </main>
  )
}

export default Landing