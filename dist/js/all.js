// 任務一:取得身高及體重的值
// 任務二:將取得的值及當天日期set到localStorage
// 任務三:從localStorage裡抓取set進去的資料，渲染到頁面
// 任務四:每次登入頁面都先從localStorage抓取資料，並渲染到顯示區

var showData = document.querySelector('.showData');
var arrayData = [];
// 取出locatStorage的值
function getLocal() {
    var BMIData = JSON.parse(localStorage.getItem('BMIData'));
    if(BMIData === null) {return;}
    var str = ``;
    arrayData = [];
    for (var i = 0; i < BMIData.length; i++) {
        arrayData.push(BMIData[i]);
        var height = BMIData[i].heightData/100;
        var weight = BMIData[i].weightData;
        var BMIValue = Math.round(weight / (height * height));
        if (BMIValue >= 16 && BMIValue < 18.5) {
            str += `<div class="data">
            <ul class="d-flex justify-content-around align-items-center shadow-sm mb-3 mx-auto bg-white rounded skinny">
                <li>過輕</li>
                <li><span>BMI</span>${BMIValue}</li>
                <li><span>weight</span>${weight}kg</li>
                <li><span>height</span>${BMIData[i].heightData}cm</li>
                <li><span>${BMIData[i].date}</span></li>
            </ul>
        </div>`;
        } else if (BMIValue >= 18.5 && BMIValue < 25) {
            str += `<div class="data">
            <ul class="d-flex justify-content-around align-items-center shadow-sm mb-3 mx-auto bg-white rounded perfect">
                <li>理想</li>
                <li><span>BMI</span>${BMIValue}</li>
                <li><span>weight</span>${weight}kg</li>
                <li><span>height</span>${BMIData[i].heightData}cm</li>
                <li><span>${BMIData[i].date}</span></li>
            </ul>
        </div>`;
        } else if (BMIValue >= 25 && BMIValue < 30) {
            str += `<div class="data">
            <ul class="d-flex justify-content-around align-items-center shadow-sm mb-3 mx-auto bg-white rounded fat">
                <li>過重</li>
                <li><span>BMI</span>${BMIValue}</li>
                <li><span>weight</span>${weight}kg</li>
                <li><span>height</span>${BMIData[i].heightData}cm</li>
                <li><span>${BMIData[i].date}</span></li>
            </ul>
        </div>`;
        } else if (BMIValue >= 30 && BMIValue < 35) {
            str += `<div class="data">
            <ul class="d-flex justify-content-around align-items-center shadow-sm mb-3 mx-auto bg-white rounded obese">
                <li>輕度肥胖</li>
                <li><span>BMI</span>${BMIValue}</li>
                <li><span>weight</span>${weight}kg</li>
                <li><span>height</span>${BMIData[i].heightData}cm</li>
                <li><span>${BMIData[i].date}</span></li>
            </ul>
        </div>`;
        } else if (BMIValue >= 35 && BMIValue < 40) {
            str += `<div class="data">
            <ul class="d-flex justify-content-around align-items-center shadow-sm mb-3 mx-auto bg-white rounded middleFat">
                <li>中度肥胖</li>
                <li><span>BMI</span>${BMIValue}</li>
                <li><span>weight</span>${weight}kg</li>
                <li><span>height</span>${BMIData[i].heightData}cm</li>
                <li><span>${BMIData[i].date}</span></li>
            </ul>
        </div>`;
        } else if (BMIValue >= 40) {
            str += `<div class="data">
            <ul class="d-flex justify-content-around align-items-center shadow-sm mb-3 mx-auto bg-white rounded overweight">
                <li>重度肥胖</li>
                <li><span>BMI</span>${BMIValue}</li>
                <li><span>weight</span>${weight}kg</li>
                <li><span>height</span>${BMIData[i].heightData}cm</li>
                <li><span>${BMIData[i].date}</span></li>
            </ul>
        </div>`;
        } else {
            continue;
        }
    }
    showData.innerHTML = str;
}
getLocal();


// 取得身高及體重的值

function getData() {
    var height = parseInt(document.querySelector('.height').value);
    var weight = parseInt(document.querySelector('.weight').value);
    var nowDate = new Date();
    var data = {
        heightData: height,
        weightData: weight,
        date: nowDate.getMonth() + 1 + '-' + nowDate.getDate() + '-' + nowDate.getFullYear()
    };
    arrayData.push(data);
    var inputData = JSON.stringify(arrayData);
    setData(inputData);
    getLocal();
    changeBtn(height,weight);
}

// 將值set到localStorage
function setData(data) {
    localStorage.setItem('BMIData', data);
}

// 變更按鈕狀態
function changeBtn(h,w) {
    var h = h/100;
    var BMIValue = Math.round(w / (h*h));
    answerBtn.textContent = BMIValue;
    if (BMIValue >= 16 && BMIValue < 18.5) {
        answerBtn.className = 'showValue skinnyBtn answerBtn border-0 rounded-circle';
    } else if (BMIValue >= 18.5 && BMIValue < 25) {
        answerBtn.className = 'showValue perfectBtn answerBtn border-0 rounded-circle';
    } else if (BMIValue >= 25 && BMIValue < 30) {
        answerBtn.className = 'showValue fatBtn answerBtn border-0 rounded-circle';
    } else if (BMIValue >= 30 && BMIValue < 35) {
        answerBtn.className = 'showValue obeseBtn answerBtn border-0 rounded-circle';
    } else if (BMIValue >= 35 && BMIValue < 40) {
        answerBtn.className = 'showValue middleBtn answerBtn border-0 rounded-circle';
    } else if (BMIValue >= 40) {
        answerBtn.className = 'showValue overweightBtn answerBtn border-0 rounded-circle';
    } else {
        return;
    }
}

// 綁定事件監聽
let answerBtn = document.querySelector('.answerBtn');
answerBtn.addEventListener('click', getData);