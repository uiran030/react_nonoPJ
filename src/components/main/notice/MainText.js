import React, { useEffect } from "react";
import "./MainText.css";
import { Link } from "react-router-dom";
import { BsCircleFill } from "react-icons/bs";

import { useState } from "react";
import NoticeModal from "../../common/modal/NoticeModal";
import NoticeEditViewModal from "../../common/modal/NoticeEditViewModal";
import NoticeMethod from "../../../apis/NoitceMethod";
import { useDispatch } from "react-redux";
import { select } from "../../../features/BoardSlice";

function MainText() {
  const [recentData, setRecentData] = useState({});
  // const inputData = useSelector(state => state.board.inputData);
  // const lastId = useSelector(state => state.board.lastId);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [created, setCreated] = useState("");
  const [updated, setUpdated] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const get = NoticeMethod.NoticeGetRecent();
    const getData = () => {
      get.then(data => {
        setRecentData(data);
        dispatch(select(data.noticeId));
        setCreated(data.createdAt);
        setUpdated(data.updatedAt);
      });
    };
    getData();
  }, []);
  // useEffect(() => {}, [A])
  // A값이 변경되는 경우에 render라는 의미이므로
  // 새로운 값 입력시 inputData에 title, content, focus 값이 저장되면서
  // id가 id: state.lastId + 1되므로 lastId 값이 변경될 때 render되도록 함.
  // console.log(recentList);

  // created date "YYYY년 MM월 DD일"로 변경하기
  const createda = created.split("T"); // ['YYYY-MM-DD', 'HH:MM:SS]로 나뉨
  const createda0 = createda[0]; // ['YYYY-MM-DD'] 의미
  const updateda = updated.split("T");
  const updateda0 = updateda[0]; // ['YYYY-MM-DD'] 의미
  const createDa = createda0
    .replace(/-/, "년 ")
    .replace(/-/, "월 ")
    .concat("일");
  const updateDa = updateda0
    .replace(/-/, "년 ")
    .replace(/-/, "월 ")
    .concat("일");
  // console.log(createDa, updateDa);

  // created date와 updated date 비교해서
  // updated date가 더 최신 날짜일 때 updated date가 보이도록
  // console.log(createda, updateda);
  // console.log(createda[0] === updateda[0]);
  // console.log(createda[1] > updateda[1]);

  // 1. 날짜, 시간 전부 같을 때 (생성 후 수정 따로 안했을 때)
  // if (createda[0] === updateda[0] && createda[1] === updateda[1]) {
  //   console.log(`날짜, 시간 같음 / ${createda[0]}`);
  // }
  // 2. 날짜같은데 시간다를때 (updated가 최신일때 - 수정했을 때)
  // if (createda[0] === updateda[0] && createda[1] !== updateda[1]) {
  //   console.log(`날짜는 같지만 시간 다름 / ${updateda[0]}`);
  // }
  // 3. 날짜, 시간 전부 다를 때 (하루 지난 후 수정했을 때)
  // if (createda[0] !== updateda[0] && createda[1] !== updateda[1]) {
  //   console.log(`날짜, 시간 전부 다름 / ${updateda[0]}`);
  // }

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
      {recentData !== {} && (
        <div className="mainData">
          <div className="subData">
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
                <h3>{recentData.title}</h3>
                {recentData.focus === true ? (
                  <BsCircleFill className="primaryDark" />
                ) : null}
              </div>
              <div className="noticeInfo">
                <p className="fs10 info-content">{recentData.content}</p>
                <div className="info-detail">
                  {/*  처음엔 createAt이 , 수정 시 updateAt이 나오게 조건문 작성하기! */}
                  {/* p안에 p를 둬서 생기는 오류 ↓*/}
                  {/* validateDOMNesting(...): <p> cannot appear as a descendant of <p> */}
                  <div className="fs10">
                    {/* ↑ 오류 수정을 위해 div로 변경 */}
                    {createda[0] === updateda[0] &&
                    createda[1] === updateda[1] ? (
                      <p>{createDa}</p>
                    ) : createda[0] === updateda[0] &&
                      createda[1] !== updateda[1] ? (
                      <p>{updateDa}</p>
                    ) : (
                      <p>{updateDa}</p>
                    )}
                  </div>
                  <p className="fs10 textColor">{recentData.writer}</p>
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
          </div>
        </div>
      )}
      {recentData === {} && (
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
