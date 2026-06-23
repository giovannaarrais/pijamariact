interface ContainerProps {
    children: React.ReactNode
    extraClass?: string
}

const Container = ({children, extraClass}: ContainerProps) => {
    return ( 
        <div className={` ${extraClass || ''} max-w-7xl mx-auto py-20 space-y-10 px-5`}>
            {children}
        </div>
    );
}
 
export default Container;