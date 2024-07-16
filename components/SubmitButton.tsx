import React from 'react'
import { Button } from './ui/button';

interface ButtonProps{
    isLoading?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const SubmitButton = ({isLoading, children, className}:ButtonProps) => {
  return (
    <Button Loading={isLoading}/>
  )
}

export default SubmitButton