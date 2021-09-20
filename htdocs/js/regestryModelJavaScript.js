window.addEventListener("load", function () {

    //регулярний вираз для телефону
    const regex_phone = /^(?=\+?([0-9]{2})\(?([0-9]{3})\)?([0-9]{3})-?([0-9]{2})-?([0-9]{2})).{17}$/;

    // витягуємо кнопку реєстрації
    var reg = document.getElementById("Regestry"); 


    reg.onclick = function () { //обробляємо клік
        $("#modalReg").modal("show"); // вікриваємо модалку
        var btnReg = document.getElementById("btnModalReg"); // витягуємо кнопку підтвердження реєстрації

        // витягуємо дані з полів
        var txtContact = document.getElementById("txtPhone");
        var txtPassword = document.getElementById("txtPassword");
        var txtConfirmPassword = document.getElementById("txtConfirmPassword");
        var txtLogin = document.getElementById("txtLogin")


        var imgPhoto = document.getElementById("imgPhotoe"); //поле для фото
        var fileImage = document.getElementById("fileImages"); // поле для імені фото
        var validPhoto = document.getElementById("imgBases64"); // поле для валідації фото;

        //маска для телефону
        var phoneMask = IMask(  // створили маску
            txtContact, {            // закинули значення з інпута 
            mask: '+{38}(000)000-00-00',    // пишемо маску
            lazy: false         // показуємо маску в інпуті
        });

        // валідаціїї для полів
        txtLogin.oninput = function () { 
            if (txtLogin.value == "") { // перевіряємо чи в інпуті є значення
                showError(txtLogin);
            }
            else {
                showSuccess(txtLogin);
            }
        }
        txtContact.oninput = function () {
            if (!regex_phone.test(txtContact.value)) { // перевіряємо чи інпут відповідає регулярному виразу
                showError(txtContact);
            }
            else {
                showSuccess(txtContact);
            }
        }
        fileImages.oninput = function () {
            if (fileImages.value == "") { // перевіряємо чи в інпуті є дані
                showError(fileImages);
            }
            else {
                showSuccess(fileImages);
            }
        }
        txtPassword.oninput = isValidPassword; // перевірка на правельність паролів
        txtConfirmPassword.oninput = isValidPassword; // перевірка на правельність паролів

        function isValidPassword(e) {
            if (txtPassword.value != txtConfirmPassword.value || txtConfirmPassword.value == "") { // перевіряємо чи паролі співпадають та чи вони не пусті
                txtConfirmPassword.classList.add("is-invalid");     //додаємо помилку в поле ConfirmPassword
                txtPassword.classList.add("is-invalid");            //додаємо помилку в поле Password
                txtConfirmPassword.classList.remove("is-valid");    //видаляєм успіх з поля ConfirmPassword
                txtPassword.classList.remove("is-valid");           //видаляєм успіх з поля Password
                console.log("tak");
            }
            else {
                txtConfirmPassword.classList.remove("is-invalid");    //видаляєм помилку в поле ConfirmPassword
                txtPassword.classList.remove("is-invalid");           //видаляєм помилку в поле Password
                txtConfirmPassword.classList.add("is-valid");         //додаємо успіх з поля ConfirmPassword
                txtPassword.classList.add("is-valid");                //додаємо успіх з поля Password
                console.log("ni");
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
                            document.getElementById("imageName").innerHTML = file.name; // записуємо назву файлу в інпут
                            document.getElementById("imgBases64").value = reader.result; // витягуємо дані для валідації

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


        btnReg.onclick = function () {
            var phone = txtContact.value; // зміна для телефону
            var password = txtPassword.value; // зміна для паролю
            var confirmPassword = txtConfirmPassword.value; // зміна для повторення паролю
            var login = txtLogin.value; // зміна для логіна
            var photo = validPhoto.value; // зміна для фото

            var isValid = true; // зміна для перевірки чи у всіх є значення. По замовчувані true

            //#region Validation

            //валідація на телефон
            if (!regex_phone.test(phone)) { //перевірка чи значення відповідає регулярному виразу
                showError(txtContact); //додаємо ерор для інпута
                isValid = false; //ставим значення false щоб модал не відкрилась якщо дані не заповнені
            }
            else {
                showSuccess(txtContact); //міняємо eror на success
            }

            //валідація на пароль
            if (password != confirmPassword || password == "") {
                showError(txtPassword);
                isValid = false;
            }
            else {
                showSuccess(txtPassword);
            }

            // валідація на повторення паролю
            if (password != confirmPassword || confirmPassword == "") {
                showError(txtConfirmPassword);
                isValid = false;
            }
            else {
                showSuccess(txtConfirmPassword);
            }

            // валідація на логін
            if (login == "") {
                showError(txtLogin);
                isValid = false;
            }
            else {
                showSuccess(txtLogin);
            }

            //валідація на фото
            if (photo == "") {
                showError(fileImages); //додаємо ерор для інпута
                isValid = false; //ставим значення false щоб модал не відкрилась якщо дані не заповнені
            }
            else {
                showSuccess(fileImages); //міняємо eror на success
            }

            

            if (isValid) {
                alert("Ви зареєструвались")
            }

            //#endregion

        }
    }
});