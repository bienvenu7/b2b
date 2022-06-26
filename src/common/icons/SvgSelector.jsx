const SvgSelector = (props) => {
    switch (props.id) {
        case 'arrowsDown':
            return (
                <svg className={props.id} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 0.585938L5.24264 4.82858L9.48528 0.585938" stroke="#344767" />
                </svg>
            )
        default:
            return (<svg></svg>)
    }
}

export default SvgSelector
