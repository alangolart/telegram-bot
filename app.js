const express = require('express');
const app = express();
const { Telegram } = require('telegraf');
require('dotenv').config();

const tg = new Telegram(process.env.TELEGRAM_TOKEN);

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'OPTIONS, GET, POST, PUT, PATCH, DELETE'
	);
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

app.post('/test', function (req, res) {
	console.log(req.body);
	const { nome, sobrenome, telefone, descricao } = req.body;
	const email_cliente = req.body.email[1];
	tg.sendMessage(
		process.env.GROUP_ID,
		`
    Novo contato recebido
    Nome: ${nome} ${sobrenome}
    Email: ${email_cliente}
    Telefone: ${telefone}
    Mensagem: ${descricao}
    Possível WhatsApp: https://wa.me/+55${telefone}
    `
	);
});

app.listen(3009, function () {
	console.log('Telegram app listening on port 3009!');
});
