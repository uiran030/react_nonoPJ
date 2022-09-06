import Instance from "./NoticeInstance";

// Notice 생성(post)
async function NoticePost(title, content, focus, createdAt, updatedAt, writer) {
  try {
    const response = await Instance.post("/api/v1/notice", {
      title: title,
      content: content,
      focus: focus,
      createdAt: createdAt,
      updatedAt: updatedAt,
      writer: writer,
    });
    console.log(response.data);
    return response.data.noticeList;
  } catch (error) {
    console.log(error);
  }
}

// Notice 조회(get) 내림차순
// export const NoticeGet = async queryParameter => {
async function NoticeGet(queryParameter) {
  try {
    const response = await Instance.get(`/api/v1/notice`);
    // console.log(response.data.noticeList);
    // console.log(response.data);
    return response.data.noticeList;
  } catch (error) {
    console.log(error);
  }
}

// Notice 조회(get) 올림차순
// export const NoticeGet = async queryParameter => {
// async function NoticeGetUp(queryParameter) {
//   try {
//     const response = await Instance.get(`/api/v1/notice`);
//     // console.log(response.data);
//     console.log(response.data.noticeList);
//     console.log(response.data);
//     const url = response.request.responseURL;
//     console.log(url);
//     return response.data.noticeList;
//   } catch (error) {
//     console.log(error);
//   }
// }

// Notice 수정(put)
// export const NoticePut = async () => {
async function NoticePut(title, content, focus, noticeId) {
  try {
    const response = await Instance.put(`/api/v1/notice/${noticeId}`, {
      title: title,
      content: content,
      focus: focus,
      noticeId: noticeId,
    });
    console.log(response.data);
    return response.data.noticeList;
  } catch (error) {
    console.log(error);
  }
}

// Notice 삭제(delete)
// export const NoticeDelete = async () => {
async function NoticeDelete(noticeId) {
  try {
    const response = await Instance.delete(`/api/v1/notice/${noticeId}`, {});
    console.log(response.data);
    return response.data.noticeList;
  } catch (error) {
    console.log(error);
  }
}

// 여러 함수를 하나의 변수로 통합 후 export
export const NoticeMethod = {
  NoticePost,
  NoticeGet,
  // NoticeGetUp,
  NoticePut,
  NoticeDelete,
};

export default NoticeMethod;