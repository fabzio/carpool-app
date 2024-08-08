import { useEffect, useRef, useState } from "react";

interface Props {
  values: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  disabled?: boolean;
}

export default function DropdownList({
  values,
  selectedValue,
  onSelect,
  disabled = false,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDetailsElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (event: React.MouseEvent) => {
    if (!disabled) {
      event.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <details
      className={`dropdown dropdown-top col-span-2 w-full ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      ref={dropdownRef}
      open={isOpen}
    >
      <summary
        className={`btn m-1 w-full ${
          disabled ? "text-gray-500" : ""
        }`}
        onClick={toggleDropdown}
      >
        {selectedValue}
      </summary>
      {isOpen && !disabled && (
        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] p-2 shadow w-full">
          {values.map((value) => (
            <li key={value} className="w-full">
              <a
                className="w-full justify-center"
                onClick={() => {
                  setIsOpen(false);
                  onSelect(value);
                }}
              >
                {value}
              </a>
            </li>
          ))}
        </ul>
      )}
    </details>
  );
}
