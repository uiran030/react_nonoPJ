import React, { useEffect } from "react";
import "./MainText.css";
import { Link } from "react-router-dom";
import { BsCircleFill } from "react-icons/bs";

import { useState } from "react";
import { useSelector } from "react-redux";
import NoticeModal from "../../common/modal/NoticeModal";
import NoticeEditViewModal from "../../common/modal/NoticeEditViewModal";
import NoticeMethod from "../../../apis/NoitceMethod";
import { useDispatch } from "react-redux";
import { select } from "../../../features/BoardSlice";
// import storage from "lib/storage";

function MainText() {
  const [recentList, setRecentList] = useState([]);
  const inputData = useSelector(state => state.board.inputData);
  const lastId = useSelector(state => state.board.lastId);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const get = NoticeMethod.NoticeGetRecent();
    const getData = () => {
      get.then(data => {
        setRecentList(data);
        dispatch(select(lastId));
      });
    };
    getData();
  }, [isOpen1]);
  // useEffect(() => {}, [A])
  // A값이 변경되는 경우에 render라는 의미이므로
  // 새로운 값 입력시 inputData에 title, content, focus 값이 저장되면서
  // id가 id: state.lastId + 1되므로 lastId 값이 변경될 때 render되도록 함.
  // console.log(recentList);

  // notice modal open
  const onClickButton1 = () => {
    setIsOpen1(true);
  };
  // notice edit modal open
  const onClickBody = () => {
    setIsOpen2(true);
  };

  return (
    <div>
      {recentList.length !== 0 && (
        <ul className="mainList">
          <li>
            <div className="topmenu">
              <h3>공지사항</h3>
              <div className="topmenu_icon">
                <Link to="/noticeList" className="btnListBlue" />
                <button className="emo btnaddBlue" onClick={onClickButton1} />
                {isOpen1 && (
                  <NoticeModal
                    onClose={() => {
                      setIsOpen1(false);
                    }}
                  />
                )}
              </div>
            </div>
            <div
              className="updateList bR8 back-secondary texthint"
              onClick={onClickBody}
            >
              <div className="noticeTop">
                <h3>{recentList.title}</h3>
                {recentList.focus === true ? (
                  <BsCircleFill className="primaryDark" />
                ) : null}
              </div>
              <div className="noticeInfo">
                <p className="fs10 info-content">{recentList.content}</p>
                <div className="info-detail">
                  {/*  처음엔 createAt이 , 수정 시 updateAt이 나오게 조건문 작성하기! */}
                  <p className="fs10">{recentList.createdAt}</p>
                  <p className="fs10 textColor">{recentList.writer}</p>
                </div>
              </div>
            </div>
            {isOpen2 && (
              <NoticeEditViewModal
                onCloseModal={() => {
                  setIsOpen2(false);
                }}
              />
            )}
          </li>
        </ul>
      )}
      {recentList.length == 0 && (
        <div className="listhome">
          <div className="mainBot">
            <ul className="mainList">
              <li>
                <div className="topmenu">
                  <h3>공지사항</h3>
                  <div className="topmenu_icon">
                    <Link to="/noticeList" className="btnListBlue" />
                    <button
                      className="emo btnaddBlue"
                      onClick={onClickButton1}
                    />
                    {isOpen1 && (
                      <NoticeModal
                        onClose={() => {
                          setIsOpen1(false);
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="infoList bR8 fs14 back-secondary texthint">
                  <p>{"새로운 공지를 입력해보세요!"}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
      {/* {inputData.length == inputData.length - 1 && <p>?</p>} */}
    </div>
  );
}
export default MainText;
