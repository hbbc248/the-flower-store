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
      <div>
        <img className="img-fluid" alt="close up of flower bouqet" src="../../images/CoverImage.png" ></img>
      </div>
      <div className="row justify-content-center">
        <div className="col-12">
          <h3 className="text-center">Choose an Occassion:</h3>
        </div>
        <div className="col-12 col-lg-8 col-xl-6 row justify-content-around">
          {categories.map(item => (
            <button
              className="button-category btn btn-info m-1 rounded-lg font-weight-bold shadow-sm"
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
