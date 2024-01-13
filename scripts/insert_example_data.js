const BASE_URL = "http://localhost:8080/uun-hrajemespolu-maing01/22222222222222222222222222222222/";
// const BASE_URL = "https://uuappg01-dev-eu-c-3.plus4u.net/uun-bpmi23wczdl05-maing01/8b2adc5c4c21a996b1e7dc70764d4a12/";

const TOKEN = "";

async function call(useCase, dtoIn) {
    return await fetch(BASE_URL + useCase, {
        method: "POST",
        body: JSON.stringify(dtoIn),
        headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json"
        }
    });
}

async function createGallery(dtoIn) {
    let resp = await call("gallery/create", dtoIn);
    resp = await resp.json();
    return resp.id;
}

async function createSportsField(dtoIn) {
    let resp = await call("sportsField/create", dtoIn);
    return resp;
}

(async function() {
    let galleryId;

    // Zapůjčeno z https://www.zebetinsky-dvur.cz/brno/sport/bowling

    galleryId = await createGallery({
        "images": [
            {
                "imageName": "Bowlingová dráha",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/1828-bowling-zebetin.jpg"
            },
            {
                "imageName": "Bowlingová dráha",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/cache/235.jpg"
            },
            {
                "imageName": "Bowlingová dráha",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/cache/236.jpg"
            },
            {
                "imageName": "Bowlingová dráha",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/cache/237.jpg"
            },
            {
                "imageName": "Bowlingová dráha",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/cache/238.jpg"
            }
        ]
    });
    await createSportsField({
        sportsFieldName: "Bowlingová dráha 1",
        sportsFieldDesc: `Bowlingová dráha 1 je vybavena plně automatizovanou bowlingovou drahou od renomovaného světového výrobce Schmid, který se pyšní dlouholetou tradicí. Tato bowlingová dráha je navíc vybavena tzv. "Bumpery" (možno vypnout), které ocení zejména nejmenší hráči. Tyto "Bumpery" jsou výsuvné boční bariéry, jež zajistí, že vaše ratolesti shodí nějakou kuželku s každým hodem. Své skóre můžete sledovat a porovnávat pomocí interaktivního skórovacího softwaru. Celkovou atmosféru skvěle doplňuje interiérový design s 3D a UV efekty.`,
        galleryId
    });

    galleryId = await createGallery({
        "images": [
            {
                "imageName": "Bowlingová dráha",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/1828-bowling-zebetin.jpg"
            },
            {
                "imageName": "Bowlingová dráha",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/cache/235.jpg"
            },
            {
                "imageName": "Bowlingová dráha",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/cache/236.jpg"
            },
            {
                "imageName": "Bowlingová dráha",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/cache/237.jpg"
            },
            {
                "imageName": "Bowlingová dráha",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/cache/238.jpg"
            }
        ]
    });
    await createSportsField({
        sportsFieldName: "Bowlingová dráha 2",
        sportsFieldDesc: `Bowlingová dráha 2 je vybavena plně automatizovanou bowlingovou drahou od renomovaného světového výrobce Schmid, který se pyšní dlouholetou tradicí. Tato bowlingová dráha je navíc vybavena tzv. "Bumpery" (možno vypnout), které ocení zejména nejmenší hráči. Tyto "Bumpery" jsou výsuvné boční bariéry, jež zajistí, že vaše ratolesti shodí nějakou kuželku s každým hodem. Své skóre můžete sledovat a porovnávat pomocí interaktivního skórovacího softwaru. Celkovou atmosféru skvěle doplňuje interiérový design s 3D a UV efekty.`,
        galleryId
    });

    galleryId = await createGallery({
        "images": [
            {
                "imageName": "Badminton",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/251-badminton.jpg"
            },
            {
                "imageName": "Badminton",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/cache/252.jpg"
            },
            {
                "imageName": "Badminton",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/cache/253.jpg"
            },
            {
                "imageName": "Badminton",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/cache/254.jpg"
            }
        ]
    });
    await createSportsField({
        sportsFieldName: "Badminton",
        sportsFieldDesc: `Bowlingová dráha 2 je vybavena plně automatizovanou bowlingovou drahou od renomovaného světového výrobce Schmid, který se pyšní dlouholetou tradicí. Tato bowlingová dráha je navíc vybavena tzv. "Bumpery" (možno vypnout), které ocení zejména nejmenší hráči. Tyto "Bumpery" jsou výsuvné boční bariéry, jež zajistí, že vaše ratolesti shodí nějakou kuželku s každým hodem. Své skóre můžete sledovat a porovnávat pomocí interaktivního skórovacího softwaru. Celkovou atmosféru skvěle doplňuje interiérový design s 3D a UV efekty.`,
        galleryId
    });

    galleryId = await createGallery({
        "images": [
            {
                "imageName": "Squash",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/261-squash.jpg"
            },
            {
                "imageName": "Squash",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/cache/262.jpg"
            },
            {
                "imageName": "Squash",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/cache/263.jpg"
            },
            {
                "imageName": "Squash",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/cache/264.jpg"
            }
        ]
    });
    await createSportsField({
        sportsFieldName: "Squash",
        sportsFieldDesc: `Sportovní areál hotelového resortu nabízí jedinečný zážitek pro milovníky squashu s jedním moderním a kvalitním squashovým kurtem. Tento kurt byl vybudován z špičkových materiálů od renomovaného světového výrobce Fibersin, což zajišťuje optimální podmínky pro hru. Jeho podlaha je pak pečlivě zpracována pomocí materiálů a technologií od společnosti Junckers, známé svou kvalitou a odolností.

Squashový kurt v našem areálu je navržen s důrazem na maximální pohodlí hráčů a zachování standardů světové úrovně. Prostředí je pečlivě stíněno od rušivých vnějších vlivů, což poskytuje ideální prostředí pro váš sportovní výkon. Naše zařízení vám také nabízí možnost výpůjčky vybavení a profesionálních trenérů, kteří vám rádi pomohou zdokonalit vaši hru. Věříme, že naším squashovým kurtem získáte nejen skvělý sportovní zážitek, ale i maximální komfort a péči.`,
        galleryId
    });

    galleryId = await createGallery({
        "images": [
            {
                "imageName": "Fotbal 2in2",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/282-fotbal-2in2.jpg"
            },
            {
                "imageName": "Fotbal 2in2",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/cache/283.jpg"
            },
            {
                "imageName": "Fotbal 2in2",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/cache/284.jpg"
            },
            {
                "imageName": "Fotbal 2in2",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/cache/285.jpg"
            },
            {
                "imageName": "Fotbal 2in2",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/cache/1842.jpg"
            }
        ]
    });
    await createSportsField({
        sportsFieldName: "Fotbal 2in2",
        sportsFieldDesc: `Jedná se o inovativní trend, který postupně proniká do povědomí milovníků fotbalu a rychlých technických sportů. V České republice již existuje několik klubů, které se výhradně zaměřují na tento atraktivní sport. Tato nová disciplína představuje fyzicky náročnou aktivitu, která si získává stále větší oblibu.

Hraje se v uzavřeném kurtu s umělým trávníkem v optimálním počtu dvou proti dvěma hráčům. Formát dvou na dva je ideální pro skupiny týmů, které se střídají po jednotlivých zápasech. Tato dynamická varianta fotbalu na umělém povrchu přináší nový rozměr sportovního zážitku, a to zejména díky intenzivním a rychlým akcím na omezeném prostoru. Věříme, že tato inovativní aktivita získává na popularitě a přinese nové vzrušující možnosti pro milovníky fotbalu a sportovních výzev.`,
        galleryId
    });

    galleryId = await createGallery({
        "images": [
            {
                "imageName": "Beach kurt",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/305-beach-kurt.jpg"
            },
            {
                "imageName": "Beach kurt",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/cache/302.jpg"
            },
            {
                "imageName": "Beach kurt",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/cache/303.jpg"
            },
            {
                "imageName": "Beach kurt",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/cache/304.jpg"
            },
            {
                "imageName": "Beach kurt",
                "imageURL": "https://www.zebetinsky-dvur.cz/_data/section-1/cache/1844.jpg"
            }
        ]
    });
    await createSportsField({
        sportsFieldName: "Beach kurt",
        sportsFieldDesc: `V bezprostřední blízkosti se nachází outdoor beach kurt, který je ideálním místem pro pořádání turnajů v beachvolejbalu nebo plážovém fotbale s přáteli.

Pro oba tyto sporty jsme připraveni poskytnout veškeré potřebné vybavení, které si můžete za úplatu půjčit. Ať už se rozhodnete pro rychlý a dynamický beachvolejbal nebo plážový fotbal, zajistíme, abyste měli k dispozici veškeré potřebné vybavení pro skvělý zážitek ze hry.

Po skončení zápasu a sportovních aktivit můžete relaxovat a osvěžit se na Letní terase nebo v našem sportbaru. Odtud si můžete vychutnat nápoje a lahodné pochoutky, abyste doplnili energii a sdíleli radost ze sportovního dne s přáteli. Vaše sportovní a společenské zážitky budou umocněny příjemnou atmosférou a pohodlným prostředím naší Letní terasy.`,
        galleryId
    });
})();