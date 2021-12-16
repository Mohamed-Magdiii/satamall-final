import { DELETE_PRODUCTS,SEARCH_RATE, GET_PRODUCTS,SEARCH_PRODUCT, PRODUCTS_ERROR,ADD_PRODUCTS,UPDATE_PRODUCTS,GET_PRODUCT,GET_RATES, GET_CATEGORIES } from "../app/actions/types";

const initState ={
    products:[],
    product:null,
    categories:[],
    rates:[],
    productQuery : null,
    rateQuery:[]
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
          case GET_RATES:
              return{
                  ...state,
                  rates:payload
              }
              case SEARCH_PRODUCT:
                  return{
                      ...state,
                      productQuery:payload
                  }
                  case SEARCH_RATE:
                      return{
                          ...state,
                        rateQuery:payload
                      }
        default:
            return state
    }
}