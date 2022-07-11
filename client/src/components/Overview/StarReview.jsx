import React, { useContext } from 'react';
import { ReviewContext } from './Overview.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';



let StarReview = ({ id }) => {
  // const [review, setReview] = useState({});
  // useEffect(() => {
  //   // axios.get(`/products/${id}`)
  //   //   .then(res => {
  //   //     setProduct(res.data);
  //   //   })
  //   // axios.get(`/products/${id}/styles`)
  //   //   .then(res => {
  //   //     setStyles(res.data.results);
  //   //   })
  //   axios.get(`/reviews/meta`, { params: { product_id: id } })
  //     .then(res => {
  //       setReviews(res.data.ratings);
  //     })
  // }, []);


  const review = useContext(ReviewContext);
  console.log(review);
  const arr = Object.entries(review);
  const sum = arr.reduce((memo, pair) => {
    return memo + Number(pair[0]) * Number(pair[1]);
  }, 0)

  const count = Object.keys(review);
  const counter = count.reduce((memo, ele) => {
    return memo + Number(ele);
  }, 0);

  const average = Math.floor(sum / counter);
  const empty = 5 - average;
  let stars = Array(average).fill(1).concat(Array(empty).fill(0));

  return <div className="starAndReview">

    <span className="">Star: {(sum / counter).toFixed(1)}</span>

    {stars.map(e => {
        if (!e) {
          return <FontAwesomeIcon icon={emptyStar} />
        } else {
          return <FontAwesomeIcon icon={faStar} />
        }
    })}

    <a href="">Read all {counter} reviews</a>

  </div>
}

export default StarReview;


{/* <FontAwesomeIcon icon={faStarHalfStroke} /> */}
