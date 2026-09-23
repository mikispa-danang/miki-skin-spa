const API = () => `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

async function tg(method, payload) {
  const r = await fetch(`${API()}/${method}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const j = await r.json();
  if (!j.ok) console.error('Telegram API error', method, j);
  return j;
}

const TEXT = {
  vi: {
    welcome:'🌸 Chào mừng bạn đến với Miki Spa!\n\nBạn cần Miki hỗ trợ gì hôm nay?',
    chooseLang:'🌐 Chọn ngôn ngữ / Choose language / Выберите язык',
    services:'✨ Dịch vụ', prices:'💰 Bảng giá', booking:'📅 Đặt lịch', prep:'📋 Trước khi đến', promos:'🎁 Ưu đãi', contact:'📍 Liên hệ', language:'🌐 Ngôn ngữ', staff:'👩‍💼 Nhân viên tư vấn',
    svcTitle:'✨ Chọn dịch vụ bạn quan tâm:', hair:'⚡ Diode Laser', facial:'✨ Chăm sóc da', ear:'👂 Lấy ráy tai', massage:'💆 Massage cổ vai gáy', wash:'🫧 Gội đầu thư giãn', exfol:'🌿 Tẩy tế bào chết', packages:'🎁 Combo',
    back:'⬅️ Quay lại', home:'🏠 Menu chính', female:'👩 Nữ', male:'👨 Nam', gender:'⚡ Triệt lông Diode Laser\n\nBạn muốn xem dịch vụ cho:', area:'Chọn vùng cần triệt:', bookNow:'📅 Đặt lịch ngay', askStaff:'👩‍💼 Hỏi nhân viên',
    prepText:'📋 TRƯỚC KHI TRIỆT LÔNG\n\n✅ Cạo vùng cần triệt nếu được hướng dẫn.\n❌ Không wax hoặc nhổ lông trước buổi triệt.\n☀️ Hạn chế phơi nắng mạnh.\n🧴 Tránh sản phẩm gây kích ứng ngay trước buổi triệt.\n⚠️ Báo nhân viên nếu da đang tổn thương hoặc kích ứng.',
    promoText:'🎁 ƯU ĐÃI MIKI SPA\n\nCác chương trình mới nhất sẽ được cập nhật tại đây.\n\nBạn có thể bấm Đặt lịch hoặc Gặp nhân viên để hỏi ưu đãi hiện tại.',
    contactText:'🌸 MIKI SPA\n\n🌐 Website: https://miki-spa.com\n\nChọn kênh liên hệ:',
    staffText:'👩‍💼 Miki Spa đã nhận yêu cầu hỗ trợ của bạn. Bạn có thể gửi câu hỏi ngay trong khung chat này hoặc liên hệ qua WhatsApp/Instagram.',
    priceTitle:'💰 Chọn nhóm dịch vụ để xem giá:',
    earText:'👂 LẤY RÁY TAI\n\n• 30 phút — 150.000 VNĐ\n• Lấy ráy tai + cạo lông mặt + massage cổ vai gáy — 60 phút — 300.000 VNĐ\n• Lấy ráy tai + gội đầu + massage cổ vai gáy — 350.000 VNĐ',
    pendingPrice:'💰 Giá dịch vụ này đang được Miki Spa cập nhật.\n\nBạn có thể bấm Gặp nhân viên để nhận giá chính xác.',
    bookingOpen:'📅 Mở form đặt lịch Miki Spa', idText:'Chat ID của bạn là:'
  },
  en: {
    welcome:'🌸 Welcome to Miki Spa!\n\nHow can we help you today?', chooseLang:'🌐 Choose language / Chọn ngôn ngữ / Выберите язык',
    services:'✨ Services', prices:'💰 Prices', booking:'📅 Book Now', prep:'📋 Before Visit', promos:'🎁 Promotions', contact:'📍 Contact', language:'🌐 Language', staff:'👩‍💼 Talk to Staff',
    svcTitle:'✨ Choose a service:', hair:'⚡ Diode Laser', facial:'✨ Facial Care', ear:'👂 Ear Cleaning', massage:'💆 Neck & Shoulder Massage', wash:'🫧 Relaxing Hair Wash', exfol:'🌿 Exfoliation', packages:'🎁 Packages',
    back:'⬅️ Back', home:'🏠 Main Menu', female:'👩 Female', male:'👨 Male', gender:'⚡ Diode Laser Hair Removal\n\nChoose:', area:'Choose treatment area:', bookNow:'📅 Book Now', askStaff:'👩‍💼 Talk to Staff',
    prepText:'📋 BEFORE LASER TREATMENT\n\n✅ Shave the area if instructed.\n❌ Do not wax or tweeze the hair.\n☀️ Avoid excessive sun exposure.\n🧴 Avoid irritating skincare products immediately before treatment.\n⚠️ Tell our staff if the skin is irritated or damaged.',
    promoText:'🎁 MIKI SPA PROMOTIONS\n\nCurrent promotions will be updated here.\n\nTap Book Now or Talk to Staff for today’s offers.',
    contactText:'🌸 MIKI SPA\n\n🌐 Website: https://miki-spa.com\n\nChoose a contact channel:',
    staffText:'👩‍💼 Miki Spa received your support request. You can type your question here or contact us via WhatsApp/Instagram.',
    priceTitle:'💰 Choose a service group:',
    earText:'👂 EAR CLEANING\n\n• 30 minutes — 150,000 VND\n• Ear cleaning + face shaving + neck & shoulder massage — 60 minutes — 300,000 VND\n• Ear cleaning + hair wash + neck & shoulder massage — 350,000 VND',
    pendingPrice:'💰 This service price is being updated.\n\nTap Talk to Staff for the exact current price.', bookingOpen:'📅 Open Miki Spa booking form', idText:'Your chat ID is:'
  },
  ru: {
    welcome:'🌸 Добро пожаловать в Miki Spa!\n\nЧем мы можем вам помочь?', chooseLang:'🌐 Выберите язык / Choose language / Chọn ngôn ngữ',
    services:'✨ Услуги', prices:'💰 Цены', booking:'📅 Записаться', prep:'📋 Подготовка', promos:'🎁 Акции', contact:'📍 Контакты', language:'🌐 Язык', staff:'👩‍💼 Консультация',
    svcTitle:'✨ Выберите услугу:', hair:'⚡ Диодный лазер', facial:'✨ Уход за лицом', ear:'👂 Чистка ушей', massage:'💆 Массаж шеи и плеч', wash:'🫧 Мытьё головы', exfol:'🌿 Пилинг', packages:'🎁 Комплексы',
    back:'⬅️ Назад', home:'🏠 Главное меню', female:'👩 Женщина', male:'👨 Мужчина', gender:'⚡ Диодная лазерная эпиляция\n\nВыберите:', area:'Выберите зону:', bookNow:'📅 Записаться', askStaff:'👩‍💼 Консультация',
    prepText:'📋 ПЕРЕД ЛАЗЕРНОЙ ЭПИЛЯЦИЕЙ\n\n✅ При необходимости сбрейте волосы.\n❌ Не используйте воск и не выщипывайте волосы.\n☀️ Избегайте сильного солнца.\n🧴 Не используйте раздражающие средства непосредственно перед процедурой.\n⚠️ Сообщите специалисту о раздражении или повреждении кожи.',
    promoText:'🎁 АКЦИИ MIKI SPA\n\nАктуальные предложения будут размещены здесь.\n\nНажмите «Записаться» или «Консультация», чтобы узнать текущие акции.',
    contactText:'🌸 MIKI SPA\n\n🌐 Website: https://miki-spa.com\n\nВыберите способ связи:',
    staffText:'👩‍💼 Miki Spa получил ваш запрос. Напишите вопрос здесь или свяжитесь с нами через WhatsApp/Instagram.',
    priceTitle:'💰 Выберите группу услуг:',
    earText:'👂 ЧИСТКА УШЕЙ\n\n• 30 минут — 150 000 VND\n• Чистка ушей + бритьё лица + массаж шеи и плеч — 60 минут — 300 000 VND\n• Чистка ушей + мытьё головы + массаж шеи и плеч — 350 000 VND',
    pendingPrice:'💰 Цена этой услуги обновляется.\n\nНажмите «Консультация», чтобы узнать актуальную цену.', bookingOpen:'📅 Открыть форму записи Miki Spa', idText:'Ваш chat ID:'
  }
};

const AREAS = {
  female:['Nách / Underarm / Подмышки','Mép / Upper lip / Верхняя губа','Mặt / Face / Лицо','Tay / Arms / Руки','Chân / Legs / Ноги','Bikini','Brazilian','Lưng / Back / Спина','Bụng / Abdomen / Живот','Toàn thân / Full body / Всё тело'],
  male:['Nách / Underarm / Подмышки','Râu / Beard / Борода','Mặt / Face / Лицо','Ngực / Chest / Грудь','Bụng / Abdomen / Живот','Lưng / Back / Спина','Tay / Arms / Руки','Chân / Legs / Ноги','Bikini','Toàn thân / Full body / Всё тело']
};

const btn=(text,callback_data)=>({text,callback_data});
const urlBtn=(text,url)=>({text,url});
const kb=rows=>({inline_keyboard:rows});

function languageKeyboard(){return kb([[btn('🇻🇳 Tiếng Việt','vi|menu|home')],[btn('🇬🇧 English','en|menu|home')],[btn('🇷🇺 Русский','ru|menu|home')]]);}
function mainKeyboard(lang){const t=TEXT[lang];return kb([[btn(t.services,`${lang}|menu|services`),btn(t.prices,`${lang}|menu|prices`)],[btn(t.booking,`${lang}|menu|booking`),btn(t.prep,`${lang}|menu|prep`)],[btn(t.promos,`${lang}|menu|promos`),btn(t.contact,`${lang}|menu|contact`)],[btn(t.language,'lang|choose'),btn(t.staff,`${lang}|menu|staff`)]]);}
function servicesKeyboard(lang){const t=TEXT[lang];return kb([[btn(t.hair,`${lang}|svc|hair`),btn(t.facial,`${lang}|svc|facial`)],[btn(t.ear,`${lang}|svc|ear`),btn(t.massage,`${lang}|svc|massage`)],[btn(t.wash,`${lang}|svc|wash`),btn(t.exfol,`${lang}|svc|exfol`)],[btn(t.packages,`${lang}|svc|packages`)],[btn(t.home,`${lang}|menu|home`)]]);}
function commonDetailKeyboard(lang){const t=TEXT[lang];return kb([[btn(t.bookNow,`${lang}|menu|booking`)],[btn(t.askStaff,`${lang}|menu|staff`)],[btn(t.back,`${lang}|menu|services`),btn(t.home,`${lang}|menu|home`)]]);}
function bookingUrl(chatId,lang){const base=(process.env.PUBLIC_BASE_URL||'').replace(/\/$/,'');return `${base}/booking?chat_id=${encodeURIComponent(chatId)}&lang=${encodeURIComponent(lang)}`;}

module.exports={tg,TEXT,AREAS,btn,urlBtn,kb,languageKeyboard,mainKeyboard,servicesKeyboard,commonDetailKeyboard,bookingUrl};
