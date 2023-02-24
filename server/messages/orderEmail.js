import transporter from "../config/nodemailer.js";

async function sendOrder(data) {
    let message = await transporter.sendMail({
        from: '"Parfum " <root@1272311-ct83731.tw1.ru>',
        to: 'select.parfums@yandex.ru',
        subject: "Заказ из корзины | SelectParfumeries",
        html: 
        `
            <body>
                <p>Имя: ${data.name}</p>
                <p>Фамилия: ${data.sname}</p>
                <p>Номер телефона: ${data.number}</p>
                <p>E-mail: ${data.email}</p>
                <p>Адрес: ${data.adress}</p>
                <p>Цена заказа: ${data.price}</p>
                <p>Детали заказа: <a href="https://selectparfumeries.ru/order/${data._id}">https://selectparfumeries.ru/order/${data._id}</a></p>
            </body>
        `,
    });
    return message;
}

async function sendBooking(data) {
    let message = await transporter.sendMail({
        from: '"Parfum " <root@1272311-ct83731.tw1.ru>',
        to: 'select.parfums@yandex.ru',
        subject: "Под заказ | SelectParfumeries",
        html: 
        `
            <body>
                <p>ФИО: ${data.fio}</p>
                <p>Номер телефона: ${data.number}</p>
                <p>E-mail: ${data.email}</p>
                <p>Бренд: ${data.brand}</p>
                <p>Аромат: ${data.aroma}</p>
                <p>Объем: ${data.size}</p>
                <p>Кол-во: ${data.quantity}</p>
            </body>
        `,
    });
    return message;
}

async function sendRequest(data) {
    let message = await transporter.sendMail({
        from: '"Parfum " <root@1272311-ct83731.tw1.ru>',
        to: 'select.parfums@yandex.ru',
        subject: "Запрос цены | SelectParfumeries",
        html: 
        `
            <body>
                <p>ФИО: ${data.fio}</p>
                <p>Номер телефона: ${data.number}</p>
                <p>E-mail: ${data.email}</p>
                <p>Аромат: ${data.aroma}</p>
            </body>
        `,
    });
    return message;
}


export {sendOrder, sendBooking, sendRequest};