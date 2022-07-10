import { components } from "react-select";
import SvgSelector from "../icons/SvgSelector";

const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <SvgSelector id='downArrow' />
      </components.DropdownIndicator>
    );
  };

export default DropdownIndicator