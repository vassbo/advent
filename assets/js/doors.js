var id, timeout2, escapeTimeout, esc = true;
function openDoor(day) {
    let now = new Date();
    let doorDate = new Date("12." + (day + 1) + "." + year);
    if (doorDate < now && esc) {
        esc = false;
        clearTimeout(escapeTimeout);
        escapeTimeout = setTimeout(() => {
            esc = true;
        }, 1000);

        // document.querySelector('.doorNum').innerHTML = day;
        // document.getElementById('pass').querySelector('.hint').innerHTML = doorPass[day].hint;
        // document.getElementById('pass').classList.remove('hidden');

        if (!document.getElementById('doors').querySelectorAll('.door')[day].classList.contains('opened')) {
            document.getElementById('doors').querySelectorAll('.door')[day].classList.add('opened');
            opened.push(day);
            if (typeof(Storage) !== "undefined") localStorage['advent' + year] = JSON.stringify(opened);
        }

        document.getElementById('doors').classList.add('hidden');
        document.getElementById('doorsClone').classList.add('hidden');
        // document.getElementById('pass').classList.add('hidden');
        // document.getElementById('day').querySelector('iframe').src = advent[day].song;
        
        id = advent[day].song;
        start = 0;
        stop = null;
        
        document.querySelector('.jul').classList.add('hidden');
        if (advent[day].title.includes('advent')) {
            document.getElementById('day').querySelector('.verse').innerHTML = '';
            document.querySelector('.candles').classList.remove('hidden');
            let html = '';
            for (let i = 0; i < Number(advent[day].title.charAt(0)); i++) {
                html += `
                <div class="candle" onclick="this.classList.add('blink')">
                    <div class="flame">
                        <div class="shadows"></div>
                        <div class="top"></div>
                        <div class="middle"></div>
                        <div class="bottom"></div>
                    </div>
                    <div class="wick"></div>
                    <div class="wax"></div>
                </div>`;
            }
            document.querySelector('.candles').innerHTML = html;

            var candleCount = 0, interval;
            interval = setInterval(() => {
                let candles = document.querySelectorAll('.candle');
                if (candleCount < candles.length) {
                    candles[candleCount].classList.add('blink');
                    candleCount++;
                } else clearInterval(interval);
            }, 38000); // every 35 seconds
        } else if (advent[day].title.includes('GOD JUL!')) {
            document.getElementById('day').querySelector('.verse').innerHTML = '';
            document.querySelector('.jul').classList.remove('hidden');
        } else {
            // txt = advent[day].verse[0] + ' (' + advent[day].verse[1] + ')';
            // if (document.getElementById('day').querySelector('.verse').innerHTML !== txt) {
            if (player == undefined || player.getVideoData()['video_id'] !== id) {
                i = 0;
                txt = advent[day].verse[0] + ' — ' + advent[day].verse[1] + '';
                document.getElementById('day').querySelector('.verse').innerHTML = '';
                clearTimeout(timeout2);
                clearTimeout(timeout);
                timeout2 = setTimeout(() => {
                    verseType();
                }, 3000);
            } else if (player.getVideoData()['video_id'] == id) verseType();
        }

        document.getElementById('back').classList.remove('hidden');
        document.getElementById('day').classList.remove('hidden');
        if (advent[day].start !== undefined) start = advent[day].start;
        if (advent[day].stop !== undefined) stop = advent[day].stop;
        if (advent[day].captions !== undefined) captions = true;
        else captions = false;
        if (tag == undefined) createEmbed();
        else if (player.getVideoData()['video_id'] !== id) player.loadVideoById(id);
        else player.playVideo();
    } else console.log('Bra forsøk!');
}


// const doorPass = [
//     {hint: 'Hallo :)', code: 1234}
// ]

const advent = [
    // https://www.youtube.com/embed/KDdwJMNEjBs
    {title: 'Little Drummer Boy', song: 'NzEX3QMuVPM', captions: true, verse: ['For et barn er oss født, en sønn er oss gitt. Herredømmet er på hans skulder, og han skal få navnet Under, Rådgiver, Veldig Gud, Evig Far, Fredsfyrste.', 'Jesaja 9:6']},
    {title: 'I Can Only Imagine', song: 'acwsBIl15zM', stop: 255, verse: ['Ånden selv vitner sammen med vår ånd at vi er Guds barn. Men er vi barn, da er vi også arvinger. Vi er Guds arvinger og Kristi medarvinger, så sant vi lider med ham, for at vi også skal herliggjøres med ham. For jeg er overbevist om at den nåværende tids lidelser ikke er for noe å regne mot den herlighet som skal åpenbares på oss.', 'Romerne 8:16-18']},
    {title: 'Christmas Caroling', song: 'rU7BCH9i-oY', verse: ['På sin kledning og på sin hofte har han et navn skrevet: Kongers konge og herrers herre.', 'Åpenbaringen 19:16']},
    {title: '"God With Us": A SHORT FILM', song: 'Ox0RSDtWlTk', start: 6, verse: ['Derfor skal Herren selv gi dere et tegn: Se, jomfruen skal bli med barn, hun skal føde en sønn og gi ham navnet Immanuel.', 'Jesaja 7:14']},
    {title: 'Is He Worthy?', song: '1pBeDoSlUnU', verse: ['Og jeg så en mektig engel som ropte med høy røst: Hvem er verdig til å åpne boken og bryte seglene på den? Og det var ingen i himmelen eller på jorden eller under jorden som kunne åpne boken eller se i den. Da gråt jeg sårt fordi ingen var funnet verdig til å åpne boken eller se i den. Men en av de eldste sier til meg: Gråt ikke! Se, løven av Judas stamme, Davids rot, har seiret. Han kan åpne boken og de sju seglene på den.', 'Åpenbaringen 5:2-5']}, // ??
    {title: '2. søndag i advent', song: 'EA0tJCaLAc8', stop: 95},
    {title: 'O Holy Night', song: 'g4fvMgNfN0I', verse: ['Det var noen gjetere der på stedet som var ute på marken og holdt nattevakt over flokken sin. Og se, en Herrens engel sto hos dem, og Herrens herlighet lyste om dem. Og de ble meget forferdet. Men engelen sa til dem: Frykt ikke! For se, jeg forkynner dere en stor glede - en glede for alt folket. I dag er det født dere en frelser, som er Messias, Herren - i Davids by. Og dette skal dere ha til tegn: Dere skal finne et barn som er svøpt og ligger i en krybbe. Og med ett var det sammen med engelen en himmelsk hærskare, som lovpriste Gud og sa: Ære være Gud i det høyeste, og fred på jorden, i mennesker Guds velbehag.', 'Lukas 2:8-14']},
    // {title: 'Oh Holy Night', song: 'pUh7xDO-8bE', verse: ['Det var noen gjetere der på stedet som var ute på marken og holdt nattevakt over flokken sin. Og se, en Herrens engel sto hos dem, og Herrens herlighet lyste om dem. Og de ble meget forferdet. Men engelen sa til dem: Frykt ikke! For se, jeg forkynner dere en stor glede - en glede for alt folket. I dag er det født dere en frelser, som er Messias, Herren - i Davids by. Og dette skal dere ha til tegn: Dere skal finne et barn som er svøpt og ligger i en krybbe. Og med ett var det sammen med engelen en himmelsk hærskare, som lovpriste Gud og sa: Ære være Gud i det høyeste, og fred på jorden, i mennesker Guds velbehag.', 'Lukas 2:8-14']},
    {title: 'O Come All Ye Faithful', song: 'XI2c9yptr4U', stop: 244, captions: true, verse: ['Men en kvist skal skyte fram av Isais stubb, og et skudd fra hans røtter skal bære frukt. Og Herrens Ånd skal hvile over ham - visdoms og forstands Ånd, råds og styrkes Ånd, den Ånd som gir kunnskap om Herren og frykt for ham.', 'Jesaja 11:1-2']},
    // {title: 'O Come, All Ye Faithful', song: 'CljN1YIxHiI', verse: ['Men en kvist skal skyte fram av Isais stubb, og et skudd fra hans røtter skal bære frukt. Og Herrens Ånd skal hvile over ham - visdoms og forstands Ånd, råds og styrkes Ånd, den Ånd som gir kunnskap om Herren og frykt for ham.', 'Jesaja 11:1-2']},
    {title: 'Joy to the World', song: '1nziWgvOPj4', stop: 156, verse: ['Se, Gud er min frelse! Jeg er trygg og frykter ikke. For Herren Herren er min styrke og lovsang. Han ble meg til frelse. Dere skal øse vann med glede av frelsens kilder.', 'Jesaja 12:2-3']},
    // {title: 'Joy to the World', song: 'VDmIddF7DfQ', verse: ['', '']},
    // {title: 'Joy to the World', song: 'DtrnuG5wZ-Y', verse: ['', '']},
    // {title: 'Joy Unto The World', song: 'Nu018_9wF7k', verse: ['', '']},
    {title: 'All Is Well', song: '-NB856NUKm0', stop: 234, verse: ['Men han ble såret for våre overtredelser, knust for våre misgjerninger. Straffen lå på ham, for at vi skulle ha fred, og ved hans sår har vi fått legedom.', 'Jesaja 53:5']},
    {title: 'Go Tell It On The Mountain', song: 'C2Sf-IuP4mY', verse: ['For vi kan ikke la være å tale om det som vi har sett og hørt.', 'Apostlenes gjerninger 4:20']},
    {title: 'Born Is The King (It\'s Christmas)', song: 'Qf6OoAZbAQg', captions: true, verse: ['Gled dere i Herren alltid! Igjen vil jeg si: Gled dere!', 'Filipperne 4:4']},
    {title: '3. søndag i advent', song: 'EA0tJCaLAc8', stop: 143},
    // {title: 'Gloria/Angels We Have Heard on High', song: 'i6wsLm6cZ1E', verse: ['', '']}, // !!
    {title: 'Oh, Come, All Ye Faithful', song: 'Wjl-KIGrOWA', stop: 258, verse: ['De gikk inn i huset, og fikk se barnet med Maria, dets mor, og de falt ned og tilba det. Så åpnet de skrinene sine og bar fram gaver til barnet: gull, røkelse og myrra.', 'Matteus 2:11']},
    {title: 'I Heard the Bells on Christmas Day', song: 'ehMEsgEGFdQ', captions: true, verse: ['Igjen talte Jesus til dem og sa: Jeg er verdens lys! Den som følger meg, skal ikke vandre i mørket, men ha livets lys.', 'Johannes 8:12']},
    {title: 'Mary did you know?', song: 'uaRpeMT1tjQ', verse: ['Se, du skal bli med barn og føde en sønn, og du skal gi ham navnet Jesus. Han skal være stor og kalles Den Høyestes Sønn. Gud Herren skal gi ham hans far Davids trone, og han skal være konge over Jakobs hus til evig tid, og det skal ikke være ende på hans kongedømme.', 'Lukas 1:31-33']},
    // Glem ikke gjestfrihet! For ved den har noen hatt engler til gjester uten å vite det. // Hebreerne 13:2
    {title: 'An Angel Paid For Her Groceries', song: 'ZLUh_FK9mJM', verse: ['Se, jeg gjør noe nytt! Nå skal det spire fram. Skal dere ikke kjenne det? Ja, jeg vil gjøre vei i ørkenen, strømmer i ødemarken.', 'Jesaja 43:19']},
    {title: 'Carol of the Bells', song: 'SQadcm_dwEM', captions: true, verse: ['Deretter hørte jeg likesom en mektig lyd av en stor skare i himmelen, som sa: Halleluja! Frelsen og æren og makten tilhører vår Gud!', 'Åpenbaringen 19:1']},
    // {title: 'Nordnorsk julesalme', song: 'BBRad4coZm8', verse: ['', '']}, // PNXhelIJ6co
    {title: 'When Love Was Born', song: '_FeV9_XExSg', stop: 201, captions: true, verse: ['Det sanne lys, som opplyser hvert menneske, var i ferd med å komme til verden. Han var i verden, og verden er blitt til ved ham, og verden kjente ham ikke. Han kom til sitt eget, og hans egne tok ikke imot ham. Men alle dem som tok imot ham, dem ga han rett til å bli Guds barn, de som tror på hans navn. De er ikke født av blod, heller ikke av kjøds vilje, heller ikke av manns vilje, men av Gud. Og Ordet ble kjød og tok bolig iblant oss. Og vi så hans herlighet, en herlighet som den en enbåren Sønn har fra sin Far, full av nåde og sannhet.', 'Johannes 1:9-14']},
    {title: '4. søndag i advent', song: 'EA0tJCaLAc8'},
    // {title: 'The Hope of Christmas', song: '27rMrWqJsNA', verse: ['', '']},
    // {title: 'The Best Christmas Song I\'ve Ever Heard. It Will Give You Chills.', song: 'v5mdybeyLVc', verse: ['Han la ut for dem og viste at Messias måtte lide og stå opp fra de døde, og sa: Den Jesus som jeg forkynner for dere, han er Messias.', 'Apostlenes gjerninger 17:3']},
    {title: 'The Best Christmas Song I\'ve Ever Heard. It Will Give You Chills.', song: 'v5mdybeyLVc', verse: ['Herren Herrens Ånd er over meg, fordi Herren har salvet meg til å forkynne et godt budskap for de fattige. Han har sendt meg til å forbinde dem som har et nedbrutt hjerte, til å utrope frihet for de fangne og frigjørelse for de bundne', 'Jesaja 61:1']},
    {title: 'A Christmas Monologue', song: 'jNCTWqDMijk', verse: ['I begynnelsen var Ordet, og Ordet var hos Gud, og Ordet var Gud. Han var i begynnelsen hos Gud. Alt er blitt til ved ham, og uten ham er ikke noe blitt til av alt som er blitt til. I ham var liv, og livet var menneskenes lys.', 'Johannes 1:1-4']},
    {title: 'Silent Night', song: '093_hkkbK38', captions: true, verse: ['Og det skjedde i de dager at det gikk ut et bud fra keiser Augustus at all verden skulle skrives inn i manntall. Dette var den første innskrivning, i den tid Kvirinius var landshøvding i Syria. Og alle gikk for å la seg innskrive, hver til sin by. Også Josef dro opp fra Galilea, fra byen Nasaret, til Judea, til Davids by, som heter Betlehem, fordi han var av Davids hus og ætt, for å la seg innskrive sammen med Maria, sin forlovede, som var med barn. Men det skjedde mens de var der, da kom tiden da hun skulle føde. Og hun fødte sin sønn, den førstefødte. Hun svøpte ham og la ham i en krybbe, fordi det ikke var rom for dem i herberget. Det var noen gjetere der på stedet som var ute på marken og holdt nattevakt over flokken sin. Og se, en Herrens engel sto hos dem, og Herrens herlighet lyste om dem. Og de ble meget forferdet. Men engelen sa til dem: Frykt ikke! For se, jeg forkynner dere en stor glede - en glede for alt folket. I dag er det født dere en frelser, som er Messias, Herren - i Davids by. Og dette skal dere ha til tegn: Dere skal finne et barn som er svøpt og ligger i en krybbe. Og med ett var det sammen med engelen en himmelsk hærskare, som lovpriste Gud og sa: Ære være Gud i det høyeste, og fred på jorden, i mennesker Guds velbehag. Og det skjedde, da englene var fart opp fra dem til himmelen, da sa gjeterne til hverandre: La oss nå gå rett til Betlehem og se dette som har skjedd, det som Herren har kunngjort oss. De skyndte seg av sted, og de fant både Maria og Josef, og barnet som lå i krybben. Da de hadde sett det, fortalte de om det ordet som var talt til dem om dette barnet. Og alle som hørte det, undret seg over det som ble sagt dem av gjeterne. Men Maria tok vare på alle disse ordene og grunnet på dem i sitt hjerte. Gjeterne vendte så tilbake, og de priste og lovet Gud for alt det de hadde hørt og sett, slik det var blitt sagt dem.', 'Lukas 2:1-20']},
    {title: 'GOD JUL! The Chosen Special Christmas Episode', song: 'paOjgZZDads'},
]




// YouTube embed

var tag;
// setTimeout(() => {
//     if (tag == undefined) createEmbed();
// }, 1000);
function createEmbed() {
    // 2. This code loads the IFrame Player API code asynchronously.
    tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player, start, stop = null, captions = false;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '450', // 315
        width: '800', // 560
        // 800 * 0,5625 = 450
        videoId: id,
        playerVars: {
            autoplay: 1,
            start: start
        },
        events: {
        // 'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
// function onPlayerReady(event) {
//     event.target.playVideo();
// }

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false, stopPlayTimer, volumeTimer;
function onPlayerStateChange(event) {
    var time, rate, remainingTime;
    clearTimeout(stopPlayTimer);
    clearTimeout(volumeTimer);
    clearInterval(volumeInterval);
    player.setVolume(100);
    document.getElementById('player').removeAttribute('title');
    if (captions && event.data == YT.PlayerState.PLAYING) {
        player.loadModule("captions");  //Works for html5 ignored by AS3
        // player.loadModule("cc");  //Works for AS3 ignored by html5
        player.setOption("captions", "track", {"languageCode": "en"});
    } else if (event.data == YT.PlayerState.PLAYING) player.unloadModule("captions");
    if (stop !== null && event.data == YT.PlayerState.PLAYING) {
        time = player.getCurrentTime();
        // Add .4 of a second to the time in case it's close to the current time
        // (The API kept returning ~9.7 when hitting play after stopping at 10s)
        if (time + .4 < stop) {
            rate = player.getPlaybackRate();
            remainingTime = (stop - time) / rate;
            stopPlayTimer = setTimeout(pauseVideo, remainingTime * 1000);
            if (remainingTime - 9 > 0) volumeTimer = setTimeout(fadeVolume, (remainingTime - 10) * 1000);
            else fadeVolume();
        } else {
            // player.pauseVideo();
            player.seekTo(0);
        }
    }


    // if (event.data == YT.PlayerState.PLAYING && !done) {
    //     setTimeout(stopVideo, 6000);
    //     done = true;
    // }
    if (event.data == YT.PlayerState.ENDED) {
        if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
            document.exitFullscreen();
        }
    }
}
function pauseVideo() {
    player.pauseVideo();
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
        document.exitFullscreen();
    }
}
var volumeInterval;
function fadeVolume() {
    // fade out volume
    let volume = 100;
    volumeInterval = setInterval(() => {
        if (volume == 0) {
            clearInterval(volumeInterval);
            player.setVolume(100);
        } else {
            volume--;
            player.setVolume(volume);
        }
    }, 100);
}