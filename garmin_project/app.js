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

//課程學分轉換器
function getOptionValue(type, value) {
  const val = parseInt(value);
  switch (type) {
    case "minute":
      return val * 60; // minute轉換為秒
    case "second":
      return val; // second直接返回
    case "distance":
      return val; // distance直接返回公里數
    default:
      return 0;
  }
}

function GPAcalculate() {
  let formlength = document.querySelectorAll("form").length; // 資料數
  let minutes = document.querySelectorAll(".minute");
  let seconds = document.querySelectorAll(".second");
  let distances = document.querySelectorAll(".distance");
  let sum = 0;

  // 計算分子
  for (let i = 0; i < formlength; i++) {
    let minuteValue = getOptionValue("minute", minutes[i]?.value || 1);
    let secondValue = getOptionValue("second", seconds[i]?.value || 1);
    let distanceValue = getOptionValue("distance", distances[i]?.value || 1);

    // 檢查值是否有效
    if (!isNaN(minuteValue) && !isNaN(secondValue) && !isNaN(distanceValue)) {
      sum += (minuteValue + secondValue) * distanceValue;
    }
  }

  // 計算結果並更新頁面
  let result = sum / 60; // 假設是固定的計算結果
  console.log("計算結果:", result); // 先檢查是否有進行計算
  let resultElement = document.getElementById("result");
  if (resultElement) {
    resultElement.innerText = result.toFixed(2); // 確保輸出為小數點後兩位
  } else {
    console.error("無法找到#result元素");
  }
}

// 綁定事件
function bindGPAEvents() {
  let elements = document.querySelectorAll(".minute, .second, .distance");
  elements.forEach((e) => {
    e.addEventListener("change", () => {
      GPAcalculate();
      // if (e.classList.contains("distance")) {
      //   changeColor(e);
      // }
    });
  });
}

// 頁面加載時綁定事件並進行初次計算
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
  option1_1.textContent = "微積分(一)";
  group1.appendChild(option1_1);

  let option1_2 = document.createElement("option");
  option1_2.value = "3";
  option1_2.textContent = "微積分(二)";
  group1.appendChild(option1_2);

  let option1_3 = document.createElement("option");
  option1_3.value = "3";
  option1_3.textContent = "普物/普化/生科(一)";
  group1.appendChild(option1_3);

  let option1_4 = document.createElement("option");
  option1_4.value = "3";
  option1_4.textContent = "普物/普化/生科(二)";
  group1.appendChild(option1_4);

  let option1_5 = document.createElement("option");
  option1_5.value = "3";
  option1_5.textContent = "計算機程式設計(一)";
  group1.appendChild(option1_5);

  let option1_6 = document.createElement("option");
  option1_6.value = "3";
  option1_6.textContent = "計算機程式設計(二)";
  group1.appendChild(option1_6);

  let option1_7 = document.createElement("option");
  option1_7.value = "3";
  option1_7.textContent = "離散數學";
  group1.appendChild(option1_7);

  let option1_8 = document.createElement("option");
  option1_8.value = "3";
  option1_8.textContent = "邏輯設計";
  group1.appendChild(option1_8);

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

  // 113-1研究所課程
  let group5 = document.createElement("optgroup");
  group5.label = "113-1研究所課程";

  let option5_1 = document.createElement("option");
  option5_1.value = "1";
  option5_1.textContent = "書報討論";
  group5.appendChild(option5_1);

  let option5_2 = document.createElement("option");
  option5_2.value = "3";
  option5_2.textContent = "晶片應用系統簡介";
  group5.appendChild(option5_2);

  let option5_3 = document.createElement("option");
  option5_3.value = "3";
  option5_3.textContent = "寬頻行動通訊";
  group5.appendChild(option5_3);

  let option5_4 = document.createElement("option");
  option5_4.value = "3";
  option5_4.textContent = "物聯網技術與應用";
  group5.appendChild(option5_4);

  let option5_5 = document.createElement("option");
  option5_5.value = "3";
  option5_5.textContent = "FPGA結構及設計自動化";
  group5.appendChild(option5_5);

  let option5_6 = document.createElement("option");
  option5_6.value = "3";
  option5_6.textContent = "計算機網路";
  group5.appendChild(option5_6);

  let option5_7 = document.createElement("option");
  option5_7.value = "3";
  option5_7.textContent = "網路之隨機程序";
  group5.appendChild(option5_7);

  let option5_8 = document.createElement("option");
  option5_8.value = "3";
  option5_8.textContent = "計算生物學";
  group5.appendChild(option5_8);

  let option5_9 = document.createElement("option");
  option5_9.value = "3";
  option5_9.textContent = "隨機演算法";
  group5.appendChild(option5_9);

  let option5_10 = document.createElement("option");
  option5_10.value = "3";
  option5_10.textContent = "計算理論";
  group5.appendChild(option5_10);

  let option5_11 = document.createElement("option");
  option5_11.value = "3";
  option5_11.textContent = "量子計算概論";
  group5.appendChild(option5_11);

  let option5_12 = document.createElement("option");
  option5_12.value = "3";
  option5_12.textContent = "高等編譯器";
  group5.appendChild(option5_12);

  let option5_13 = document.createElement("option");
  option5_13.value = "3";
  option5_13.textContent = "虛擬化技術與應用";
  group5.appendChild(option5_13);

  let option5_14 = document.createElement("option");
  option5_14.value = "3";
  option5_14.textContent = "平行程式";
  group5.appendChild(option5_14);

  let option5_15 = document.createElement("option");
  option5_15.value = "3";
  option5_15.textContent = "進階高效能計算叢集電腦實務";
  group5.appendChild(option5_15);

  let option5_16 = document.createElement("option");
  option5_16.value = "3";
  option5_16.textContent = "軟體專案管理";
  group5.appendChild(option5_16);

  let option5_17 = document.createElement("option");
  option5_17.value = "3";
  option5_17.textContent = "遊戲程式設計";
  group5.appendChild(option5_17);

  let option5_18 = document.createElement("option");
  option5_18.value = "3";
  option5_18.textContent = "繪圖程式設計與應用";
  group5.appendChild(option5_18);

  let option5_19 = document.createElement("option");
  option5_19.value = "3";
  option5_19.textContent = "多媒體技術於運動科學之應用";
  group5.appendChild(option5_19);

  let option5_20 = document.createElement("option");
  option5_20.value = "3";
  option5_20.textContent = "醫學資訊簡介";
  group5.appendChild(option5_20);

  let option5_21 = document.createElement("option");
  option5_21.value = "3";
  option5_21.textContent = "人工智慧倫理、法律與社會";
  group5.appendChild(option5_21);

  let option5_22 = document.createElement("option");
  option5_22.value = "3";
  option5_22.textContent = "演化計算";
  group5.appendChild(option5_22);

  let option5_23 = document.createElement("option");
  option5_23.value = "3";
  option5_23.textContent = "自然語言處理";
  group5.appendChild(option5_23);

  let option5_24 = document.createElement("option");
  option5_24.value = "3";
  option5_24.textContent = "深度學習";
  group5.appendChild(option5_24);

  let option5_25 = document.createElement("option");
  option5_25.value = "3";
  option5_25.textContent = "圖探勘";
  group5.appendChild(option5_25);

  let option5_26 = document.createElement("option");
  option5_26.value = "2";
  option5_26.textContent = "研究方法一";
  group5.appendChild(option5_26);

  let option5_27 = document.createElement("option");
  option5_27.value = "2";
  option5_27.textContent = "行動計算專題";
  group5.appendChild(option5_27);

  let option5_28 = document.createElement("option");
  option5_28.value = "2";
  option5_28.textContent = "邊緣智慧專題";
  group5.appendChild(option5_28);

  let option5_29 = document.createElement("option");
  option5_29.value = "2";
  option5_29.textContent = "資料庫系統專題(二)";
  group5.appendChild(option5_29);

  let option5_30 = document.createElement("option");
  option5_30.value = "2";
  option5_30.textContent = "人工智慧運算架構與系統(一)";
  group5.appendChild(option5_30);

  let option5_31 = document.createElement("option");
  option5_31.value = "2";
  option5_31.textContent = "人工智慧運算架構與系統(二)";
  group5.appendChild(option5_31);

  let option5_32 = document.createElement("option");
  option5_32.value = "3";
  option5_32.textContent = "賽局理論及應用";
  group5.appendChild(option5_32);

  let option5_33 = document.createElement("option");
  option5_33.value = "1";
  option5_33.textContent = "資訊應用書報討論";
  group5.appendChild(option5_33);

  let option5_34 = document.createElement("option");
  option5_34.value = "3";
  option5_34.textContent = "資料探勘與應用";
  group5.appendChild(option5_34);

  let option5_35 = document.createElement("option");
  option5_35.value = "3";
  option5_35.textContent = "高等資料庫";
  group5.appendChild(option5_35);

  let option5_36 = document.createElement("option");
  option5_36.value = "2";
  option5_36.textContent = "資訊安全實作(一)";
  group5.appendChild(option5_36);

  let option5_37 = document.createElement("option");
  option5_37.value = "3";
  option5_37.textContent = "威脅偵防解析與情資生成實作";
  group5.appendChild(option5_37);

  newCourse.appendChild(group5);

  // 其他選修課程
  let group6 = document.createElement("optgroup");
  group6.label = "其他選修課程";

  let option6_1 = document.createElement("option");
  option6_1.value = "1";
  option6_1.textContent = "1學分選修課";
  group6.appendChild(option6_1);

  let option6_2 = document.createElement("option");
  option6_2.value = "2";
  option6_2.textContent = "2學分選修課";
  group6.appendChild(option6_2);

  let option6_3 = document.createElement("option");
  option6_3.value = "3";
  option6_3.textContent = "3學分選修課";
  group6.appendChild(option6_3);

  let option6_4 = document.createElement("option");
  option6_4.value = "4";
  option6_4.textContent = "4學分選修課";
  group6.appendChild(option6_4);

  newCourse.appendChild(group6);

  // 將生成的 select 元素附加到 DOM 中的某個元素
  document.body.appendChild(newCourse);

  // here is the select tag
  let newSelect = document.createElement("select");
  newSelect.classList.add("score");
  var opt0 = document.createElement("option");
  opt0.setAttribute("value", "分數");
  let textNode0 = document.createTextNode("分數");
  opt0.appendChild(textNode0);
  var opt1 = document.createElement("option");
  opt1.setAttribute("value", "A+");
  let textNode1 = document.createTextNode("A+");
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

  newSelect.appendChild(opt0);
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
