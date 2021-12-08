import React, {useLayoutEffect} from "react";
import {KTUtil} from "../../_assets/js/components/util";
import KTLayoutHeader from "../../_assets/js/layout/base/header";
import KTLayoutHeaderMenu from "../../_assets/js/layout/base/header-menu";
import KTLayoutHeaderTopbar from "../../_assets/js/layout/base/header-topbar";
import KTLayoutBrand from "../../_assets/js/layout/base/brand";
import KTLayoutAside from "../../_assets/js/layout/base/aside";
import KTLayoutAsideToggle from "../../_assets/js/layout/base/aside-toggle";
import KTLayoutAsideMenu from "../../_assets/js/layout/base/aside-menu";
import KTLayoutContent from "../../_assets/js/layout/base/content";
import KTLayoutFooter from "../../_assets/js/layout/base/footer";
import KTLayoutSubheader from "../../_assets/js/layout/base/subheader";
import KTLayoutScrolltop from "../../_assets/js/layout/extended/scrolltop";
import KTLayoutStickyCard from "../../_assets/js/layout/base/sticky-card";
import KTLayoutStretchedCard from "../../_assets/js/layout/base/stretched-card";
import KTLayoutQuickPanel from "../../_assets/js/layout/extended/quick-panel";
import KTLayoutQuickUser from "../../_assets/js/layout/extended/quick-user";

export function LayoutInit() {
  useLayoutEffect(() => {
    KTUtil.ready(function () {
      KTLayoutHeader.init('kt_header', 'kt_header_mobile');
      KTLayoutHeaderMenu.init('kt_header_menu', 'kt_header_menu_wrapper');
      KTLayoutHeaderTopbar.init('kt_header_mobile_topbar_toggle');
      KTLayoutBrand.init('kt_brand');
      KTLayoutAside.init('kt_aside');
      KTLayoutAsideToggle.init('kt_aside_toggle');
      KTLayoutAsideMenu.init('kt_aside_menu');
      KTLayoutContent.init('kt_content');
      KTLayoutFooter.init('kt_footer');
      KTLayoutSubheader.init('kt_subheader');
      KTLayoutScrolltop.init('kt_scrolltop');
      KTLayoutStickyCard.init('kt_page_sticky_card');
      KTLayoutStretchedCard.init('kt_page_stretched_card');
      KTLayoutQuickPanel.init('kt_quick_panel');
      KTLayoutQuickUser.init('kt_quick_user');
    });
  }, []);
  return <></>;
}
