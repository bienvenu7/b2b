import Select from "react-select"

const FilterSelect = (props) =>{

    function handleChange(e){
        props.handleChange(e, props.index, props.length)
    }

    return (
        <>
        <Select key={props.index} options={props.mainOptions} classNamePrefix="custom-select__dashboard" placeholder='Select filter' onChange={(e) => handleChange(e)} />
        </>
    )
}

export default FilterSelect