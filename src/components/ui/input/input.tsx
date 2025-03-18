import { type ChangeEvent, type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

/**
 * Props for the Input component
 * @property {string} [errorMessage] - Error message to display below the input
 * @property {string} [label] - Label text to display above the input
 */
export type InputProps = {
  errorMessage?: string
  label?: string
  onValueChange?: (value: string) => void
} & ComponentPropsWithoutRef<'input'>

/**
 * A reusable input component with label and error message support
 * @param {string} [props.errorMessage] - Error message to display below the input
 * @param {(value: string) => void} [props.onValueChange] - Value change callback
 */
export const Input = forwardRef<ElementRef<'input'>, InputProps>(
  (
    {
      label,
      errorMessage,
      className,
      onChange,
      onValueChange,
      disabled,
      value,
      placeholder,
      ...rest
    },
    ref
  ) => {
    const baseInputClasses = `
            w-full px-4 py-3 h-[74px]
            border-2 border-light-300 text-light-700
            rounded-10
            placeholder-light-300
            transition-all duration-200
            focus:outline-none focus:ring-0 focus:border-accent-100
            hover:border-accent-100
            disabled:border-light-300 disabled:cursor-not-allowed
            ${errorMessage ? 'border-info-300 text-info-300' : ''}
            ${className || ''}
        `

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onValueChange?.(e.target.value)
    }

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-light-700" htmlFor={rest.id}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={baseInputClasses}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={onChangeHandler}
          {...rest}
        />
        {errorMessage && <span className="text-info-300">{errorMessage}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'
