import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

interface Props{
    id?: number;
    name?: string;
    age?: number;
    points?: number;
    formType: string;
    buttonLabel: string;
    handleSubmit: (formData: any, formType: string) => void;
    hideForm: () => void;
}

const ProfileForm = (props: Props) => {
    const [formData, setFormData] = useState(
        props.formType.toLowerCase() === 'new' ? {
            name: '',
            age: '',
            points: 0
        } : {
            name: props.name,
            age: props.age,
            id: props.id,
            points: props.points,
        }
    )

    const handleChange = (event: any) => {
        setFormData( prev =>(
            {
                ...prev,
                [event.target.name]: event.target.value
            }
        ) )
    }

    const handleSubmission = (event: React.FormEvent) => {
        event.preventDefault()
        props.handleSubmit(formData, props.formType)
        if(props.hideForm)props.hideForm()
    }

    return (
        <form 
            className='w-full text-left text-secondary font-bold'
            onSubmit={handleSubmission}>
            <label>
                Name:
                <input
                    className='block w-full mx-auto mt-[3px]  mb-[10px] px-[10px] py-[2px] border-2 border-solid border-secondary rounded-[5px]'
                    type='text'
                    onChange={handleChange}
                    value={formData.name}
                    name='name'
                
                />
            </label>
            <label>
                Age:
            <input
                className='block w-full mx-auto mt-[3px] px-[10px] py-[2px] border-2 border-solid border-secondary rounded-[5px]'
                type='number'
                onChange={handleChange}
                value={formData.age}
                name='age'
            />
            </label>
            <label>
                points:
            <input
                className='block w-full mx-auto mt-[3px] px-[10px] py-[2px] border-2 border-solid border-secondary rounded-[5px]'
                type='number'
                onChange={handleChange}
                value={formData.points}
                name='points'
            />
            </label>
            <input
                type='submit'
                className='ei-link mt-[20px] bg-secondary text-white hover:opacity-80 flex justify-center px-[40px]'
                value={props.buttonLabel} />
            <button
                className='ei-link mt-[20px] bg-secondary text-white hover:opacity-80 flex justify-center px-[40px]'
                type='button'
                title='Cancel'
                onClick={ ()=>{ 
                    console.log('hideForm')
                    props.hideForm() 
                } }
            >
                Cancel
            </button>
        </form>
    )
}

export default ProfileForm