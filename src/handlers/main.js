const { MessageModel } = require('../database')
const { ChatModel } = require("../database");
const { UserModel } = require("../database");
const { bot } = require('../bot')
const { setTimeout } = require('timers/promises')

require('./errors.js')
const groupId = process.env.groupId;
function is_dev(user_id) {
    const devUsers = process.env.DEV_USERS.split(",");
    return devUsers.includes(user_id.toString());
}

const forbiddenWords = [
    "cp",
    "zoo",
    "gore",
    "pedo",
    "pedofilia",
];

async function createMessageAndAddReply(message) {
    const repliedMessage =
        message.reply_to_message.sticker?.file_unique_id ??
        message.reply_to_message.text;
    const replyMessage = message.sticker?.file_id ?? message.text;

    const regex = /^[\.!]/;
    if (regex.test(repliedMessage) || regex.test(replyMessage)) {
        console.log("Mensagem não salva começa com /");
        return;
    }

    if (
        forbiddenWords.some(
            (word) =>
                repliedMessage.includes(word) || replyMessage.includes(word)
        )
    ) {
        console.log("Mensagem proibida, não será salva");
        return;
    }

    const Message = new MessageModel({
        message: repliedMessage,
        reply: replyMessage,
    });

    await Message.save()
}

async function addReply(message){
    const repliedMessage = message.reply_to_message.sticker?.file_unique_id 
        ?? message.reply_to_message.text

    const exists = await MessageModel.exists({ message: repliedMessage })

    if(exists)
        return await MessageModel.findOneAndUpdate({ message: repliedMessage }, {
            $push: {
                reply: message.sticker?.file_id ?? message.text
            }
        })

    createMessageAndAddReply(message)
}

const audioList = [
    {
        keyword: "Safada",
        audioUrl:
            "https://https://www.myinstants.com/media/sounds/cala-boca-put4.mp3",
    },
    {
        keyword: "Viado",
        audioUrl: "https://www.myinstants.com/media/sounds/o-viado-apertou-o-play.mp3",
    },
    {
        keyword: "Bom dia Hannah",
        audioUrl: "https://www.myinstants.com/media/sounds/bom-diaaaaaaaaaaaaaaaa.mp3",
    },
    {
        keyword: "Fazendo o que?",
        audioUrl: "https://www.myinstants.com/media/sounds/tot.mp3",
    },
    {   keyword: "Boa tarde bb",
        audioUrl:
            "https://www.myinstants.com/media/sounds/bom-dia-bb-online-audio-converter.mp3",
    },
    {   keyword: "Louca",
        audioUrl:
            "https://www.myinstants.com/media/sounds/cebolinha_xingando_a_monica_3316993880162726519.mp3",
    },
    {   keyword: "Bora",
        audioUrl:
            "https://www.myinstants.com/media/sounds/proibido-pau-mole.mp3",
    },
    {   keyword: "me chama",
        audioUrl:
            "https://www.myinstants.com/media/sounds/5a1f6s4fads5f-copia_0FcOETT.mp3",
    },
    {   keyword: "pv",
        audioUrl:
            "https://www.myinstants.com/media/sounds/vc-e-gado.mp3",
    },
    {   keyword: "mulheres",
        audioUrl:
            "https://www.myinstants.com/media/sounds/a-boate-california.mp3",
    },
    {   keyword: "Chata",
        audioUrl:
            "https://www.myinstants.com/media/sounds/vai-toma-no-cu-discord.mp3",
    },
    {   keyword: "Quem é vc?",
        audioUrl:
            "https://www.myinstants.com/media/sounds/cebolinha-elogios.mp3",
    },
    {   keyword: "Oi gente",
        audioUrl:
           "https://www.myinstants.com/media/sounds/angelik-silva-k.mp3",
    },
    {   keyword: "Cuida",
        audioUrl:
            "https://www.myinstants.com/media/sounds/a-pia-ta-cheia-de-loca.mp3",
    },
    {   keyword: "manda foto",
        audioUrl:
            "https://www.myinstants.com/media/sounds/eae-gata-online-audio-converter.mp3",
    },
    {   keyword: "Oi",
        audioUrl:
            "https://www.myinstants.com/media/sounds/oi-e-e.mp3",
    },
    {   keyword: "Eduardo",
        audioUrl:
            "https://www.myinstants.com/media/sounds/whatsapp-audio_1KgxwtR.mp3",
    },
    {   keyword: "Vamos jogar",
        audioUrl:
            "https://www.myinstants.com/media/sounds/e-o-brazino.mp3",
    },
    {   keyword: "Parabéns pra vc",
        audioUrl:
            "https://www.myinstants.com/media/sounds/xuxa-aniversario-btko.mp3",
    },
    {   keyword: "Sou gay",
        audioUrl:
            "https://www.myinstants.com/media/sounds/uma-bixa-foi-detectada.mp3",
    },
    {   keyword: "Bom dia grupo",
        audioUrl:
            "https://www.myinstants.com/media/sounds/bom-dia-minha-pika.mp3",
    },
    {   keyword: "Oi boa noite",
        audioUrl:
            "https://www.myinstants.com/media/sounds/oi-moa-noite.mp3",
    },
    {   keyword: "chama no pv",
        audioUrl:
            "https://www.myinstants.com/media/sounds/eu-queria-ser-o-kid.mp3",
    },
    {   keyword: "Vai fazer oq hj?",
        audioUrl:
            "https://www.myinstants.com/media/sounds/hoje-comeremos-cu.mp3",
    },
    {   keyword: "Oq vc quer?",
        audioUrl:
            "https://www.myinstants.com/media/sounds/eu-quero-gozar-meme.mp3",
    },
    {   keyword: "Sou solteiro",
        audioUrl:
            "https://www.myinstants.com/media/sounds/kkkkkwinx.mp3",
    },
    {   keyword: "adm",
        audioUrl:
            "https://www.myinstants.com/media/sounds/alborg-6_1.mp3",
    },
    {   keyword: "administrador",
        audioUrl:
            "https://www.myinstants.com/media/sounds/iludido-pela-adm.mp3",
    },
    {   keyword: "cadê o adm",
        audioUrl:
            "https://www.myinstants.com/media/sounds/cayotten-adm-pauzudo.mp3",
    },
    {   keyword: "passarinho",
        audioUrl:
            "https://www.myinstants.com/media/sounds/bem-te-vi-eletronica.mp3",
    },
    {   keyword: "Que time vc torce?",
        audioUrl:
            "https://www.myinstants.com/media/sounds/bota-o-hino-do-corinthians.mp3",
    },
    {   keyword: "flamengo",
        audioUrl:
            "https://www.myinstants.com/media/sounds/tmp4z1468wq.mp3",
    },
];

 async function answerUser(message) {
    const receivedMessage = message.sticker?.file_unique_id ?? message.text;
    const chatId = message.chat.id;

    const regex = /^[\/.!]/;
    if (regex.test(receivedMessage)) {
        console.log("Mensagem não enviada, começa com /");
        return;
    }

    const sendMessageOptions = { reply_to_message_id: message.message_id };

    const audioMatch = audioList.find((audio) =>
        receivedMessage.includes(audio.keyword)
    );

    if (audioMatch) {
        await bot.sendChatAction(chatId, "record_audio");
        await bot.sendVoice(chatId, audioMatch.audioUrl, sendMessageOptions);
    } else {
        let exists = await MessageModel.exists({ message: receivedMessage });

        if (exists) {
            const { reply } = await MessageModel.findOne({
                message: receivedMessage,
            });
            const replyToSend = reply[Math.floor(Math.random() * reply.length)];

            if (!replyToSend) return;

            const typingTime = 50 * replyToSend?.length || 6000;

            await bot.sendChatAction(chatId, "typing");
            setTimeout(typingTime).then(async () => {
                await bot
                    .sendSticker(chatId, replyToSend, sendMessageOptions)
                    .catch((error) =>
                        bot.sendMessage(chatId, replyToSend, sendMessageOptions)
                    );
            });
        }
    }
}

async function saveUserInformation(message) {
    const chatId = message.chat.id;
    const user = message.from;

    if (message.chat.type !== "private") {
        return;
    }

    const exists = await UserModel.exists({ user_id: user.id });

    if (!exists) {
        const newUser = new UserModel({
            user_id: user.id,
            username: user.username,
            firstname: user.first_name,
            lastname: user.last_name,
        });

        await newUser.save();

        const notificationMessage = `#Togurosbot #New_User
      <b>User:</b> <a href="tg://user?id=${user.id}">${user.first_name}</a>
      <b>ID:</b> <code>${user.id}</code>
      <b>Username:</b> ${
          user.username ? `@${user.username}` : "Não informado"
      }`;

        bot.sendMessage(groupId, notificationMessage, { parse_mode: "HTML" });
    }
}

async function removeMessage(message) {
    const user_id = message.from.id;
    if (!is_dev(user_id)) {
        console.log("Usuário não autorizado a usar esse comando");
        return;
    }

    const repliedMessage =
        message.reply_to_message &&
        (message.reply_to_message.sticker?.file_unique_id ??
            message.reply_to_message.text);

    const exists = await MessageModel.exists({ message: repliedMessage });
    if (!exists) {
        console.log("Mensagem não encontrada no banco de dados");
        return;
    }

    await MessageModel.deleteMany({
        $or: [
            { message: repliedMessage },
            { reply: { $elemMatch: { $eq: repliedMessage } } },
        ],
    });

    console.log("Mensagem removida com sucesso");
    const chatId = message.chat.id;
    const user = message.from;
    if (message.message_id) {
        bot.sendMessage(
            chatId,
            `Mensagem deletada com sucesso do banco de dados pelo(a) dev: <b><a href="tg://user?id=${user.id}">${user.first_name}</a></b>. \n\nObs.: Lembrando que todas as respostas que estavam adicionadas a essa mensagem foram apagadas.`,
            { parse_mode: "HTML", reply_to_message_id: message.message_id }
        );
    } else {
        bot.sendMessage(
            chatId,
            `Mensagem deletada com sucesso do banco de dados pelo usuário: <b><a href="tg://user?id=${user.id}">${user.first_name}</a></b>. \n\nObs.: Lembrando que todas as respostas que estavam adicionadas a essa mensagem foram apagadas.`,
            { parse_mode: "HTML" }
        );
    }
}

async function start(message) {
    const userId = message.from.id;
    if (message.chat.type !== "private") {
        return;
    }
    const firstName = message.from.first_name;
    const message_start_dev = `Olá, <b>${firstName}</b>! Olá meu lindo desenvolvedor 😍💻\n\nVocê está no comando neném, mas use seus poderes com sabedoria`;
    const message_start = `Olá, <b>${firstName}</b>!\n\n Eu sou a <b>Hannah</b>, um bot que acredita não ser um bot kkkkkk`;
    const options_start = {
        parse_mode: "HTML",
        disable_web_page_preview: true,
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Me coloca logo no seu grupo 😌",
                        url: "https://t.me/hannahmachinebot?startgroup=true",
                    },
                ],
                [
                    {
                        text: "Meu grupo oficial ✅",
                        url: "https://t.me/matchperfeitooficial",
                    },
                    {
                        text: "Suporte 🔧",
                        url: "https://t.me/jorgedan92",
                    },
                ],
                [
                    {
                        text: "Nossa federação 🛡",
                        url: "https://t.me/fednovaera",

                    },
                ],
            ],
        },
    };
    const options_start_dev = {
        parse_mode: "HTML",
        disable_web_page_preview: true,
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Nossa federação 🛡",
                        url: "https://t.me/fednovaera",
                    },
                    {
                        text: "Suporte",
                        url: "https://t.me/jorgedan92",
                    },
                ],
                [
                    {
                        text: "Comandos para desenvolvedores",
                        callback_data: "commands",
                    },
                ],
            ],
        },
    };
    bot.on("callback_query", async (callbackQuery) => {
        if (callbackQuery.message.chat.type !== "private") {
            return;
        }
        const chatId = callbackQuery.message.chat.id;
        const messageId = callbackQuery.message.message_id;

        if (callbackQuery.data === "commands") {
            const commands = [
                "/stats - Estatística de grupos, usuarios e mensagens enviadas",
                "/ban - retirar o bot do chat",
                "/unban - permite o bot do chat",
                "/banned - lista de grupos conectados",
                "/groups - permite o bot do chat",
                "/bc - envia mensagem para todos os usuários",
                "/broadcast - encaminha uma mensagem para todos os usuários",
                "/ping - veja a latência da VPS",
                "/delmsg - Apague uma mensagem do banco de dados do bot",
                "/devs - lista de desenvolvedores do bot ",
            ];
            await bot.editMessageText(
                "<b>Lista de Comandos:</b> \n\n" + commands.join("\n"),
                {
                    parse_mode: "HTML",
                    disable_web_page_preview: true,
                    chat_id: chatId,
                    message_id: messageId,
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: "⬅️ Voltar",
                                    callback_data: "back_to_start",
                                },
                            ],
                        ],
                    },
                }
            );
        } else if (callbackQuery.data === "back_to_start") {
            await bot.editMessageText(message_start_dev, {
                parse_mode: "HTML",
                chat_id: chatId,
                message_id: messageId,
                disable_web_page_preview: true,
                reply_markup: options_start_dev.reply_markup,
            });
        }
    });
    if (is_dev(userId)) {
        bot.sendMessage(userId, message_start_dev, options_start_dev);
    } else {
        bot.sendMessage(message.chat.id, message_start, options_start);
    }
}

async function stats(message) {
    const user_id = message.from.id;
    if (!(await is_dev(user_id))) {
        if (message.message_id) {
            bot.sendMessage(message.chat.id, `Você não é *desenvolvedor*. 👨‍💻`, {
                reply_to_message_id: message.message_id,
                parse_mode: "Markdown",
            });
        } else {
            bot.sendMessage(message.chat.id, `Você não é *desenvolvedor*. 👨‍💻`, {
                parse_mode: "Markdown",
            });
            return;
        }
    }
    const chatId = message.chat.id;
    const numUsers = await UserModel.countDocuments();
    const numChats = await ChatModel.countDocuments();
    const numMessages = await MessageModel.countDocuments();
    const messageText = `\n──❑ 「 Bot Stats 」 ❑──\n\n ☆ ${numUsers} usuários\n ☆ ${numChats} grupos\n ☆ ${numMessages} mensagens aprendidas`;

    if (await is_dev(user_id)) {
        bot.sendMessage(chatId, messageText);
    }
}

async function groups(message) {
    const user_id = message.from.id;
    if (!(await is_dev(user_id))) {
        return;
    }
    if (message.chat.type !== "private") {
        return;
    }

    try {
        const chats = await ChatModel.find().sort({ chatId: 1 });

        let contador = 1;
        let chunkSize = 3900 - message.text.length;
        let messageChunks = [];
        let currentChunk = "";

        for (let chat of chats) {
            if (chat.chatId < 0) {
                let groupMessage = `<b>${contador}:</b> <b>Group=</b> ${chat.chatName} || <b>ID:</b> <code>${chat.chatId}</code>\n`;
                if (currentChunk.length + groupMessage.length > chunkSize) {
                    messageChunks.push(currentChunk);
                    currentChunk = "";
                }
                currentChunk += groupMessage;
                contador++;
            }
        }
        messageChunks.push(currentChunk);

        let index = 0;

        const markup = (index) => {
            return {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: `<< ${index + 1}`,
                                callback_data: `groups:${index - 1}`,
                                disabled: index === 0,
                            },
                            {
                                text: `>> ${index + 2}`,
                                callback_data: `groups:${index + 1}`,
                                disabled: index === messageChunks.length - 1,
                            },
                        ],
                    ],
                },
                parse_mode: "HTML",
            };
        };

        await bot.sendMessage(
            message.chat.id,
            messageChunks[index],
            markup(index)
        );

        bot.on("callback_query", async (query) => {
            if (query.data.startsWith("groups:")) {
                index = Number(query.data.split(":")[1]);
                if (
                    markup(index).reply_markup &&
                    markup(index).reply_markup.inline_keyboard
                ) {
                    markup(index).reply_markup.inline_keyboard[0][0].disabled =
                        index === 0;
                    markup(index).reply_markup.inline_keyboard[0][1].disabled =
                        index === messageChunks.length - 1;
                }
                await bot.editMessageText(messageChunks[index], {
                    chat_id: query.message.chat.id,
                    message_id: query.message.message_id,
                    ...markup(index),
                });
                await bot.answerCallbackQuery(query.id);
            }
        });
    } catch (error) {
        console.error(error);
    }
}

async function saveNewChatMembers(msg) {
    const chatId = msg.chat.id;
    const chatName = msg.chat.title;

    try {
        const chat = await ChatModel.findOne({ chatId: chatId });

        if (chat) {
            console.log(
                `Grupo ${chatName} (${chatId}) já existe no banco de dados`
            );
        } else {
            const newChat = await ChatModel.create({ chatId, chatName });
            console.log(
                `Grupo ${newChat.chatName} (${newChat.chatId}) adicionado ao banco de dados`
            );

            const botUser = await bot.getMe();
            const newMembers = msg.new_chat_members.filter(
                (member) => member.id === botUser.id
            );

            if (newMembers.length > 0) {
                const message = `#Togurosbot #New_Group
    <b>Group:</b> ${chatName}
    <b>ID:</b> <code>${chatId}</code>`;
                bot.sendMessage(groupId, message, { parse_mode: "HTML" }).catch(
                    (error) => {
                        console.error(
                            `Erro ao enviar mensagem para o grupo ${groupId}: ${error}`
                        );
                    }
                );
            }

            bot.sendMessage(
                chatId,
                "Oi, eu sou a Hannah, bora agitar essa bagaça hahaha.",
                {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: "Nossa federação 🛡",
                                    url: "https://t.me/fednovaera",
                                },
                                {
                                    text: "Suporte",
                                    url: "https://t.me/jorgedan92",
                                },
                            ],
                        ],
                    },
                }
            );
        }
        const developerMembers = msg.new_chat_members.filter(
            (member) => member.is_bot === false && is_dev(member.id)
        );

        if (developerMembers.length > 0) {
            const message = `👨‍💻 <b>Meu lindo e gostoso desenvolvedor entrou no grupo 😍</b> <a href="tg://user?id=${developerMembers[0].id}">${developerMembers[0].first_name}</a> 😎👍`;
            bot.sendMessage(chatId, message, { parse_mode: "HTML" }).catch(
                (error) => {
                    console.error(
                        `Erro ao enviar mensagem para o grupo ${chatId}: ${error}`
                    );
                }
            );
        }
    } catch (error) {
        console.error(error);
    }
}

async function removeLeftChatMember(msg) {
    const botUser = await bot.getMe();
    if (msg.left_chat_member.id !== botUser.id) {
        return;
    }

    const chatId = msg.chat.id;

    try {
        const chat = await ChatModel.findOne({ chatId });
        if (!chat) {
            console.log(
                `Chat com id ${chatId} não foi encontrado no banco de dados`
            );
            return;
        }
        if (chat.is_ban) {
            console.log(
                `Grupo ${chat.chatName} (${chat.chatId}) não removido do banco de dados, pois está banido`
            );
            return;
        }
        await ChatModel.findOneAndDelete({ chatId });
        console.log(
            `Grupo ${chat.chatName} (${chat.chatId}) removido do banco de dados`
        );
    } catch (err) {
        console.error(err);
    }
}

function pollingError(error) {
    console.log(error);
}

async function ban(message) {
    const userId = message.from.id;
    const chatId = message.text.split(" ")[1];

    if (message.chat.type !== "private") {
        await bot.sendMessage(
            message.chat.id,
            "Por favor, envie este comando em um chat privado com o bot."
        );
        return;
    }

    if (!is_dev(userId)) {
        await bot.sendMessage(
            message.chat.id,
            "Você não está autorizado a executar este comando."
        );
        return;
    }

    const chat = await ChatModel.findOne({ chatId: chatId });

    if (!chat) {
        await bot.sendMessage(message.chat.id);
        return;
    }

    await ChatModel.updateOne({ chatId: chatId }, { $set: { is_ban: true } });
    await bot.sendMessage(message.chat.id, `Chat ${chatId} foi banido.`);
    await bot.leaveChat(chatId);
}

async function unban(message) {
    const userId = message.from.id;
    const chatId = message.text.split(" ")[1];

    if (message.chat.type !== "private") {
        await bot.sendMessage(
            message.chat.id,
            "Por favor, envie este comando em um chat privado com o bot."
        );
        return;
    }

    if (!is_dev(userId)) {
        await bot.sendMessage(
            message.chat.id,
            "Você não está autorizado a executar este comando."
        );
        return;
    }

    const chat = await ChatModel.findOne({ chatId: chatId });

    if (!chat) {
        await bot.sendMessage(message.chat.id);
        return;
    }

    await ChatModel.updateOne({ chatId: chatId }, { $set: { is_ban: false } });
    await bot.sendMessage(message.chat.id, `Chat ${chatId} foi desbanido.`);
}

async function banned(message) {
    const userId = message.from.id;

    if (message.chat.type !== "private") {
        await bot.sendMessage(
            message.chat.id,
            "Por favor, envie este comando em um chat privado com o bot."
        );
        return;
    }

    if (!is_dev(userId)) {
        await bot.sendMessage(
            message.chat.id,
            "Você não está autorizado a executar este comando."
        );
        return;
    }

    const bannedChats = await ChatModel.find({ is_ban: true });

    if (bannedChats.length === 0) {
        await bot.sendMessage(
            message.chat.id,
            "Nenhum chat encontrado no banco de dados que tenha sido banido."
        );
        return;
    }

    let messageText = "<b>Chats banidos:</b>\n";

    for (const chat of bannedChats) {
        messageText += `<b>Group:</b> <a href="tg://resolve?domain=${chat.chatName}&amp;id=${chat.chatId}">${chat.chatName}</a>\n`;
        messageText += `<b>ID:</b> <code>${chat.chatId}</code>\n\n`;
    }

    await bot.sendMessage(message.chat.id, messageText, { parse_mode: "HTML" });
}

async function devs(message) {
    const chatId = message.chat.id;
    const userId = message.from.id;

    if (!is_dev(userId)) {
        bot.sendMessage(
            chatId,
            "Este comando só pode ser usado por desenvolvedores!"
        );
        return;
    }

    if (message.chat.type !== "private" || chatId !== userId) {
        bot.sendMessage(
            chatId,
            "Este comando só pode ser usado em um chat privado com o bot!"
        );
        return;
    }

    try {
        const devUsers = await UserModel.find({ is_dev: true }).lean().exec();

        let message = "<b>Lista de desenvolvedores:</b>\n";
        devUsers.forEach((user) => {
            message += `<b>User:</b> <a href="tg://user?id=${user.user_id}">${user.firstname} ${user.lastname}</a>\n`;
            message += `<b>ID:</b> <code>${user.user_id}</code>\n`;
            message += `<b>Username:</b> ${
                user.username ? `@${user.username}` : "Não informado"
            }\n\n`;
        });

        bot.sendMessage(chatId, message, { parse_mode: "HTML" });
    } catch (error) {
        console.error(error);
        bot.sendMessage(
            chatId,
            "Ocorreu um erro ao buscar a lista de desenvolvedores!"
        );
    }
}

exports.initHandler = () => {
    bot.on("message", main);
    bot.on("polling_error", pollingError);
    bot.on("message", saveUserInformation);
    bot.onText(/^\/start$/, start);
    bot.onText(/^\/stats$/, stats);
    bot.onText(/^\/grupos$/, groups);
    bot.on("new_chat_members", saveNewChatMembers);
    bot.on("left_chat_member", removeLeftChatMember);
    bot.onText(/^\/ban/, ban);
    bot.onText(/^\/unban/, unban);
    bot.onText(/^\/banned/, banned);
    bot.onText(/^\/delmsg/, removeMessage);
    bot.onText(/\/devs/, devs);
};

function timeFormatter(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const hoursFormatted = String(hours).padStart(2, "0");
    const minutesFormatted = String(minutes).padStart(2, "0");
    const secondsFormatted = String(secs).padStart(2, "0");

    return `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`;
}

bot.onText(/\/ping/, async (msg) => {
    const start = new Date();
    const replied = await bot.sendMessage(msg.chat.id, "𝚙𝚘𝚗𝚐!");
    const end = new Date();
    const m_s = end - start;
    const uptime = process.uptime();
    const uptime_formatted = timeFormatter(uptime);
    await bot.editMessageText(
        `𝚙𝚒𝚗𝚐: \`${m_s}𝚖𝚜\`\n𝚞𝚙𝚝𝚒𝚖𝚎: \`${uptime_formatted}\``,
        {
            chat_id: replied.chat.id,
            message_id: replied.message_id,
            parse_mode: "Markdown",
        }
    );
});

bot.onText(/^(\/broadcast|\/bc)\b/, async (msg, match) => {
    const user_id = msg.from.id;
    if (!(await is_dev(user_id))) {
        return;
    }

    const query = match.input.substring(match[0].length).trim();
    if (!query) {
        return bot.sendMessage(
            msg.chat.id,
            "<i>I need text to broadcast.</i>",
            { parse_mode: "HTML" }
        );
    }
    const sentMsg = await bot.sendMessage(msg.chat.id, "<i>Processing...</i>", {
        parse_mode: "HTML",
    });
    const web_preview = query.startsWith("-d");
    const query_ = web_preview ? query.substring(2).trim() : query;
    const ulist = await UserModel.find().lean().select("user_id");
    let sucess_br = 0;
    let no_sucess = 0;
    let block_num = 0;
    for (const { user_id } of ulist) {
        try {
            await bot.sendMessage(user_id, query_, {
                disable_web_page_preview: !web_preview,
                parse_mode: "HTML",
            });
            sucess_br += 1;
        } catch (err) {
            if (
                err.response &&
                err.response.body &&
                err.response.body.error_code === 403
            ) {
                block_num += 1;
            } else {
                no_sucess += 1;
            }
        }
    }
    await bot.editMessageText(
        `
  ╭─❑ 「 <b>Broadcast Completed</b> 」 ❑──
  │- <i>Total Users:</i> \`${ulist.length}\`
  │- <i>Successful:</i> \`${sucess_br}\`
  │- <i>Blocked:</i> \`${block_num}\`
  │- <i>Failed:</i> \`${no_sucess}\`
  ╰❑
    `,
        {
            chat_id: sentMsg.chat.id,
            message_id: sentMsg.message_id,
            parse_mode: "HTML",
        }
    );
});

const channelStatusId = process.env.channelStatusId;

async function main(message){
    const replyToMessage = message?.reply_to_message ?? false
    const { id: botId } = await bot.getMe()

    if(message.sticker || message.text){
        if(replyToMessage && replyToMessage.from.id != botId) addReply(message)
        if(!replyToMessage || replyToMessage.from.id == botId) answerUser(message)
    }
}

function pollingError(error){
    console.log(error)
}

exports.initHandler = () => {
    bot.on('message', main)
    bot.on('polling_error', pollingError)
}
