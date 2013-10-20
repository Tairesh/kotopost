/*global chrome, alert, XMLHttpRequest, FormData, document, window, setTimeout */

function thereIsAnError(textToShow, errorToShow, imageUrl) {
    "use strict";

    document.getElementById('wrap').innerHTML = '<p></p><br/><br/><center><h1>Wow! Some error arrived!</h1></center><br/><br/><p>' + textToShow + '</p><br/><br/><p>' + errorToShow + '</p><p>' + imageUrl + '</p>';
}

/**
 * Main function to upload an image
 *
 * @param  {string} imageUrl URL of the uploaded image
 * @param  {string} fileName Name of the new uploaded file on VK documents
 * @param  {string} accToken Access token with vk authentication permissions
 */
 function upload(imageUrl, fileName, accToken, pending) {
    "use strict";
    
    var group_id = 41647208,
		album_id = 180977137;
	var time_now = Math.round(new Date().getTime()/1000);
	var publish_date = time_now;
	
	if(pending !== undefined) {
		// alert(pending);

        var WallGet = new XMLHttpRequest();

        WallGet.open('GET', 'https://api.vk.com/method/wall.get?owner_id=-'+group_id+'&count=10&filter=postponed&access_token=' + accToken);

        WallGet.onload = function () {

            var answer = JSON.parse(WallGet.response); console.log(answer);
            var max_time = time_now;
            if (answer.response[0]) {
            
            for (var i = 0; i < answer.response.length; i++) {
				if (answer.response[i].date > max_time) max_time = answer.response[i].date;
			} 
			}
			publish_date = max_time + 10*60;
			
            
		}
		WallGet.send();
		
	} 
	console.log(publish_date);
    var uploadHttpRequest = new XMLHttpRequest();

    uploadHttpRequest.onload = function () {

        var documentUploadServer = new XMLHttpRequest(),
            requestFormData,
            documentUploadRequest;

        documentUploadServer.open('GET', 'https://api.vk.com/method/photos.getUploadServer?group_id='+group_id+'&album_id='+album_id+'&access_token=' + accToken);

        documentUploadServer.onload = function () {

            var answer = JSON.parse(documentUploadServer.response);

            if (answer.error !== undefined) {
                chrome.storage.local.remove('vkaccess_token');

                document.getElementById('wrap').innerHTML = '<p></p><br/><br/><center><h1>Ops. Something went wrong. Please try again.</h1></center><br/>';
                setTimeout(function () { window.close(); }, 3000);

                return;
            }

            if (answer.response.upload_url === undefined) {
                thereIsAnError('documentUploadServer response problem', answer, imageUrl);

                return;
            }

            requestFormData       = new FormData();
            documentUploadRequest = new XMLHttpRequest();

            requestFormData.append("photo", uploadHttpRequest.response, fileName);

            documentUploadRequest.open('POST', answer.response.upload_url, true);

            documentUploadRequest.onload = function () {

                var answer = JSON.parse(documentUploadRequest.response),
                    documentSaveRequest;
                    //console.log(answer);

                if (answer.photo === "[]") {
                    thereIsAnError('Upload blob problem response problem', answer, imageUrl);

                    return;
                }
var capt_tags = ['%23instagram','%23games','%23imagine','%23swag','%23miss','%23cat','%23art','%23music','%23twitter','%23photo','%23юмор','%23onedirection','%23selenagomez','%23love','%23girls','%23girl','%23demilovato','%23supernatural','%23people','%23dubstep','%23упрт','%23sex','%23lol','%23fashion','%23style','%23музыка','%23mileycyrus','%23jokes','%23опрос','%231d','%23fun','%23like','%23summer','%23sexy','%23play','%23video','%23прикол','%23vk','%23humor','%23фото','%23аниме','%23россия','%23rock','%23comments','%23anime','%23mdk','%23movie','%23car','%23hiphop','%23life','%23rap','%23любовь','%23harrystyles','%23авто','%23spn','%23позитив','%23fuck','%23beautiful','%23jensenackles','%23house','%23party','%23девушки','%23tattoo','%23борщ','%23look','%23баш','%232013','%23смешно','%23nature','%23секс','%23cute','%23android','%23сиськи','%23niallhoran','%23счастье','%23sea','%23body','%23biker','%23лол','%23iphone','%23баян','%23game','%23тп','%23city','%23flowers','%23bass','%23jaredleto','%23sun','%23пленка','%23zaynmalik','%23smile','%23beauty','%23funny','%23лето','%23omg','%23followback','%23арт','%23electronic','%23dance','%23hot','%23food','%23mishacollins','%23jaredpadalecki','%23nike','%23жизнь','%23red','%23машины','%23friends','%23apple','%23relax','%23москва','%23радость','%23dog','%23johnnydepp','%23hair','%23travel','%23friend','%2318+','%23troll','%23збс','%23boys','%23live','%23black','%23smoke','%23я','%23deep','%23sport','%23morning','%23best','%23photooftheday','%23my','%23foto','%23louistomlinson','%23cool','%23sweet','%23кароче','%23ios','%233d','%23стиль','%23happy','%23дно','%23blue','%23me','%23facebook','%23photos','%23disney','%23fail','%23america','%23taylorswift','%23явсесказал','%23man','%23показалось','%23эротика','%23лайк','%23boy','%23мода','%23путин','%23model','%23dota','%23челябинск','%23дети','%23cats','%23liampayne','%23одежда','%23pink','%23sky','%23ocean','%23paris','%23deanwinchester','%23nice','%23night','%23кино','%23omnomnom','%23quotes','%23amazing','%23друзья','%23swagg','%23followme','%23pop','%23believetour','%23приколы','%23alternative','%23красота','%23books','%23comment','%23goodmorning','%23film','%23кот','%23katyperry','%23няша','%23moscow','%23happybirthday','%23you','%23работа','%23space','%23winter','%23shoes','%23орленок','%23google','%23tweegram','%23quote','%23glee','%23selena','%23wtf','%23рэп','%23pretty','%23color','%23official','%23world','%23illustration','%23ночь','%23goodnight','%23девушка','%23twilight','%23воронеж','%23awesome','%23photography','%23kiss','%23дневникивампира','%23green','%23beach','%23animal','%23im','%23old','%23pictures','%23футбол','%23design','%23follow','%23good','%23forest','%23cars','%23legs','%23дженсенэклз','%23lips','%23london','%23hp','%23мишаколлинз','%23здоровье','%23весна','%23tiger','%23family','%23newyear','%23sunset','%23ask','%23adele','%23хуй','%23chocolate','%23arianagrande','%23rt','%23flower','%23dope','%23page','%23мем','%23icecream','%2330','%23картинки','%23light','%23football','%23мимими','%23утро','%23казань','%23water','%23graffiti','%23harry','%23white','%23webstagram','%23instamood','%23auto','%23eyes','%23еда','%23forever','%23tbt','%23follower','%23питер','%23likeback','%23мило','%23самара','%23животные','%23swag','%23shorts','%23секси','%23demi','%23dress','%23followers','%23youtube','%23киска','%23попка','%23money','%23gta','%23animals','%23екатеринбург','%23реп','%23spring','%23blonde','%23samsung','%23ny','%23рок','%23vans','%23милая','%23porno','%23саратов','%23волгоград','%23деньги','%23джаредпадалеки','%23streetart','%23drink','%23minimal','%23coffee','%23orange','%23club','%23респект','%23wedding','%23пермь','%23picture','%23смех','%23online','%23win','%23street','%23believe','%23омск','%23interior','%23accessories','%23book','%23clothes','%23igers','%23piano','%23eat','%23фотография','%23котэ','%23niall','%23fresh','%23сегодня','%23instadaily','%23movies','%23школа','%23meow','%23зима','%23pages','%23beats','%23yellow','%23дом','%23guy','%23male','%23guys','%23упоротый','%23picoftheday','%23fox','%23ножки','%23miley','%23insta','%23today','%23iphoneonly','%23порно','%23краснодар','%23true','%23fantasy','%23tasty','%23caradelevingne','%23nofilter','%23новосибирск','%23soul','%23ппц','%23home','%23tech','%23день','%23followall','%23instagramhub','%23purple','%23epic','%23iphone5','%23fire','%23punk','%23gtav','%23wolf','%23cinema','%23hunk','%23f4f','%23la','%23красиво','%23jeans','%23adamlevine','%23pleasefollowme','%23followbackteam','%23zayn','%23люди','%23work','%23gorgeous','%23pizza','%23sleep','%23отдых','%23creative','%23converse','%23skylovers','%23pleasefollow','%23dogs','%23улыбка','%23gta5','%2347','%23nails','%23arts','%23followforfollow','%23windows','%23hollywood','%23star','%23directioner','%23earth','%23алкоголь','%23hands','%23dark','%23baby','%23statigram','%23cherry','%23brunette','%23разное','%23вода','%23boom','%23skate','%23horse','%23liam','%23guitar','%23berries','%23road','%23ring','%23люблю','%23tea','%23roses','%23dakotafanning','%23moon','%23cs','%23makeup','%23tulips','%23котики','%23мама','%23air','%23kids','%23новыйгод','%23selenators','%23cake','%23семья','%23dessert','%23chill','%23planet','%23анал','%23парни','%23studio','%23sushi','%23children','%23платье','%23имхо','%23dean','%23simpsons','%23жесть','%23отношения','%23ballet','%23birthday','%23airplane','%23украшения','%23солнце','%23blackandwhite','%23красноярск','%23steam','%23jimcarrey','%23снег','%23минет','%23б','%23wall','%23fruit','%23философия','%23fans','%23nba','%23yes','%23gallery','%23rain','%23evening','%23job','%23ебтп_развод','%23город','%23river','%23fly','%23clothing','%23pic','%23brown','%23films','%23textgram','%23turkey','%23painting','%23krokodil','%23обж_фото','%23франция','%23remix','%23ябвдул','%23freedom','%23sneakers','%23birds','%23tree','%23сон','%23comedy','%23пиздец','%23future','%23браслет','%23rainbow','%23staystrong','%23chrisbrown','%23watermelon','%23жара','%23развод','%23school','%23sam','%23дружба','%23view','%23day','%23deer','%23котаны','%23kurtcobain','%23candy','%23а','%23young','%23собака','%23glasses','%23дабстеп','%23yolo','%23crazy','%23dmc','%23волосы','%23now','%23lights','%23drawing','%23banana','%23шлюха','%23motivation','%23haha','%23bike','%23кофе','%23оффтоп','%23violet','%23impala','%23hipster','%23метро','%23lmfao','%23деймон','%23супер','%23ты','%23папа','%23цвет','%23вк','%23butterflies','%23вечер','%23зомби','%23joke','%23вдул','%23хаха','%23balloons','%23new2013','%23colour','%23memories','%23paint','%23architecture','%23start','%23jellyfish','%23geek','%23huf','%23justin','%23коты','%23выпечка','%23abstract','%23осень','%23lovely','%23hannahmontana','%23малыш','%23дождь','%23skyline','%23letters','%23инет','%23романтика','%23corymonteith','%23cosmos','%23spoiler','%23story','%23диета','%23breakfast','%23глаза','%23thexx','%23fish','%23картинка','%23business','%23нежность','%23заработок','%23phone','%23закат','%23chips','%23легкаянаркомания','%23важно','%23bff','%23camera','%23обработка','%23авария','%23бижутерия','%23упорот','%23videos','%23женщина','%23no','%23emma','%23сучка','%23небо','%23words','%23belieber','%23дуров','%23beat','%23вкусно','%23yummy','%23skateboarding','%23heels','%23rnb','%23drinks','%23training','%23путешествие','%23лох','%23tagsforlikes','%23машина','%23durov','%23bicycle','%23ржунимагу','%23monster','%23tflers','%23завтрак','%23backpacks','%23внимание','%23peace','%23mimi','%23dreamcatcher','%23wowp','%23basketball','%23няшка','%23workout','%23wine','%23tattoos','%23guf','%23суббота','%23throwbackthursday','%23minimalism','%23summertime','%23bw','%23наркотики','%23моя','%23это','%23sunshine','%23хентай','%23bday','%23manicure','%23рассвет','%23faces','%23pain','%23ivandorn','%23автомобиль','%23sunny','%23фотоног','%23gomez','%23text','%23watches','%23together','%23waterfall','%23drive','%23тян','%23свэг','%23мороженое','%23pics','%23horses','%23country','%23портрет','%23катя','%23bf','%23cocktail','%23сука','%23пейзаж','%23ахаха','%23doors','%23рак','%23розовый','%23merrychristmas','%23мозг','%23как','%23creepy','%23trip','%23library','%23popcorn','%23actor','%23macaroons','%23read','%23жажда','%23couple','%23подруга','%23draw','%23объявление','%23passion','%23кошка','%23cloud','%23holiday','%23bridge','%23all_shots','%23portrait','%23clouds','%23drake','%23lovatics','%23мужик','%23ветераны','%23god','%23sketch','%23напитки','%23action','%23pendants','%23ac_dc','%23earrings','%23neversaynever','%23wet','%23jewelry','%23following','%23ребенок','%23lilo','%23eggs','%23delicious','%23пиар','%23crystal','%23lanterns','%23блог','%23picnic','%23чб','%23silence','%23tb','%23skateboard','%23pony','%23bed','%23котята','%23taylor','%23sunday','%23боян','%23пиво','%23яблоко','%23iphone4','%23рф','%23кушатьподано','%23fifa','%23лук','%23фейк','%23панда','%23саша','%23directioners','%23подруги','%23nail','%23goodday','%23sisters','%23fireworks','%23tenderness','%23ноги','%23run','%23child','%23телефон','%23дура','%23macro','%23shopping','%23эмоции','%23борода','%23selenator','%23халява','%23bro','%23lemonade','%23friendship','%23sel','%23шоу','%23мы','%23елка','%23iphonesia','%23ресторан','%23kitty','%23igaddict','%23tshirt','%23rest','%23brothers','%23speed','%23back','%23эпикфейл','%23детка','%23bar','%23weather','%23nailart','%23beer','%23bottom','%23десерт','%23bubbles','%23ава','%23screen','%2320likes','%23instagramers','%23catwang','%23веселье','%23piercing','%23ariana','%23др','%23спать','%23outfit','%23gift','%23comfort','%23черный','%23bright','%23обед','%23бля','%23просто','%23золото','%23pineapple','%23срочно','%23throwback','%23rabbits','%23bestfriends','%23puppies','%23лис','%23kid','%23wave','%23trick','%23wakeup','%23artwork','%23foodporn','%23mobile','%23blizzard','%23подпишись','%23бабушка','%23xoxo','%23technology','%23handsome','%23туса','%23ахуенныерецепты','%23waves','%23красотка','%23decoration','%23crystal_castles','%23instahub','%23хор','%23furry','%23orly','%23seaside','%23warm','%23позор','%23swing','%23funtime','%23sister','%23лайки','%23конопля','%23bestfriend','%23улыбнуло','%23fingers','%23little','%23гта','%23styles','%23swimsuit','%23glam','%23focus','%23goodtime','%23пикап','%23ужин','%23yum','%23chris','%23санктпетербург','%23енот','%23office','%23parrots','%23reading','%23mind','%23likes','%23заебись','%23gifts','%23блять','%23mom','%23маша','%23ололо','%23ок','%23goodtimes','%23glass','%23макро','%23киса','%23трусики','%23фш','%23ахахах','%23геи','%23пати','%23кмп','%23добавь','%23ananas','%23облака','%23гей','%23пес','%23пёс','%23вп','%23gamer','%23collarbone','%23urban','%23хуйня','%23ears','%23цвета','%23swim','%23xmas','%23copybook','%23colorful','%23настя','%23голубой','%23красивая','%23excited','%23телки','%23нравится','%23iphonegraphy','%23gadget','%23moment','%23маразм','%23cups','%23коктейль','%23check_you_развод','%23so','%23hugs','%23судьба','%23embient','%23brother','%23chaplet','%23quoteoftheday','%23awake','%23repeat','%23dinner','%23прочее','%23hairstyles','%23romance','%23sand','%23cassete','%23monochrome','%23мыло','%23таз','%23стерва','%23неприкасаемые','%23см','%23фен','%23русскийрэп','%23тазы','%23graphic','%23dvd','%23сергей','%23юля','%23swimming','%23второе','%23rofl','%23музычка','%23perry','%23ilife','%23instagraff','%23santa','%23umbrella','%23мужики','%23lake','%23elves','%23лайкни','%23can','%23textbooks','%23cities','%23stories','%23babies','%23mother','%23александр','%23nighttime','%23хованский','%23даша','%23lolita','%23банан','%23колеса','%23пизда','%23out','%23ахуеть','%23момент','%23tired','%23field','%23word','%23paper','%23omnom','%23lunch','%23rider','%23эро','%23aquarium','%23детская_мода','%23catvalentine','%23ebbazingmark','%23nerd','%23ball','%23dad','%23лед','%23домик','%23winning','%23фотоаппарат','%23вписка','%23охуенные_рецепты_ебтп','%23deviant','%23snacks','%23coral','%23katy','%23мульт','%23лойс','%23samynaceri','%23vacation','%23very_cruel','%23качек','%23sports','%23presents','%23еб','%23hazza','%23лолстафф_развод','%23bat','%23amc','%23exotic','%23стас','%23носки','%23fashionably','%23gaming','%23born','%23jj_forum','%23moonlight','%23сын','%23instalove','%23паша','%23дебил','%23device','%23socialmatic','%23nailpolish','%23bored','%23лента','%23турник','%23пидоры','%23азаза','%23motorcycle','%23света','%23мать','%23bug','%23смайлик','%23students','%23дурак','%23soccer','%23pencil','%23sleeping','%23wake','%23бугага','%23кукла','%23епт','%23newyearseve','%23fcsm','%23sleepy','%23desserts','%23алексей','%23sketchbook','%23cocktails','%23father','%23знаки','%23stickerart','%23christmastree','%23кола','%23laugh','%23пидор','%23качок','%23круть','%23ebashit','%23scary','%23literature','%23ледянойдождь','%23порусски','%23gf','%23tropical','%23ready','%23артем','%23блядь','%23loveher','%23вольнов','%23заяц','%23hack','%23киски','%23кисы','%23ояебу','%23вкусное','%23bugs','%23спартакмосква','%23нуб','%23комп','%23оля','%23ponies','%23собачка','%23hdr','%23назадвбудущее','%23masterpiece','%23ржу','%23kindle','%23бугагашеньки','%23холодильник','%23еблан','%23проститутка','%23hairstyle','%23wildlife','%23вечернее','%23sis','%23перерыв','%23аллергия','%23sunlight','%23никита','%23theatre','%23гли','%23check_you','%23familytime','%23early','%23pen','%23reflection','%23smartphone','%23graphics','%23happyholidays','%23candle','%23geometry','%23jockey','%23пылесос','%23проститутки','%23фотокарточка','%23джираффе','%23lovethem','%23daytime','%23goodweather','%23знак','%23первое','%23saltwater','%23lovehim','%23followhim','%23sleeptime','%23floral','%23like4like','%23chilling','%23бухие','%23costume','%23blueskies','%23videogames','%23побережье','%23кекеке','%23нихуясебе','%23лимит','%23дибил','%23поза','%23macrogardener','%23анимэ','%23ебля','%23марко','%23horseshow','%23follow4follow','%23small','%23gettingready','%23insect','%23горизонт','%23азазаза','%23goodfriends','%23rosa','%23днюха','%23йа','%23bedtime','%23santaclaus','%23hilarious','%23mane','%23вася','%23besties','%23андройд','%23insects','%23отхуярил','%23чмо','%23riders','%23gadgets','%23goals','%23beautifulday','%23playing','%23monotone','%23добавляй','%23дедушка','%23vise','%23хром','%23instacat','%23artoftheday','%23comp','%23жежешечка','%23пустьговорят','%23hairideas','%23fishtank','%23nightynight','%23сладость','%23хуйло','%23riding','%23knockout','%23мокрые','%23fam','%23бложек','%23зерно','%23наебали','%23спиздил','%23тесто','%23аппетит','%23чочо','%23jolly','%23гандон','%23аффтар','%23моветонно','%23lovecats','%23вхлам','%23earlybird','%23instagramcats','%23вата','%23plants','%23instalike','%23closeup','%23cloudy','%23сынок','%23мокрая','%23creature','%23малышок','%23instanature','%23reef','%23farm','%23sleepyhead','%23мила','%23рога','%23reader','%23creatures','%23horseshoe','%23wakingup','%23skies','%23kik','%23refreshed','%23goingout','%23леха','%23клава','%23aquaria','%23instasunny','%23бокал','%23catlover','%23ilovemyhorse','%23tistheseason','%23throwbackthursdays','%23спартакчемпион','%23instacool','%23instasun','%23обрыгались','%23эйпл','%23красавчег','%23мокрый','%23сережа','%23ilovemycat','%23passout','%23catoftheday','%23horsestagram','%23instagoodnight','%23bestsong','%23димон','%23freshwater','%23nightowl','%23birthdaycake','%23онотоле','%23instahorses','%23instafood','%23clearsky','%23винда','%23horses_of_instagram','%23gallop','%23knockedout','%23carols','%23жаба','%23lookup','%23macro_creature_feature','%23nature_shooters','%23instacloud','%23instamorning','%23срать','%23hdrart','%23clearskies','%23brightsun','%23lovekittens','%23tropicalfish','%23watertank','%23sluggish','%23blossom','%23soldusk','%23instafish','%23бисквит','%23horsesofinstagram','%23babyhorse','%23hungry','%23загугли','%23какбэ','%23dressmake_up','%23likeforlike','%23teacher','%23телочка','%23движок','%23funnypictures','%23серфить','%23автар','%23funtimes','%23акк','%23fishporn','%23твою','%23убежал','%23сидоджи','%23зафолловить','%23reeftank','%23pumpkin','%23железнодорожный','%23sunnyday','%23наебка','%23choreography','%23глазурь','%23превед','%23mrsclaus','%23пиздилки','%23гуглить','%23комочек','%23креведко','%23фтопку','%23эпическийфейк','%23instaparty','%23composition','%23конфетка','%23яблок','%23загуглить','%23охохо','%23яебу','%23адынадын','%23постить','%23сайн-ап','%23сетевуха','%23юзер','%23appitme','%23foodgasm','%23вхламину','%23зачот','%23кликать','%23питух','%23в_друзья','%23вконтачивать','%23емейл','%23зафрендить','%23манда','%23sopretty','%23запоцать','%23зачотно','%23ебаться','%23френдить','%23шарить','%23запостить','%23чатицца','%23thesun','%23плюсмнога','%23стартапиться','%23юзать','%23симпатяжка','%23тазик','%23ics','%23jellybean','%23минута','%23stencil','%23откомментить','%23отретвитить','%23years','%23ебутся','%23паралон','%23instafashion','%23копыта','%23падла','%23срут','%23фрион','%23балбес','%23kikit','%23еб_твою_мать','%23foods','%23seashore','%23petal','%23шалавы','%23маринка','%23shellsthekooks','%23kikmessenger','%23bnw','%23newyearsresolution','%23louistomlinsonfacts','%23instafollow','%23snapshot','%23mountainsroom','%23shore','%23hdroftheday','%23жжотжжошь','%23хата','%23мандавошка','%23мандавошки','%23отпетушили','%23all_sunsets','%23wallporn','%23streetarteverywhere','%23в_дузья','%23igersbnw','%23exposure','%23eating','%23classmates','%23tiny','%23hdr_edits','%23instablackandwhite','%23зомбиняша']
var caption = '%23cats%23cat%23kitten%23kittens%23коты%23кот%23котята%23котенок%23котэ%23кошка%23няшки%23няшка%23няша';
for (var i = 0; i < 30; i++) {
	var c = Math.round(Math.random()*(capt_tags.length-1));
caption += capt_tags[c];
capt_tags.splice(c,1);
}
//console.log(caption);

                documentSaveRequest = new XMLHttpRequest();
var url = 'https://api.vk.com/method/photos.save?group_id='+group_id+'&album_id='+album_id+'&hash='+answer.hash+'&photos_list=' + answer.photos_list + '&server='+answer.server+'&caption='+caption+'&access_token=' + accToken;
//console.log(url);
                documentSaveRequest.open('GET', url);

                documentSaveRequest.onload = function () {

                    var answer = JSON.parse(documentSaveRequest.response);
				//console.log(answer);
                    if (answer.response[0] === undefined) {
                        thereIsAnError('documentSaveRequest - no file in response', answer, imageUrl);

                        return;
                    }
                    
                    documentSaveRequest = new XMLHttpRequest();

var url = 'https://api.vk.com/method/wall.post?owner_id=-'+group_id+'&from_group=1&attachments=photo' + answer.response[0].owner_id+'_'+answer.response[0].pid + '&access_token=' + accToken;

if(pending !== undefined) url += '&publish_date='+publish_date;

//console.log(url);
                documentSaveRequest.open('GET', url);

                documentSaveRequest.onload = function () {

                    var answer = JSON.parse(documentSaveRequest.response);
//console.log(answer);
                    if (answer.response.post_id === undefined) {
                        thereIsAnError('documentSaveRequest - no file in response', answer, imageUrl);

                        return;
                    }

                    document.getElementById('wrap').innerHTML = '<p></p><br/><br/><center><h1>Successfully uploaded!</h1></center><br/>';
                    setTimeout(function () { window.close(); }, 300);
                };

                documentSaveRequest.send();

                };

                documentSaveRequest.send();
            };

            documentUploadRequest.send(requestFormData);
        };

        documentUploadServer.send();
    };

    uploadHttpRequest.responseType = 'blob';
    uploadHttpRequest.open('GET', imageUrl);
    uploadHttpRequest.send();
}



/**
 * Add a listener for DOMContentLoaded event
 *
 * @param {string}   Event name
 * @param {function} Event handler
 */
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    var params   = window.location.hash.substring(1).split('&'),
        imageUrl = null,
        filename,
        imageName;

    if (params === undefined || params.length ===  undefined || params.length < 2) {
        thereIsAnError('Parsing image url', 'params || params.length != 2', imageUrl);
        return;
    }

    filename = params[0].split('/');

    if (filename.length === undefined || filename.length === 0) {
        thereIsAnError('Getting image filename', 'filename.length <= 0', imageUrl);
        return;
    }

    imageUrl = params[0];

    imageName = filename[filename.length - 1];

    if (imageName.indexOf('?') > -1) {
        imageName = imageName.slice(0, imageName.indexOf('?'));
    }

    if (imageName.indexOf('#') > -1) {
        imageName = imageName.slice(0, imageName.indexOf('#'));
    }

    if (imageName.indexOf('&') > -1) {
        imageName = imageName.slice(0, imageName.indexOf('&'));
    }

    upload(imageUrl, imageName, params[1], params[2]);
});

