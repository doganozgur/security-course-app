import { LessonBook } from '../../types';

export const LESSONS_PART_1: LessonBook[] = [
  {
    id: 'hukuk',
    title: 'Özel Güvenlik Hukuku ve Kişi Hakları',
    shortTitle: 'Güvenlik Hukuku',
    subtitle: '5188 Sayılı Kanun, yetkiler, çalışma şartları, İş Kanunu ve TCK yaptırımları',
    emoji: '⚖️',
    color: '#3B82F6',
    examQuestionCount: 20,
    chapters: [
      {
        id: 'hukuk-1',
        chapterNumber: 1,
        title: '5188 Sayılı Kanun, Amaç ve Özel Güvenlik Komisyonu',
        summary: 'Kanunun amacı, tamamlayıcı görev ilkesi, koruma izni ve il komisyonunun yapısı.',
        estimatedMinutes: 6,
        sections: [
          {
            heading: 'Kanunun Amacı ve Tamamlayıcı Mahiyet',
            paragraphs: [
              '5188 sayılı Özel Güvenlik Hizmetlerine Dair Kanun, 10/06/2004 tarihinde kabul edilmiş olup kamu güvenliğini tamamlayıcı mahiyetteki özel güvenlik hizmetlerinin yerine getirilmesine ilişkin esas ve usulleri belirler.',
              'Özel güvenlik görevlileri hiçbir zaman genel kolluğun (Polis, Jandarma, Sahil Güvenlik) yerini almaz. Görevleri, genel kolluğa yardımcı ve tamamlayıcı niteliktedir; yetkilerini yalnızca görevli oldukları alan ve süre içinde kullanabilirler.',
            ],
            lawNote:
              '5188 Sayılı Kanun Md. 1 ve Md. 2: Bu Kanun, özel güvenlik izninin verilmesine, bu hizmeti yerine getirecek kişi ve kuruluşların ruhsatlandırılmasına ve denetlenmesine ilişkin hususları kapsar.',
          },
          {
            heading: 'Özel Güvenlik İzni ve Geçici Haller',
            paragraphs: [
              'Kişilerin silahlı personel tarafından korunması, kurum ve kuruluşlar bünyesinde özel güvenlik birimi kurulması veya güvenlik hizmetinin şirketlere gördürülmesi Özel Güvenlik Komisyonunun kararı üzerine valinin iznine bağlıdır.',
              'Toplantı, konser, sahne gösterileri ve benzeri etkinliklerde; para veya değerli eşya nakli gibi geçici veya acil hallerde, komisyon kararı aranmaksızın vali tarafından özel güvenlik izni verilebilir.',
            ],
            bullets: [
              'Özel güvenlik şirketlerinin faaliyet izni İçişleri Bakanlığı tarafından verilir.',
              'Özel güvenlik eğitim kurumlarının faaliyet izni İçişleri Bakanlığı tarafından verilir.',
              'Özel güvenlik izninin sona erdirilmesi için en az 1 ay önceden valiliğe başvurulur.',
            ],
          },
          {
            heading: 'Özel Güvenlik Komisyonunun Yapısı ve Karar Usulü',
            paragraphs: [
              'Her ilde, bir vali yardımcısının başkanlığında Özel Güvenlik Komisyonu kurulur. Komisyon, özel güvenlik izni, personel sayısı, silah sayısı ve niteliği gibi konularda karar alır.',
            ],
            bullets: [
              'Başkan: Vali yardımcısı',
              'Üyeler: İl Emniyet Müdürlüğü, İl Jandarma Komutanlığı, Ticaret Odası Başkanlığı ve Sanayi Odası Başkanlığı temsilcileri',
              'Sanayi odasının bulunmadığı illerde Ticaret ve Sanayi Odası temsilcisi katılır.',
              'Özel güvenlik izni talep eden kişi ya da kuruluşun temsilcisi de ilgili toplantıya üye olarak katılır.',
              'Kararlar oy çokluğu ile alınır; oyların eşitliği halinde başkanın bulunduğu taraf çoğunluk sayılır. Çekimser oy kullanılamaz.',
            ],
            examTip:
              'Sınavda sıkça karıştırılan nokta: Komisyona vali değil, "vali yardımcısı" başkanlık eder. Kararlar valinin onayı ile yürürlüğe girer ve komisyonda çekimser oy kullanılamaz.',
          },
        ],
      },
      {
        id: 'hukuk-2',
        chapterNumber: 2,
        title: 'Özel Güvenlik Görevlilerinin Yetkileri (Madde 7)',
        summary: 'Arama, kimlik sorma, yakalama, konuta girme, emanete alma ve yetki sınırları.',
        estimatedMinutes: 7,
        sections: [
          {
            heading: 'Madde 7 Kapsamındaki Tüm Yetkiler',
            paragraphs: [
              '5188 sayılı Kanunun 7. maddesi, özel güvenlik görevlilerinin kullanabileceği yetkileri tek tek ve sınırlı olarak saymıştır. Bu yetkilerin kullanılabilmesi için görevlinin görev alanında olması, görev süresinde bulunması ve kimlik kartının yakasında herkesçe görünecek şekilde takılı olması şarttır.',
            ],
            bullets: [
              'Koruma ve güvenliğini sağladıkları alanlara girmek isteyenleri duyarlı kapıdan geçirme, bu kişilerin üstlerini dedektörle arama ve eşyalarını X-Ray cihazından veya benzeri güvenlik sistemlerinden geçirme.',
              'Toplantı, konser, spor müsabakası, sahne gösterileri ve benzeri etkinlikler ile cenaze ve düğün törenlerinde; hava meydanı, liman, gar, istasyon ve terminal gibi toplu ulaşım tesislerinde kimlik sorma, duyarlı kapıdan geçirme, dedektörle üst arama ve X-Ray ile eşya kontrolü yapma.',
              'Ceza Muhakemesi Kanunu (CMK) Md. 90’a göre suçüstü halinde yakalama yapma ve genel kolluğa derhal bildirme.',
              'Görev alanında, haklarında yakalama emri veya mahkûmiyet kararı bulunan kişileri yakalama ve arama.',
              'Yangın, deprem gibi tabii afet durumlarında ve imdat istenmesi halinde görev alanındaki işyeri ve konutlara girme.',
              'Genel kolluk kuvvetlerine derhal bildirmek şartıyla, aramalar sırasında suç teşkil eden veya delil olabilecek ya da suç teşkil etmemekle birlikte tehlike doğurabilecek eşyayı emanete alma.',
              'Terk edilmiş ve bulunmuş eşyayı emanete alma.',
              'Kişinin vücudu veya hayatı bakımından mevcut bir tehlikeden korunması amacıyla yakalama yapma.',
              'Olay yerini ve delilleri koruma; bu amaçla CMK Md. 168’e göre yakalama yapma.',
              'Türk Medeni Kanunu Md. 981, Türk Borçlar Kanunu Md. 64 ve Türk Ceza Kanunu Md. 25’e göre zor kullanma.',
            ],
            lawNote:
              'Özel güvenlik görevlilerinin kimlik sorma yetkisi her yerde geçerli değildir; yalnızca toplantı, konser, spor müsabakası, sahne gösterisi, cenaze/düğün törenleri ile havalimanı, liman, gar, istasyon ve terminal gibi toplu ulaşım tesislerinde geçerlidir.',
          },
          {
            heading: 'Özel Güvenlik Görevlilerinin KULLANAMAYACAĞI Yetkiler',
            paragraphs: [
              'Genel kolluğa ait bazı adli ve idari yetkiler özel güvenlik görevlilerine tanınmamıştır. Bu yetkilerin kullanılması suç teşkil eder.',
            ],
            bullets: [
              'Elle üst araması yapmak (yalnızca dedektör ve X-Ray cihazıyla kontrol yapılabilir).',
              'İfade alma, sorgulama yapma, parmak izi veya fotoğraf alma.',
              'Telefon dinleme, teknik takip veya gizli soruşturma yürütme.',
              'Gözaltına alma veya nezarethanede tutma (yakalanan kişi derhal genel kolluğa teslim edilir).',
              'Trafik cezası yazma veya kimliğe el koyma.',
            ],
            examTip:
              'Sınavda "Aşağıdakilerden hangisi ÖGG’nin yetkilerinden biri değildir?" sorularında genellikle "ifade alma", "elle üst arama", "gözaltına alma" ve "parmak izi alma" şıkları doğru cevap olarak verilir.',
          },
        ],
      },
      {
        id: 'hukuk-3',
        chapterNumber: 3,
        title: 'ÖGG Olma Şartları, Eğitim ve Kimlik Yenileme',
        summary: 'Madde 10 şartları, temel/yenileme eğitim süreleri ve kimlik kartı kuralları.',
        estimatedMinutes: 6,
        sections: [
          {
            heading: 'Özel Güvenlik Görevlisi Olma Şartları (Madde 10)',
            paragraphs: [
              'Özel güvenlik görevlisi olarak istihdam edilecek kişilerin kanunda öngörülen vatandaşlık, yaş, öğrenim, adli sicil ve sağlık koşullarını eksiksiz yerine getirmesi gerekir.',
            ],
            bullets: [
              'Türkiye Cumhuriyeti vatandaşı olmak.',
              'Silahsız olarak görev yapacaklar için en az sekiz yıllık ilköğretim veya ortaokul mezunu ve 18 yaşını doldurmuş olmak.',
              'Silahlı olarak görev yapacaklar için en az lise veya dengi okul mezunu ve 21 yaşını doldurmuş olmak.',
              'TCK Md. 53’te belirtilen süreler geçmiş olsa bile; kasten işlenen bir suçtan dolayı 1 yıl veya daha fazla süreyle hapis cezasına mahkûm olmamak.',
              'Affa uğramış olsa bile devletin güvenliğine, anayasal düzene, cinsel dokunulmazlığa, uyuşturucu ticaretine, zimmet, irtikâp, rüşvet, hırsızlık, dolandırıcılık, sahtecilik, güveni kötüye kullanma, hileli iflas, kaçakçılık gibi suçlardan mahkûm olmamak veya bu suçlardan soruşturma/kovuşturması devam etmemek.',
              'Görevin yapılmasına engel olabilecek vücut ve akıl hastalığı ile engelli bulunmamak (sağlık kurulu raporu ile belgelenir).',
              'Özel güvenlik temel eğitimini başarıyla tamamlamak ve güvenlik soruşturmasının olumlu sonuçlanması.',
            ],
          },
          {
            heading: 'Eğitim Süreleri ve Kimlik Kartı Geçerliliği',
            paragraphs: [
              'Özel güvenlik temel eğitimi silahsız adaylar için en az 100 ders saati, silahlı adaylar için (20 saat silah bilgisi ve atış eklenerek) en az 120 ders saatidir.',
              'Çalışma izni ve özel güvenlik kimlik kartı 5 yıl süreyle geçerlidir. Kimlik kartının süresi dolmadan en az 1 yıl önce (ve en geç süre bitimine kadar) yenileme eğitimi alınması gerekir.',
            ],
            bullets: [
              'Silahsız Yenileme Eğitimi: 50 ders saati',
              'Silahlı Yenileme Eğitimi: 60 ders saati (50 saat temel + 10 saat silah)',
              'Silahsızdan Silahlıya Geçiş Fark Eğitimi: 20 ders saati silah bilgisi ve atış',
              'Temel eğitimi bitiren adayların 1 yıl içinde toplam 4 sınav hakkı vardır.',
            ],
            examTip:
              'Kimlik kartı başkasına kesinlikle kullandırılamaz; görevi bırakan veya şartları kaybeden personelin kimliği iptal edilir. Yenileme sınavında geçme barajı aranmaz, sınava katılım şarttır.',
          },
        ],
      },
      {
        id: 'hukuk-4',
        chapterNumber: 4,
        title: 'Silah Bulundurma, Taşıma ve Görev Alanı İstisnaları',
        summary: 'Silah kullanma yasağı olan yerler ve görev alanı dışına çıkılabilecek haller.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'Silahlı Özel Güvenlik Görevlisi Çalıştırılamayacak Yerler',
            paragraphs: [
              'Kanun gereği bazı hassas kurumlarda koruma ve güvenlik hizmeti silahlı personel ile yürütülemez; bu yerlerde silah bulundurulmasına ve taşınmasına izin verilmez.',
            ],
            bullets: [
              'Eğitim ve öğretim kurumları (okullar, üniversiteler vb.)',
              'Sağlık tesisleri (hastaneler, poliklinikler vb.)',
              'Talih oyunları işletmeleri',
              'İçkili yerler',
              'Özel toplantılar, spor müsabakaları, sahne gösterileri ve benzeri etkinlikler (koruma ve güvenlik görevlileri silahlı görev yapamaz).',
            ],
            lawNote:
              '5188 Sayılı Kanun Md. 8: Koruma ve güvenlik hizmetinde kullanılacak silah ve teçhizat, ilgili kişi veya kuruluş tarafından temin edilir; özel güvenlik görevlilerinin şahsi silahları görevde kullanılamaz.',
          },
          {
            heading: 'Görev Alanı Dışına Çıkılabilecek İstisnai Durumlar (Md. 9)',
            paragraphs: [
              'Özel güvenlik görevlileri kural olarak silahlarını görev alanı dışına çıkaramazlar. Ancak kanun, belirli görevlerin niteliği gereği güzergâh boyunca silah taşınmasına izin vermiştir:',
            ],
            bullets: [
              'İşlenmiş bir suçun sanığı veya suç işleyeceğinden kuvvetle şüphe edilen kişinin takibi',
              'Dışarıdan yapılan saldırılara karşı tedbir alınması',
              'Para ve değerli eşya nakli',
              'Kişi koruma (VIP) görevleri',
              'Cenaze töreni gibi güzergâh ifade eden durumlar',
            ],
            examTip:
              'Zorunlu hallerde görev alanı, Özel Güvenlik Komisyonu kararıyla genişletilebilir. Eğitim kurumları ve sağlık tesislerinde silahlı ÖGG görev yapamaz!',
          },
        ],
      },
      {
        id: 'hukuk-5',
        chapterNumber: 5,
        title: '4857 Sayılı İş Kanunu, Çalışma Hakları ve Yasaklar',
        summary: 'Grev yasağı, görev dışında çalıştırma yasağı, yıllık izin, fazla mesai ve tazminatlar.',
        estimatedMinutes: 6,
        sections: [
          {
            heading: '5188 Sayılı Kanundaki Özel Yasaklar',
            paragraphs: [
              'Özel güvenlik hizmetinin kesintisiz ve tarafsız yürütülebilmesi için özel güvenlik görevlilerine ve işverenlere bazı kesin yasaklar getirilmiştir.',
            ],
            bullets: [
              'Görev Dışında Çalıştırma Yasağı (Md. 16): Özel güvenlik personeli, kanunda belirtilen koruma ve güvenlik hizmetleri dışında başka bir işte çalıştırılamaz (ör. temizlik, şoförlük, çay servisi).',
              'Grev Yasağı (Md. 17): Özel güvenlik personeli greve katılamaz.',
              'Görevden Uzaklaştırma Yasağı (Md. 18): Özel güvenlik görevlileri lokavt dolayısıyla işten uzaklaştırılamaz.',
              'Üniforma Kuralı: Üniforma yalnızca görev süresince ve görev alanında giyilir; üniforma onayları İçişleri Bakanlığı tarafından yapılır.',
            ],
          },
          {
            heading: '4857 Sayılı İş Kanunu Temel Hakları',
            paragraphs: [
              'Özel güvenlik görevlileri iş ilişkileri bakımından 4857 sayılı İş Kanununa tabidir. İş sözleşmesi, çalışma süreleri, izinler ve tazminat hakları bu kanunla güvence altındadır.',
            ],
            bullets: [
              'Haftalık normal çalışma süresi en çok 45 saattir. Günlük çalışma süresi her ne şekilde olursa olsun 11 saati aşamaz.',
              'Gece çalışması (20.00 – 06.00 arası) kural olarak 7,5 saati geçemez; ancak özel güvenlik hizmetlerinde işçinin yazılı onayı ile 7,5 saatin üzerinde gece çalışması yaptırılabilir.',
              'Haftalık 45 saati aşan çalışmalar "fazla çalışma" sayılır ve her saat için normal ücretin %50 zamlı tutarı ödenir.',
              'Yıllık ücretli izin: 1–5 yıl kıdemde en az 14 gün, 5–15 yıl kıdemde en az 20 gün, 15 yıl ve üzeri kıdemde en az 26 gündür.',
              'Kıdem tazminatı için aynı işverene bağlı en az 1 yıl çalışmış olmak gerekir.',
            ],
            examTip:
              'Gece çalışmasında 7,5 saat sınırının istisnaları: Turizm, özel güvenlik ve sağlık hizmeti yürütülen işlerde işçinin yazılı onayı ile 7,5 saatin üzerinde gece çalışması yapılabilir.',
          },
        ],
      },
      {
        id: 'hukuk-6',
        chapterNumber: 6,
        title: 'TCK Kapsamında Sorumluluk, Meşru Savunma ve Cezalar',
        summary: 'Kamu görevlisi sayılma, meşru savunma şartları, zorunluluk hali ve adli/idari cezalar.',
        estimatedMinutes: 6,
        sections: [
          {
            heading: 'Kamu Görevlisi Sayılma (Madde 23)',
            paragraphs: [
              'Özel güvenlik görevlileri, görevleriyle bağlantılı olarak suç işlemeleri halinde "kamu görevlisi" gibi cezalandırılırlar. Aynı şekilde, özel güvenlik görevlilerine karşı görevleri dolayısıyla suç işleyen kişiler de kamu görevlisine karşı suç işlemiş gibi daha ağır cezaya çarptırılırlar.',
            ],
            lawNote:
              '5188 Sayılı Kanun Md. 23: Özel güvenlik görevlileri Türk Ceza Kanununun uygulanmasında memur (kamu görevlisi) sayılır. Özel güvenlik mali sorumluluk sigortası yaptırılması zorunludur.',
          },
          {
            heading: 'Meşru Savunma ve Zorunluluk Hali (TCK Md. 25)',
            paragraphs: [
              'Gerek kendisine ve gerek başkasına ait bir hakka yönelmiş, gerçekleşen, gerçekleşmesi veya tekrarı muhakkak olan haksız bir saldırıyı o anda hal ve koşullara göre saldırı ile orantılı biçimde defetmek zorunluluğu ile işlenen fiillerden dolayı faile ceza verilmez.',
            ],
            bullets: [
              'Saldırı haksız olmalı ve halen devam ediyor (veya başlamak üzere) olmalıdır.',
              'Savunma zorunlu olmalı ve saldırı ile ORANTILI (ölçülü) olmalıdır.',
              'Saldırı sona erdikten sonra (örneğin kaçan saldırgana) yapılan müdahale meşru savunma sayılmaz, sınırı aşma/intikam niteliği taşır.',
              'Zorunluluk (Iztırar) Hali: Kişinin bilerek neden olmadığı ağır ve muhakkak bir tehlikeden kurtulmak için başka çare bulunmaması halinde başkasının malına veya hakkına zarar vermesidir.',
            ],
          },
          {
            heading: 'Adli ve İdari Yaptırımlar (Md. 19 ve Md. 20)',
            paragraphs: [
              '5188 sayılı Kanuna aykırı davranışlar ağırlığına göre adli suç (hapis/adli para cezası) veya idari kabahat (idari para cezası ve kimlik iptali) olarak cezalandırılır.',
            ],
            bullets: [
              'İzinsiz özel güvenlik birimi veya şirketi kurmak, çalışma izni olmadan ÖGG çalıştırmak adli suçtur.',
              'Silahını kanuna aykırı şekilde görev alanı dışında kullanan veya kimliğini başkasına kullandıran ÖGG’ye idari para cezası verilir ve çalışma izni iptal edilir; bu kişiler bir daha ÖGG olamaz.',
              'Grev yasağına uymayan, ateşli silahını görev alanı dışında kullanan veya kimliğini başkasına kullandıranların kimlikleri iptal edilir.',
            ],
            examTip:
              'Görev sırasında kimlik kartını yakasına takmayan özel güvenlik görevlisine yetki kullanma hakkı tanınmaz ve idari para cezası uygulanır.',
          },
        ],
      },
    ],
  },
  {
    id: 'guvenlik_tedbirleri',
    title: 'Güvenlik Tedbirleri',
    shortTitle: 'Güvenlik Tedbirleri',
    subtitle: 'Devriye, nokta koruma, arama-yakalama, şüpheli paket, tutanak ve olay yeri',
    emoji: '🛡️',
    color: '#10B981',
    examQuestionCount: 20,
    chapters: [
      {
        id: 'tedbir-1',
        chapterNumber: 1,
        title: 'Devriye Hizmetleri ve Yöntemleri',
        summary: 'Devriyenin görevleri, hazırlık aşaması ve 4 temel devriye yöntemi.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'Devriyenin Tanımı ve Amaçları',
            paragraphs: [
              'Devriye; belirli bir sorumluluk bölgesinde suç işlenmesini önlemek, güvenliği sağlamak, tehlikeleri önceden tespit etmek ve acil durumlara ilk müdahaleyi yapmak amacıyla yaya, araçlı veya motorize olarak yapılan dolaşma faaliyetidir.',
              'Devriye hizmetleri; Önleyici (caydırıcı), Koruyucu, Yardım ve Adli görevler olmak üzere 4 temel fonksiyona sahiptir.',
            ],
            bullets: [
              'Devriye en az 2 personelden oluşur. Tek başına devriye mecbur kalınmadıkça yapılmaz.',
              'Devriye görevlileri görev öncesi teçhizat (telsiz, el feneri, cop, kelepçe, not defteri, kalem, düdük) kontrolü yapmalıdır.',
              'Devriye güzergâhı ve saatleri suçlular tarafından tahmin edilememesi için rutin olmamalıdır.',
            ],
          },
          {
            heading: 'Devriye Yöntemleri',
            paragraphs: [
              'Görev bölgesinin büyüklüğüne, risk durumuna ve fiziki yapısına göre dört farklı devriye yöntemi uygulanır:',
            ],
            bullets: [
              'Olağan (Rutin) Devriye: Belirli bir plan ve programa bağlı kalmaksızın, görev bölgesinin rastgele gezilmesidir.',
              'Dairesel Devriye: Sorumluluk alanının merkezden dışa veya dıştan merkeze doğru dairesel hareketle kontrol edilmesidir.',
              'Geri Dönüşlü Devriye: Kritik ve hassas bölgelerde gidilen güzergâhtan tekrar geri dönülerek kontrol yapılmasıdır.',
              'Planlı Devriye: Yetkili amirler tarafından önceden belirlenmiş güzergâh, kontrol noktası ve saatlere göre yapılan devriyedir.',
            ],
            examTip:
              'Devriye esnasında iki görevli yan yana yürürken silahlı olan personel, silah taşıdığı tarafı duvar/bina veya açık tehdit yönünden koruyacak şekilde konumlanmalıdır.',
          },
        ],
      },
      {
        id: 'tedbir-2',
        chapterNumber: 2,
        title: 'Nokta Koruma ve Kontrol Noktaları',
        summary: 'Sabit nokta kuralları, ziyaretçi kabulü, araç kontrolü ve devir-teslim.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'Kontrol Noktasının İşleyişi',
            paragraphs: [
              'Kontrol noktaları, tesis veya kurumun giriş-çıkışlarında yetkisiz kişi, araç ve yasaklı maddelerin içeri girmesini engellemek amacıyla oluşturulan ilk savunma hattıdır.',
            ],
            bullets: [
              'Ziyaretçi kabulünde kimlik doğrulanır, ziyaret edilecek birimden teyit alınır, ziyaretçi kartı verilir ve kayıt defterine işlenir.',
              'Araç kontrolünde sürücüden motoru durdurması ve bagajı kendisinin açması istenir; araç altı kontrol aynası ile şasi bölgesi incelenir.',
              'Sabit nokta görevlisi, nöbet yerini izinsiz ve devir-teslim yapmadan kesinlikle terk edemez; nöbet alanında uyuyamaz, ziyaretçi ağırlayamaz.',
            ],
          },
          {
            heading: 'Nöbet Devir-Teslim Kuralları',
            paragraphs: [
              'Vardiya değişiminde görev devir-teslimi yüz yüze yapılır. Nöbet defteri, demirbaş teçhizat (telsiz, silah, anahtarlar, cihazlar) ve vardiya içinde yaşanan önemli olaylar karşılıklı kontrol edilerek imza altına alınır.',
            ],
            examTip:
              'Nöbet devir-tesliminde gelen görevli gelmeden mevcut görevli noktayı terk edemez; durumu derhal amirine bildirir.',
          },
        ],
      },
      {
        id: 'tedbir-3',
        chapterNumber: 3,
        title: 'Arama, Yakalama ve Emanete Alma Uygulamaları',
        summary: 'Önleme ve adli arama farkı, yakalama usulü ve emanete alma tutanağı.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'Önleme Araması ve Kontrol Esasları',
            paragraphs: [
              'Özel güvenlik görevlilerinin yaptığı giriş kontrolleri "önleyici kontrol" niteliğindedir. Kişi duyarlı kapıdan geçirilir, sinyal alınması halinde el tipi metal dedektörü ile kontrol edilir ve eşyaları X-Ray cihazından geçirilir.',
              'Arama/kontrol yaptırmak istemeyen kişi zorla aranamaz; ancak o kişinin korunan alana girişine izin verilmez.',
            ],
            bullets: [
              'Kadın ziyaretçilerin el dedektörü ile kontrolü kadın güvenlik görevlisi tarafından yapılır.',
              'Çanta ve bavul kontrolünde eşyaya görevli değil, kişinin kendisi dokunarak açmalıdır.',
              'Arama sırasında suç unsuru veya tehlikeli madde tespit edilirse eşya emanete alınır, tutanak düzenlenir ve derhal genel kolluğa bilgi verilir.',
            ],
          },
          {
            heading: 'Yakalama ve Kelepçe Kullanımı',
            paragraphs: [
              'Suçüstü halinde yakalanan kişinin kaçmasını veya kendisine/çevresine zarar vermesini önlemek için gerekli tedbirler alınır. Yakalanan kişi derhal genel kolluğa teslim edilir ve "Yakalama Tutanağı" düzenlenir.',
            ],
            examTip:
              '18 yaşından küçük çocuklara kural olarak kelepçe takılmaz. Yakalanan kişiye hakları bildirilir ve sağlık/güvenlik riski varsa kolluğa bilgi verilir.',
          },
        ],
      },
      {
        id: 'tedbir-4',
        chapterNumber: 4,
        title: 'Şüpheli Şahıs, Şüpheli Paket ve Eşkâl Tarifi',
        summary: 'Bomba ihbarı, şüpheli pakette 4 kural ve doğru eşkâl tarifi unsurları.',
        estimatedMinutes: 6,
        sections: [
          {
            heading: 'Şüpheli Paket / Bomba İhbarında Hareket Tarzı',
            paragraphs: [
              'Sahipsiz, alışılmadık yerde bırakılmış, kablo/pil/yağ lekesi/koku veya ses çıkaran paketler şüpheli paket olarak değerlendirilir.',
            ],
            bullets: [
              'Pakete KESİNLİKLE dokunulmaz, açılmaz, yeri değiştirilmez ve üzerine su dökülmez.',
              'Paketin yakınında TELSİZ ve CEP TELEFONU KULLANILMAZ (radyo frekansları fünyeyi tetikleyebilir).',
              'Çevre emniyeti alınarak en az 100 metre güvenlik çemberi oluşturulur ve bina/alan tahliye edilir.',
              'Derhal 112 Acil / Genel Kolluk bomba imha ekibine haber verilir.',
            ],
            examTip:
              'Şüpheli pakette sınavın altın kuralı: Dokunma, telsiz/telefon kullanma, güvenlik şeridi çek ve genel kolluğa haber ver!',
          },
          {
            heading: 'Eşkâl Tarifi Unsurları',
            paragraphs: [
              'Eşkâl tarifi; bir olayın failini veya kayıp kişiyi tanımaya yarayan fiziksel ve giyim özelliklerinin sistematik olarak tanımlanmasıdır. Yukarıdan aşağıya doğru (baş-yüz-gövde-giyim-ayırıcı izler) aktarılır.',
            ],
            bullets: [
              'Cinsiyet, tahmini yaş, boy ve kilo/yapı (zayıf, atletik, kilolu)',
              'Saç rengi/şekli, yüz şekli, göz rengi, sakal/bıyık, gözlük',
              'Ayırıcı özellikler: Yara izi, dövme, aksama, konuşma/şive özellikleri',
              'Giyim bilgileri: Üst/alt kıyafet rengi, şapka, ayakkabı, taşıdığı çanta',
            ],
          },
        ],
      },
      {
        id: 'tedbir-5',
        chapterNumber: 5,
        title: 'Not Alma, Rapor ve Tutanak Çeşitleri',
        summary: 'Tutanak bölümleri, şekil şartları ve olay/yakalama/teslim tutanakları.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'Tutanak Yazım Kuralları ve Bölümleri',
            paragraphs: [
              'Tutanak; bir olayın, durumun veya işlemin tespit edilerek belgelendirilmesi amacıyla düzenlenen resmi yazılı belgedir. Tutanaklarda kişisel yorum, tahmin ve duygusal ifadelere yer verilmez; yalnızca görülen, duyulan ve somut olarak tespit edilen gerçekler yazılır.',
            ],
            bullets: [
              'Başlık: Tutanağın konusuna göre büyük harflerle ortaya yazılır (ör. OLAY TESPİT TUTANAĞI).',
              'Giriş: Tarih, saat, yer ve olaya ilişkin temel bilgiler.',
              'Gelişme (Metin): Olayın oluş sırasına göre açık, kısa ve nesnel anlatımı (5N1K: Ne, Nerede, Ne zaman, Nasıl, Neden, Kim).',
              'Sonuç: "İşbu tutanak tarafımızca okunarak doğruluğu imza altına alınmıştır." ibaresi.',
              'Tarih, Saat ve İmzalar: Düzenleyen görevlilerin adı, soyadı, sicil/kimlik numarası ve imzaları.',
            ],
          },
          {
            heading: 'Başlıca Tutanak Çeşitleri',
            paragraphs: [
              'Özel güvenlik görevlilerinin görev süresince en sık düzenlediği tutanak türleri şunlardır:',
            ],
            bullets: [
              'Olay Tespit Tutanağı: Görev alanında meydana gelen her türlü adli/idari olayı belgeler.',
              'Yakalama Tutanağı: Suçüstü veya haklarında yakalama emri bulunan kişilerin yakalanmasında düzenlenir.',
              'Emanete Alma Tutanağı: Buluntu, terk edilmiş veya tehlikeli eşyaların teslim alınmasında düzenlenir.',
              'Teslim-Tesellüm Tutanağı: Yakalanan şahıs veya emanet eşyanın genel kolluğa ya da sahibine tesliminde düzenlenir.',
              'Yangın / Müracaat / Nöbet Devir-Teslim Tutanakları.',
            ],
            examTip:
              'Tutanak kâğıdının sadece bir yüzü kullanılır, silinti/kazıntı yapılmaz; hata yapılırsa yanlış kelimenin üzeri tek çizgiyle çizilip yanına paraf atılır.',
          },
        ],
      },
      {
        id: 'tedbir-6',
        chapterNumber: 6,
        title: 'Olay Yeri Koruma, Deliller ve Telsiz Haberleşmesi',
        summary: 'Olay yerinin muhafazası, 4 delil türü ve telsiz konuşma kuralları.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'Olay Yeri Koruma ve İlk Ekip Görevleri',
            paragraphs: [
              'Suçun işlendiği, delillerin bulunduğu alan "olay yeri"dir. Olay yerine ilk ulaşan özel güvenlik görevlisi, genel kolluk gelene kadar olay yerini şerit çekerek koruma altına alır.',
            ],
            bullets: [
              'Öncelik daima yaralı varsa can kurtarmaktır; sağlık ekibinin olay yerine giriş-çıkış güzergâhı kayıt altına alınır.',
              'Olay yerine ilgisiz kişiler (basın, meraklı vatandaş, yetkisiz amir/personel) kesinlikle sokulmaz.',
              'Delillere dokunulmaz, yerleri değiştirilmez; yağmur/rüzgâr gibi hava şartlarına karşı korunur.',
              'Olay yerinde sigara içilmez, bir şey yenilip içilmez, su/lavabo veya telefon kullanılmaz.',
            ],
          },
          {
            heading: 'Delil Türleri',
            paragraphs: [
              'Suçu ve faili ispatlamaya yarayan maddi bulgular dört ana grupta incelenir:',
            ],
            bullets: [
              'Biyolojik Deliller: Kan, kıl, tükürük, ter, doku parçaları (DNA analizi yapılabilir).',
              'Kimyasal Deliller: Barut artığı, patlayıcı kalıntısı, boya, zehir, uyuşturucu maddeler.',
              'Fiziksel Deliller: Silah, kovan, çekirdek, cam kırığı, kumaş parçası, belge.',
              'İz Delilleri: Parmak izi, avuç izi, ayakkabı izi, araç lastik izi, alet/zorlama izi.',
            ],
          },
          {
            heading: 'Telsiz Haberleşme Kuralları',
            paragraphs: [
              'Telsiz konuşmaları kısa, net, anlaşılır ve resmi kodlarla yapılmalıdır. Mandal (PTT) tuşuna basıldıktan 1–2 saniye sonra konuşulmalı, gizli bilgiler ve kişisel sohbetler telsizden kesinlikle aktarılmamalıdır.',
            ],
            examTip:
              'Olay yerinden elde edilen parmak izi "İz Delili", kan ve kıl "Biyolojik Delil", boş kovan ise "Fiziksel Delil" grubuna girer.',
          },
        ],
      },
    ],
  },
  {
    id: 'genel_kolluk',
    title: 'Genel Kollukla İlişkiler ve KAAN',
    shortTitle: 'Genel Kolluk & KAAN',
    subtitle: 'Genel kolluk iş birliği, KAAN uygulaması, ÖGNET ve devir-teslim esasları',
    emoji: '🚓',
    color: '#0EA5E9',
    examQuestionCount: 4,
    chapters: [
      {
        id: 'kolluk-1',
        chapterNumber: 1,
        title: 'Genel Kolluk – Özel Güvenlik İlişkisi',
        summary: 'Polis, jandarma ve sahil güvenlik ile tamamlayıcı çalışma prensipleri.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Genel Kolluk ve Özel Güvenlik Ayrımı',
            paragraphs: [
              'Türkiye’de genel kolluk kuvvetleri; belediye sınırları içinde Emniyet Genel Müdürlüğü (Polis), belediye sınırları dışında Jandarma Genel Komutanlığı ve deniz yetki alanlarında Sahil Güvenlik Komutanlığıdır.',
              'Özel güvenlik görevlileri, genel kolluğun görev ve yetkilerini devralmaz; kamu güvenliğini tamamlayıcı nitelikte görev yaparlar. Genel kolluk olay yerine geldiğinde, özel güvenlik görevlileri derhal genel kolluğun emir ve talimatlarına uyar.',
            ],
            lawNote:
              '5188 Sayılı Kanun Md. 6: Mülki idare amirleri, kamu güvenliğinin gerektirdiği hallerde özel güvenlik izni verilen yerlerde alınan özel güvenlik tedbirlerini denetlemeye ve yetersiz bulduğu takdirde ek önlemler aldırmaya yetkilidir.',
          },
          {
            heading: 'Ortak Görev ve Devir-Teslim',
            paragraphs: [
              'Özel güvenlik görevlileri, görev alanlarında işlenen suçları, yakaladıkları şüphelileri ve emanete aldıkları suç eşyalarını en kısa sürede genel kolluğa bildirmek ve tutanakla teslim etmekle yükümlüdür.',
            ],
            bullets: [
              'Genel kolluk olay yerine intikal ettiğinde olay yerinin sorumluluğu genel kolluğa devredilir.',
              'Özel güvenlik görevlileri görgü tanığı veya ilk müdahale ekibi olarak bildiklerini objektif şekilde kolluğa aktarır.',
              'Genel kolluğun görev alanına giren bir durumda görevlinin yetkisini aşması hukuki ve cezai sorumluluk doğurur.',
            ],
          },
        ],
      },
      {
        id: 'kolluk-2',
        chapterNumber: 2,
        title: 'KAAN Uygulaması ve Bildirim Süreçleri',
        summary: 'Genel Kolluk – Özel Güvenlik İş Birliği ve Entegrasyonu (KAAN) sistemi.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'KAAN Uygulaması Nedir?',
            paragraphs: [
              'KAAN (Genel Kolluk – Özel Güvenlik İş Birliği ve Entegrasyonu) Uygulaması, Emniyet Genel Müdürlüğü Özel Güvenlik Denetleme Başkanlığı tarafından hayata geçirilen; kamu hastaneleri, AVM’ler, havalimanları, üniversiteler, toplu taşıma merkezleri gibi alanlarda görev yapan özel güvenlik görevlileri ile genel kolluğun etkin iletişim ve koordinasyonunu sağlayan projedir.',
            ],
            bullets: [
              'Amaç: Olayları meydana gelmeden önce önlemek, meydana gelen olaylara en seri şekilde müdahale etmek ve delilleri sağlıklı korumaktır.',
              'KAAN Mobil Uygulaması / İletişim Kanalları üzerinden şüpheli şahıs, araç, paket veya asayiş olayları anlık olarak ilgili kolluk birimine (112 / İl Emniyet) bildirilir.',
              'Özel güvenlik görevlileri, KAAN eğitimlerini alarak bildirim kodları ve koordinasyon usulleri konusunda yetkilendirilir.',
            ],
            examTip:
              'Sınavda KAAN’ın açılımı ve amacı sıkça sorulur: "Genel Kolluk – Özel Güvenlik İş Birliği ve Entegrasyonu" uygulamasıdır.',
          },
        ],
      },
      {
        id: 'kolluk-3',
        chapterNumber: 3,
        title: 'ÖGNET Sistemi ve Denetim Esasları',
        summary: 'Özel Güvenlik Bilgi Sistemi Otomasyonu (ÖGNET) ve periyodik denetimler.',
        estimatedMinutes: 3,
        sections: [
          {
            heading: 'ÖGNET ve Bildirim Yükümlülükleri',
            paragraphs: [
              'ÖGNET (Özel Güvenlik Bilgi Sistemi Otomasyonu), özel güvenlik şirketleri, eğitim kurumları, görevliler, silahlar ve çalışma izinlerinin EGM tarafından elektronik ortamda takip edildiği merkezi sistemdir.',
            ],
            bullets: [
              'ÖGG’lerin işe başlama ve işten ayrılma bildirimleri 15 gün içinde valiliğe (ÖGNET üzerinden) yapılır.',
              'İçişleri Bakanlığı ve valilikler, özel güvenlik birimlerini ve şirketlerini her zaman denetleme yetkisine sahiptir.',
              'Denetimlerde kimlik kartı, üniforma, silah ruhsatı, mali sorumluluk sigortası ve nöbet kayıtları kontrol edilir.',
            ],
          },
        ],
      },
    ],
  },
];
