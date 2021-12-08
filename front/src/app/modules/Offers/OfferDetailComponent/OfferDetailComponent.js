import React from "react";
import { useQuery } from "react-query";
import DisplayData from "../DisplayData";
import DisplayTags from "../DisplayTags";
import axios from "axios";
export const getOfferDetail = async ({ queryKey }) => {
  // eslint-disable-next-line
  const [_, offer_id] = queryKey;
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/api/offers/${offer_id}`,
    {
      headers: {
        "x-auth-token": localStorage.getItem("authToken"),
      },
    }
  );
};
function OfferDetailComponent({ match }) {
  const { data, isLoading, isError, error } = useQuery(
    ["get-offer-detail", match.params.id],
    getOfferDetail
  );
  const displayUsers = () => {
    return data?.data.products.map((product, index) => {
      return (
        <tbody key={index}>
          <tr className="text-center border-3 m-auto">
            <DisplayData
              userData={[
                index + 1,
                product.title_en,
                product.description,
                product.categoryTitle,
                product.price,
              ]}
            />
          </tr>
        </tbody>
      );
    });
  };
  if (isLoading) {
    return <h1>Loading ....</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  } else {
    return (
      <div className="card-body py-3">
        <div className="table-responsive rounded">
          <table className="table table-hover align-middle gs-0 gy-4 table-light">
            <thead>
              <tr>
                <DisplayTags
                  data={[
                    "ID",
                    "Product Name",
                    "Description",
                    "Product's Category",
                    "Product Price",
                  ]}
                />
              </tr>
            </thead>
            <>{displayUsers()}</>
          </table>
        </div>
      </div>
    );
  }
}

export default OfferDetailComponent;
