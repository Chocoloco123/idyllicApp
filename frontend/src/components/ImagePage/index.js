// Import hooks from 'react'. Q: Which hook is meant for causing side effects? (A: useEffect)
import { useEffect } from 'react';
// Import hooks from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams, useHistory } from 'react-router-dom';

// Import the thunk creator
import { getImages, deleteImage } from '../../store/images';
import { getPageComments, addAComment, deleteComment } from '../../store/comments';

const SingleImgCont = () => {
  const history = useHistory();
  const params = useParams();
  const { imageId } = params;
  // declare variable from hooks
  const dispatch = useDispatch();


  // get session user
  const sessionUser = useSelector((state) => state.session.user); // get session user
  // get image from our store
  const imagesObj = useSelector((state) => state.images); 
  const commentsObj = useSelector((state) => state.comments);


  // console.log('imagesObj: ', imagesObj);
  const images = Object.values(imagesObj);
  const comments = Object.values(commentsObj);
  console.log('comments: ', comments);
  

  const img = images.find((image) => +imageId === image.id);

  const imgComments = comments.filter((pgComment) => +imageId === pgComment.imageId);


  const handleDelete = async(imageId) => {
    await dispatch(deleteImage(imageId));
    history.push(`/home`)
  }

  const handleCommentDelete = async(commentId) => {
    await dispatch(deleteComment(commentId));
    history.push(`/images/${imageId}`);
  }
  // const handleCommentDel = async(id) => {
  //   await dispatch(deleteComment(id));
  // }

  useEffect(() => {
    dispatch(getImages());
    // dispatch(deleteImage(img.id))
  // }, [dispatch, img?.id]);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPageComments());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(addAComment())
  // },[dispatch])

  return (
    <div>
      <div className='backBtnPhotoCont'>
        <NavLink to={`/home`} className='backBtnPhoto' >Back</NavLink>
      </div>
      <div className='TitleName'>
        <h1 className='titles'>{img?.imageTitle}</h1>
      </div>
      <div className='singleImgContainer'>
        <img key={img?.imageUrl} 
        src={img?.imageUrl}
        alt={img?.imageTitle} className='singleImg'
        ></img>
      </div>
      <div className='imageBtnsBox'>
        {sessionUser && sessionUser.id === img?.userId &&
          <NavLink to={`/images/${img?.id}/edit`} className='image-btn' id='editBtn'>Update</NavLink> 
        }
        {sessionUser && sessionUser.id === img?.userId &&
        <button onClick={() => handleDelete(img?.id)} className='deleteBtn submitEditBtn image-btn'>Delete</button>
        }
      </div>
      <div className='descriptionBox'>
        <label htmlFor='description' className='descriptionTxt'>Description</label>
        <div className='descriptionContBox'>
          <p>
            {img?.content}
          </p>
        </div>
      </div> 
      <div className='addCommentDiv'>
        { sessionUser && 
        <NavLink exact to={`/images/${imageId}/comments/newComment`} className="add-img-link image-btn">Add Comment</NavLink>
      }
      </div>
      <div className='commentsCont'>
        {imgComments.map((comment) => 
          <p key={comment?.id}>
            {comment?.comment}
            {/* delete button */}
            {sessionUser && sessionUser.id === comment?.userId &&
              <button onClick={() => handleCommentDelete(comment?.id)} className='deleteBtn submitEditBtn image-btn'>Delete</button>
            }
          </p>
        )}
      </div>

    </div>
  )
}

export default SingleImgCont;