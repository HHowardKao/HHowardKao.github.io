//課程學分轉換器
function getOptionValue(type, value) {
  const val = parseInt(value);
  switch (type) {
    case "minute":
      return val; // minute轉換為秒
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
  let total = 0;

  // 計算分子
  for (let i = 0; i < formlength; i++) {
    let minuteValue = getOptionValue("minute", minutes[i]?.value || 0);
    let secondValue = getOptionValue("second", seconds[i]?.value || 0);
    let distanceValue = getOptionValue("distance", distances[i]?.value || 0);

    // 檢查值是否有效
    if (!isNaN(minuteValue) && !isNaN(secondValue) && !isNaN(distanceValue)) {
      sum += (minuteValue + secondValue) * distanceValue;
      total += distanceValue;
    }
  }

  // 計算結果並更新頁面
  let result = sum; // 假設是固定的計算結果
  let resultElement = document.getElementById("result");
  let totalElement = document.getElementById("total");
  // 計算分鐘與秒數
  let hour = Math.floor(result / 3600); // 每 3600 秒為 1 小時
  let minute = Math.floor((result % 3600) / 60); // 取得剩餘的分鐘
  let second = Math.floor(result % 60); // 取得剩餘的秒數

  // 顯示 a 分鐘 b 秒
  resultElement.innerText = `${hour} 小時${minute} 分 ${second} 秒`;
  totalElement.innerText = `${total} 公里`;
}

// 綁定事件
function bindGPAEvents() {
  let elements = document.querySelectorAll(".minute, .second, .distance");
  elements.forEach((e) => {
    e.addEventListener("change", () => {
      GPAcalculate();
      if (e.classList.contains("distance")) {
        changeColor(e);
      }
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
  if (parseInt(target.value) >= 1 && parseInt(target.value) <= 10) {
    target.style.backgroundColor = "lightgreen";
    target.style.color = "black";
  } else if (parseInt(target.value) >= 11 && parseInt(target.value) <= 20) {
    target.style.backgroundColor = "yellow";
    target.style.color = "black";
  } else if (parseInt(target.value) >= 21 && parseInt(target.value) <= 30) {
    target.style.backgroundColor = "orange";
    target.style.color = "black";
  } else {
    target.style.backgroundColor = "red";
    target.style.color = "black";
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

// 新增按鍵
let addButton = document.querySelector(".plus");
addButton.addEventListener("click", () => {
  let newDiv = document.createElement("div");
  newDiv.classList.add("input");
  let newForm = document.createElement("form");

  // 新增 course (分鐘, 秒數, 距離)
  let minute = document.createElement("select");
  minute.classList.add("minute");
  let second = document.createElement("select");
  second.classList.add("second");
  let distance = document.createElement("select");
  distance.classList.add("distance");

  // 針對 minute 生成選項
  let minuteOpt0 = document.createElement("option");
  minuteOpt0.setAttribute("value", "");
  minuteOpt0.textContent = "分鐘";
  minute.appendChild(minuteOpt0);

  for (let i = 1; i <= 30; i++) {
    let opt = document.createElement("option");
    opt.setAttribute("value", i * 60); // 每分鐘轉換成 60 秒
    opt.textContent = `${i}分`;
    minute.appendChild(opt);
  }

  // 針對 second 生成選項
  let secondOpt0 = document.createElement("option");
  secondOpt0.setAttribute("value", "");
  secondOpt0.textContent = "秒數";
  second.appendChild(secondOpt0);

  for (let i = 0; i <= 50; i += 10) {
    let opt = document.createElement("option");
    opt.setAttribute("value", i);
    opt.textContent = `${i}秒`;
    second.appendChild(opt);
  }

  // 針對 distance 生成選項
  let distanceOpt0 = document.createElement("option");
  distanceOpt0.setAttribute("value", "");
  distanceOpt0.textContent = "距離";
  distance.appendChild(distanceOpt0);

  for (let i = 1; i <= 42; i++) {
    let opt = document.createElement("option");
    opt.setAttribute("value", i);
    opt.textContent = `${i}公里`;
    distance.appendChild(opt);
  }

  // 事件監聽器
  distance.addEventListener("change", (e) => {
    GPAcalculate(); // 假設有定義
    changeColor(e.target); // 假設有定義
  });
  second.addEventListener("change", () => {
    GPAcalculate();
  });
  minute.addEventListener("change", () => {
    GPAcalculate();
  });

  // 新增垃圾桶按鈕
  let newButton = document.createElement("button");
  newButton.classList.add("trash-button");
  let newItag = document.createElement("i");
  newItag.classList.add("fas", "fa-trash");
  newButton.appendChild(newItag);

  // 垃圾桶按鈕的點擊事件
  newButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.closest(".input").style.animation = "scaleDown 0.5s ease forwards";
    e.target.closest(".input").addEventListener("animationend", (e) => {
      e.target.remove();
      GPAcalculate(); // 假設有定義
    });
  });

  // 將生成的元素加入到表單中
  newDiv.appendChild(minute);
  newDiv.appendChild(second);
  newDiv.appendChild(distance);
  newDiv.appendChild(newButton);
  newForm.appendChild(newDiv);

  // 將新表單插入到 plus 按鈕上方
  document
    .querySelector(".GPA")
    .insertBefore(newForm, document.querySelector(".plus"));
  newForm.style.animation = "scaleUp 0.5s ease forwards";
});
