import { GET_COUNTRY ,
     ADD_COUNTRY ,
     DELETE_COUNTRY,
     GET_CITY,
     ADD_CITY,
     DELETE_CITY, 
    //  CITY_ERROR,
     GET_SHIPPING,
    ADD_SHIPPING,
    DELETE_SHIPPING,
    //  SHIPPING_ERROR 
    } from "../../src/app/actions/shippingRegion/types";

const initState ={
    countries:[],
    country:null,
    cities:[],
    regions:[],
    region:null
}

export default function(state= initState , action){
    const {type , payload} = action
    switch (type) {
        case GET_COUNTRY:
          return {
                ...state,
                countries:payload,       
            }
            case ADD_COUNTRY:
          return {
                ...state,
                countries:[...state.countries, payload],       
            }
            case DELETE_COUNTRY:
                return {
                      ...state,
                      countries:state.countries.filter(count => count._id !== payload),       
                  }
        case GET_CITY:
          return {
                ...state,
                cities:payload,       
            }
            case ADD_CITY:
          return {
                ...state,
                cities:[...state.cities, payload],       
            }
            case DELETE_CITY:
                return {
                      ...state,
                      cities:state.cities.filter(count => count._id !== payload),       
                  }
                  case GET_SHIPPING:
                    return {
                          ...state,
                          regions:payload,       
                      }
                      case ADD_SHIPPING:
                    return {
                          ...state,
                          regions:[...state.regions, payload],       
                      }
                      case DELETE_SHIPPING:
                          return {
                                ...state,
                                regions:state.regions.filter(reg => reg._id !== payload),       
                            }
        default:
            return state
    }
}