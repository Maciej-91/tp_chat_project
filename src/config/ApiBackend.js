import ApiConfigUrl from './ApiConfigUrl';
import Axios from 'axios';

const ApiBackEnd = Axios.create({baseURL: ApiConfigUrl.localhost})

export default ApiBackEnd;