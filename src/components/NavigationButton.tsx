import React from "react";
import { Button } from "antd";

declare const ButtonTypes: ["text", "primary"];
export declare type ButtonType = typeof ButtonTypes[number];

interface IProps {
  to: string,
  children: JSX.Element | string,
  type?: ButtonType
}

class NavigationButton extends React.Component<IProps, {}> {

  private redirect (to: string):void {
    window.location.assign(to);
  }

  public render(): JSX.Element {
    return (
      <Button type={this.props.type || "text"} onClick={() => this.redirect(this.props.to)}> {this.props.children} </Button>
    )
  }
}

export default NavigationButton;