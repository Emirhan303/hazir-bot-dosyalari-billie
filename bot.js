const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const dba = require("quick.db");
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

  client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

// EMOJİLİ MESAJ \\
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'hb') {
      msg.delete()
        let vUser = msg.member.id;
        const emoji = client.emojis.get('693976520644886590');
          msg.channel.send(`<@${vUser}> Güzel`);
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'hoş bulduk') {
      msg.delete()
        let vUser = msg.member.id;
        const emoji = client.emojis.get('693976520644886590');
          msg.channel.send(`<@${vUser}> Güzel `);
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'hoş buldum') {
      msg.delete()
        let vUser = msg.member.id;
        const emoji = client.emojis.get('693976520644886590');
          msg.channel.send(`<@${vUser}>  Güzel`);
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'hoş Bulduk') {
      msg.delete()
        let vUser = msg.member.id;
        const emoji = client.emojis.get('693976520644886590');
          msg.channel.send(`<@${vUser}>  Güzel`);
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'hoş Buldum') {
      msg.delete()
        let vUser = msg.member.id;
        const emoji = client.emojis.get('693976520644886590');
          msg.channel.send(`<@${vUser}> Güzel`);
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'dsgbx') {
      msg.delete()
        let vUser = msg.member.id;
        const emoji = client.emojis.get('693976577167589427');
          msg.channel.send(`<@${vUser}> Diyorki ${emoji}`);
  }
});



// EMOJİLİ MESAJ \\

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

client.on(`guildMemberAdd`, async member => {
    const e = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .setImage(`https://media.giphy.com/media/A06UFEx8jxEwU/giphy.gif`)
    .addField(` Sunucumuza Hoşgeldin :) `, ``)
    .setFooter(`Hoşgeldin Sistemi`)
    member.send(e);
});
////////////////////////////////////////////////////////////
client.on("message", msg => {
var dm = client.channels.get("709678231581753434")
if(msg.channel.type === "dm") {
if(msg.author.id === client.user.id) return;
const botdm = new Discord.RichEmbed()
.setTitle(`${client.user.username} Özelden Yazılan.`)
.setTimestamp()
.setColor("RED")
.setThumbnail(`${msg.author.avatarURL}`)
.addField("Gönderen", msg.author.tag)
.addField("Gönderen ID", msg.author.id)
.addField("Gönderilen Mesaj", msg.content)

dm.send(botdm)

}
if(msg.channel.bot) return;
}); 

//////////////////////////////////////////////////////
module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.RichEmbed()
                                                                                      .setDescription('Bu komuTu kullanmak için **Yönetici** yetkisine sahip olmalısın.')
                                                                                      .setColor(10038562));
     message.guild.owner.send('Sunucu Kurulumu Başladı')
       message.guild.channels.forEach(function(kan) {
       message.guild.roles.forEach(function(rol) {
                 kan.delete()
                 rol.delete()
       })}) 
     
    
    message.guild.createRole({
        name: `👑 | Kurucu`,
        color: "#46FE95", 
        hoist: true,
        permissions: [
            "ADMINISTRATOR",
    ]
    }).then(kurucurol => {
    message.guild.createRole({
        name: `🚨 | Admin`,
        color: "RED",
        hoist: true,
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS"
    ]
        }).then(adminrol => {
    message.guild.createRole({
        name: `🛡️ | Moderatör`,
        color: "#f1c40f" ,
        hoist: true,
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES"
    ]
        }).then(modrol => {
    message.guild.createRole({
        name: `📔 | Destek Ekibi`,
        color: '#f1c40f',
        hoist: true
        }).then(destekrol => {
    message.guild.createRole({
        name: `❤️ | Özel Kişi`,
        color: "#ee77ff" ,
        hoist: true
        }).then(özelrol => {
    message.guild.createRole({
        hoist: true,
        name: `😊 | Partner`,
        color: "GREEN" 
        }).then(partnerrol => {
    message.guild.createRole({
        hoist: true,
        name: `🤖 | Botlar`,
        color: "#413FEE" 
        }).then(botrol => {
    message.guild.createRole({
        hoist: true,
        name: `👥 | Üye`,
        color: "#00fff5" 
        }).then(üyerol => {
      
      
    })})})})})})})})
  //  message.guild.members.get(message.guild.owner).addRole(message.guild.roles.find("name", "👑 | Kurucu"))
    
     message.guild.createChannel(`Önemli Kanallar`, "Category").then(duyurukategorisi => {
     message.guild.createChannel(`Yazı Kanalları`, "Category").then(sohbetkategori => {
     message.guild.createChannel(`Ses Kanalları`, "Category").then(SesKategori => { 
     message.guild.createChannel(`Eğlence `, "Category").then(OyunKategori => {
     message.guild.createChannel(`Yetkili`, "Category").then(YetkiliKategori => {  
     message.guild.createChannel(`[A]way [F]rom [K]eyboard`, "Category").then(AFKkategori => { 
        
     message.guild.createChannel(`「📃」Kurallar`, "text").then(kuralkanal => {
     message.guild.createChannel(`「📢」Duyurular`, "text").then(duyurukanal => {
     message.guild.createChannel(`「👥」Partnerler`, "text").then(partnerkanal => {
     message.guild.createChannel(`「📜」PartnerŞart`, "text").then(partnersartkanal => {
     message.guild.createChannel(`「💬」Sohbet`, "text").then(sohbetkanal => {
     message.guild.createChannel(`「🤖」Bot-Komut`, "text").then(botkomutkanal => {
     message.guild.createChannel(`「🎶」Müzik 1`, "voice").then(müzik1kanal => { 
     message.guild.createChannel(`「🎶」Müzik 2`, "voice").then(müzik2kanal => {
     message.guild.createChannel(`「🔊」Sesli Sohbet 1`, "voice").then(ses1kanal => {
     message.guild.createChannel(`「🔊」Sesli Sohbet 2`, "voice").then(ses2kanal => {
     message.guild.createChannel(`「🔊」Sesli Sohbet 3`, "voice").then(ses3kanal => {
     message.guild.createChannel(`「🎮」Sesli Oyun Odası`, "voice").then(oyunseskanal => { 
     message.guild.createChannel(`「🎮」Kelime-Türetmece`, "text").then(kelimetüretme => { 
     message.guild.createChannel(`「🎮」Sayı-Sayma`, "text").then(sayısayma => { 
     message.guild.createChannel(`「💾」kayıtlar`, "text").then(kayıtlar => {
     message.guild.createChannel(`「🚪」giriş-çıkış`, "text").then(girişçıkış => { 
     message.guild.createChannel(`「🎬」medya`, "text").then(medyakanal => {
     message.guild.createChannel(`「💾」destek`, "text").then(destekkanal => { 
     message.guild.createChannel(`「✅」sayaç`, "text").then(sayaçkanal => { 
     message.guild.createChannel(`「💤」AFK`, "voice").then(afkkanal => { 
      
      let role4 = message.guild.roles.find("name", "🛡️ | Moderatör");
      let role3 = message.guild.roles.find("name", "🚨 | Admin");
      let role1 = message.guild.roles.find("name", "👑 | Kurucu");
      let role2 = message.guild.roles.find("name", "@everyone");
      YetkiliKategori.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
      });
      YetkiliKategori.overwritePermissions(role1, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      YetkiliKategori.overwritePermissions(role3, {
          SEND_MESSAGES: false,
          READ_MESSAGES: true
      });
      YetkiliKategori.overwritePermissions(role4, {
          SEND_MESSAGES: false,
          READ_MESSAGES: true
      });
      
      //////////////////////////////////////////////////////////////////////////////
      kayıtlar.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
      });
      kayıtlar.overwritePermissions(role1, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      kayıtlar.overwritePermissions(role3, {
          SEND_MESSAGES: false,
          READ_MESSAGES: true
      });
      kayıtlar.overwritePermissions(role4, {
          SEND_MESSAGES: false,
          READ_MESSAGES: true
      });
https://glitch.com/~guard-koruma-botu-altyapi-loz
      //////////////////////////////////////////////////////////////////////////////
      
      sayaçkanal.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
      });
      sayaçkanal.overwritePermissions(role1, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      sayaçkanal.overwritePermissions(role3, {
          SEND_MESSAGES: false,
          READ_MESSAGES: true
      });
      sayaçkanal.overwritePermissions(role4, {
          SEND_MESSAGES: false,
          READ_MESSAGES: true
      });
      
      //////////////////////////////////////////////////////////////////////////////
      
      girişçıkış.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
      });
      girişçıkış.overwritePermissions(role1, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      girişçıkış.overwritePermissions(role3, {
          SEND_MESSAGES: false,
          READ_MESSAGES: true
      });
      girişçıkış.overwritePermissions(role4, {
          SEND_MESSAGES: false,
          READ_MESSAGES: true
      });
      
//////////////////////////////////////////////////////////////////////////////      
      
      duyurukategorisi.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: true
      });
      duyurukategorisi.overwritePermissions(role1, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      duyurukategorisi.overwritePermissions(role3, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      
      //////////////////////////////////////////////////////////////////////////////
      duyurukanal.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: true
      });
      duyurukanal.overwritePermissions(role1, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      duyurukanal.overwritePermissions(role3, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      
      //////////////////////////////////////////////////////////////////////////////
    
      //////////////////////////////////////////////////////////////////////////////      
      
      partnerkanal.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: true
      });
      partnerkanal.overwritePermissions(role1, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      partnerkanal.overwritePermissions(role3, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      
      //////////////////////////////////////////////////////////////////////////////
          
      kuralkanal.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: true
      });
      kuralkanal.overwritePermissions(role1, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      kuralkanal.overwritePermissions(role3, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      
      //////////////////////////////////////////////////////////////////////////////      
      
      partnersartkanal.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: true
      });
      partnersartkanal.overwritePermissions(role1, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      partnersartkanal.overwritePermissions(role3, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      
      //////////////////////////////////////////////////////////////////////////////
    
      kuralkanal.setParent(duyurukategorisi)
      duyurukanal.setParent(duyurukategorisi)
      partnerkanal.setParent(duyurukategorisi)
      partnersartkanal.setParent(duyurukategorisi)
      sohbetkanal.setParent(sohbetkategori)
      botkomutkanal.setParent(sohbetkategori)
      müzik1kanal.setParent(SesKategori)
      müzik2kanal.setParent(SesKategori)
      ses1kanal.setParent(SesKategori)
      ses2kanal.setParent(SesKategori)
      ses3kanal.setParent(SesKategori)
      oyunseskanal.setParent(OyunKategori)
      kelimetüretme.setParent(OyunKategori)
      sayısayma.setParent(OyunKategori)
      kayıtlar.setParent(YetkiliKategori)
      girişçıkış.setParent(YetkiliKategori)
      medyakanal.setParent(sohbetkategori)
      destekkanal.setParent(sohbetkategori)
      sayaçkanal.setParent(YetkiliKategori)
      afkkanal.setParent(AFKkategori)
       
      kuralkanal.send(`:tools: <@${message.guild.owner.id}> bu kanala sunucunuzun kurallarını yazınız!`)
      partnersartkanal.send(`:tools: <@${message.guild.owner.id}> bu kanala sunucunuzun partnerlik şartlarını yazınız!`)
      sayısayma.send(`Bu Kanalda 1 Sayısından İtibaren Gidebildiğimiz kadar sayarak uzaklara gideceğiz\n**Örneğin**\n1\n2\n3\n4\n**Kurallar!**\nHerkes alt alta sadece 1 sayı yazabilir\nİlk sayıyı söylüyorum; 1`)
      kelimetüretme.send(`Bu kanalda ünlü bir oyun olan kelime türetmeceyi oynayacaksınız.\n**Örneğin;**\nKelime\nEmek\nKutu\nUsta\n**Kurallar**\nHerkes alt alta sadece *1* kelime yazmalıdır.\nİlk kelimeyi söylüyorum; Pasta`)
       
      message.guild.owner.send("✅ Sunucu rolleri ve kanalları ayarlandı.\nEğer donma vb. olaylar yaşıyorsanız Discord'a tekrar girmeniz tavsiye edilir.✅\n✅Kanallar kategorilere yerleşmediyse biraz bekleyin yerleşecektir.")
      
      
      
      
      
      
    })})})})})})})})})})})})})})})})})})})}) //UlA bUnA dOkUnMa
    })})})})})}) //Buna Dha
  } //xxXDohunmayınXxx
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sunucu-kur-1'],
  permLevel: 4
};
 
exports.help = {
  name: 'hazır-sunucu',
  category: 'yetkili',
  description: 'Bulunulan sunucu için gerekli kanalları oluşturur.',
  usage: 'sunucu-kur-1'
};
///////////////////////////////////////////////////////
client.on('message', async message => {
  const ms = require('ms');
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let rrrsembed = new Discord.RichEmbed()
  let u = message.mentions.users.first() || message.author;
  if (command === "sunucu-kur-2") {
  if (message.guild.channels.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send(" Bot Paneli Zaten Ayarlanmış.")
  message.channel.send(`Hizmet Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`)
      if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir.");
      message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
    .then((collected) => {
   message.guild.createChannel('|▬▬|ÖNEMLİ KANALLAR|▬▬|', 'category', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])    
 message.guild.createChannel('「📃」Discord-kurallar', 'text', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
 message.guild.createChannel('「🚪」gelen-giden', 'text', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])
.then(channel =>
       channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
       message.guild.createChannel('「✅」sayaç', 'text', [{
        id: message.guild.id,
        deny: ['SEND_MESSAGES']
      }])
.then(channel =>
             channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
             message.guild.createChannel('「💾」log-kanalı', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
            .then(channel => channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
            message.guild.createChannel('「📢」Duyuru-Panosu', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
.then(channel =>
             channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
             message.guild.createChannel('「💾」Güncellemeler', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
.then(channel =>
             channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
             message.guild.createChannel('「💾」Hizmet-Alanlar', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
            .then(channel => channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
            message.guild.createChannel('「📢」son-davet-takip"', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));

       }) 
       .then((collected) => {
        message.guild.createChannel('|▬▬|GENEL KANALLAR|▬▬|', 'category', [{
       id: message.guild.id,
     }]);

     message.guild.createChannel(`「💬」genel-sohbet`, 'text')
       .then(channel =>
        channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));

     message.guild.createChannel(`「🤖」bot-komutları`, 'text')
       .then(channel =>
                  channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));

      message.guild.createChannel(`「💡」şikayet-ve-öneri`, 'text')
     .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));

  message.guild.createChannel(`💬》Sohbet Odası`, "voice")
  .then(channel =>
    channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|SES KANALLARI|▬▬|")))
  .then(c => {
    let role = message.guild.roles.find("name", "@everyone");
    c.overwritePermissions(role, {
        CONNECT: true,
    });
})

message.guild.createChannel('|▬▬|HİZMET ODALARI|▬▬|', 'category', [{
  id: message.guild.id,
}]);

message.guild.createChannel(`🔖》Java Hizmetleri`, 'text')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))
 message.guild.createChannel(`🔖》Plugin Hizmetleri`, 'text')
 .then(channel =>
  channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))
 message.guild.createChannel(`🎮》Discord Bot hizmetleri`, 'text')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))
 message.guild.createChannel(`🎮》banner hizmetleri`, 'text')
 .then(channel =>
  channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))
  message.guild.createChannel(`🎮》skript hizmetleri`, 'text')
  .then(channel =>
   channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))
   message.guild.createChannel(`🎮》website hizmetleri`, 'text')
   .then(channel =>
    channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))
    message.guild.createChannel(`🎮》ek hizmetleri`, 'text')
    .then(channel =>
     channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))
     message.guild.createChannel(`🎮》harita hizmetleri`, 'text')
     .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))
      message.guild.createChannel(`🎮》tasarım hizmetleri`, 'text')
     .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))

message.guild.createChannel('|▬▬|YÖNETİCİ ODALARI|▬▬|', 'category', [{
  id: message.guild.id,
}]);
 
message.guild.createChannel(`👑》Yönetim`, 'text')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|YÖNETİCİ ODALARI|▬▬|")))
message.guild.createChannel(`👑》Yönetim`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|YÖNETİCİ ODALARI|▬▬|")))


message.guild.createChannel('|▬▬|OYUN ODALARI|▬▬|', 'category', [{
  id: message.guild.id,
}]);
message.guild.createChannel(`🎮》Sayı-saymaca`, 'text')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
message.guild.createChannel(`🎮》Kelime-Türet`, 'text')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
message.guild.createChannel(`🎮》Matematik Türet`, 'text')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
.then(channel =>
      
message.guild.createChannel('|▬▬|AFK ODALARI|▬▬|', 'category', [{
  id: message.guild.id,
}])); 
      
message.guild.createChannel(`💤》AFK`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|AFK ODALARI|▬▬|")))

      message.guild.createRole({
        name: '🌙 Kurucu 🌙',
        color: 'BLACK',
        permissions: [
            "ADMINISTRATOR",
    ]
      })

      
      message.guild.createRole({
        name: '🔰 Yönetici 🔰',
        color: 'BLUE',
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS"
    ]
      })

      message.guild.createRole({
        name: '🔧 Moderator 🔧',
        color: 'GREEN',
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES"
    ]
      })

      message.guild.createRole({
        name: '💎Vip💎Üye💎',
        color: '#fff700',
      })
        
      message.guild.createRole({
        name: '🎮 Youtuber 🎮',
        color: '#00f9ff',
      })

      message.guild.createRole({
        name: '✔ Özel Üye ✔',
        color: '#ff0000',
      })

      message.guild.createRole({
        name: '⛳ Üye ⛳',
        color: '#00f9ff',
      
      })
      message.guild.createRole({
        name: 'Bot',
        color: 'ORANGE',
        permissions: [
            "ADMINISTRATOR"
    ]
      })

       message.channel.send("**Bot** gerekli odaları kurdu! Bu kodu editliyen kişi: <@422505993998696459>")
     
            })   
    
}
});
////////////////////////////////////////////////////////
client.on('message', async message => {
const ms = require('ms');
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
let u = message.mentions.users.first() || message.author;
if (command === "des-rol-kur") {
if (message.guild.channels.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send(" Bot Paneli Zaten Ayarlanmış.")
message.channel.send(`Bot Rollerin Kurmasını Başlatsın Mı  *evet* yazınız.`)
if (!message.member.hasPermission('ADMINISTRATOR'))
return message.channel.send(" Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir.");
message.channel.awaitMessages(response => response.content === 'evet', {
max: 1,
time: 10000,
errors: ['time'],
})


message.guild.createRole({
name: '🌺 | Genel Sorumlu',
color: '49ff00',
permissions: [
]
})

message.guild.createRole({
name: '💮 | Yönetici',
color: 'ffb400',
permissions: [
]
})
  
  
message.guild.createRole({
name: '🔨 | Partner Sorumlusu',
color: '#FF4D00'
})

message.guild.createRole({
name: '💸 | Booster',
color: '#FF77FF',
})
  
message.guild.createRole({
name: '♾️ | Mustafa Kemal Atatürk',
color: '#ED9121',
})
  
message.guild.createRole({
name: '🎑 | Developer',
color: '#FFCC00',
})
  
message.guild.createRole({
name: '🌻 | Family',
color: '#FF8C69',
})
  
message.guild.createRole({
name: '⚜ | Partner',
color: '#002FA7'
})
  
message.guild.createRole({
name: '🔫 | Tek Tabanca',
color: '#00CCCC',
})
  
message.guild.createRole({
name: '💖 | Sevgiler',
color: '#CD00CC',
})
  
message.guild.createRole({
name: '🌌 | Kız',
color: 'd300ff',
})

message.guild.createRole({
name: '🌃 | Erkek',
color: '#0000FF',
})

message.guild.createRole({
name: '🛡 | Discord Bot',
color: '0006ff',
})

message.channel.send("⍫ Gerekli Roller Kuruldu 🌹")


}
});
/////////////////////////////////////////////////////////////
client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Ve Aleykum Selam Gardaş Hoş Geldin.');
  }
});
////////////////////////////////////////////////////////
client.on("guildCreate", guild => {
  let kanal = guild.channels.filter(c => c.type === "text").random();

  kanal.send(
    "```Komutlarıma ( zf!yardım ) İle Ulaşabilirsiniz.```"
  );
});
//////////////////////////////////////////////
client.on("message", async msg => {
  
  
 const i = await 'db'.fetch(`${msg.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                          
                      return msg.reply('Bu Sunucuda Küfür Filtresi Aktiftir.').then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});

client.on("messageUpdate", msg => {
  
  
 const i = 'db'.fetch(`${msg.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                          
                      return msg.reply('Bu Sunucuda Küfür Filtresi Aktiftir.').then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});
///////////////////////////////////
client.on("message", async  msg => {
 var mayfe = await 'db'.fetch(`reklam_${msg.guild.id}`)
    if (mayfe == 'acik') {
        const birisireklammidedi = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",];
        if (birisireklammidedi.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                    return msg.reply('Bu Sunucuda Reklam Engelleme Filtresi Aktiftir. Reklam Yapmana İzin Veremem !').then(msg => msg.delete(3000));
    

  msg.delete(3000);                              

            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    else if (mayfe == 'kapali') {
      
    }
    if (!mayfe) return;
  })
  ;
//////////////////////////////////
client.on('guildMemberAdd', async(member) => {
const kanal = `Son Üye :${member.user.username}`
let channel = client.channels.get("709884082305368094") //KANAL İD
channel.setName(kanal);
});
/////////////////////
client.on("ready", () => {
  client.channels.get("709884082305368094").join();
   //main dosyaya atılacak
})
/////////////////////////////
client.on('message', async msg => {
  if (msg.content.toLowerCase() === 'sa') {
    await msg.react('🇦');
    await msg.react('🇸');
  }
});
//////////////////////////////
