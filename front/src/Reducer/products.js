import { DELETE_PRODUCTS, GET_PRODUCTS, PRODUCTS_ERROR,ADD_PRODUCTS,UPDATE_PRODUCTS,GET_PRODUCT, GET_CATEGORIES } from "../app/actions/types";

const initState ={
    products:[],
    product:null,
    categories:[]
}

export default function(state= initState , action){
    const {type , payload} = action
    switch (type) {
        case GET_PRODUCTS:
         case ADD_PRODUCTS:  
            return {
                ...state,
                products:payload,
                loading:false
            }
            case PRODUCTS_ERROR:
            return {
                ...state,
                products:null,
                loading:false
            }
            case DELETE_PRODUCTS:
                return{
                    ...state,
                    products:state.products.filter(product => product._id !== payload)
                }
      case GET_CATEGORIES:
          return{
              ...state,
              categories:payload,
          }
          case GET_PRODUCT:
            case UPDATE_PRODUCTS: 
          return{
              ...state,
              product:payload,
          }
        default:
            return state
    }
}