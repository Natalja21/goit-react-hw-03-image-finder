import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDataImages } from './services/Api';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './Searchbar/Searchbar';
import LoadMoreBtn from './Button/Button';
import Loader from './Loader/Loader';
import styles from '../components/App.module.css';
import Modal from './Modal/Modal';
import Scroll from './Scroll/Scroll';

export default class App extends Component {
  state = {
    images: [],
    keyword: '',
    page: 1,
    largeImageURL: '',
    tags: '',
    loading: false,
    showModal: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { page, keyword } = this.state;
    if ((keyword && prevState.keyword !== keyword) || page > prevState.page) {
      this.fetchImages(keyword, page);
    }
    if (prevState.keyword !== keyword) {
      this.setState({ images: [] });
    }
    if (page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  fetchImages = async () => {
    const { keyword, page } = this.state;
    this.setState({ loading: true });
    try {
      const data = await getDataImages(keyword, page);
      if (data.total === 0) {
        toast.warning(`Sorry, there are no images matching search query "${keyword}". Please try again.`, {
          theme: 'colored',
          closeOnClick: true,
        });
        this.setState({ images: [] });
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
      }));
    } catch (error) {
      const errorMessage = toast.warning(
        'Oops, something went wrong try again later!',
        {
          theme: 'colored',
          closeOnClick: true,
        }
      );
      this.setState({ error: errorMessage });
    } finally {
      this.setState({ loading: false });
    }
  };

  toggleModal = (largeImageURL, tags) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL,
      tags,
    }));
  };

  handleSubmitSearchBar = keyword => {
    this.setState({ keyword, page: 1 });
  };

  onLoadingMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  onToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  render() {
    const { loading, images, showModal, largeImageURL, tags } = this.state;
    const { handleSubmitSearchBar,onLoadingMore, toggleModal, onToTop } = this;
    const imagesLength = images.length !== 0

    return (
      <div className={styles.App}>
        <SearchBar onSubmitSearchBar={handleSubmitSearchBar} />
        {loading && <Loader />}
        {imagesLength && (
          <ImageGallery images={images} toggleModal={toggleModal} />
        )}
        {imagesLength && (
          <LoadMoreBtn
            type="button"
            text="Load More"
            onLoading={onLoadingMore}
          />
        )}
        {imagesLength && <Scroll onToTop={onToTop} />}
        {showModal && (
          <Modal toggleModal={toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    );
  }
}
