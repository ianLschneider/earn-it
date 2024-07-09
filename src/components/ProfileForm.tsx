import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface Props{
    id?: number;
    name?: string;
    age?: number;
    points?: number;
    formType: string;
    buttonLabel: string;
    handleSubmit: (formData: any, formType: string) => void;
}

const ProfileForm = (props: Props) => {

    const [formData, setFormData] = useState(
        props.formType.toLocaleLowerCase() === 'new' ? {
            name: '',
            age: '',
            points: 0
        } : {
            name: props.name,
            age: props.age,
            id: props.id,
            points: props.points
        }
    )

    const handleChange = (event: any) => {
        console.log("event.target.name:",event.target.name)
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
            <input
                type="submit"
                className='ei-link mt-[20px] bg-secondary text-white hover:opacity-80 flex justify-center px-[40px]'
                value={props.buttonLabel} />
        </form>
    )
}

export default ProfileForm