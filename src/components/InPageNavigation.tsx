import * as React from 'react';
import { Space } from 'antd';
import styles from '../static/styles/InPageNavigation.module.css';

interface InPageNavigationItem {
  to: string,
  value: JSX.Element | string
}

type IProps = {
  list: Array<InPageNavigationItem>
}

const InPageNavigation: React.FunctionComponent<IProps> = props => {
  return (
    <Space size="large">
      {props.list.map(item => <a className={styles['link']} href={item.to}>{item.value}</a>)}
    </Space>
  )
}

export default InPageNavigation;