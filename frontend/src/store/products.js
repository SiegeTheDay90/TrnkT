import csrfFetch from "./csrf.js";

const ADD_SHOP = 'shops/addShop'
const ADD_PRODUCT = 'products/addProduct'
const ADD_PRODUCTS = 'products/addProducts'

const addProduct = (payload) => ({
    type: ADD_PRODUCT,
    payload
})

const addProducts = (payload) => ({
    type: ADD_PRODUCTS,
    payload
})

export const fetchProduct = (id) => async dispatch => {
    const response = await csrfFetch(`/api/products/${id}`);
    const data = await response.json();
    dispatch(addProduct(data));
}

export const fetchProducts = (options = {}) => async dispatch => {
    let response;
    let url = '/api/products?'
    
    if(options.title){
        url = url + `title=${options.title}&`;
    }
    
    if(options.num){
        url = url + `num=${options.num}`;
    }
    
    response = await csrfFetch(url);
    const data = await response.json();
    dispatch(addProducts(data));
}

export const likeProduct = (id) => async dispatch => {
    const response = await csrfFetch(`/api/products/${id}`, {method: 'PATCH'});
    const product = await response.json();
    dispatch(addProduct(product));
}

const initialState = JSON.parse(sessionStorage.getItem("products"))  || {}
  
const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return {...state, [action.payload.product.id]: action.payload.product}
      
        case ADD_SHOP:
            return {...state, ...action.payload.products}
        
        case ADD_PRODUCTS:
            return {...state, ...action.payload}
  
        default:
            return state;
    }
};

export default productsReducer;