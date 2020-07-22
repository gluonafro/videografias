import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import constants from "../resources/constants.json";
import randomArray from "../utils/randomArray";
import OutsideClick from "./OutsideClick";
import { data } from "../resources/data.json";
import { useTranslate, useLanguage } from "../contexts/languageContext";

const OrderDropdown = ({
  orderedData,
  setOrderedData,
  setBarIndicator,
  active,
  setActive,
}) => {
  const t = useTranslate();
  const lang = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [orderBy, setOrderBy] = useState("random");

  useEffect(() => {
    let indicator = "";
    if (orderBy === "title")
      indicator = data[orderedData[active]].videoName.charAt(0);
    else if (orderBy === "artist")
      indicator = data[orderedData[active]].artistLName.charAt(0);
    else if (orderBy === "country")
      indicator = t(data[orderedData[active]].country).charAt(0);
    else if (orderBy === "year") indicator = data[orderedData[active]].year;
    setBarIndicator(indicator);
  }, [orderedData, active]);

  return (
    <OutsideClick func={() => setIsOpen(false)}>
      <Wrapper>
        <Button onClick={() => setIsOpen(!isOpen)}>{t("ordenarPor")}</Button>
        {isOpen && (
          <Menu onClick={() => setIsOpen(false)}>
            <li className={orderBy === "random" && "actived"}>
              <a
                onClick={() => {
                  setOrderedData(randomArray(orderedData.length));
                  setActive(0);
                  setOrderBy("random");
                }}
              >
                {t("aleatorio")}
              </a>
            </li>
            <li className={orderBy === "title" && "actived"}>
              <a
                onClick={() => {
                  setOrderedData(constants.orderBy.title);
                  setActive(0);
                  setOrderBy("title");
                }}
              >
                {t("titulo") + " " + t("az")}
              </a>
            </li>
            <li className={orderBy === "artist" && "actived"}>
              <a
                onClick={() => {
                  setOrderedData(constants.orderBy.artist);
                  setActive(0);
                  setOrderBy("artist");
                }}
              >
                {t("autor") + " " + t("az")}
              </a>
            </li>
            <li className={orderBy === "country" && "actived"}>
              <a
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
                {t("pais") + " " + t("az")}
              </a>
            </li>
            <li className={orderBy === "year" && "actived"}>
              <a
                onClick={() => {
                  setOrderedData(constants.orderBy.year);
                  setActive(0);
                  setOrderBy("year");
                }}
              >
                {t("ano")}
              </a>
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
  float: right;
  margin-right: 22%;
  width: 10vw;
`;

const Button = styled.button`
  height: 2rem;
  border: 1px solid #fff;
  text-align: center;
  width: 100%;
`;

const Menu = styled.ul`
    position: absolute;
    background: #000;
    top: calc(2rem - 2px);
    border: 1px solid #fff;
    text-align: center;
    width: calc(100% - 2px);
    z-index: 1;
    li a {
            display: block;
            padding: 0.3rem 0;
        }
    }
    li.actived a {
      /* text-decoration: underline; */
      font-weight: bold;
    }
`;
