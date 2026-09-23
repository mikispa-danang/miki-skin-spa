const { tg } = require('./_shared');
module.exports = async (req,res) => {
  if(!process.env.SETUP_SECRET || req.query.key !== process.env.SETUP_SECRET) return res.status(401).json({ok:false,message:'Unauthorized'});
  const base=(process.env.PUBLIC_BASE_URL||'').replace(/\/$/,'');
  if(!base) return res.status(400).json({ok:false,message:'PUBLIC_BASE_URL missing'});
  const webhook=await tg('setWebhook',{url:`${base}/api/webhook`,allowed_updates:['message','callback_query']});
  const commands=await tg('setMyCommands',{commands:[{command:'start',description:'Start Miki Spa bot'},{command:'menu',description:'Open main menu'},{command:'id',description:'Show this chat ID'}]});
  res.status(200).json({webhook,commands});
};
