//derived from
//https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/useMediaQuery/useMediaQuery.js
//https://material-ui.com/es/components/use-media-query/
/*The MIT License (MIT)

Copyright (c) 2014 Call-Em-All

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIVDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
import React from "react";
import { responsive } from "../resources/constants.json";
/**
 * Hook que nos permite conocer las dimensiones del dispositivo utilizado
 * para navegar la web utilizando una API igual a la de las media queries.
 */

function useMediaQuery(queryInput, options = {}) {
  let query = queryInput;
  query = query.replace(/^@media( ?)/m, "");

  // Wait for jsdom to support the match media feature.
  // All the browsers Material-UI support have this built-in.
  // This defensive check is here for simplicity.
  // Most of the time, the match media logic isn't central to people tests.
  const supportMatchMedia =
    typeof window !== "undefined" && typeof window.matchMedia !== "undefined";

  const { defaultMatches = false } = {
    ...options,
  };

  const [match, setMatch] = React.useState(() => {
    if (supportMatchMedia) {
      return window.matchMedia(query).matches;
    }

    // Once the component is mounted, we rely on the
    // event listeners to return the correct matches value.
    return defaultMatches;
  });

  React.useEffect(() => {
    if (!supportMatchMedia) {
      return undefined;
    }
    const queryList = window.matchMedia(query);
    setMatch(queryList.matches);

    function handleMatchesChange() {
      setMatch(queryList.matches);
    }

    queryList.addListener(handleMatchesChange);
    return () => {
      queryList.removeListener(handleMatchesChange);
    };
  }, [query, supportMatchMedia]);

  return match;
}

export default useMediaQuery;

export const useIsMobile = () =>
  useMediaQuery(`(max-width:${responsive.mobile}px)`);

export const useIsDesktop = () =>
  useMediaQuery(`(min-width:${responsive.tablet + 1}px)`);

export const useIsTablet = () =>
  useMediaQuery(
    `(min-width:${responsive.mobile + 1}px) and (max-width:${
      responsive.tablet
    }px)`
  );

export const useIsLandscape = () => useMediaQuery(`(orientation: landscape)`);
