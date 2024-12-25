import { useState } from 'react'

import Nav from '../components/Nav'
import ProfileLink from '../components/ProfileLink'
import EIAddButton from '../components/EIAddButton'

import ProfileForm from '../components/ProfileForm'

interface Profile {
  id: number;
  name: string;
  age: number;
  points?: number;
}

interface Props {
  profiles: Profile[];
  handleFormSubmit: (data: any, type: string)=>void;
}


const Profiles = (props: Props ) => {

  const [showForm, setShowForm] = useState<boolean>(false)

  const showAddProfileForm = () => {
    setShowForm(true)
  }
  const hideProfileForm = () => {
    setShowForm(false)
  }
  return (
    <>
    <header>
      <Nav />
    </header>
    <main className='w-full min-w-[300px] text-center h-full min-h-screen bg-primary'>
      <div className='flex flex-col justify-center items-center min-h-screen'>
        <div className='flex flex-col justify-end items-center rounded-[25px] max-w-[600px] min-h-[200px] bg-white px-[20px] py-[25px] mt-[20px] mb-[80px]'>
            {!showForm ?
              <>
              <ul>
                {props.profiles.map(p => <ProfileLink id={p.id} name={p.name} key={p.id} /> )}
              </ul>
              <EIAddButton title={'Add Profile'} clickHandler={showAddProfileForm} />
              </>
            :
              <ProfileForm formType='new' buttonLabel='Add Profile' hideForm={hideProfileForm} handleSubmit={props.handleFormSubmit}/>
            }
          </div>
      </div>
    </main>
    </>
  )
}

export default Profiles