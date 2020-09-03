import * as React from 'react';

const style: React.CSSProperties = {
  border: "1px solid #5c5c5c",
  borderRadius: "10px",
  padding: "1rem",
  color: "initial"
}

type IProps = {
  href: string
}

const Tag: React.FunctionComponent<IProps> = props => {
  return (
    <a
      style={style}
      href={props.href}
    >
      {props.children}
    </a>
  )
}

export default Tag;