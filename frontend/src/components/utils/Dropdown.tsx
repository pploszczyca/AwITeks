import React, {useEffect, useRef, useState} from 'react'
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'

const DropdownToggle = styled.button`
    position: relative;
    outline: none;
    border: none;
    padding: 10px 0;
    width: 100%;
    
    & > *:last-child {
        position: absolute;
        right: 12px;
        top: 12px;
        font-size: 1.3rem;
    }
    
    &:hover {
        opacity: 0.9;
    }
`;

const DropdownContainer = styled.div`
    position: absolute;
    z-index: 1000;
    //min-width: 180px;
    width: 90%;
    left: 50%;
    transform: translateX(-50%);
    overflow: visible;
    text-align: center;
    background-color: #FFF;
`;



type DropdownProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    label: string,
};


// Bootstrap Dropdown didnt work, no idea why
const Dropdown: React.FC<DropdownProps> = ({ label, children, ...props }) => {
    const [isOpen, setOpen] = useState(false);
    const dropdownRef: any = useRef(null);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        }
    }, [dropdownRef]);

    return (
        <>
            <DropdownToggle ref={dropdownRef} {...props as any} onClick={() => setOpen(isOpen => !isOpen)}>
                <span>{label}</span>
                <FontAwesomeIcon icon={faAngleDown} />
            </DropdownToggle>
            {
                isOpen && <DropdownContainer>
                    {children}
                </DropdownContainer>
            }
        </>
    )
};


export default Dropdown;
