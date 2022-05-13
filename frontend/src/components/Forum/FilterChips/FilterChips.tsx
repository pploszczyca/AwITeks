import React, {useRef} from "react";
import {ChipsButton} from "./ChipsStyle";

const FilterChips: React.FC<{text: string}> = ({text}) => {
    const chips: React.RefObject<HTMLButtonElement> = useRef(null);

    const filterThreads = () => {
        chips.current?.classList.toggle('active');

        //todo: filter threads
    }


    return (
        <ChipsButton ref={chips} onClick={() => filterThreads()}>
            {text}
        </ChipsButton>
    )
}

export default FilterChips;
