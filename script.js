let pickColor = document.getElementById("pick-color");
let fileInput = document.getElementById("file");
let image = document.getElementById("image");
let hex = document.getElementById("hex");
let rgb = document.getElementById("rgb");
let customAlert = document.getElementById("alert");
let pickedColor = document.getElementById("picked-color");
let eyeDropper;

window.onload = () => {
    if("EyeDropper" in window) {
        eyeDropper = new EyeDropper();
    }
    else {
        alert("Your browser doesn't support Eyedropper API");
    }
};

const colorSelector = () => {
    eyeDropper.open().then((colorValue) => {
        let hexValue = colorValue.sRGBHex;
        let rgbArr = [];
        for(let i = 1; i < hexValue.length; i+=2){
            rgbArr.push(parseInt(hexValue[i] + hexValue[i+1], 16));
            console.log(rgbArr);
        }
        let rgbValue = "rgb(" + rgbArr + ")";
        console.log(hexValue, rgbValue);
        result.style.display = "grid";
        hex.value = hexValue;
        rgb.value = rgbValue;
        pickedColor.style.backgroundColor = hexValue;
    })
};

pickColor.addEventListener("click", colorSelector);

fileInput.onchange = () => {
    result.style.display = "none";
    let reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.onload = () => {
        image.setAttribute("src", reader.result);
    };
};

let copy = (textId) => {
    document.getElementById(textId).select();
    document.execCommand("copy");
    customAlert.style.transform = "scale(1)"
    setTimeout(() => {
        customAlert.style.transform = "scale(0)";
    }, 2000);
};