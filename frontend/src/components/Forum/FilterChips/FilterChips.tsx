import React, {useRef} from "react";
import {ChipsButton} from "./ChipsStyle";
import filterChip from "../Forum"

const FilterChips: React.FC<{text: string, id: number}> = ({text}, {id}) => {
    const chips: React.RefObject<HTMLButtonElement> = useRef(null);

    const filterThreads = () => {
        chips.current?.classList.toggle('active');
        filterChip(id);
    }

    return (
        <ChipsButton ref={chips} onClick={() => filterThreads()}>
            {text}
        </ChipsButton>
    )
}

export default FilterChips;
