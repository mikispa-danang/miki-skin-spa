const { tg } = require('./_shared');
module.exports = async (req,res) => {
  if (req.method !== 'POST') return res.status(405).json({ok:false});
  try {
    const b=req.body||{};
    const chatId=String(b.chat_id||'').trim();
    const lang=['vi','en','ru'].includes(b.lang)?b.lang:'vi';
    const name=String(b.name||'').trim(), phone=String(b.phone||'').trim(), service=String(b.service||'').trim();
    const date=String(b.date||'').trim(), time=String(b.time||'').trim(), note=String(b.note||'').trim();
    if(!chatId||!name||!service||!date||!time) return res.status(400).json({ok:false,message:'Missing required fields'});
    const admin=`📅 ĐẶT LỊCH MỚI - MIKI SPA\n\n👤 ${name}\n✨ ${service}\n📅 ${date}\n⏰ ${time}\n📱 ${phone||'Không nhập'}\n📝 ${note||'Không có'}\n💬 Telegram chat: ${chatId}`;
    if(process.env.ADMIN_CHAT_ID) await tg('sendMessage',{chat_id:process.env.ADMIN_CHAT_ID,text:admin});
    const confirmations={
      vi:`✅ Miki Spa đã nhận yêu cầu đặt lịch của bạn.\n\n👤 ${name}\n✨ ${service}\n📅 ${date}\n⏰ ${time}\n\nMiki Spa sẽ xác nhận lại với bạn sớm nhất.`,
      en:`✅ Miki Spa received your booking request.\n\n👤 ${name}\n✨ ${service}\n📅 ${date}\n⏰ ${time}\n\nWe will contact you to confirm your appointment.`,
      ru:`✅ Miki Spa получил вашу заявку на запись.\n\n👤 ${name}\n✨ ${service}\n📅 ${date}\n⏰ ${time}\n\nМы свяжемся с вами для подтверждения записи.`
    };
    await tg('sendMessage',{chat_id:chatId,text:confirmations[lang]||confirmations.vi});
    return res.status(200).json({ok:true});
  }catch(e){ console.error(e); return res.status(500).json({ok:false,message:'Server error'}); }
};
