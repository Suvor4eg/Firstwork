var arr1;

var list1 = document.getElementById('name'),
arr1 = JSON.parse(document.getElementById("allblocks").value),
  item = document.createElement('option');
    for (var i = 0; i < arr1.length; i++) 
    {
        item.innerHTML = arr1[i];
        list1.appendChild(item.cloneNode(true));
    }
//
var list2 = document.getElementById('operation'),
arr2 = [
    "test 4",

],
  item = document.createElement('option');
    for (var i = 0; i < arr2.length; i++) 
    {
        item.innerHTML = arr2[i];
        list2.appendChild(item.cloneNode(true));
    }
//
var list3 = document.getElementById('worker'),
arr = [
    "test 3",
],
  item = document.createElement('option');
    for (var i = 0; i < arr.length; i++) 
    {
        item.innerHTML = arr[i];
        list3.appendChild(item.cloneNode(true));
    }
//

//
var list4 = document.getElementById('dopoperation'),
arr3 = [
  "test",
 
],
  item = document.createElement('option');
    for (var i = 0; i < arr3.length; i++) 
    {
        item.innerHTML = arr3[i];
        list4.appendChild(item.cloneNode(true));
    }
//

var date = new Date();
let year = date.getFullYear();
let month = (date.getMonth() + 1) > 9 ? "" + (date.getMonth() + 1) : "0" + (date.getMonth() + 1);
let day = (date.getDate()) > 9 ? "" + (date.getDate()) : "0" + (date.getDate());
let DateReal = `${day}.${month}.${year}`;
document.getElementById("date").value = DateReal;
let Hour = (date.getHours()) > 9 ? "" + (date.getHours()) : "0" + (date.getHours());
let Minutes = (date.getMinutes()) > 9 ? "" + (date.getMinutes()) : "0" + (date.getMinutes());
var realtime = `${Hour}:${Minutes}`; 
document.getElementById("realtime").value = realtime;

let SQLstatus = document.getElementById("SQLstatus").value;
  if(SQLstatus == 'Offline') {
    document.getElementById("popup_text").innerText = `Ошибка! Нет подключения к БД.`;
    document.getElementById("popup").style.display = `block`;
  }
    else if (SQLstatus == 'Confirm') {
      document.getElementById("popup_text").innerText = `Данные успешно сохранены в БД.`;
      document.getElementById("popup").style.display = `block`;
    }
      else if (SQLstatus == 'Failed') {
        document.getElementById("popup_text").innerText = `Ошибка. Заполните основные поля и повторите попытку!`;
        document.getElementById("popup").style.display = `block`;
      }

function okdone() {
  document.getElementById("popup").style.display = `none`;
}
