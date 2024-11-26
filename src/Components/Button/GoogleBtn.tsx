import googleIcon from '../../assets/google.svg'

export const GoogleButton = () => {
    return (
        <button
            type='button'
            className='flex items-center justify-center w-full gap-4 text-Black font-medium font-outfit text-base border-[1px] border-Black py-[.6rem]'>
            <img src={googleIcon} alt="google icon" />
            <span>Continue with Google </span>
        </button>
    )
}