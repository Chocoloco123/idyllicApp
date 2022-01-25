import AddAlbum from '../components/NewAlbum';
import { csrfFetch } from './csrf';

const LOAD_ALBUMS = 'albums/LOAD_ALBUMS';
const ADD_ALBUM = 'albums/ADD_ALBUM';

const loadAlbums = (albums) => ({
  type: LOAD_ALBUMS,
  albums
});

const addAlbum = (album) => ({
  type: ADD_ALBUM,
  album
});

export const getAlbums = () => async(dispatch) => {
  const res = await fetch('/api/albums');
  const albums = await res.json();
  dispatch(loadAlbums(albums));
  return albums;
}

export const addAnAlbum = (data) => async(dispatch) => {
  const res = await csrfFetch('/api/albums/newAlbum', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  if (res.ok) {
    const newAlbum = await res.json();
    dispatch(addAlbum(newAlbum));
    return newAlbum;
  }
}

const initialState = {}

const albumsReducer = (state = initialState, action) => {
  let newState = {};
  switch(action.type) {
    case LOAD_ALBUMS:
      newState = { ...state };
      action.albums.forEach((album) => {
        newState[album.id] = album;
      })
      return newState;
    case ADD_ALBUM: 
      newState = { ...state, [action.album.id]:action.album }
      return newState;
    default: 
      return state;
  }
}

export default albumsReducer;