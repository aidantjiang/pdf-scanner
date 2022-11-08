const btnUpload = document.getElementById("btnUpload");
const inpUpload = document.getElementById("inpUpload");
const resultText = document.getElementById("resultText");

var request = new XMLHttpRequest();
request.open("GET","nums.json", false);
request.send(null);
var nums = JSON.parse(request.responseText);
console.log(nums);

btnUpload.addEventListener("click", () => {
    const formData = new FormData();

    formData.append("pdfFile", inpFile.files[0]);

    fetch("/extract-text", {
        method: "post",
        body: formData
    }).then((res) => {
        return res.text();
    }).then((text) => {
        let temp;
        let textString;
        let dataSentUp = [];
        temp = text;
        textString = temp.replace(/[^0-9\-]/g, '');
        temp = textString;
        textString = temp.replace(/(-)-*/g, '$1');

        console.log(textString);
        for (let i = 0; i < nums.length; i++) {
            console.log(nums[i]);
            console.log(textString.includes(nums[i]));
            if (textString.includes(nums[i]))
                {
                    console.log(nums[i]);
                    dataSentUp.push(nums[i]);
                }
        }
        console.log(dataSentUp);

        if (dataSentUp.length > 0)
            resultText.value = dataSentUp;
        else 
            resultText.value = "no matching numbers";
    })
});
