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
    per_page: 12,
    largeImageURL: '',
    tags: '',
    loading: false,
    error: null,
    showModal: false,
    disabled : true,
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
    const { keyword, page, per_page } = this.state;
    this.setState({ loading: true, disabled : true });
    try {
      const data = await getDataImages(keyword, page, per_page);
      console.log(data);
      if (data.total === 0) {
        toast.warning(`"${keyword}" not found!`, {
          theme: 'colored',
          closeOnClick: true,
        });
        this.setState({ images: [], disabled : true });
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        disabled : false,
        per_page,
      }));
      if (Math.ceil(page * per_page) > data.totalHits) {
        this.setState({ disabled: true });
      }
    } catch (error) {
      this.setState({ error });
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

  render() {
    const { loading, images, error, showModal, largeImageURL, tags, disabled  } =
      this.state;
    return (
      <div className={styles.App}>
        <SearchBar onSubmitSearchBar={this.handleSubmitSearchBar} />
        {loading && <Loader />}
        {error &&
          toast.warning('Oops, something went wrong try again later!', {
            theme: 'colored',
            closeOnClick: true,
          })}
        {!disabled && (
          <ImageGallery images={images} toggleModal={this.toggleModal} />
        )}
        {!disabled && (
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
