import React from 'react';
import { Card, Typography, Alert } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';

import 'react-photoswipe/lib/photoswipe.css';
// import {PhotoSwipe} from 'react-photoswipe';
import PhotoSwipe from '@/components/Previewer';

let isOpen = true;

let items = [
  {
    src: 'http://via.placeholder.com/200x400.png',
    // w: 1200,
    // h: 900,
    title: 'Image 1'
  },
  {
    src: 'http://via.placeholder.com/200x300.png',
    // w: 1200,
    // h: 900,
    title: 'Image 2'
  }
];

export default class Photo extends React.Component {
  state = {
    isOpen: false
  }

  handleClose = () => {
    this.setState({ isOpen: false });
    console.log('close')
  }
  render() {
    return <PageHeaderWrapper>
      <Card>
        <button onClick={() => {this.setState({ isOpen: true })}}>open</button>
        <PhotoSwipe 
          isOpen={this.state.isOpen} 
          index={0} 
          imgs={items} 
          onClose={this.handleClose}
        />
      </Card>
    </PageHeaderWrapper>
  }
}
