window.addEventListener("load", function () {

    //дані які надсилаються в модалку
    var modalName = document.getElementById("modalName")
    var modalPhone = document.getElementById("modalPhone");
    var modalDate = document.getElementById("modalDate");
    var modalCountry = document.getElementById("modalCountry");

    //регулярний вираз для телефону
    const regex_phone = /^(?=\+?([0-9]{2})\(?([0-9]{3})\)?([0-9]{3})-?([0-9]{2})-?([0-9]{2})).{17}$/;

    //дані з полів
    var txtName = document.getElementById("txtName");
    var txtLastName = document.getElementById("txtLastName");
    var txtFatherName = document.getElementById("txtFatherName")
    var txtPhone = document.getElementById("txtPhone");
    var txtDate = document.getElementById("txtDate");
    var txtCountry = document.getElementById("txtCountry");


    var imgPhoto = document.getElementById("imgPhoto"); //поле для фото
    var fileImage = document.getElementById("fileImage"); // поле для імені фото
    var validPhoto = document.getElementById("imgBase64"); // поле для валідації фото

    //кнопка надіслати
    var btn = document.getElementById("btnClick");

    //маска для телефону
    var phoneMask = IMask(  // створили маску
        txtPhone, {            // закинули значення з інпута 
        mask: '+{38}(000)000-00-00',    // пишемо маску
        lazy: false         // показуємо маску в інпуті
    });

    //Datepicker 
    var dateObj = new Date(); // змінна для дати створили щоб витягувать теперешню дату
    var month = dateObj.getUTCMonth(); // витягуємо теперешній місяць
    var day = dateObj.getUTCDate(); // витягуємо теперешній день
    var year = dateObj.getUTCFullYear() - 18; // витягуємо теперешній рік - 18 для того щоб користувачі були старші 18
    $('#txtDate').datepicker({ // створили Datepicker
        format: "dd.mm.yyyy", // задали правельний формат
        startDate: "01.01.1900", // задаємо мінімальну дату
        language: "uk", //задаємо мову
        endDate: `${day}.${month}.${year}` // задаємо день місяць і рік
    });



    btn.onclick = function () {
        var name = txtName.value; // зміна для імені
        var lastName = txtLastName.value; // зміна для прізвища
        var fatherName = txtFatherName.value; // зміна для по батькові
        var PhoneVal = txtPhone.value; // зміна для телефону
        var dateBirth = txtDate.value; // зміна для дати
        var country = txtCountry.value; // зміна для країни
        var photo = validPhoto.value; // зміна для фото
        var isValid = true; // зміна для перевірки чи у всіх є значення по замовчувані true

        //#region Validation
        //валідація на фото
        if (photo == "") {
            showError(fileImage); //додаємо ерор для інпута
            isValid = false; //ставим значення false щоб модал не відкрилась якщо дані не заповнені
        }
        else {
            showSuccess(fileImage); //міняємо eror на success
        }

        //валідація на дату
        if (dateBirth == "") {
            showError(txtDate);
            isValid = false;
        }
        else {
            showSuccess(txtDate);
        }

        //валідація на імя
        if (name == "") {
            showError(txtName);
            isValid = false;
        }
        else {
            showSuccess(txtName);
        }

        //валідація на фамілію
        if (lastName == "") {
            showError(txtLastName);
            isValid = false;
        }
        else {
            showSuccess(txtLastName);
        }

        //валідація на по батькові
        if (fatherName == "") {
            showError(txtFatherName);
            isValid = false;
        }
        else {
            showSuccess(txtFatherName);
        }

        //валідація на телефон
        if (!regex_phone.test(PhoneVal)) { //перевірка чи значення відповідає регулярному виразу
            showError(txtPhone);
            isValid = false;
        }
        else {
            showSuccess(txtPhone);
        }


        if (isValid) {
            $("#modalInfo").modal("show"); // відкриваємо модалку
            modalName.innerHTML = lastName + " " + name + " " + fatherName; // присвоюємо в модалку значеня та відображаємо
            modalPhone.innerHTML = phoneVal; // присвоюємо в модалку значеня та відображаємо
            modalDate.innerHTML = dateBirth; // присвоюємо в модалку значеня та відображаємо
            modalCountry.innerHTML = country; // присвоюємо в модалку значеня та відображаємо
        }
        //#endregion


    }


    txtName.oninput = isValidTextInput; // перевіряємо чи в імені є значення
    txtLastName.oninput = isValidTextInput; // перевіряємо чи в прізвищі є значення
    txtFatherName.oninput = isValidTextInput; // перевіряємо чи в по бітькові є значення
    txtDate.onchange = isValidTextInput; // перевіряємо чи в даті є значення
    txtPhone.oninput = function () {
        if (!regex_phone.test(txtPhone.value)) {
            showError(txtPhone);
        }
        else {
            showSuccess(txtPhone);
        }
    }
    // перевіряємо чи в телефоні є значення
    fileImage.oninput = isValidTextInput; // перевіряємо чи у фото є значення



    function isValidTextInput(e) { // сюди передаємо сам інпут
        if (e.target.value == "") { // перевіряємо чи в інпуті є значення
            showError(e.target);  // додаємо ерор для інпута
        }
        else {
            showSuccess(e.target); // міняємо eror на success
        }
    }

    function showError(input) { // сюди передається інпут який передаємо isValidTextInput(e)
        input.classList.add("is-invalid"); // додаємо валідацію is-invalid
        input.classList.remove("is-valid"); // видаляємо валідацію is-valid
    }
    function showSuccess(input) { // сюди передається інпут який передаємо isValidTextInput(e)
        input.classList.remove("is-invalid"); // видаляємо валідацію is-invalid
        input.classList.add("is-valid"); // додаємо валідацію is-valid
    }


    fileImage.onchange = function (e) { // відстежуємо зміни
        let files = e.target.files; // отримуємо файл
        if (files && files[0]) { // перевіряємо чи файл обрано
            let file = files[0]; // присваюємо
            console.log(file); //витягуємо дані з консолі
            if (((file.size / 1024) / 1024) < 3) { // перевіряємо чи розмір не перевищує 3 мб (переводимо байти в мегабайти)
                if (file.type.match(/^image\//)) { // перевіряємо чи тип файлу фото
                    const reader = new FileReader(); // створюємо змінну
                    reader.onload = function () { // після загрузки файлу виконуємо наступний код....
                        document.getElementById("labelfileImage").innerHTML = file.name; // записуємо назву файлу в інпут
                        document.getElementById("imgBase64").value = reader.result; // витягуємо дані для валідації

                        //var bayt = (reader.result.length * (3 / 4)) - 2
                        //var siaaze = (bayt / 1024) / 1024;
                        //console.log(siaaze);   це варіант як дізнатись розмір файлу маючи тільки бейс64

                        imgPhoto.src = reader.result; //присвоюємо фото в поле
                    }
                    reader.readAsDataURL(file); //використовується для читання File. Коли операція закінчиться
                }
                else {
                    alert("Оберіть фото"); // якщо тип файлу неправильний наказуємо обрати фото
                }
            }
            else {
                alert("Занадто великий файл")// якщо розмір файлу неправильний наказуємо обрати фото меншого розміру
            }
        }
        else {
            alert("Оберіть фото"); //якщо файл не обраний наказуємо обрати його
        }
    }
});