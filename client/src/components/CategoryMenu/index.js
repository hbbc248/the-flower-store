import React, { useEffect } from 'react';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';

import { useStoreContext } from "../../utils/GlobalState";

// indexedDB
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {

  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  // added "loading" for indexedDB
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    });
  };

  return (
    <div>
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="../../images/NewCoverImage.jpg" alt="First slide"></img>
    </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="../../images/NewSecondCoverImage.jpg" alt="Second slide"></img>
    </div>
              <div className="carousel-item">
                <img className="d-block w-100" src="../../images/NewRosesCoverImage.jpg" alt="Third slide"></img>
    </div>
              </div>
              <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
            <div className="row justify-content-center">
              <div className="col-12">
                <h3 className="text-center">Choose an Occassion:</h3>
              </div>
              <div className="col-12 col-lg-6 col-xl-6 row justify-content-center">
                {categories.map(item => (
                  <button
                    className="button-category btn btn-info m-1 rounded-md font-weight-bold shadow-sm"
                    key={item._id}
                    onClick={() => {
                      handleClick(item._id);
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>


          );
}

          export default CategoryMenu;
