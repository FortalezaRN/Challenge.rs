import React from 'react';
import { Link as LinkRouter} from 'react-router-dom'

interface LinkProps{
  data: object;
  children: string;
}

const Link = ({
  data,
  children
}: LinkProps) => {
  return(
    <LinkRouter
      to={data}
      className="btn-primary"
    >
      {children}
    </LinkRouter>
  )
}

export default Link;