import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import objectPath from "object-path";
import {BsChevronDoubleRight} from 'react-icons/bs';
import { useHtmlClassService } from "../../_core/MetronicLayout";

export function Brand() {
  const [isOpened, setIsOpened] = useState(true);
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      brandClasses: uiService.getClasses("brand", true),
      asideSelfMinimizeToggle: objectPath.get(
        uiService.config,
        "aside.self.minimize.toggle"
      ),
      headerLogo: uiService.getLogo(),
      headerStickyLogo: uiService.getStickyLogo(),
    };
  }, [uiService]);

  return (
    <>
      <div
        className={`brand flex-column-auto ${layoutProps.brandClasses}`}
        id="kt_brand"
      >
        <Link to="/dashboard" className="brand-logo">
          <h6 className={`${!isOpened && "d-none"} mt-3 text-white`}>
            Sata Mall
          </h6>
        </Link>

        {layoutProps.asideSelfMinimizeToggle && (
          <>
            <button
              className="brand-toggle btn btn-sm px-0"
              id="kt_aside_toggle"
              onClick={() => setIsOpened(!isOpened)}
            >
              <span className="svg-icon svg-icon-xl">
                <BsChevronDoubleRight />
              </span>
            </button>
          </>
        )}
      </div>
    </>
  );
}
