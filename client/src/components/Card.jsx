export function Card ({name, total, children}) {
    return (
        <div className="info-card">
            <div className="">
                <h2>{name}: </h2> 
                <span>{total}</span>
            </div>
            {children}
        </div>
    )
}