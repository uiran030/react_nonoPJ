import React, { useEffect, useState, useRef } from "react";
import Modal from "./Modal";
import { AiOutlineClose } from "react-icons/ai";
import "./NoticeModal.css";
import { useSelector } from "react-redux";
import { NoticeMethod } from "../../../apis/NoitceMethod";
import { useDispatch } from "react-redux";
import { edit } from "../../../features/BoardSlice";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NoticeEditModal = ({ onCloseModal }) => {
  // const [checkedButtons, setCheckedButtons] = useState([]);
  const inputData = useSelector(state => state.board.inputData);
  const [list, setList] = useState([]);

  // onChange 핸들러 데이터
  const [title, setTitle] = useState(inputData[inputData.length - 1].title);
  const [content, setContent] = useState(
    inputData[inputData.length - 1].content
  );
  const [focus, setFocus] = useState(inputData[inputData.length - 1].focus);
  const [noticeId, setNoticeId] = useState(
    inputData[inputData.length - 1].noticeId
  );
  // useState = state의 초기값을 정할 수 있고, return 값으로 state, setState를 돌려주는 hook

  // 수정 버튼 클릭 시 처리할 데이터
  const [editData, setEditData] = useState([title, content, focus]);

  // 넘겨줄 아이디값 담을 변수
  let id = null;

  const dispatch = useDispatch();

  // 수정버튼 누르고나면 작업
  const [disable, setDisable] = useState(true);

  // 핸들러
  const handleTitle = event => {
    setTitle(event.target.value);
    console.log(`title: ${title}`);
  };
  const handleContent = event => {
    setContent(event.target.value);
    console.log(`내용: ${content}`);
  };

  const changeHandler = checked => {
    if (checked) {
      console.log(`체크 반영 완료`);
      setFocus(true);
    } else {
      console.log(`체크 해제 반영 완료`);
      setFocus(false);
    }
  };

  useEffect(() => {
    const get = NoticeMethod.NoticeGet();
    const getData = () => {
      get.then(data => {
        setList(data[0]);
        id = data[0].noticeId;
        console.log(id);
        setFocus(data[0].focus);
        setNoticeId(id);

        setEditData({
          title: title,
          content: content,
          focus: focus,
          noticeId: noticeId,
        });
      });
    };
    getData();
  }, []);

  function updateNotice(a, b, c, noticeId) {
    setEditData({
      // set에 데이터값 들어가기 전에 먼저 찍혀서 값을 읽을 수 없다고 뜨기 때문에
      // 값이 있을 때 읽어들이라는 의미로 && 처리함.
      title: a && a,
      content: b && b,
      focus: c && c,
      noticeId: noticeId,
    });
  }

  // 수정하기 버튼 클릭 시 수정할 수 있게 바꾸기
  const changeData = e => {
    console.log("수정하기 버튼 클릭함");
    setDisable(false);
  };
  const saveChange = e => {
    if (title === "") {
      //   // 토스트창 구현하기
      //   toast.error(`제목을 입력해주세요.`, {
      //     position: toast.POSITION.TOP_CENTER,
      //     autoClose: 2000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //   });
      e.preventDefault();
    }
    if (content === "") {
      //   // 토스트창 구현하기
      //   toast.error(`내용을 입력해주세요.`, {
      //     position: toast.POSITION.TOP_CENTER,
      //     autoClose: 2000,
      //     hideProgressBar: true,
      //   });
      e.preventDefault();
    }
    if (title !== "" && content !== "") {
      updateNotice(title, content, focus);
      // setEditData(updateNotice(title, content, onFocused, noticeId));
      dispatch(edit(editData));
      NoticeMethod.NoticePut(title, content, focus, noticeId);
      setTitle("");
      setContent("");
      setFocus("");
      setNoticeId("");
      onCloseModal();
      window.location.replace("/");
    }
  };

  const noticeDel = noticeId => {
    NoticeMethod.NoticeDelete(noticeId);
  };
  const delling = e => {
    noticeDel(noticeId);
    // 화면 새로고침되게 설정
    // (history.push로는 작동되지않아 다른 방법으로 진행함)
    window.location.replace("/");
  };

  // textarea focus주기
  // const textElement = useRef(null);
  // useEffect(() => {
  //   if (textElement.current) {
  //     textElement.current.focus();
  //   }
  // }, []);

  return (
    <Modal onClose={onCloseModal}>
      <div className="modal">
        <section>
          <form>
            <header>
              <input
                name="title"
                onChange={handleTitle}
                // value 속성이 변하는 값일 때 defaultValue를 사용함
                // react에서 value 값이 read 전용이라 수정이 안되므로 defaultValue를 사용
                defaultValue={title}
                disabled={disable}
              />
              <button className="close" onClick={onCloseModal}>
                <AiOutlineClose />
              </button>
            </header>
            {/* header,body - figma 이해 잘못했던 부분 
            (바로 수정가능이 아니라 우선 값만 불러오기) */}
            <main>
              <textarea
                className="bR8"
                onChange={handleContent}
                name="content"
                defaultValue={content}
                disabled={disable}
                // autoFocus
              />
            </main>
            <footer>
              <div
                className="checking"
                style={disable === false ? { display: "none" } : null}
              >
                <input type="checkbox" id="check" checked={focus} />
                {/* {disable === false && (
                  <input
                    type="checkbox"
                    id="check"
                    onChange={e => {
                      changeHandler(e.currentTarget.checked, "check");
                    }}
                    checked={focus}
                  />
                )} */}
                <label id="check" htmlFor="check"></label>
                <p className="mL10 fs14">주요 공지사항</p>
              </div>
              {disable === true ? (
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
                    onClick={changeData}
                  >
                    수정하기
                  </button>
                </div>
              ) : (
                <div className="btn">
                  <button
                    className="btnClose bR8"
                    type="button"
                    onClick={saveChange}
                  >
                    저장하기
                  </button>
                </div>
              )}
            </footer>
          </form>
        </section>
      </div>
      <ToastContainer />
    </Modal>
  );
};

export default NoticeEditModal;
