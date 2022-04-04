

const MovableItem = () => {
    return (
        <div className='movable-item'>
            We will move this item
        </div>
    )
}

const Column = () => {
    return (
        <div className='column first-column'>
            Column 1
            <MovableItem/>
        </div>
    )
}