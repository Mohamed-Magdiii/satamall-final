import React from "react";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";

const theme = createMuiTheme(
  /**
   * @see https://material-ui.com/customization/themes/#theme-configuration-variables
   */
  {
    // direction: "rtl",
    typography: {
      fontFamily: ["Poppins"].join(",")
    },

    palette: {
      primary: {
        main: "#17c191",
      },
      secondary: {
        main: "#3783e7",
      },
      error: {
        main: "#f018a6",
      }
    },

    /**
     * @see https://material-ui.com/customization/globals/#default-props
     */
    props: {
      MuiButtonBase: {
        disableRipple: false // No more ripple, on the whole application 💣!
      },
      MuiPopover: {
        elevation: 1
      }
    }
  }
);

export function MaterialThemeProvider(props) {
  const { children } = props;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
