/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { checkIsActive } from "../../../../_helpers"; 

export function HeaderMenu({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? "menu-item-active" : "";
  };

  return (
    <div
      id="kt_header_menu"
      className={`header-menu header-menu-mobile ${layoutProps.ktMenuClasses}`}
      {...layoutProps.headerMenuAttributes}
    >
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        <li
          className={`menu-item menu-item-rel ${getMenuItemActive(
            "/dashboard"
          )}`}
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="menu-text">Dashboard</span>
            {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
          </NavLink>
        </li>
        <li
          className={`menu-item menu-item-rel ${getMenuItemActive(
            "/customer-page"
          )}`}
        >
          <NavLink className="menu-link" to="/customer-page">
            <span className="menu-text">Customers</span>
            {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
          </NavLink>
        </li>
        <li
          className={`menu-item menu-item-rel ${getMenuItemActive(
            "/categories"
          )}`}
        >
          <NavLink className="menu-link" to="/categories">
            <span className="menu-text">Category</span>
            {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
          </NavLink>
        </li>
        <li
          className={`menu-item menu-item-rel ${getMenuItemActive(
            "/orders"
          )}`}
        >
          <NavLink className="menu-link" to="/orders">
            <span className="menu-text">Orders</span>
            {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
          </NavLink>
        </li>
        <li
          className={`menu-item menu-item-rel ${getMenuItemActive(
            "/offers"
          )}`}
        >
          <NavLink className="menu-link" to="/offers">
            <span className="menu-text">Offers</span>
            {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
          </NavLink>
        </li>
        <li
          className={`menu-item menu-item-rel ${getMenuItemActive(
            "/products-page"
          )}`}
        >
          <NavLink className="menu-link" to="/products-page">
            <span className="menu-text">Products</span>
            {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
