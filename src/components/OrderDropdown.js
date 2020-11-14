import React, { useEffect } from "react";
import styled from "styled-components";
import constants from "../resources/constants.json";
import randomArray from "../utils/randomArray";
import OutsideClick from "./OutsideClick";
import { data } from "../resources/data.json";
import { useTranslate, useLanguage } from "../contexts/languageContext";
import { responsive } from "../resources/constants.json";
import { useIsMobile } from "../hooks/useMediaQuery";

const OrderDropdown = ({
  orderedData,
  setOrderedData,
  setBarIndicator,
  active,
  setActive,
  isOpen,
  setIsOpen,
  orderBy,
  setOrderBy,
}) => {
  const t = useTranslate();
  const lang = useLanguage();
  const isMobile = useIsMobile();

  useEffect(() => {
    let indicator = "";
    if (!isMobile) {
      if (orderBy === "title")
        indicator = data[orderedData[active]].videoName.charAt(0);
      else if (orderBy === "artist")
        indicator = data[orderedData[active]].artistLName.charAt(0);
      else if (orderBy === "country")
        indicator = t(data[orderedData[active]].country).charAt(0);
      else if (orderBy === "year") indicator = data[orderedData[active]].year;
      setBarIndicator(indicator);
    }
  }, [orderedData, active]);

  return (
    <OutsideClick func={() => setIsOpen(false)}>
      <Wrapper className="small">
        <Button onClick={() => setIsOpen(!isOpen)}>{t("ordenarPor")}</Button>
        {isOpen && (
          <Menu onClick={() => setIsOpen(false)}>
            <li className={orderBy === "random" ? "actived" : undefined}>
              <button
                onClick={() => {
                  setOrderedData(randomArray(orderedData.length));
                  setActive(0);
                  setOrderBy("random");
                }}
              >
                <span>{t("aleatorio")}</span>
              </button>
            </li>
            <li className={orderBy === "title" ? "actived" : undefined}>
              <button
                onClick={() => {
                  setOrderedData(constants.orderBy.title);
                  setActive(0);
                  setOrderBy("title");
                }}
              >
                <span>{t("titulo") + " " + t("az")}</span>
              </button>
            </li>
            <li className={orderBy === "artist" ? "actived" : undefined}>
              <button
                onClick={() => {
                  setOrderedData(constants.orderBy.artist);
                  setActive(0);
                  setOrderBy("artist");
                }}
              >
                <span>{t("autor") + " " + t("az")}</span>
              </button>
            </li>
            <li className={orderBy === "country" ? "actived" : undefined}>
              <button
                onClick={() => {
                  setOrderedData(
                    lang === "es"
                      ? constants.orderBy.countryEs
                      : constants.orderBy.countryIt
                  );
                  setActive(0);
                  setOrderBy("country");
                }}
              >
                <span>{t("pais") + " " + t("az")}</span>
              </button>
            </li>
            <li className={orderBy === "year" ? "actived" : undefined}>
              <button
                onClick={() => {
                  setOrderedData(
                    isMobile
                      ? constants.orderBy.yearMobile
                      : constants.orderBy.year
                  );
                  setActive(0);
                  setOrderBy("year");
                }}
              >
                <span>{t("ano")}</span>
              </button>
            </li>
          </Menu>
        )}
      </Wrapper>
    </OutsideClick>
  );
};

export default OrderDropdown;

const Wrapper = styled.div`
  position: relative;
  width: 10rem;
  @media screen and (max-width: ${responsive.mobile}px) {
    width: 13rem;
    button {
      height: 3.5rem;
      font-size: 1.4rem;
    }
  }
`;

const Button = styled.button`
  height: 2.2rem;
  border: 1px solid #ececec;
  text-align: center;
  width: 100%;
  :hover {
    border-color: #fff;
    color: #fff;
  }
`;

const Menu = styled.ul`
  position: absolute;
  background: #000;
  top: calc(2.2rem - 1px);
  border: 1px solid #ececec;
  text-align: center;
  width: calc(100% - 2px);
  z-index: 1;
  :hover {
    border-color: #fff;
  }
  li button {
    width: 100%;
    display: block;
    padding-bottom: 0.6rem;
  }
  li:first-child button {
    padding-top: 0.6rem;
  }
  li.actived button span {
    border-bottom: 1px solid #ececec;
  }
  @media screen and (max-width: ${responsive.mobile}px) {
    bottom: calc(3.5rem - 1px);
    top: unset;
  }
`;
