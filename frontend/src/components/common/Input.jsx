import React from "react";
import PropTypes from "prop-types";
import cn from "classnames"

const Input = React.forwardRef(
  (
    { onChange, onBlur, value, readOnly, label, id, type, placeholder, error, className, cnInput, cnLabel },
    ref
  ) => {
    return (
      <div className={cn("flex flex-col gap-0.5 h-fit", className)}>
        {label && (
          <div className="flex">
            <label className={cn(cnLabel)} htmlFor={id}>
              {label}
            </label>
            <p>{error && "❌"}</p>
          </div>
        )}

        <input
          readOnly={readOnly ?? false}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          placeholder={placeholder ?? ""}
          id={id}
          name={id}
          type={type}
          value={value}
          className={cn("text-slate-800 p-2 h-full min-h-full rounded-lg shadow-inner shadow-slate-400 focus:outline-pink-500",
          error && "ring-2 ring-red-500", cnInput)}
        />
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    );
  }
);

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  darkmode: PropTypes.bool,
  className: PropTypes.string,
};

Input.displayName = "Input";

export default Input;
