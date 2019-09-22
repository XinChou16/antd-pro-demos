import React from 'React';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Photoswipe from 'photoswipe';
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';

// https://photoswipe.com/documentation/options.html
const DEFAULT_OPTIONS = {
  history: false,
  shareEl: false,
  closeEl: false,
  arrowEl: false,
  captionEl: false,
  fullscreenEl: false,
  tapToClose: true,
  bgOpacity: 0.5, // 背景透明度
};
export default class Previewer extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    imgs: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    options: PropTypes.object,
    className: PropTypes.string
  }

  static defaultProps = {
    isOpen: false,
    imgs: [],
    index: 0,
    options: {}
  }

  state = {
    isOpen: this.props.isOpen
  }

  componentDidMount() {
    const { isOpen } = this.props;
    if (isOpen) [
      this.init(this.props.index)
    ]
  }

  componentWillReceiveProps = (nextProps) => {
    const { isOpen } = this.state;
    if (nextProps.isOpen) {
      if (!isOpen) {
        this.init(nextProps.index);
      } else {
        this.show(nextProps.index);
      }
    } else if (isOpen) {
      this.close();
    }
  };

  componentWillUnmount() {
    this.close();
  }

  init(index) {
    console.log(this.props);
    const self = this;
    const showItem = this.props.imgs[index];

    if (!showItem.w || !showItem.h) {
      const img = new Image();
      img.onload = function() {
        showItem.w = this.width;
        showItem.h = this.height;
        self.doInit(index);
      }
      img.src = showItem.src;
    } else {
      this.doInit(index);
    }
  }

  doInit(index) {
    const { imgs } = this.props;
    const pswpElement = this.pswpElement;
    let options = Object.assign({ index }, DEFAULT_OPTIONS, this.props.options);

    this.photoswipe = new Photoswipe(pswpElement, PhotoswipeUIDefault, imgs, options);

    this.onGettingData();
    this.setState({
      isOpen: true
    }, () => {
      this.photoswipe.init();
    });
    this.onDestory();
  }

  onGettingData() {
    const self = this;
    this.photoswipe.listen('gettingData', function (index, item) {
      console.log('gettingData', item.src);
      if (!item.w || !item.h || item.w < 1 || item.h < 1) {
        const img = new Image();
        img.onload = function () {
          item.w = this.width;
          item.h = this.height;
          self.photoswipe.updateSize(true);
        }
        img.src = item.src;
      }
    })
  }

  onDestory() {
    const self = this;
    this.photoswipe.listen('destory', function (...args) {
      self.handleClose(...args);
    });
  }
  
  handleClose = () => {
    const { onClose } = this.props;
    this.close();
    this.photoswipe = null;
    this.setState({
      isOpen: false
    }, () => {
      if (onClose) {
        onClose();
      }
    });
  };

  getCurrentIndex() {
    if (this.photoswipe) {
      return this.photoswipe.getCurrentIndex();
    }
  }

  show(index) {
    this.init(index);
  }

  close() {
    if (this.photoswipe) {
      this.photoswipe.close();
    }
  }

  goTo(index) {
    if (this.photoswipe) {
      this.photoswipe.goTo(index);
    }
  }

  prev() {
    if (this.photoswipe) {
      this.photoswipe.prev();
    }
  }

  next() {
    if (this.photoswipe) {
      this.photoswipe.next();
    }
  }

  render() {
    const id = 'my-pswp';
    const { className } = this.props;
    const pswpClassName = classnames('pswp', className);
    return (
      <div
        id={id}
        className={pswpClassName}
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
        ref={(node) => {
          this.pswpElement = node;
        }}
      >
        <div className="pswp__bg"/>
        <div className="pswp__scroll-wrap">
          <div className="pswp__container">
            <div className="pswp__item"/>
            <div className="pswp__item"/>
            <div className="pswp__item"/>
          </div>
          <div className="pswp__ui pswp__ui--hidden">
            <div className="pswp__top-bar">
              <div className="pswp__counter"/>
              <button
                className="pswp__button pswp__button--close"
                title="Close (Esc)"
              />
              <button
                className="pswp__button pswp__button--share"
                title="Share"
              />
              <button
                className="pswp__button pswp__button--fs"
                title="Toggle fullscreen"
              />
              <button className="pswp__button pswp__button--zoom" title="Zoom in/out"/>
              <div className="pswp__preloader">
                <div className="pswp__preloader__icn">
                  <div className="pswp__preloader__cut">
                    <div className="pswp__preloader__donut"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div className="pswp__share-tooltip"/>
            </div>
            <button
              className="pswp__button pswp__button--arrow--left"
              title="Previous (arrow left)"
            />
            <button
              className="pswp__button pswp__button--arrow--right"
              title="Next (arrow right)"
            />
            <div className="pswp__caption">
              <div className="pswp__caption__center"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}