import React, { useEffect, useState, useRef } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { CgHome } from "react-icons/cg";
import { BiBox, BiFile } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import logo from "../../../assets/image/logo.png";
import home from "../../../assets/image/Bounding box.png";

const Sidebar = props => {
  const [click, setClick] = useState(0);
  const [btnActive, setBtnActive] = useState(props.index);

  const data = [
    {
      page: "/",
      title: "홈",
    },
    { page: "/noticeList", title: "공지사항 목록" },
    { page: "/", title: "입/출고 현황" },
  ];
  // 값 셋팅.. / 페이지별로 이벤트 발생시켜서 숫자넣게하는 작업 필요함.

  const toggleActive = e => {
    setBtnActive(() => {
      return e.target.value;
    });
  };

  const tabClickHandler = index => {
    setClick(index);
  };

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
                <img src={home} />
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
    </div>
  );
};

export default Sidebar;
