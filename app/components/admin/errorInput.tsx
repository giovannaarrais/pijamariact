interface ErrorInputProps {
    message:  string | undefined
}
export default function ErrorInput({message}: ErrorInputProps) {
    return (
        <small className="text-red-500 absolute bg-secondary py-1 px-2 rounded bottom-10">
            {message}
        </small>
    )
}