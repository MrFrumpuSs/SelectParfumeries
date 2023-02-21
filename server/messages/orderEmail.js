import transporter from "../config/nodemailer.js";

async function sendOrder(data) {
    let message = await transporter.sendMail({
        from: '"Parfum " <admin@parfum.ru>',
        to: 'mrfrumpusslive@gmail.com',
        subject: "Заказ | Parfum",
        html: 
        `
            <body>
                <p>Имя: ${data.name}</p>
                <p>Фамилия: ${data.sname}</p>
                <p>Номер телефона: ${data.number}</p>
                <p>E-mail: ${data.email}</p>
                <p>Цена заказа: ${data.price}</p>
                <p>Детали заказа: <a></a></p>
            </body>
        `,
    });
    return message;
}


export default sendOrder;