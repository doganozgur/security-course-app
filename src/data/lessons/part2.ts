import { LessonBook } from '../../types';

export const LESSONS_PART_2: LessonBook[] = [
  {
    id: 'iletisim',
    title: 'Etkili İletişim',
    shortTitle: 'Etkili İletişim',
    subtitle: 'İletişim öğeleri, beden dili, empati, iletişim engelleri ve öfke kontrolü',
    emoji: '🗣️',
    color: '#06B6D4',
    examQuestionCount: 12,
    chapters: [
      {
        id: 'iletisim-1',
        chapterNumber: 1,
        title: 'İletişim Süreci, Öğeleri ve Türleri',
        summary: 'Kaynak, mesaj, kanal, alıcı, dönüt ve sözlü/sözsüz/yazılı iletişim.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'İletişimin 5 Temel Öğesi',
            paragraphs: [
              'İletişim; duygu, düşünce, bilgi ve tutumların kişi veya gruplar arasında karşılıklı olarak paylaşılması sürecidir. Sağlıklı bir iletişim tek yönlü değil, geri bildirim (dönüt) içeren çift yönlü bir süreçtir.',
            ],
            bullets: [
              'Kaynak (Gönderici): İletişimi başlatan, mesajı üreten kişi veya kurumdur.',
              'Mesaj (İleti): Aktarılmak istenen duygu, düşünce, bilgi veya talimattır.',
              'Kanal: Mesajın alıcıya iletildiği araç veya yoldur (ses, yazı, telefon, telsiz, beden dili).',
              'Alıcı: Mesajı alan, çözen ve yorumlayan kişi veya gruptur.',
              'Geri Bildirim (Dönüt): Alıcının mesaja verdiği sözlü veya sözsüz tepkidir. İletişimin tamamlandığını ve doğru anlaşılıp anlaşılmadığını gösterir.',
            ],
            examTip:
              'Geri bildirim (dönüt) olmazsa iletişim tek yönlü kalır. Mesajı bozan her türlü dış veya iç etken ise "gürültü" (iletişim engeli) olarak adlandırılır.',
          },
          {
            heading: 'İletişim Türleri',
            paragraphs: [
              'İletişim kullanılan kodlara göre Sözlü İletişim (konuşma, dil), Sözsüz İletişim (jest, mimik, duruş, göz teması, giyim) ve Yazılı İletişim (tutanak, rapor, duyuru) olarak üçe ayrılır.',
            ],
          },
        ],
      },
      {
        id: 'iletisim-2',
        chapterNumber: 2,
        title: 'Beden Dili, Ses Tonu ve Mesafe Alanları',
        summary: 'Sözsüz iletişimin önemi, jest-mimikler ve mahrem/kişisel/sosyal/genel alanlar.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'Yüz Yüze İletişimde Etki Oranları',
            paragraphs: [
              'Bilimsel araştırmalara göre yüz yüze iletişimde mesajın karşı tarafa geçmesinde en büyük etkiyi beden dili (%55–60), ikinci sırayı ses tonu ve vurgu (%30–35), en küçük payı ise yalnızca sözcükler (%7–10) oluşturur.',
              'Söylenen söz ile beden dili çeliştiğinde, karşı taraf daima beden diline inanır.',
            ],
            bullets: [
              'Olumlu Beden Dili: Dik ve rahat duruş, dengeli göz teması, hafif tebessüm, açık avuç içi, başla onaylama.',
              'Olumsuz Beden Dili: Kolları göğüste bağlama (savunma/kapanma), parmak sallama (tehdit), göz temasından kaçınma, saatine bakma veya arkasını dönme.',
            ],
          },
          {
            heading: 'Kişilerarası Mesafe Alanları',
            paragraphs: [
              'İnsanların çevresinde psikolojik olarak korudukları görünmez alanlar vardır. Bu alanların izinsiz ihlali kişide gerginlik ve savunma tepkisi doğurur.',
            ],
            bullets: [
              'Mahrem Alan (0 – 35 cm): Sadece eş, çocuk ve çok yakın aile bireylerine açık alandır.',
              'Kişisel Alan (40 – 80 cm): Arkadaşlar, tanıdıklar ve yakın iş arkadaşlarıyla kurulan mesafedir.',
              'Sosyal Alan (80 cm – 2 m): Resmi görev ilişkilerinde (ÖGG ile vatandaş arası) ideal iletişim mesafesidir.',
              'Genel / Toplumsal Alan (2 m ve üzeri): Yabancılar, kalabalık topluluklar ve konuşmacı–dinleyici mesafesidir.',
            ],
            examTip:
              'Özel güvenlik görevlisi vatandaşla konuşurken "Sosyal Alan" (yaklaşık 1–2 metre) mesafesini korumalı; çok yaklaşarak kişiyi tedirgin etmemelidir.',
          },
        ],
      },
      {
        id: 'iletisim-3',
        chapterNumber: 3,
        title: 'Empati, Sempati, Aktif Dinleme ve Sen/Ben Dili',
        summary: 'Empati basamakları, etkin dinleme kuralları ve yapıcı iletişim dili.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'Empati ve Sempati Ayrımı',
            paragraphs: [
              'Empati; kişinin kendisini karşısındakinin yerine koyarak olaylara onun bakış açısıyla bakması, duygularını ve düşüncelerini doğru anlaması ve bunu ona hissettirmesidir.',
              'Sempati ise karşı tarafın duygusuna kapılıp onunla aynı duyguyu paylaşarak taraf tutmaktır. Özel güvenlik görevlisi profesyonel olarak empati kurmalı, ancak sempati kurup görev tarafsızlığını kaybetmemelidir.',
            ],
          },
          {
            heading: 'Sen Dili ile Ben Dili Farkı',
            paragraphs: [
              'İletişimde kullanılan dil, çatışmayı tırmandırabilir veya çözebilir.',
            ],
            bullets: [
              'Sen Dili (Suçlayıcı/Yargılayıcı): Kişiliğe yöneliktir, karşı tarafta savunma ve öfke yaratır. Örnek: "Sürekli kuralları ihlal ediyorsunuz!"',
              'Ben Dili (Yapıcı/Tanımlayıcı): Davranışı ve yarattığı etkiyi ifade eder, iş birliği sağlar. Örnek: "Kimlik kontrolü yapılmadan geçiş olduğunda güvenlik zafiyeti oluşmasından endişe ediyorum."',
            ],
          },
          {
            heading: 'Aktif (Etkin) Dinleme',
            paragraphs: [
              'Etkin dinleme; konuşmacının sözünü kesmeden, yargılamadan, göz teması kurarak ve anladığını özetleyerek ("Yanlış anlamadıysam..." diyerek) dinlemektir.',
            ],
          },
        ],
      },
      {
        id: 'iletisim-4',
        chapterNumber: 4,
        title: 'İletişim Engelleri, Stres ve Öfke Kontrolü',
        summary: 'Ön yargı, emir verme, stres yönetimi ve öfkeli kişiyle kriz iletişimi.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Başlıca İletişim Engelleri',
            paragraphs: [
              'Emir verme, tehdit etme, ahlak dersi verme, alay etme, yargılama/suçlama, ön yargı ile yaklaşma, söz kesme ve konuyu değiştirme iletişimi tıkayan başlıca engellerdir.',
            ],
          },
          {
            heading: 'Öfkeli Vatandaşla İletişim ve Kriz Yönetimi',
            paragraphs: [
              'Özel güvenlik görevlisi görev sırasında sık sık stresli veya öfkeli kişilerle karşılaşır. Öfkeye öfkeyle karşılık vermek olayı fiziksel çatışmaya dönüştürür.',
            ],
            bullets: [
              'Sakin kalın, ses tonunuzu alçaltın ve konuşma hızınızı yavaşlatın.',
              'Kişinin sözünü kesmeden duygusunu boşaltmasına fırsat verin (aktif dinleme).',
              'Güvenli sosyal mesafeyi koruyun; kişiyi kalabalık önünden daha sakin bir alana davet edin.',
              'Kuralları kişisel değil, kurumsal ve yasal zorunluluk olarak nazikçe açıklayın.',
            ],
            examTip:
              'Öfkeli bir kişiye "Sakin ol!" demek çoğu zaman öfkeyi artırır; bunun yerine "Sizi anlıyorum, yardımcı olabilmem için durumu birlikte inceleyelim" gibi empatik ifadeler kullanılmalıdır.',
          },
        ],
      },
    ],
  },
  {
    id: 'ilk_yardim',
    title: 'Temel İlk Yardım',
    shortTitle: 'Temel İlk Yardım',
    subtitle: 'KBK, ABC, CPR, kanama, şok, kırıklar, yanık-zehirlenme ve yaralı taşıma',
    emoji: '🩹',
    color: '#EC4899',
    examQuestionCount: 10,
    chapters: [
      {
        id: 'ilkyardim-1',
        chapterNumber: 1,
        title: 'İlk Yardımın Temel Uygulamaları (KBK) ve Yaşam Bulguları',
        summary: 'Koruma-Bildirme-Kurtarma ilkeleri, 112 ve normal nabız/solunum değerleri.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'İlk Yardım ile Acil Tedavi Farkı',
            paragraphs: [
              'İlk yardım; herhangi bir kaza veya yaşamı tehlikeye düşüren durumda, sağlık görevlilerinin yardımı sağlanıncaya kadar olay yerinde tıbbi araç gereç aranmaksızın mevcut imkânlarla yapılan İLAÇSIZ uygulamalardır.',
              'Acil tedavi ise sağlık personeli tarafından acil tedavi ünitelerinde tıbbi donanım ve ilaç kullanılarak yapılan müdahaledir.',
            ],
            bullets: [
              'Koruma: Kaza sonuçlarının ağırlaşmasını önlemek için olay yerinin değerlendirilmesi ve güvenli çevre oluşturulması.',
              'Bildirme: Olay/kazanın mümkün olan en hızlı şekilde 112 Acil Çağrı Merkezine bildirilmesi.',
              'Kurtarma: Olay yerinde hasta/yaralılara hızlı ancak sakin ve bilinçli şekilde ilk yardım uygulanması.',
            ],
          },
          {
            heading: 'Normal Yaşam Bulguları',
            paragraphs: [
              'Yaralının durumunu değerlendirmek için bilinç, solunum, nabız, vücut ısısı ve kan basıncı kontrol edilir:',
            ],
            bullets: [
              'Normal Solunum Sayısı: Yetişkinlerde dakikada 12–20, çocuklarda 16–22, bebeklerde 18–24.',
              'Normal Nabız Sayısı: Yetişkinlerde dakikada 60–100, çocuklarda 100–120, bebeklerde 100–140.',
              'Normal Vücut Isısı: 36,5 °C (38 °C üstü yüksek ateş, 35 °C altı hipotermi riskidir).',
            ],
            examTip:
              'İlk yardımın öncelikli amaçları: Hayati tehlikeyi ortadan kaldırmak, yaşamsal fonksiyonların sürdürülmesini sağlamak, durumun kötüleşmesini önlemek ve iyileşmeyi kolaylaştırmaktır.',
          },
        ],
      },
      {
        id: 'ilkyardim-2',
        chapterNumber: 2,
        title: 'ABC, Temel Yaşam Desteği (CPR) ve Heimlich Manevrası',
        summary: 'Hava yolu açma, 30/2 kalp masajı, Bak-Dinle-Hisset ve solunum yolu tıkanıklığı.',
        estimatedMinutes: 6,
        sections: [
          {
            heading: 'İlk Yardımın ABC’si',
            paragraphs: [
              'Hasta/yaralının omuzlarına hafifçe dokunularak "İyi misiniz?" diye sorulup bilinç kontrolü yapılır. Bilinç yoksa derhal 112 aratılır ve ABC sırasıyla değerlendirilir:',
            ],
            bullets: [
              'A (Airway – Hava Yolu): Ağız içi kontrol edilir, yabancı cisim görülürse çıkarılır; "Baş geri – çene yukarı" pozisyonu ile hava yolu açılır.',
              'B (Breathing – Solunum): "Bak – Dinle – Hisset" yöntemiyle 10 saniye boyunca solunum kontrol edilir.',
              'C (Circulation – Dolaşım): Solunum yoksa derhal dış kalp masajı ve suni solunuma (Temel Yaşam Desteği) başlanır.',
            ],
          },
          {
            heading: 'Temel Yaşam Desteği (TYD / CPR) Oranları',
            paragraphs: [
              'Yetişkin, çocuk ve bebeklerde temel yaşam desteği oranı 30 kalp masajı / 2 suni solunumdur. Göğüs basısı dakikada 100–120 hızında uygulanır.',
            ],
            bullets: [
              'Yetişkinde: İki el üst üste göğüs kemiğinin alt yarısına konur, göğüs 5 cm (1/3 oranında) çökecek şekilde basılır.',
              'Çocukta (1–8 yaş): Tek el ile göğüs 5 cm çökecek şekilde basılır.',
              'Bebekte (0–1 yaş): İki parmak (orta ve yüzük parmağı) ile göğüs 4 cm çökecek şekilde basılır.',
            ],
          },
          {
            heading: 'Hava Yolu Tıkanıklığı ve Heimlich Manevrası',
            paragraphs: [
              'Kısmi tıkanıklıkta kişi öksürebilir ve nefes alabilir; bu durumda kişiye dokunulmaz, öksürmeye teşvik edilir.',
              'Tam tıkanıklıkta kişi nefes alamaz, konuşamaz, ellerini boğazına götürür ve morarır. Bilinci açık yetişkin ve çocukta 5 kez sırtına (iki kürek kemiği arasına) vurulur, çıkmazsa karına bası uygulaması (Heimlich Manevrası) yapılır.',
            ],
            examTip:
              'Bak-Dinle-Hisset süresi 10 saniyedir. Yetişkinde baş-çene pozisyonu, boyun/omurga yaralanması şüphesi varsa kesinlikle yapılmaz (çene itme tekniği kullanılır).',
          },
        ],
      },
      {
        id: 'ilkyardim-3',
        chapterNumber: 3,
        title: 'Kanamalar, Turnike Şartları ve Şok Müdahalesi',
        summary: 'Atardamar/toplardamar kanamaları, baskı noktaları, turnike ve şok pozisyonu.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'Kanama Türleri ve Durdurma Basamakları',
            paragraphs: [
              'Atardamar (arter) kanaması açık kırmızı renkte ve kalp atımıyla uyumlu fışkırır tarzda akar; en tehlikeli kanamadır. Toplardamar (ven) kanaması koyu kırmızı ve sızıntı/taşma şeklinde, kılcal damar kanaması ise küçük kabarcıklar halindedir.',
            ],
            bullets: [
              'Kanayan yara üzerine temiz bir bezle doğrudan baskı yapılır.',
              'Kanama durmazsa ilk bez kaldırılmadan üzerine ikinci bir bez konup basınç artırılır.',
              'Bandajla sarılır ve kanayan uzuv kalp seviyesinden yukarı kaldırılır.',
              'Gerekirse kanayan yere en yakın üst atardamar baskı noktasına bası uygulanır.',
            ],
          },
          {
            heading: 'Turnike (Boğucu Sargı) Uygulama Şartları',
            paragraphs: [
              'Turnike yalnızca uzuv kopması varsa, çok sayıda yaralının bulunduğu ortamda tek ilk yardımcı varsa veya kanama baskıyla hiçbir şekilde durdurulamıyorsa SON ÇARE olarak tek kemikli bölgelere (kol veya uyluk) uygulanır.',
              'Turnike geniş (8–10 cm) malzeme ile bağlanır (tel, ip kullanılmaz), uygulama saati yaralının alnına veya görünen bir yere yazılır ve doku ölümünü önlemek için 15–20 dakikada bir 5–10 saniye gevşetilir.',
            ],
          },
          {
            heading: 'Şok ve Şok Pozisyonu',
            paragraphs: [
              'Kalp-damar sisteminin yaşamsal organlara yeterli kan gönderememesi sonucu gelişen akut dolaşım yetmezliğine "şok" denir. Belirtileri: Hızlı ve zayıf nabız, soğuk terleme, solukluk, endişe ve bilinç bulanıklığı.',
              'Şok Pozisyonu: Yaralı sırtüstü yatırılır, bacakları 30 cm yukarı kaldırılır, üzeri örtülerek vücut ısısı korunur ve hiçbir şey yedirip içirilmez.',
            ],
            examTip:
              'Şok pozisyonunda ayaklar 30 cm yükseltilir. Turnike süresi en fazla 15–20 dakikada bir 5–10 saniye gevşetilmelidir.',
          },
        ],
      },
      {
        id: 'ilkyardim-4',
        chapterNumber: 4,
        title: 'Yaralanmalar, Kırık, Çıkık ve Burkulmalar',
        summary: 'Delici göğüs/karın yaralanmaları, kırık tespiti ve atel kuralları.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'Yaralanmalarda Temel Kurallar',
            paragraphs: [
              'Yaraya saplanmış bıçak, demir gibi yabancı cisimler KESİNLİKLE çıkarılmaz; etrafı temiz bezle desteklenerek sabitlenir. Dışarı çıkmış organlar (bağırsak vb.) içeri itilmez, nemli temiz bezle örtülür.',
              'Delici göğüs yaralanmasında yaralı yarı oturur pozisyona alınır; delici karın yaralanmasında ise sırtüstü yatırılıp bacakları dizden bükülür.',
            ],
          },
          {
            heading: 'Kırık, Çıkık ve Burkulmalarda İlk Yardım',
            paragraphs: [
              'Kırık kemik bütünlüğünün bozulması, çıkık eklem yüzeylerinin kalıcı olarak ayrılması, burkulma ise eklem yüzeylerinin anlık olarak ayrılmasıdır.',
            ],
            bullets: [
              'Kırık veya çıkık ilk yardımcı tarafından KESİNLİKLE yerine oturtulmaya çalışılmaz.',
              'Yaralı bölge bulunduğu pozisyonda, bir alt ve bir üst eklemi içine alacak şekilde sert malzeme (atel) ile tespit edilir.',
              'Burkulmalarda sıkıştırıcı bandaj, soğuk uygulama ve bölgenin kalp seviyesinden yukarı kaldırılması uygulanır.',
            ],
          },
        ],
      },
      {
        id: 'ilkyardim-5',
        chapterNumber: 5,
        title: 'Yanık, Donma, Zehirlenme ve Boğulmalar',
        summary: 'Yanık dereceleri, sıcak çarpması, zehirlenme yolları ve hayvan ısırmaları.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'Yanıklar ve Donmalar',
            paragraphs: [
              '1. derece yanıkta kızarıklık, 2. derece yanıkta içi su dolu kabarcıklar (bül), 3. derece yanıkta tüm deri katmanları ve sinirler yanar (ağrı hissedilmeyebilir).',
            ],
            bullets: [
              'Yanık bölge en az 20 dakika çeşme suyu altında soğutulur (buz konmaz).',
              'Su toplamış kabarcıklar (büller) patlatılmaz; yoğurt, diş macunu, salça, yağ gibi maddeler KESİNLİKLE sürülmez.',
              'Donmada kişi ılık ortama alınır, donmuş bölge ovulmaz (doku hasarı yaratır), ılık içecek verilebilir.',
            ],
          },
          {
            heading: 'Zehirlenmeler ve Hayvan Isırmaları',
            paragraphs: [
              'Zehirlenme sindirim, solunum veya cilt yoluyla oluşabilir. Zehirlenme Danışma Merkezi numarası 114 (veya 112 Acil) aranır.',
            ],
            bullets: [
              'Yakıcı madde (çamaşır suyu, asit, tiner) içen kişi KESİNLİKLE kusturulmaz!',
              'Solunum yolu zehirlenmesinde (karbonmonoksit/doğalgaz) kişi temiz havaya çıkarılır, ortam havalandırılır, elektrik düğmesine dokunulmaz.',
              'Yılan/akrep sokmalarında yara kesinlikle kesilmez ve ağızla emilmez; soğuk uygulama yapılır ve bölge kalp seviyesinin altında tutulur.',
            ],
          },
        ],
      },
      {
        id: 'ilkyardim-6',
        chapterNumber: 6,
        title: 'Bilinç Bozuklukları, Koma ve Yaralı Taşıma Teknikleri',
        summary: 'Bayılma, koma pozisyonu, Rentek manevrası ve acil taşıma yöntemleri.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'Bayılma (Senkop) ve Koma Pozisyonu',
            paragraphs: [
              'Bayılma kısa süreli yüzeysel bilinç kaybıdır; kişi sırtüstü yatırılıp bacakları 30 cm kaldırılır ve sıkan giysiler gevşetilir.',
              'Koma ise yutkunma ve öksürük gibi reflekslerin kaybolduğu uzun süreli derin bilinç kaybıdır. Bilinci kapalı ancak solunumu ve nabzı normal olan hastaya "Koma Pozisyonu" (yarı yüzükoyun yan yatış) verilir.',
            ],
          },
          {
            heading: 'Rentek Manevrası ve Yaralı Taşıma',
            paragraphs: [
              'Genel kural olarak yaralı tehlike yoksa yerinden oynatılmaz. Ancak araçta yangın, patlama veya solunum durması gibi hayati tehlike varsa "Rentek Manevrası" ile omurilik zedelenmeden (baş-boyun-gövde ekseni korunarak) araçtan çıkarılır.',
            ],
            bullets: [
              'İtfaiyeci Yöntemi (Omuzda Taşıma): Yürüyemeyen veya bilinci kapalı kişiyi tek kişiyle hızlı tahliye etmek için kullanılır.',
              'Altın Beşik Yöntemi: Bilinci açık yaralıyı iki ilk yardımcının ellerini kenetleyerek taşımasıdır.',
              'Kaşık Tekniği ve Köprü Tekniği: Omurga yaralanması şüphesinde sedyeye alma yöntemleridir.',
            ],
            examTip:
              'Araç içindeki yaralıyı omurgasına zarar vermeden çıkarmak için kullanılan tekniğin adı "Rentek Manevrası"dır.',
          },
        ],
      },
    ],
  },
  {
    id: 'kalabalik',
    title: 'Kalabalık Yönetimi',
    shortTitle: 'Kalabalık Yönetimi',
    subtitle: 'Kalabalık türleri, grup psikolojisi, müdahale düzenleri, cop kullanımı ve panik',
    emoji: '👥',
    color: '#F59E0B',
    examQuestionCount: 10,
    chapters: [
      {
        id: 'kalabalik-1',
        chapterNumber: 1,
        title: 'Kalabalık ve Grup Türleri ile Psikolojisi',
        summary: 'Grup-kalabalık farkı, organize/saldırgan/panik kalabalıklar ve topluluk davranışları.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Grup ve Kalabalık Farkı',
            paragraphs: [
              'Ortak amaçları, rolleri ve sürekli ilişkileri olan insan topluluğuna "grup" (ör. bir işyerinin güvenlik ekibi); aynı mekânda geçici olarak bir araya gelmiş, aralarında sürekli örgütlü bağ bulunmayan topluluğa ise "kalabalık" denir.',
            ],
            bullets: [
              'Sıradan (Tesadüfi) Kalabalık: Cadde, durak veya AVM’de tesadüfen bir arada bulunan kişiler.',
              'Organize (Planlı) Kalabalık: Konser, miting, spor müsabakası için önceden planlanarak toplananlar.',
              'Pasif / İzleyici Kalabalık: Bir olayı veya gösteriyi yalnızca izlemek için toplananlar.',
              'Saldırgan Kalabalık: Yıkıcı ve şiddet içerikli eylemlere yönelen, provokatörlerce yönlendirilen topluluk.',
              'Panik Halindeki Kalabalık: Yangın, deprem veya patlama anında mantıklı karar veremeden kaçışan topluluk.',
            ],
          },
          {
            heading: 'Kalabalık Psikolojisinin Özellikleri',
            paragraphs: [
              'Birey kalabalık içine girdiğinde kimliğinin gizlendiği hissine (anonimlik) kapılır, bireysel sorumluluk duygusu azalır, telkine açık hale gelir ve taklit/bulaşma etkisiyle tek başına yapmayacağı davranışları sergileyebilir.',
            ],
          },
        ],
      },
      {
        id: 'kalabalik-2',
        chapterNumber: 2,
        title: 'Toplumsal Olaylarda Müdahale Düzenleri',
        summary: 'Hat düzeni, kama düzeni, çember düzeni ve kullanım alanları.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Temel Müdahale Düzenleri',
            paragraphs: [
              'Toplumsal olaylarda düzeni korumak ve kalabalığı kontrollü yönlendirmek için güvenlik personeli belirli taktik dizilişler uygular:',
            ],
            bullets: [
              'Hat Düzeni: Kalabalığı durdurmak, geriye itmek ve belirli bir hattı (bina önü, giriş kapısı, cadde) kapatmak için yan yana diziliş.',
              'Kama Düzeni: Kalabalığı yarmak, ikiye bölmek veya kalabalık içindeki bir lideri/yaralıyı çıkarmak için üçgen (V) şeklinde diziliş.',
              'Çember Düzeni: Korunacak bir kişi, araç veya kritik noktayı 360 derece çevreleyerek koruma düzeni.',
            ],
            examTip:
              'Kalabalığı bölmek ve yarmak için "Kama Düzeni", set oluşturup durdurmak için "Hat Düzeni", bir noktayı/kişiyi çepeçevre korumak için "Çember Düzeni" kullanılır.',
          },
        ],
      },
      {
        id: 'kalabalik-3',
        chapterNumber: 3,
        title: 'Cop Kullanımı ve Kademeli Zor Kullanma',
        summary: 'Zor kullanma kademeleri, copun vurulacak/vurulmayacak bölgeleri ve gaz müdahalesi.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Kademeli Zor Kullanma İlkeleri',
            paragraphs: [
              'Zor kullanma daima yasal sınırlar içinde, saldırı ile orantılı ve kademeli olmalıdır: Fiziki varlık → Sözlü ikna/uyarı → Bedeni kuvvet → Maddi güç (cop, kelepçe) → (Yalnızca yasal meşru savunma şartlarında) silah.',
            ],
            bullets: [
              'Cop, hayati tehlike oluşturan BAŞ, BOYUN, OMURGA, GÖĞÜS KAFESİ ve KASIK bölgelerine KESİNLİKLE vurulmaz.',
              'Cop yalnızca kol ve bacaklardaki büyük kas gruplarına (ön kol, baldır, uyluk) etkisiz hale getirmek amacıyla uygulanır.',
              'Göz yaşartıcı gazdan (biber gazı/CS) etkilenen kişi açık havaya çıkarılır, gözlerini KESİNLİKLE ovuşturmaz ve bol soğuk su ile yüzünü yıkar (krem/yağ sürülmez).',
            ],
          },
        ],
      },
      {
        id: 'kalabalik-4',
        chapterNumber: 4,
        title: 'Panik Yönetimi ve Güvenli Tahliye',
        summary: 'İzdihamı önleme, anons kuralları ve acil çıkış yönetimi.',
        estimatedMinutes: 3,
        sections: [
          {
            heading: 'Panik Anında Güvenlik Görevlisinin Rolü',
            paragraphs: [
              'Panik bulaşıcıdır. Görevli öncelikle kendi soğukkanlılığını korumalı, yüksek ve kendinden emin bir ses tonuyla (megafon/anons sistemi) kısa, net yönlendirmeler yapmalıdır.',
            ],
            bullets: [
              'Acil çıkış kapıları her zaman dışa doğru açılmalı ve önleri kesinlikle kapalı/kilitli olmamalıdır.',
              'Asansörler acil tahliyede kesinlikle kullanılmaz.',
              'Yığılmayı önlemek için alternatif çıkışlar eş zamanlı açılır; çocuklar, yaşlılar ve engellilere öncelik verilir.',
            ],
          },
        ],
      },
    ],
  },
];
