// 開場動畫
let image = document.querySelector(".image");
let slider = document.querySelector(".slider");
let animation = document.querySelector("section.wrapper");
const time_line = new TimelineMax();
//parameter1 是要控制的對象
//parameter2 是duration
//parameter3 是控制對象的原始狀態
//parameter4 是控制對象的動畫結束後的狀態
//parameter5 設定動畫跑的時間點

//高度動畫
time_line.fromTo(
  image,
  1.5,
  { height: "0%" },
  { height: "100%", ease: Power2.easeInOut }
);
//寬度動畫
time_line.fromTo(
  image,
  2.5,
  { width: "0%" },
  { width: "100%", ease: Power2.easeInOut }
);
//slider背景動畫
time_line.fromTo(
  slider,
  1,
  { x: "-100%" },
  { x: "0%", ease: Power2.easeInOut },
  "-=1.2" //動畫會提前 1.2 秒開始
);

//讓整個動畫在0.5秒內從完全不透明=>完全透明
time_line.fromTo(animation, 0.5, { opacity: 1 }, { opacity: 0 });
setTimeout(() => {
  animation.style.pointerEvents = "none"; //該元素就不再響應任何鼠標或觸控事件
}, 4000); //在4秒後

//GPA轉換成實際數值
function GPAtoNumber(grade) {
  switch (grade) {
    case "A+":
      return 4.3;
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0;
  }
}

//課程學分轉換器
function CourseToCredit(grade) {
  switch (grade) {
    case "3":
      return 3;
    case "2":
      return 2;
    case "1":
      return 1;
    case "4":
      return 4;
    case "0":
      return 0;
    default:
      return 0;
  }
}

//GPA計算機
function GPAcalculate() {
  let formlength = document.querySelectorAll("form").length; //資料數
  let credit = document.querySelectorAll(".course"); //學分數
  let score = document.querySelectorAll(".score"); //分數
  let sum = 0; //GPA計算用分子
  let creditSum = 0; //GPA計算用分母
  let result; //最後總結果
  //計算分子
  for (let i = 0; i < formlength; i++) {
    sum += CourseToCredit(credit[i].value) * GPAtoNumber(score[i].value);
  }
  //計算分母
  for (let i = 0; i < credit.length; i++) {
    creditSum += CourseToCredit(credit[i].value);
  }
  if (creditSum == 0) {
    result = (0.0).toFixed(2);
  } else {
    result = (sum / creditSum).toFixed(2);
  }
  document.getElementById("result").innerText = result;
}

//只要選擇course或score就要更新一次GPA計算機
function bindGPAEvents() {
  let credit = document.querySelectorAll(".course");
  credit.forEach((e) => {
    e.addEventListener("change", () => {
      GPAcalculate();
    });
  });
  let score = document.querySelectorAll(".score");
  score.forEach((e) => {
    e.addEventListener("change", (e) => {
      GPAcalculate();
      changeColor(e.target);
    });
  });
}

//頁面加載時綁定事件並進行初次計算
document.addEventListener("DOMContentLoaded", () => {
  bindGPAEvents();
  GPAcalculate(); // 頁面載入時初次計算GPA
});

//防止FORM內部的BUTTON交出表單
let allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

//改變score顏色
function changeColor(target) {
  if (target.value == "A" || target.value == "A-" || target.value == "A+") {
    target.style.backgroundColor = "lightgreen";
    target.style.color = "black";
  } else if (
    target.value == "B" ||
    target.value == "B-" ||
    target.value == "B+"
  ) {
    target.style.backgroundColor = "yellow";
    target.style.color = "black";
  } else if (
    target.value == "C" ||
    target.value == "C-" ||
    target.value == "C+"
  ) {
    target.style.backgroundColor = "orange";
    target.style.color = "black";
  } else if (
    target.value == "D" ||
    target.value == "D-" ||
    target.value == "D+"
  ) {
    target.style.backgroundColor = "red";
    target.style.color = "black";
  } else {
    target.style.backgroundColor = "white";
  }
}

//垃圾桶按鍵
let allTrash = document.querySelectorAll(".trash-button");
allTrash.forEach((trash) => {
  trash.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.style.animation =
      "scaleDown 0.5s ease forwards";
    e.target.parentElement.parentElement.addEventListener(
      "animationend",
      (e) => {
        e.target.remove();
        GPAcalculate();
      }
    );
  });
});

//新增按鍵
let addButton = document.querySelector(".plus");
addButton.addEventListener("click", () => {
  let newDiv = document.createElement("div");
  newDiv.classList.add("input");
  let newForm = document.createElement("form");
  //新增course
  let newCourse = document.createElement("select");
  newCourse.classList.add("course");

  // 預設選項
  let defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "CS課程名稱";
  newCourse.appendChild(defaultOption);

  // 一年級必修
  let group1 = document.createElement("optgroup");
  group1.label = "一年級必修";

  let option1_1 = document.createElement("option");
  option1_1.value = "3";
  option1_1.textContent = "計算機程式設計(一)";
  group1.appendChild(option1_1);

  let option1_2 = document.createElement("option");
  option1_2.value = "3";
  option1_2.textContent = "計算機程式設計(二)";
  group1.appendChild(option1_2);

  let option1_3 = document.createElement("option");
  option1_3.value = "3";
  option1_3.textContent = "離散數學";
  group1.appendChild(option1_3);

  let option1_4 = document.createElement("option");
  option1_4.value = "3";
  option1_4.textContent = "邏輯設計";
  group1.appendChild(option1_4);

  newCourse.appendChild(group1);

  // 二年級必修
  let group2 = document.createElement("optgroup");
  group2.label = "二年級必修";

  let option2_1 = document.createElement("option");
  option2_1.value = "3";
  option2_1.textContent = "硬體設計與實驗";
  group2.appendChild(option2_1);

  let option2_2 = document.createElement("option");
  option2_2.value = "3";
  option2_2.textContent = "線性代數";
  group2.appendChild(option2_2);

  let option2_3 = document.createElement("option");
  option2_3.value = "3";
  option2_3.textContent = "資料結構";
  group2.appendChild(option2_3);

  let option2_4 = document.createElement("option");
  option2_4.value = "3";
  option2_4.textContent = "軟體設計與實驗";
  group2.appendChild(option2_4);

  let option2_5 = document.createElement("option");
  option2_5.value = "3";
  option2_5.textContent = "機率";
  group2.appendChild(option2_5);

  let option2_6 = document.createElement("option");
  option2_6.value = "3";
  option2_6.textContent = "計算機結構";
  group2.appendChild(option2_6);

  newCourse.appendChild(group2);

  // 三年級必修
  let group3 = document.createElement("optgroup");
  group3.label = "三年級必修";

  let option3_1 = document.createElement("option");
  option3_1.value = "3";
  option3_1.textContent = "作業系統";
  group3.appendChild(option3_1);

  let option3_2 = document.createElement("option");
  option3_2.value = "3";
  option3_2.textContent = "計算方法設計";
  group3.appendChild(option3_2);

  let option3_3 = document.createElement("option");
  option3_3.value = "2";
  option3_3.textContent = "系統整合實作(一)";
  group3.appendChild(option3_3);

  newCourse.appendChild(group3);

  // 四年級必修
  let group4 = document.createElement("optgroup");
  group4.label = "四年級必修";

  let option4_1 = document.createElement("option");
  option4_1.value = "2";
  option4_1.textContent = "系統整合實作(二)";
  group4.appendChild(option4_1);

  newCourse.appendChild(group4);

  // 將生成的 select 元素附加到 DOM 中的某個元素
  document.body.appendChild(newCourse);

  // here is the select tag
  let newSelect = document.createElement("select");
  newSelect.classList.add("score");
  var opt1 = document.createElement("option");
  opt1.setAttribute("value", "等第分數");
  let textNode1 = document.createTextNode("等第分數");
  opt1.appendChild(textNode1);
  var opt2 = document.createElement("option");
  opt2.setAttribute("value", "A");
  let textNode2 = document.createTextNode("A");
  opt2.appendChild(textNode2);
  var opt3 = document.createElement("option");
  opt3.setAttribute("value", "A-");
  let textNode3 = document.createTextNode("A-");
  opt3.appendChild(textNode3);
  var opt4 = document.createElement("option");
  opt4.setAttribute("value", "B+");
  let textNode4 = document.createTextNode("B+");
  opt4.appendChild(textNode4);
  var opt5 = document.createElement("option");
  opt5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  opt5.appendChild(textNode5);
  var opt6 = document.createElement("option");
  opt6.setAttribute("value", "B-");
  let textNode6 = document.createTextNode("B-");
  opt6.appendChild(textNode6);
  var opt7 = document.createElement("option");
  opt7.setAttribute("value", "C+");
  let textNode7 = document.createTextNode("C+");
  opt7.appendChild(textNode7);
  var opt8 = document.createElement("option");
  opt8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  opt8.appendChild(textNode8);
  var opt9 = document.createElement("option");
  opt9.setAttribute("value", "C-");
  let textNode9 = document.createTextNode("C-");
  opt9.appendChild(textNode9);
  var opt10 = document.createElement("option");
  opt10.setAttribute("value", "D+");
  let textNode10 = document.createTextNode("D+");
  opt10.appendChild(textNode10);
  var opt11 = document.createElement("option");
  opt11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  opt11.appendChild(textNode11);
  var opt12 = document.createElement("option");
  opt12.setAttribute("value", "D-");
  let textNode12 = document.createTextNode("D-");
  opt12.appendChild(textNode12);
  var opt13 = document.createElement("option");
  opt13.setAttribute("value", "F");
  let textNode13 = document.createTextNode("F");
  opt13.appendChild(textNode13);

  newSelect.appendChild(opt1);
  newSelect.appendChild(opt2);
  newSelect.appendChild(opt3);
  newSelect.appendChild(opt4);
  newSelect.appendChild(opt5);
  newSelect.appendChild(opt6);
  newSelect.appendChild(opt7);
  newSelect.appendChild(opt8);
  newSelect.appendChild(opt9);
  newSelect.appendChild(opt10);
  newSelect.appendChild(opt11);
  newSelect.appendChild(opt12);
  newSelect.appendChild(opt13);

  newSelect.addEventListener("change", (e) => {
    GPAcalculate();
    changeColor(e.target);
  });
  newCourse.addEventListener("change", (e) => {
    GPAcalculate();
  });

  //新增垃圾桶
  let newButton = document.createElement("button");
  newButton.classList.add("trash-button");
  let newItag = document.createElement("i");
  newItag.classList.add("fas");
  newItag.classList.add("fa-trash");
  newButton.appendChild(newItag);
  newButton.addEventListener("click", (e) => {
    e.preventDefault();

    // Apply the CSS animation
    e.target.parentElement.parentElement.style.animation =
      "scaleDown 0.5s ease forwards";

    // Listen for the animation to end
    e.target.parentElement.parentElement.addEventListener(
      "animationend",
      (e) => {
        e.target.remove(); // Remove the element from the DOM
        GPAcalculate(); // Call the setGPA function (if necessary)
      }
    );
  });

  newDiv.appendChild(newCourse);
  newDiv.appendChild(newSelect);
  newDiv.appendChild(newButton);
  newForm.appendChild(newDiv);
  //document.querySelector(".GPA").appendChild(newForm);
  // Insert the new form above the plus button
  document
    .querySelector(".GPA")
    .insertBefore(newForm, document.querySelector(".plus"));
  newForm.style.animation = "scaleUp 0.5s ease forwards";
});
