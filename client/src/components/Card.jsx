export function Card ({name, total}) {
    return (
        <div className="info-card">
            <h2>{name}: </h2> 
            <span>{total}</span>
        </div>
    )
}