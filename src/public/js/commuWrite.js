function articleWrite() {
  let title = document.getElementById('title').value
  let content = document.getElementById('content').value
  let image = document.getElementById('image').files[0];

  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  formData.append('file', image);

  axios.post('/article/write', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((res) => {
      console.log(res);
      alert('게시 완료')
      location.href = '/article/list'
    })
    .catch((err) => {
      console.log('error', err);
    })
}

// 원빈님 코드
// CKEDITOR.ClassicEditor.create(document.getElementById("editor"), {
//   toolbar: {
//     items: [
//       "findAndReplace",
//       "selectAll",
//       "|",
//       "heading",
//       "|",
//       "bold",
//       "italic",
//       "strikethrough",
//       "underline",
//       "subscript",
//       "superscript",
//       "removeFormat",
//       "|",
//       "bulletedList",
//       "numberedList",
//       "todoList",
//       "|",
//       "outdent",
//       "indent",
//       "|",
//       "undo",
//       "redo",
//       "-",
//       "fontSize",
//       "fontFamily",
//       "fontColor",
//       "fontBackgroundColor",
//       "highlight",
//       "|",
//       "alignment",
//       "|",
//       "link",
//       "insertImage",
//       "blockQuote",
//       "insertTable",
//       "mediaEmbed",
//       "|",
//       "specialCharacters",
//       "horizontalLine",
//       "pageBreak",
//     ],
//     shouldNotGroupWhenFull: true,
//   },
//   list: {
//     properties: {
//       styles: true,
//       startIndex: true,
//       reversed: true,
//     },
//   },
//   heading: {
//     options: [
//       {
//         model: "paragraph",
//         title: "문단",
//         class: "ck-heading_paragraph",
//       },
//       {
//         model: "Heading 1",
//         view: "h1",
//         title: "제목 1",
//         class: "ck-heading_heading1",
//       },
//       {
//         model: "heading 2",
//         view: "h2",
//         title: "제목 2",
//         class: "ck-heading_heading2",
//       },
//       {
//         model: "heading 3",
//         view: "h3",
//         title: "제목 3",
//         class: "ck-heading_heading3",
//       },
//       {
//         model: "heading 4",
//         view: "h4",
//         title: "제목 4",
//         class: "ck-heading_heading4",
//       },
//       {
//         model: "heading 5",
//         view: "h5",
//         title: "제목 5",
//         class: "ck-heading_heading5",
//       },
//       {
//         model: "heading 6",
//         view: "h6",
//         title: "제목 6",
//         class: "ck-heading_heading6",
//       },
//     ],
//   },
//   placeholder: "여기에 내용을 입력하거나 붙여넣으세요.",
//   fontFamily: {
//     options: [
//       "default",
//       "Arial, Helvetica, sans-serif",
//       "Courier New, Courier, monospace",
//       "Georgia, serif",
//       "Lucida Sans Unicode, Lucida Grande, sans-serif",
//       "Tahoma, Geneva, sans-serif",
//       "Times New Roman, Times, serif",
//       "Trebuchet MS, Helvetica, sans-serif",
//       "Verdana, Geneva, sans-serif",
//       "궁서체",
//       "바탕",
//       "돋움",
//     ],
//     supportAllValues: true,
//   },
//   fontSize: {
//     options: [10, 12, 14, 16, 18, 20, 22],
//     supportAllValues: true,
//   },
//   htmlSupport: {
//     allow: [
//       {
//         name: /.*/,
//         attributes: true,
//         classes: true,
//         styles: true,
//       },
//     ],
//   },
//   htmlEmbed: {
//     showPreviews: true,
//   },
//   link: {
//     decorators: {
//       addTargetToExternalLinks: true,
//       defaultProtocol: "https://",
//       toggleDownloadable: {
//         mode: "manual",
//         label: "Downloadable",
//         attributes: {
//           download: "file",
//         },
//       },
//     },
//   },
//   mention: {
//     feeds: [
//       {
//         marker: "@",
//         feed: [
//           "@apple",
//           "@bears",
//           "@brownie",
//           "@cake",
//           "@cake",
//           "@candy",
//           "@canes",
//           "@chocolate",
//           "@cookie",
//           "@cotton",
//           "@cream",
//           "@cupcake",
//           "@danish",
//           "@donut",
//           "@dragée",
//           "@fruitcake",
//           "@gingerbread",
//           "@gummi",
//           "@ice",
//           "@jelly-o",
//           "@liquorice",
//           "@macaroon",
//           "@marzipan",
//           "@oat",
//           "@pie",
//           "@plum",
//           "@pudding",
//           "@sesame",
//           "@snaps",
//           "@soufflé",
//           "@sugar",
//           "@sweet",
//           "@topping",
//           "@wafer",
//         ],
//         minimumCharacters: 1,
//       },
//     ],
//   },
//   removePlugins: [
//     "CKBox",
//     "CKFinder",
//     "textPartLanguage",
//     "RealTimeCollaborativeComments",
//     "RealTimeCollaborativeTrackChanges",
//     "RealTimeCollaborativeRevisionHistory",
//     "PresenceList",
//     "Comments",
//     "TrackChanges",
//     "TrackChangesData",
//     "RevisionHistory",
//     "Pagination",
//     "WProofreader",
//     "MathType",
//   ],
// });
