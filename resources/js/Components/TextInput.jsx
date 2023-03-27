import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', name, id, value, className, autoComplete, required, isFocused, handleChange, as = 'input', placeholder },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    const ElementType = as;

    return (
        <div className="flex flex-col items-start">
            <ElementType
                type={type}
                name={name}
                id={id}
                as={as}
                value={value}
                className={
                    `border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md border-2 ` +
                    className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                placeholder={placeholder}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
});
