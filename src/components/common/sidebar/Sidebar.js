import React, { useEffect, useState, useRef } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { CgHome } from "react-icons/cg";
import { BiBox, BiFile } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import logo from "../../../assets/image/logo.png";
import { data } from "jquery";
// import $ from "jquery";

const Sidebar = () => {
  const [click, setClick] = useState(0);
  const [back, setBack] = useState(0);

  const data = [
    {
      page: "/",
      title: "홈",
    },
    { page: "/noticeList", title: "공지사항 목록" },
    { page: "/", title: "입/출고 현황" },
  ];
  const [btnActive, setBtnActive] = useState(2);
  // 값 셋팅.. / 페이지별로 이벤트 발생시켜서 숫자넣게하는 작업 필요함.

  const toggleActive = e => {
    setBtnActive(prev => {
      return e.target.value;
    });
  };

  const tabClickHandler = index => {
    setClick(index);
  };
  // console.log(click);

  // const tabBackHandler = index => {
  //   setBack(index);
  // };
  // console.log(back);

  return (
    <div className="sidebar">
      <div className="head">
        <h1>
          <Link to="/">
            <img src={logo} alt="로고"></img>
            <div className="title">
              <h2>화성시니어클럽</h2>
              <p className="fs14">노노유통</p>
            </div>
          </Link>
        </h1>
        <div className="userinfo">
          <h3>OOO님(작업)</h3>
          <Link to="/" className="bR8 primary">
            마이페이지
          </Link>
        </div>
        <div className="mainNav">
          <ul className="depth1">
            <li
              onClick={() => tabClickHandler(0)}
              className={click === 0 ? "on" : ""}
            >
              <Link to="/" className="liA">
                <CgHome className="emo" />
                <p className="liP">메인 페이지</p>
              </Link>
              <ul className="depth2">
                {data.map((item, index) => {
                  return (
                    <div>
                      <Link
                        to={item.page}
                        className={"btn" + (index == btnActive ? "active" : "")}
                      >
                        <li value={index} onClick={toggleActive}>
                          {item.title}
                        </li>
                      </Link>
                    </div>
                  );
                })}
                {/* <li
                  className="depth2Li"
                  // onClick={() => tabBackHandler(0)}
                  // onClick={handleClick}
                  // style={{ color: "#1f6de2" }}
                  // className={back === 0 ? "active" : ""}
                >
                  <Link to="/">
                    <p>홈</p>
                  </Link>
                </li>
                <li
                  className="depth2Li"
                  // className={back === 1 ? "active" : ""}
                >
                  <Link to="/noticeList">
                    <p>공지사항 목록</p>
                  </Link>
                </li>
                <li
                  className="depth2Li"
                  // className={back === 2 ? "active" : ""}
                  // onChange={handleChangeTextColor}
                  // style={{ color: textColor }}
                >
                  <Link to="">
                    <p>입&#47;출고 현황</p>
                  </Link>
                </li> */}
              </ul>
            </li>
            <li
              onClick={() => tabClickHandler(1)}
              className={click === 1 ? "on" : ""}
            >
              <Link to="" className="liA">
                <BiBox className="emo" />
                <p className="liP">물품 관리</p>
              </Link>
              <ul className="depth2">
                <li>
                  <Link to="">
                    <p>물품 목록</p>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <p>새 물품 추가</p>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <p>물품 상태 관리</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li
              onClick={() => tabClickHandler(2)}
              className={click === 2 ? "on" : ""}
            >
              <Link to="" className="liA">
                <BiFile className="emo" />
                <p className="liP">문서 관리</p>
              </Link>
              <ul className="depth2">
                <li>
                  <Link to="/busList">
                    <p>1</p>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <p>2</p>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <p>3</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li
              onClick={() => tabClickHandler(3)}
              className={click === 3 ? "on" : ""}
            >
              <Link to="" className="liA">
                <AiOutlineSetting className="emo" />
                <p className="liP">관리자 설정</p>
              </Link>
              <ul className="depth2">
                <li>
                  <Link to="/busList">
                    <p>1</p>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <p>2</p>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <p>3</p>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      {/* <div className="head">
        <h1>
          <Link to="/">
            <img src={logo} alt="로고"></img>
            <div className="title">
              <h2>화성시니어클럽</h2>
              <p className="fs14">노노유통</p>
            </div>
          </Link>
        </h1>
        <div className="userinfo">
          <h3>OOO님(작업)</h3>
          <Link to="/" className="bR8 primary">
            마이페이지
          </Link>
        </div>
        <div className="mainNav">
          <ul className="depth1">
            {Menu_List.map((item, idx) => {
              return (
                <li className={activeIndex !== idx ? "" : "on"}>
                  <Link
                    to={item.page}
                    className="liA"
                    onClick={() => onClick(idx)}
                  >
                    <p className="emo">{item.icon}</p>
                    <p className="liP">{item.title}</p>
                  </Link>
                  <ul className="depth2">
                    <li>
                      <Link to={item.depth2page}>
                        <p>{item.list}</p>
                      </Link>
                    </li>
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;
