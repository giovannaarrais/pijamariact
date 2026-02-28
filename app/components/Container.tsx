interface ContainerProps {
    children: React.ReactNode
}

const Container = ({children}: ContainerProps) => {
    return ( 
        <div className="max-w-7xl mx-auto py-20 space-y-10 px-5">
            {children}
        </div>
    );
}
 
export default Container;