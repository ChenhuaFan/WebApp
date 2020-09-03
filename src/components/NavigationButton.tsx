import React from "react";
import { Button } from "antd";

declare const ButtonTypes: ["text", "primary", "dashed"];
export declare type ButtonType = typeof ButtonTypes[number];

interface IProps {
  to: string,
  children: JSX.Element | string,
  type?: ButtonType,
  style?: React.CSSProperties;
}

class NavigationButton extends React.Component<IProps, {}> {

  private redirect (to: string):void {
    window.location.assign(to);
  }

  public render(): JSX.Element {
    return (
      <Button style={this.props.style} type={this.props.type || "text"} onClick={() => this.redirect(this.props.to)}> {this.props.children} </Button>
    )
  }
}

export default NavigationButton;