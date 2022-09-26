import axios from 'axios';
axios.defaults.baseURL = "https://pixabay.com/api/"
const KEY = '29132832-e4a149fcc4594c93db1ed8e83'

export const getDataImages = async ( keyword, page, per_page ) => {
   
     const response =  await axios.get(
    `?key=${KEY}&q=${keyword}&page=${page}&image_type=photo&orientation=horizontal&per_page=${per_page}`
  );
return response.data  
 
};
