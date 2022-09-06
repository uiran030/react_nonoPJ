import React from "react";

import Header from "../../components/common/header/Header";
import Sidebar from "../../components/common/sidebar/Sidebar";
import NoticeListBody from "../../components/noticeList/NoticeListBody";

const NoticeListPage = () => {
  return (
    <div>
      <Header name="공지사항 목록" text="공지사항을 관리할 수 있어요!" />
      <div className="noticeList row">
        <Sidebar />
        <NoticeListBody />
      </div>
    </div>
  );
};

export default NoticeListPage;
