import React, {useMemo} from "react";
import {useHtmlClassService} from "../../_core/MetronicLayout";

export function Footer() {
  const today = new Date().getFullYear();
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      footerClasses: uiService.getClasses("footer", true),
      footerContainerClasses: uiService.getClasses("footer_container", true)
    };
  }, [uiService]);

  return (
    <div
      className={`footer bg-white py-4 d-flex flex-lg-column  ${layoutProps.footerClasses}`}
      id="kt_footer"
    >
      <div
        className={`${layoutProps.footerContainerClasses} d-flex flex-column flex-md-row align-items-center justify-content-between`}
      >
        <div className="text-dark order-2 order-md-1">
          <span className="text-muted font-weight-bold mr-2">{today.toString()}</span> &copy;{" "}
          <span
            rel="noopener noreferrer"
            className="text-dark-75 text-hover-primary cursor-pointer"
          >
            CopyRight
          </span>
        </div>
        <div className="nav nav-dark order-1 order-md-2">
          <span
            rel="noopener noreferrer"
            className="nav-link pr-3 pl-0 cursor-pointer"
          >
            About
          </span>
          <span
            rel="noopener noreferrer"
            className="nav-link px-3 cursor-pointer"
          >
            Service
          </span>
          <span
            rel="noopener noreferrer"
            className="nav-link pl-3 pr-0 cursor-pointer"
          >
            Contact
          </span>
        </div>
      </div>
    </div>
  );
}
