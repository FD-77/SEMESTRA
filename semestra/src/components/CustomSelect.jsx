import React, { useState, useRef, useEffect } from 'react';

const CustomSelect = ({ options, value, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selectedOption = options.find(opt => opt.id === value);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="custom-select">
            <button
                type="button"
                className="gpa-calculator__select"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedOption ? selectedOption.name : placeholder}
            </button>
            
            {isOpen && (
                <div className="custom-select__options">
                    <div 
                        className="custom-select__option"
                        onClick={() => {
                            onChange("");
                            setIsOpen(false);
                        }}
                    >
                        {placeholder}
                    </div>
                    {options.map(option => (
                        <div
                            key={option.id}
                            className={`custom-select__option ${value === option.id ? 'custom-select__option--selected' : ''}`}
                            onClick={() => {
                                onChange(option.id);
                                setIsOpen(false);
                            }}
                        >
                            {option.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;