import React, { useEffect } from "react";
// import Toastify from '../../common/toast/Toastify';
// import ModalButton from "../../common/modal/ModalButton";
import "./MainText.css";
import { Link } from "react-router-dom";
import { BsCircleFill } from "react-icons/bs";

import { useState } from "react";
import { useSelector } from "react-redux";
import NoticeModal from "../../common/modal/NoticeModal";
import NoticeEditViewModal from "../../common/modal/NoticeEditViewModal";
import NoticeMethod from "../../../apis/NoitceMethod";

function MainText() {
  const [list, setList] = useState([]);
  const inputData = useSelector(state => state.board.inputData);
  const lastId = useSelector(state => state.board.lastId);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  useEffect(() => {
    const get = NoticeMethod.NoticeGet();
    const getData = () => {
      get.then(data => {
        setList(data);
      });
    };
    getData();
  }, [lastId]);
  // useEffect(() => {}, [A])
  // A값이 변경되는 경우에 render라는 의미이므로
  // 새로운 값 입력시 inputData에 title, content, focus 값이 저장되면서
  // id가 id: state.lastId + 1되므로 lastId 값이 변경될 때 render되도록 함.
  console.log(list);

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
      {lastId !== 0 && (
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
                <h3>{inputData[inputData.length - 1].title}</h3>
                {inputData[inputData.length - 1].focus === true ? (
                  <BsCircleFill className="primaryDark" />
                ) : null}
              </div>
              <div className="noticeInfo">
                <p className="fs10 info-content">
                  {inputData[inputData.length - 1].content}
                </p>
                <div className="info-detail">
                  {/*  처음엔 createAt이 , 수정 시 updateAt이 나오게 조건문 작성하기! */}
                  {/* {list[0].createdAt === list[0].updatedAt ? ( */}
                  <p className="fs10">{list[0].createdAt}</p>
                  {/* ) : (
                    <p className="fs10">{list[0].updatedAt}</p>
                   )} */}
                  <p className="fs10 textColor">{list[0].writer}</p>
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
      {lastId == 0 && (
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
