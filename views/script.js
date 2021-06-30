let testik = true;

var list = document.getElementById('name'),
arr1 = [
    "БЛОК 1", 
    "БЛОК 2", 
    "БЛОК 3"
],
  item = document.createElement('option');
    for (var i = 0; i < arr1.length; i++) 
    {
        item.innerHTML = arr1[i];
        list.appendChild(item.cloneNode(true));
    }
//
var list = document.getElementById('operation'),
arr2 = [
    "ЗАКРЫТ", 
    "ВСКРЫТ", 
],
  item = document.createElement('option');
    for (var i = 0; i < arr2.length; i++) 
    {
        item.innerHTML = arr2[i];
        list.appendChild(item.cloneNode(true));
    }
//
var list = document.getElementById('worker'),
arr = [
    "Фамилия 1",
    "Фамилия 2",
    "Фамилия 3", 
    "Фамилия 4",
    "Фамилия 5", 
    "Фамилия 6",
],
  item = document.createElement('option');
    for (var i = 0; i < arr.length; i++) 
    {
        item.innerHTML = arr[i];
        list.appendChild(item.cloneNode(true));
    }
//
var date = new Date();
let year = date.getFullYear();
let month = (date.getMonth() + 1) > 9 ? "" + (date.getMonth() + 1) : "0" + (date.getMonth() + 1);
let test = date.getDate();
let TimeReal = `${test}.${month}.${year}`;
document.getElementById("date").value = TimeReal;

function trysave() {
  if(document.getElementById("naumenovanie").value && document.getElementById("numbermodyla").value && document.getElementById('worker') && document.getElementById('operatia'))
  {
    //alert(`Данные успешно записаны в БД!`);
  }
  else {
    //alert(`Заполните основные поля!`);
  }
};
