import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  images: { largeImageURL, webformatURL, tags },
  toggleModal,
}) => {
  return (
    <li className={styles.item}>
      <img
        className={styles.img}
        src={webformatURL}
        alt={tags}
        onClick={() => {
          toggleModal(largeImageURL,tags);
        }}
      />
    </li>
  );
};
export default ImageGalleryItem;
