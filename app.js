import { Telegraf } from "telegraf";
import { fetchCourses } from "./functions/bot/fetch.js";

const bot = new Telegraf("6784120619:AAHTWgtV8z3dMrjihEk0vKjmSZ1KHaQ65tc");

bot.start((ctx) =>
  ctx.reply(
    `Привет! Я - бот сделанный для зрителей Правого Полушария Интроверта! 
Напиши /сourse чтобы я выбрал тебе случайное саммари для просмотра`
  )
);

bot.on("new_chat_members", async (ctx) => {
  const chatId = ctx.chat?.id;
  const firstName = ctx.message.new_chat_members[0].first_name
    ? ctx.message.new_chat_members[0].first_name
    : "";
  const lastName = ctx.message.new_chat_members[0].last_name
    ? ctx.message.new_chat_members[0].last_name
    : "";
  const fullUsername = `${firstName} ${lastName}`;
  ctx.telegram.sendMessage(chatId, `Приветствую тебя ${fullUsername}!`);
});

bot.command("course", async (ctx) => {
  ctx.reply("Саммари какой темы будем смотреть?", {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Хобби", callback_data: "64241db78dd7937ccb85d215" },
          { text: "Искусство", callback_data: "60bbdce94c73613a42fa44f7" },
          { text: "Уход за собой", callback_data: "64241db78dd7937ccb85d213" },
          { text: "Образ жизни", callback_data: "64241db78dd7937ccb85d212" },
        ],
        [
          { text: "Наука", callback_data: "60bbd7254c73613a42fa44f5" },
          { text: "История", callback_data: "60bbde374c73613a42fa44fd" },
          { text: "Культура", callback_data: "650982edf8fbe33d2a1cbfe5" },
          { text: "Мода", callback_data: "60bbddd54c73613a42fa44fb" },
        ],
        [
          { text: "Карьера", callback_data: "64241db78dd7937ccb85d214" },
          { text: "Литература", callback_data: "60bbd6dc4c73613a42fa44f4" },
          { text: "Философия", callback_data: "60bbddb24c73613a42fa44fa" },
          { text: "Архитектура", callback_data: "60bbdc3c4c73613a42fa44f6" },
        ],
        [
          { text: "Музыка", callback_data: "60bbdd8a4c73613a42fa44f9" },
          { text: "Кино", callback_data: "60bbdd604c73613a42fa44f8" },
          { text: "Психология", callback_data: "60bbde0c4c73613a42fa44fc" },
          { text: "Религия", callback_data: "60bbd3ef97bcc5f0bc7dcd92" },
        ],
      ],
    },
  });
});

bot.on("callback_query", async (ctx) => {
  if (ctx.from.id === 126263282 || ctx.from.id === 202881121) {
    const choice = ctx.callbackQuery.data;
    const { title, id } = await fetchCourses(choice);
    ctx.reply(`Сегодня смотрим - ${title}

Ссылка на саммари: https://new.artforintrovert.ru/course/${id}`);
  }
});
bot.launch();

export const handler = async (event) => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: "" };
  } catch (e) {
    console.error("error in handler:", e);
    return {
      statusCode: 400,
      body: "This endpoint is meant for bot and telegram communication",
    };
  }
};

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
