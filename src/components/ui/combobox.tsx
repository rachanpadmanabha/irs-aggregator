import * as React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Input } from "./input"

interface ComboboxProps {
  value: string
  onChange: (value: string) => void
  options: Array<{ label: string; value: string }>
  placeholder?: string
  className?: string
  disabled?: boolean
  error?: boolean
}

export function Combobox({
  value,
  onChange,
  options,
  placeholder = "Select or type...",
  className,
  disabled = false,
  error = false
}: ComboboxProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(value)

  const filteredOptions = React.useMemo(() => {
    if (!search) return options
    
    const searchLower = search.toLowerCase()
    return options.filter(option =>
      option.label.toLowerCase().includes(searchLower)
    )
  }, [options, search])

  const handleSelect = (selectedValue: string) => {
    setSearch(selectedValue)
    onChange(selectedValue)
    setOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSearch(newValue)
    onChange(newValue)
    setOpen(true)
  }

  const handleBlur = () => {
    setTimeout(() => setOpen(false), 200)
  }

  const handleFocus = () => {
    setOpen(true)
  }

  return (
    <div className="relative">
      <Input
        type="text"
        value={search}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(error && "border-destructive", className)}
        autoComplete="off"
      />
      
      {open && filteredOptions.length > 0 && (
        <div className="absolute z-[9999] mt-2 bg-white border-2 border-purple-200 rounded-xl shadow-2xl max-h-48 overflow-auto w-full" style={{ maxWidth: '100%' }}>
          <div className="py-1">
            {filteredOptions.slice(0, 30).map((option) => (
              <button
                key={option.value}
                type="button"
                className="w-full px-4 py-2.5 text-left hover:bg-gradient-to-r hover:from-primary/10 hover:to-purple-500/10 text-sm transition-all group"
                onMouseDown={(e) => {
                  e.preventDefault()
                  handleSelect(option.label)
                }}
              >
                <span className="group-hover:text-primary group-hover:font-medium transition-all">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
          {filteredOptions.length > 30 && (
            <div className="px-4 py-2 text-xs text-muted-foreground text-center bg-gradient-to-r from-blue-50 to-purple-50 border-t">
              ... and {filteredOptions.length - 30} more (keep typing to filter)
            </div>
          )}
        </div>
      )}
      
      {open && search && filteredOptions.length === 0 && (
        <div className="absolute z-[9999] mt-2 bg-white border-2 border-purple-200 rounded-xl shadow-2xl w-full">
          <div className="px-4 py-3 text-sm text-muted-foreground">
            No countries found. You can still use this value.
          </div>
        </div>
      )}
    </div>
  )
}
