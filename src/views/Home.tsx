import * as React from 'react';
import Header from '../components/Header';
import { Affix } from 'antd';

class Home extends React.Component<{}, {}> {

	public render(): JSX.Element {
		return (
			<div>
				<Affix offsetTop={0}>
					<Header />
				</Affix>
			</div>
		)
	}

}

export default Home;