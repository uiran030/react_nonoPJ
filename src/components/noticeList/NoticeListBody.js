import React, { useEffect, useState } from "react";
import "./NoticeListBody.css";
import { NoticeMethod } from "../../apis/NoitceMethod";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import NoticeModal from "../common/modal/NoticeModal";
import NoticeEditViewModal from "../common/modal/NoticeEditViewModal";

const NoticeListBody = props => {
  const searchValue = props.searchValue;
  console.log(`값 : ${searchValue}`);

  const [list, setList] = useState([]);
  const [newList, setNewList] = useState([]);
  const [viewList, setViewList] = useState([]);
  const [changedate, setChangeDate] = useState([]);

  const selectRowData = useSelector(state => state.board.selectRowData);
  // console.log(selectRowData);       //빈값
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [noticeId, setNoticeId] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [display, setDisplay] = useState(false);
  const history = useHistory();

  // query
  const [query, setQuery] = useState("");
  const [column, setColumn] = useState("");
  const [order, setOrder] = useState("");

  // list.index background
  const [textColor, setTextColor] = useState("black");

  // get data를 불러오기 위한 useEffect
  useEffect(() => {
    const get = NoticeMethod.NoticeGet(column, order, query);
    // console.log(get);
    const getData = () => {
      get.then(data => {
        setList(data);
        // setOrder(order);
        setQuery(searchValue);
        // setCreatedAt(list.createdAt);
        // setUpdatedAt(list.updatedAt);
      });
    };
    getData();
  }, [column, order, query]);
  console.log(list);

  // created date "YYYY년 MM월 DD일"로 변경하기
  // console.log(createdAt);
  // const createda = createdAt.split("T"); // ['YYYY-MM-DD', 'HH:MM:SS]로 나뉨
  // const createda0 = createda[0]; // ['YYYY-MM-DD'] 의미
  // const updateda = updatedAt.split("T");
  // const updateda0 = updateda[0]; // ['YYYY-MM-DD'] 의미
  // const createDa = createda0
  //   .replace(/-/, "년 ")
  //   .replace(/-/, "월 ")
  //   .concat("일");
  // const updateDa = updateda0
  //   .replace(/-/, "년 ")
  //   .replace(/-/, "월 ")
  //   .concat("일");
  // console.log(createDa, updateDa);

  const onClickButton = () => {
    setIsOpen(true);
  };
  const onClickButton2 = () => {
    setIsOpen2(true);
  };

  const handleTitle = event => {
    setTitle(event.target.value);
  };
  const handleContent = event => {
    setContent(event.target.value);
  };

  function onClickList(index) {
    const listIndex = list[index];
    console.log(listIndex);
    setTextColor(textColor === "black" ? "red" : "black");
    setViewList(listIndex);

    // 날짜 YYYY-MM-DD를 YYYY년 MM월 DD일로 변경하기
    const date = listIndex.updatedAt;
    // console.log(date);
    const update =
      date.substr(0, 4) +
      "년 " +
      date.substr(5, 2) +
      "월 " +
      date.substr(8, 2) +
      "일";
    setChangeDate(update);

    setNoticeId(listIndex.noticeId);
    // console.log(listIndex.noticeId);
    // console.log(noticeId);
    setTitle(listIndex.title);
    setContent(listIndex.content);
    history.push("/noticeList");
    // console.log(listIndex.content);
  }

  const noticeDel = noticeId => {
    NoticeMethod.NoticeDelete(noticeId);
  };

  const delling = e => {
    noticeDel(noticeId);
    // 화면 새로고침되게 설정
    // (history.push로는 작동되지않아 다른 방법으로 진행함)
    window.location.replace("/noticeList");
  };

  function editDown() {
    console.log("수정날짜 내림차순");
    const res = NoticeMethod.NoticeGet("updatedAt", "desc");
    setColumn("updatedAt");
    setOrder("desc");
    console.log(res);

    // 주소창 업데이트를 위한 history
    history.push({
      pathname: "/noticeList",
      search: "?column=updatedAt?order=desc",
    });

    // promise 작업
  }

  function editUp() {
    console.log("수정날짜 오름차순");
    const res = NoticeMethod.NoticeGet("updatedAt", "asc");
    setColumn("updatedAt");
    setOrder("asc");
    console.log(res);

    history.push({
      pathname: "/noticeList",
      search: "?column=updatedAt?order=asc",
    });
  }
  function createDown() {
    console.log("생성날짜 내림차순");
    const res = NoticeMethod.NoticeGet("createdAt", "desc");
    setColumn("createdAt");
    setOrder("desc");
    console.log(res);

    history.push({
      pathname: "/noticeList",
      search: "?column=createdAt?order=desc",
    });
  }
  function createUp() {
    console.log("생성날짜 오름차순");
    const res = NoticeMethod.NoticeGet("createdAt", "asc");
    setColumn("createdAt");
    setOrder("asc");
    console.log(res);

    history.push({
      pathname: "/noticeList",
      search: "?column=createdAt?order=asc",
    });
  }

  // useEffect(() => {
  //   const categoryParam = match.params.category;
  //   dispatch(list(categoryParam));
  // }, [dispatch]);
  // https://joyful-development.tistory.com/16

  return (
    <div className="noticeListBody">
      <div className="up-btn">
        <button
          className="btnList2 upBtn"
          onClick={e => setDisplay(!display)}
        />
        {display && (
          <div>
            <ul>
              <li onClick={editDown}>수정날짜 down</li>
              <li onClick={editUp}>수정날짜 up</li>
              <li onClick={createDown}>생성날짜 down</li>
              <li onClick={createUp}>생성날짜 up</li>
            </ul>
          </div>
        )}
        <button className="btnaddBlue upBtn" onClick={onClickButton} />
        {isOpen && (
          <NoticeModal
            onClose={() => {
              setIsOpen(false);
            }}
          />
        )}
      </div>
      <p>{props.searchValue}</p>
      <div className="listFlex">
        <div className="full-list">
          <ul className="depth1">
            {list &&
              list.map((list, index) => (
                <li
                  className="depth1Li"
                  key={index}
                  onClick={() => {
                    onClickList(index);
                  }}
                  style={{ color: textColor }}
                >
                  <div className="list-left">
                    <p className="list-data">{list.title}</p>
                  </div>
                  <div className="list-right fs10 primaryDark">
                    <p>{list.writer}</p>
                    <p className="go-right">
                      {list.updatedAt
                        .slice(2)
                        .split("T")[0]
                        .replace(/-/, "년 ")
                        .replace(/-/, "월 ")
                        .concat("일")}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className="choice-notice bR8">
          {viewList.length !== 0 ? (
            <div className="viewList">
              <div className="list-up">
                <input
                  type="text"
                  className="strong"
                  value={title}
                  onChange={handleTitle}
                  disabled
                />
                <div className="right-data">
                  <p className="fs10 primary">{viewList.writer}</p>
                  <p className="fs10 textHint">{changedate}</p>
                </div>
              </div>
              <textarea
                className="content"
                value={content}
                onChange={handleContent}
                disabled
              />
              <div className="btn">
                <button
                  className="btnError error"
                  type="button"
                  onClick={delling}
                >
                  공지사항 삭제
                </button>
                <button
                  className="btnClose bR8"
                  type="button"
                  onClick={onClickButton2}
                >
                  수정하기
                </button>
                {isOpen2 && (
                  <NoticeEditViewModal
                    disableValue={false}
                    noticeId={noticeId}
                    onClose={() => {
                      setIsOpen2(false);
                    }}
                  />
                )}
              </div>
            </div>
          ) : (
            <p className="textHint fs20 nopage">공지사항을 선택해주세요.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeListBody;
