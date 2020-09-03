import * as React from 'react';
import Header from '../components/Header';
import { Affix, Typography, Row, Col, Carousel } from 'antd';
// import { SearchOutlined } from '@ant-design/icons';
import SearchInput from '../components/SearchInput';
import PhotoBackGround from '../components/PhotoBackGround';
import NavigationButton from '../components/NavigationButton';
import BodyLayout from '../components/Layout/Body';
const { Title } = Typography;

class Home extends React.Component<{}, {}> {

	public render(): JSX.Element {

		const banner = (
			<div>
				<Row justify="center" align="middle">
					<Col xs={22} sm={22} md={18} lg={12} xl={12}>
						<Carousel autoplay effect="fade" style={{ "minHeight": "380px", "paddingTop": "100px" }}>
							<div>
								<Title style={{ "margin": "12px 0", color: "#EB426A" }}>转租市场</Title>
								<Title style={{ "margin": "12px 0" }}>更方便地找到你的理想之所</Title>
								<br />
								<NavigationButton type="dashed" to="/sublease">转租市场</NavigationButton>
							</div>
							<div>
								<Title style={{ "margin": "12px 0", color: "#EB426A" }}>找室友</Title>
								<Title style={{ "margin": "12px 0" }}>远亲不如近邻</Title>
								<br />
								<NavigationButton type="dashed" to="/sublease">找室友</NavigationButton>
							</div>
							<div>
								<Title style={{ "margin": "12px 0", color: "#EB426A" }}>房源 WIKI</Title>
								<Title style={{ "margin": "12px 0" }}>由住户维护的房源百科</Title>
								<br />
								<NavigationButton type="dashed" to="/sublease">房源 WIKI</NavigationButton>
							</div>
						</Carousel>
					</Col>
				</Row>
			</div>
		)

		return (
			<div>
				<Affix offsetTop={0}>
					<Header />
				</Affix>
				<PhotoBackGround banner={banner} >
				</PhotoBackGround>
				<BodyLayout>
					<SearchInput />
				</BodyLayout>
			</div>
		)
	}

}

export default Home;