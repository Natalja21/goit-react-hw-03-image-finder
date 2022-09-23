import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images , toggleModal}) => {
  return (
   
    
    <ul  className={styles.imageGallery}>
        {images.map((image) => (
          <ImageGalleryItem images= {image} key={image.id} toggleModal={toggleModal} />
      ))}
      </ul>
     
     
  );
};
export default ImageGallery;
