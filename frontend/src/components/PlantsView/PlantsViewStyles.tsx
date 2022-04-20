import styled from "styled-components";


export const SearchBoxContainer = styled.div`
    height: 100%;
    //width: 100%;
    font-size: 18px;
    box-shadow: 0 0 13px -7px rgba(66, 68, 90, 1);
    border-radius: 25px;

    &:first-child {
        padding-left: 12px;
    }

    &:hover {
        cursor: text;
    }

 `;

export const SearchBox = styled.input`
    border: none;
    outline: none;
    height: 44px;
    width: calc(100% - 40px); // 40px == 2 * 20px (20px = faMagnifyingGlass font size)
    margin-left: 4px;
`;

export const AddPlantButton = styled.button`
    background-color: #008F8C;
    color: #FFF;
    padding: 10px 30px;
    outline: none;
    border: none;
    width: 100%;

    &:hover {
        opacity: 0.9;
    }
`;


export const PlantTypesContainer = styled.div`
    max-height: 85px;
    margin: 0;
    padding: 5px;
    overflow-y: scroll;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-right: none;

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }
    
    ::-webkit-scrollbar-thumb {
        background: #888; 
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }
`;

export const DropdownContainer = styled.div`
    background-color: #008F8C;
`;

export const DropdownItem = styled.div`
    background-color: #008F8C;
    color: #FFF;
    padding: 4px;
    border-top: 1px solid black;
    width: 100%;
    &:hover {
        opacity: 0.9;
        cursor: pointer;
    }
`;

export const ListContainer = styled.div`
    margin-top: 70px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;  
    scrollbar-width: none;
`;

// TODO need to make SiteTitleAndIcons fixed first
export const SettingsWrapper = styled.div`
    /* position: relative;
    height: 20vh;
    width: 100%; */
`;

export const SettingsBox = styled.div`
    /* position: fixed;
    height: 20vh;
    width: 100%;
    z-index: 10000000;
    background: #FFF; */
`;
