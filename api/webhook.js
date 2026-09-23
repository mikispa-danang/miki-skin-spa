const { tg, TEXT, AREAS, btn, urlBtn, kb, languageKeyboard, mainKeyboard, servicesKeyboard, commonDetailKeyboard, bookingUrl } = require('./_shared');

async function send(chat_id, text, reply_markup) {
  return tg('sendMessage', { chat_id, text, reply_markup, disable_web_page_preview: true });
}
async function edit(chat_id, message_id, text, reply_markup) {
  return tg('editMessageText', { chat_id, message_id, text, reply_markup, disable_web_page_preview: true });
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(200).send('Miki Spa Telegram Bot');
  try {
    const u = req.body || {};
    if (u.message) {
      const chatId = u.message.chat.id;
      const text = (u.message.text || '').trim();
      if (text === '/id') return res.status(200).json(await send(chatId, `🆔 ${TEXT.vi.idText} ${chatId}`));
      if (text === '/start' || text === '/menu') {
        await send(chatId, TEXT.vi.chooseLang, languageKeyboard());
      } else {
        await send(chatId, '🌸 Miki Spa\n\nGõ /menu để mở menu chính.\nType /menu to open the main menu.\nВведите /menu, чтобы открыть меню.');
      }
      return res.status(200).json({ok:true});
    }

    if (u.callback_query) {
      const q=u.callback_query, data=q.data||'';
      const chatId=q.message.chat.id, msgId=q.message.message_id;
      await tg('answerCallbackQuery',{callback_query_id:q.id});

      if (data==='lang|choose') {
        await edit(chatId,msgId,TEXT.vi.chooseLang,languageKeyboard());
        return res.status(200).json({ok:true});
      }

      const [lang='vi',type,action,extra] = data.split('|');
      const t=TEXT[lang] || TEXT.vi;
      if (type==='menu' && action==='home') await edit(chatId,msgId,t.welcome,mainKeyboard(lang));
      else if (type==='menu' && action==='services') await edit(chatId,msgId,t.svcTitle,servicesKeyboard(lang));
      else if (type==='menu' && action==='prices') await edit(chatId,msgId,t.priceTitle,kb([[btn(t.hair,`${lang}|svc|hair`)],[btn(t.ear,`${lang}|svc|ear`)],[btn(t.facial,`${lang}|svc|facial`)],[btn(t.massage,`${lang}|svc|massage`)],[btn(t.home,`${lang}|menu|home`)]]));
      else if (type==='menu' && action==='prep') await edit(chatId,msgId,t.prepText,kb([[btn(t.bookNow,`${lang}|menu|booking`)],[btn(t.home,`${lang}|menu|home`)]]));
      else if (type==='menu' && action==='promos') await edit(chatId,msgId,t.promoText,kb([[btn(t.bookNow,`${lang}|menu|booking`)],[btn(t.askStaff,`${lang}|menu|staff`)],[btn(t.home,`${lang}|menu|home`)]]));
      else if (type==='menu' && action==='contact') {
        const rows=[];
        if (process.env.MIKI_WHATSAPP_URL) rows.push([urlBtn('💬 WhatsApp',process.env.MIKI_WHATSAPP_URL)]);
        if (process.env.MIKI_INSTAGRAM_URL) rows.push([urlBtn('📸 Instagram',process.env.MIKI_INSTAGRAM_URL)]);
        if (process.env.MIKI_MAPS_URL) rows.push([urlBtn('📍 Google Maps',process.env.MIKI_MAPS_URL)]);
        rows.push([urlBtn('🌐 miki-spa.com','https://miki-spa.com')],[btn(t.home,`${lang}|menu|home`)]);
        await edit(chatId,msgId,t.contactText,kb(rows));
      }
      else if (type==='menu' && action==='staff') {
        await edit(chatId,msgId,t.staffText,kb([[btn(t.bookNow,`${lang}|menu|booking`)],[btn(t.home,`${lang}|menu|home`)]]));
        if (process.env.ADMIN_CHAT_ID) {
          await send(process.env.ADMIN_CHAT_ID,`👩‍💼 Yêu cầu tư vấn mới\nTelegram chat: ${chatId}\nTên: ${q.from.first_name||''} ${q.from.last_name||''}\nUsername: @${q.from.username||'không có'}`);
        }
      }
      else if (type==='menu' && action==='booking') {
        const url=bookingUrl(chatId,lang);
        await edit(chatId,msgId,t.bookingOpen,kb([[urlBtn(t.bookNow,url)],[btn(t.home,`${lang}|menu|home`)]]));
      }
      else if (type==='svc' && action==='hair') await edit(chatId,msgId,t.gender,kb([[btn(t.female,`${lang}|hair|female`),btn(t.male,`${lang}|hair|male`)],[btn(t.back,`${lang}|menu|services`)]]));
      else if (type==='hair' && (action==='female'||action==='male')) {
        const arr=AREAS[action];
        const rows=[];
        for(let i=0;i<arr.length;i+=2){ rows.push(arr.slice(i,i+2).map((x,j)=>btn(x,`${lang}|area|${action}|${i+j}`))); }
        rows.push([btn(t.back,`${lang}|svc|hair`),btn(t.home,`${lang}|menu|home`)]);
        await edit(chatId,msgId,t.area,kb(rows));
      }
      else if (type==='area') {
        const gender=action, idx=Number(extra||0), area=(AREAS[gender]||[])[idx]||'';
        await edit(chatId,msgId,`⚡ ${area}\n\n${t.pendingPrice}`,commonDetailKeyboard(lang));
      }
      else if (type==='svc' && action==='ear') await edit(chatId,msgId,t.earText,commonDetailKeyboard(lang));
      else if (type==='svc') await edit(chatId,msgId,t.pendingPrice,commonDetailKeyboard(lang));
      else await edit(chatId,msgId,t.welcome,mainKeyboard(lang));

      return res.status(200).json({ok:true});
    }
    return res.status(200).json({ok:true});
  } catch (e) {
    console.error(e);
    return res.status(200).json({ok:true});
  }
};
