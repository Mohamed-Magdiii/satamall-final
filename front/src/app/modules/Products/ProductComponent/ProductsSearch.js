import React from "react";

const ProductsSearch = ({onClick , onChange}) => {
  return (
<div className="input-group">
  <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
  aria-describedby="search-addon" onChange={e => onChange(e)} />
  <button type="button" className="btn btn-outline-primary" onClick={onClick}
>search</button>
</div>
    );
};

export default ProductsSearch;
