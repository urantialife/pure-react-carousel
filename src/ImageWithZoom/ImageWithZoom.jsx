import React from 'react';
import PropTypes from 'prop-types';
import { Image } from '../';
import { cn } from '../helpers';
import s from './ImageWithZoom.css';

const ImageWithZoom = class ImageWithZoom extends React.Component {
  static propTypes = {
    // alt: PropTypes.string,
    // onError: PropTypes.func,
    // onLoad: PropTypes.func,
    src: PropTypes.string.isRequired,
    tag: PropTypes.string,
  }

  static defaultProps = {
    tag: 'div',
  }

  constructor() {
    super();
    this.state = {
      isImageLoading: true,
      hovering: false,
      style: {},
    };
    this.handleOnMouseOver = this.handleOnMouseOver.bind(this);
    this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
    this.handleOnMouseMove = this.handleOnMouseMove.bind(this);
    this.handleImageComplete = this.handleImageComplete.bind(this);
  }

  handleImageComplete() {
    this.setState({
      isImageLoading: false,
    });
  }

  handleOnMouseOver() {
    this.setState({
      hovering: true,
    });
  }

  handleOnMouseOut() {
    this.setState({
      hovering: false,
    });
  }

  handleOnMouseMove(ev) {
    const x = (ev.nativeEvent.offsetX / ev.target.offsetWidth) * 100;
    const y = (ev.nativeEvent.offsetY / ev.target.offsetHeight) * 100;
    this.setState({ x, y });
  }

  renderLoading() {
    if (this.state.isImageLoading) {
      return (
        <div
          className={cn([s.imageLoadingSpinnerContainer, 'carousel__image-loading-spinner-container'])}
        >
          <div className={cn([s.imageLoadingSpinner, 'carousel__image-loading-spinner'])} />
        </div>
      );
    }

    return null;
  }


  render() {
    const { tag: Tag, src } = this.props;

    const imageClassName = cn([
      s.image,
      'carousel__zoom-image',
    ]);

    const overlayClassName = cn([
      s.overlay,
      'carousel__zoom-image-overlay',
      this.state.hovering && s.hover,
    ]);

    const overlayStyle = {};
    overlayStyle.transformOrigin = `${this.state.x}% ${this.state.y}%`;

    return (
      <Tag className={s.container}>
        <Image
          className={imageClassName}
          src={src}
          isResponsive
          onLoad={this.handleImageComplete}
          onError={this.handleImageComplete}
        />
        <Image
          className={overlayClassName}
          tag="div"
          src={src}
          style={overlayStyle}
          isBgImage
          isResponsive
          onMouseOver={this.handleOnMouseOver}
          onMouseOut={this.handleOnMouseOut}
          onMouseMove={this.handleOnMouseMove}
        />
        {this.renderLoading()}
      </Tag>
    );
  }
};

export default ImageWithZoom;