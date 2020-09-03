import * as React from 'react';
import { Carousel } from 'antd';

type PhotoListItem = string;

type IProps = {
  photos: Array<PhotoListItem>
}

class PhotoWall extends React.Component<IProps, {}> {

  public render() {

    //todo: calculate each photo.
    // the highest height is 80vh. and max width is 100vw = 100%;
    // 
    const photos = this.props.photos.map((link, index) => <img key={index} src={link} alt={`${index}`} />)

    return (
      <div style={{ height: "70vh", width: "100%" }}>
        <Carousel autoplay style={{ height: "inherit", width: "inherit" }}>
          <img key={0} src="../static/imgs/post/1.jpg" alt={`abcc`} />
          <img key={1} src="../static/imgs/post/2.jpg" alt={`abcc`} />
          {/* <img key={index} src={link} alt={`${index}`} /> */}
          {/* {photos} */}
        </Carousel>
      </div>
    )
  }

}

export default PhotoWall