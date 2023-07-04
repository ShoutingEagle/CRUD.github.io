
function validateForm () {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var gpa = document.getElementById("gpa").value;
    var age = document.getElementById("age").value;
    var degree = document.getElementById("degree").value;

    if(name == ""){
        alert ("Please enter your name");
        return false;
    }

    if(email == ""){
        alert ("Please enter your email address");
        return false;
    }

    else if(!email.includes("@")){ 
        alert ("Invalid email address");
        return false;
    }

    if(gpa < 6){
        alert ("GPA must be above 6");
        return false;
    }

    if(age == ""){
        alert ("Please enter your age");
        return false;
    }

    else if( age < 16){
        alert ("Age must be greater than 16 years");
        return false;
    }


    if(degree == ""){
        alert ("Please enter Degree");
        return false;
    }

    return true;
}



function showData (){
    var peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    var html = "";
    peopleList.forEach(function (element, index){
        let indexupdate = index +1;
        html += "<tr>"
        html += "<td>"+indexupdate+"</td>";
        html += "<td>"+element.name+"</td>";
        html += "<td>"+element.email+"</td>";
        html += "<td>"+element.gpa+"</td>";
        html += "<td>"+element.age+"</td>";
        html += "<td>"+element.degree+"</td>";
        html += '<td><button onclick="updateData('+index+')" class="edit-button"><span class="material-symbols-outlined">edit</span></button><button onclick="deleteData('+index+')" class="delete-button"><span class="material-symbols-outlined">delete</span></button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
            
}


document.onload = showData();





function addData(){
    if (validateForm() == true){
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var gpa = document.getElementById("gpa").value;
        var age = document.getElementById("age").value;
        var degree = document.getElementById("degree").value;


    var peopleList;
    if(localStorage.getItem("peopleList")==null){
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.push({
        name : name,
        email : email,
        gpa : gpa,
        age : age,
        degree : degree,
    });

    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("gpa").value = "";
    document.getElementById("age").value = "";
    document.getElementById("degree").value = "";
    }


}


function deleteData(index){
    var peopleList;
    if(localStorage.getItem("peopleList")==null){
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }


    peopleList.splice(index,1);
    localStorage.setItem("peopleList",JSON.stringify(peopleList));
    showData();
}


function updateData(index){
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";


    var peopleList;
    if(localStorage.getItem("peopleList")==null){
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("email").value = peopleList[index].email;
    document.getElementById("gpa").value = peopleList[index].gpa;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("degree").value = peopleList[index].degree;

    document.querySelector("#update").onclick = function(){
        if(validateForm() == true){
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].email = document.getElementById("email").value;
            peopleList[index].gpa = document.getElementById("gpa").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].degree = document.getElementById("degree").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));
            showData();
            

            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("gpa").value = "";
            document.getElementById("age").value = "";
            document.getElementById("degree").value = "";

            document.getElementById("submit").style.display = "block";
             document.getElementById("update").style.display = "none";
        }
    }
}


function search (){
    let filter = document.getElementById("search").value.toUpperCase();
    let crudTable = document.getElementById("crudTable");
    let tr = crudTable.getElementsByTagName("tr");
    for(let i=0;i<tr.length;i++){
        let td = tr[i].getElementsByTagName('td')[1];
        let email = tr[i].getElementsByTagName('td')[2];
        let degree = tr[i].getElementsByTagName('td')[5];

        if(td){
            let textValue = td.textContent || td.innerHTML;
            if(textValue.toUpperCase().indexOf(filter)>-1){
                tr[i].style.display = "";
            }
            else{
                tr[i].style.display = "none";
            }
        }

        if(email){
                let textValue = email.textContent || email.innerHTML;
                if(textValue.toUpperCase().indexOf(filter)>-1){
                    tr[i].style.display = "";
                }
                else{
                    tr[i].style.display = "none";
                }
            
        }


        if(degree){
                let textValue = degree.textContent || degree.innerHTML;
                if(textValue.toUpperCase().indexOf(filter)>-1){
                    tr[i].style.display = "";
                }
                else{
                    tr[i].style.display = "none";
                }
            
        }
    }
 
}

