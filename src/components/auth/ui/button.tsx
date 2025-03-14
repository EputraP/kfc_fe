'use client'
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  label: string;    
}

export function SubmitButton(props: SubmitButtonProps) {
    const { pending } = useFormStatus();
  
    return (
      <button disabled={pending} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
        {props.label}
      </button>
    );
  }