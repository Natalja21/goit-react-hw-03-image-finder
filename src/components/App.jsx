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

export default class App extends Component {
  state = {
    images: [],
    keyword: '',
    page: 1,
    loading: false,
    error: null,
    showModal: false,
    largeImageURL: '',
    tags : ''
  };
  handleSubmitSearchBar = keyword => {
    this.setState({ keyword, page: 1 });
  };
  onLoadingMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  componentDidUpdate(_, prevState) {
    const { page, keyword } = this.state;
    if ((keyword && prevState.keyword !== keyword) || page > prevState.page) {
      this.fetchImages(keyword, page);
    }
    if (prevState.keyword !== keyword) {
      this.setState({ images: [] });
    }
  }
  fetchImages = async () => {
    const { keyword, page } = this.state;
    this.setState({ loading: true });
    try {
      const data = await getDataImages(keyword, page);
      console.log(data);
      if (data.total === 0) {
        toast.warning(`"${keyword}" not found!`, {
          theme: 'colored',
          closeOnClick: true,
        });
        this.setState({ images: [] });
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  };
  toggleModal = (largeImageURL, tags )=> {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL,
      tags
    }));
  };

  render() {
    const { loading, images, error, showModal, largeImageURL,tags } = this.state;
    return (
      <div className={styles.App}>
        <SearchBar onSubmitSearchBar={this.handleSubmitSearchBar} />
        {loading && <Loader />}
        {error &&
          toast.warning('Oops, something went wrong try again later!', {
            theme: 'colored',
            closeOnClick: true,
          })}
        {images.length !== 0 && (
          <ImageGallery images={images} toggleModal={this.toggleModal} />
        )}
        {images.length !== 0 && (
          <LoadMoreBtn
            type="button"
            text="Load More"
            onLoading={this.onLoadingMore}
          />
        )}
        {showModal && (
          <Modal toggleModal={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    );
  }
}
