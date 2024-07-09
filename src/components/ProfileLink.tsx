import EILink from "./EILink";

interface Props {
    id: number
    name: string;
}

const ProfileLink = ( props: Props ) => {
    return (
        <li className='my-3' key={props.id}>
            <EILink url={`/profiles/${props.id}`} text={props.name} />
        </li>
    )
}

export default ProfileLink