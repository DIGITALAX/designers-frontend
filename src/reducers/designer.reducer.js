/* eslint-disable max-len */
import { createModule } from 'redux-modules';
import cloneDeep from 'lodash.clonedeep';
import { Map, List } from 'immutable';
import TransformModules from '../utils/transform-modules';

const DEFAULT_FIELDS = Map({
  designersById: Map({}),
  designerGarmentIds: List([]),
  infoByDesignerId: List([
    {
      id: '9',
      designerName: 'Christina Lalch',
      designerPhoto: './images/Christina-Lalch.jpeg',
      descriptionDesigner: [
        'Christina is a futurist designer and visual storyteller. After finishing degrees in Fashion Design, Textile Engineering and Cultural Studies of the Modern Times she’s worked in multiple apparel companies as a pattern engineer, creative design lead, 3D prototyper and consultant in implementing 3D technologies in the production pipeline.',
        'An avid gamer and tech geek from an early age — the quest for innovating in the field of apparel has always been her major goal. After more than 50K hours in the industry (and 6000 coffee cups later), she has now devoted her time to building a multidisciplinary Atelier Atopiae. Focused on creating digital clothes, accessories and humans, she also consults brands on incorporating new tech in their production and marketing strategies.',
        'If she had any spare time, Christina would probably spend it playing Assassin’s Creed or binge-watching Westworld, The Expanse and the History Channel.',
      ],
      designerCountry: 'Bulgaria',
      designerCountryFlagIcon: './images/icons/bulgaria.png',
      designerSocialMedia: List([
        {
          name: 'instagram',
          href: 'https://www.instagram.com/christina.lalch/',
        },
      ]),
    },
    {
      id: '7',
      designerName: '3DBehemoth',
      designerPhoto: './images/3dBehemoth.png',
      descriptionDesigner: [
        'Diego is a 26 year old cloth artist from Alicante, on the east coast of Spain. He is addicted to video games and fashion, and that made him start in the 3D fashion industry less than a year ago',
        'He has always been the weird boy in his childhood, he’s always thought out of the box and had tastes that most people haven’t. His brand and designs are mostly based on that feeling of being weird, the feeling that he’s the only person who likes what he likes and that he’s ok with that.',
        'He has tons of influences, but the most relevant are: Japanese culture, plastic/latex and neon, dark, spooky and cute things. In his designs he loves mixing different concepts to create high contrast between colours, textures and shapes, and to create a feeling of both separation and togetherness.',
      ],
      designerCountry: 'Spain',
      designerCountryFlagIcon: './images/icons/spain.png',
      designerSocialMedia: List([
        {
          name: 'instagram',
          href: 'https://www.instagram.com/3dbehemoth/',
        },
      ]),
    },
    {
      id: '3',
      designerName: 'Edward Harber',
      designerPhoto: './images/Edward-Harber.jpeg',
      descriptionDesigner: [
        'Edward Harber’s creations spring from a cross-pollination of sport, fashion and technology. His roots are in technical high-performance apparel and his work has won Nike gold at ten Olympics, seen action on the battle field, and protected Moto GP riders for Dainese.',
        'Edward is now looking toward the world of women’s high fashion.',
        'His forms fuse fluid rigidity, sculptural intelligence, old-world craft and cutting-edge innovation. The resulting combinations of edgy couture, sensual technology and fearless beauty are both intelligent and surprising.',
      ],
      designerCountry: 'United States',
      designerCountryFlagIcon: './images/icons/usa.png',
      designerSocialMedia: List([
        {
          name: 'website',
          href: ' https://www.shopedwardharber.com/',
        },
      ]),
    },
    {
      id: '6',
      designerName: 'HonoreHL',
      designerPhoto: './images/HonoreHL.jpeg',
      descriptionDesigner: [
        'Hirwa Leon Honore is a 3d artist from Rwanda. He is most experienced with animation, modeling, and shading. His work inspires to simultaneously merge traditional and contemporary culture driven styles, that aim to paint a richly diverse and fantastical picture of digital clothing possibilities and bring about a minimal, yet fashion forward style.',
      ],
      designerCountryFlagIcon: './images/icons/rwanda.png',
      designerSocialMedia: List([
        {
          name: 'instagram',
          href: 'https://www.instagram.com/honorehl/ ',
        },
      ]),
    },
    {
      id: '2',
      designerName: 'Lorena Bello',
      designerPhoto: './images/Lorena-Bellow.jpeg',
      descriptionDesigner: [
        'Designer Paragraph: Lorena Bello is a Spanish 3D Fashion and Graphic Designer. Driven-by her passion for design, she turned her life 180º when in 2013 she decided to change her professional path by leaving her corporate career (She also has a Law Degree) to start completely afresh as a Digital Fashion Designer. From this moment she has followed her passion working in fashion in London, Milan and Madrid.',
      ],
      designerCountry: 'Spain',
      designerCountryFlagIcon: './images/icons/spain.png',
      designerSocialMedia: List([
        {
          name: 'instagram',
          href: 'https://www.instagram.com/studiolobe/?hl=en',
        },
        {
          name: 'website',
          href: 'https://en.studiolobe.com/',
        },
      ]),
    },
    {
      id: '13',
      designerName: 'McAfee.Design',
      designerPhoto: './images/McAfee-Design.jpeg',
      descriptionDesigner: [
        'McAfee.Design is Michael McAfee - Designer and Artist with a background in video production',
        'His solo career consists of projects such as producing promotional visuals for grammy-nominated artist Tycho, and animating for the viral video Animation vs. Minecraft (200 million views). He regularly puts out personal artwork that blurs the line between traditional hand-drawn techniques and modern CGI tool sets - these projects, set within a psychedelic & cyberpunk universe, are released as a series titled "Mecha Ascent."',
        "Before the inception of his solo career, McAfee worked as a designer at an ad agency called FCB. Highlights during his time at FCB include directing the inaugural episode of Ad Age Illustrated for AdAge.com, working on the City of Chicago's pitch to Amazon for HQ2, and executing visual effects on Jeep's 2018 Super Bowl ad. His work at FCB has been celebrated at Cannes, D&AD, and CommArts",
      ],
      designerCountry: 'United States',
      designerCountryFlagIcon: './images/icons/usa.png',
      designerSocialMedia: List([
        {
          name: 'instagram',
          href: 'https://www.instagram.com/mcafee.design/ ',
        },
      ]),
    },
    {
      id: '1',
      designerName: 'Msistema',
      designerPhoto: './images/msistema.jpeg',
      descriptionDesigner: [
        'Msistema is an art director and Motion designer, living in Belgium.',
        'After working in the design Industry for a number of different agencies, he stepped away to start his solo career, focused on specializing in making seamless satisfying CGI loops.',
        'He is an active member of the crypto-art community and a firm believer in the future of cryptocurrencies.',
      ],
      designerCountry: 'Belgium',
      designerCountryFlagIcon: './images/icons/belgium.png',
      designerSocialMedia: List([
        {
          name: 'instagram',
          href: 'https://www.instagram.com/msistema/ ',
        },
        {
          name: 'twitter',
          href: 'https://twitter.com/msistema1',
        },
      ]),
    },
    {
      id: '12',
      designerName: 'Nina Doll',
      designerPhoto: './images/Nina-Doll.jpeg',
      descriptionDesigner: [
        'Designer Paragraph: Nina is originally coming from an analog fashion tailoring background.',
        'She now spends her time experimenting with the creative freedom of the virtual world, where she can create a garment made from any kind of material, can imagine and showcase the clothing in whatever environment that comes to her mind, without any restrictions.',
        'Her main interest currently comes from exploring emotions in the digital space through abstract sculpts.',
      ],
      designerCountry: 'Germany',
      designerCountryFlagIcon: './images/icons/germany.png',
      designerSocialMedia: List([
        {
          name: 'instagram',
          href: 'https://www.instagram.com/dollushka/',
        },
      ]),
    },
    {
      id: '10',
      designerName: 'Rendooo Lab',
      designerPhoto: './images/Rendooo-Lab.jpeg',
      descriptionDesigner: [
        'Rendooo is a humble and always evolving flash-fashion 3D design and development studio.',
        'Rendooo operates at the intersection of fashion and technology fabricating digital samples of the designs of the big names of fast-fashion (and their suppliers) in China, Korea, South Europe and USA.',
        'Rendooo decrypts fast-fashion trends and translates 2D sketches into realistic 3D samples for both physical retailers and gamers alike.',
      ],
      designerCountry: 'Spain',
      designerCountryFlagIcon: './images/icons/spain.png',
      designerSocialMedia: List([
        {
          name: 'instagram',
          href: 'https://www.instagram.com/rendooo_lab',
        },
        {
          name: 'website',
          href: 'http://rendooo.com/ ',
        },
      ]),
    },
    {
      id: '8',
      designerName: 'Stanislav Mclygin',
      designerPhoto: './images/Stanislav Mclygin.jpeg',
      descriptionDesigner: [
        'Stanislav is a digital artist with a long history in the games and film industry.',
        'He is inspired by the world of concept art, product design, and architecture, and brings this inspiration into his digital fashion design approach and workflow.',
        'He is often known for mixing interesting shapes and forms with stylized design to create engaging and unique work.',
      ],
      designerCountry: 'Russia',
      designerCountryFlagIcon: './images/icons/russia.png',
      designerSocialMedia: List([
        {
          name: 'linkedIn',
          href: 'https://www.linkedin.com/in/stan-mclygin-67685454/',
        },
      ]),
    },
    {
      id: '4',
      designerName: 'Vitaly Kovalev',
      designerPhoto: './images/Vitaly-Kovalev.jpeg',
      descriptionDesigner: [
        'Vitaly is a 3d artist and designer.',
        "He is passionate about mixing hard surface technology with organic forms to construct both a highly creative outlook and also great technical grasp of his designs. His work develops realism as he takes inspiration from more of life's simple moments, key heuristics of human nature, and combining this with the fundamental principles of design, drawing, photography and cinematography.",
        'Vitaly believes that with 3D art, we can create things that defy all possibilities, that have never been constructed before. He is currently involved in projects across some of the industries leading fashion brands.',
      ],
      designerCountry: 'Russia',
      designerCountryFlagIcon: './images/icons/russia.png',
      designerSocialMedia: List([
        {
          name: 'website',
          href: 'https://www.artstation.com/levitaru',
        },
      ]),
    },
    {
      id: '15',
      designerName: 'Album Corvum',
      designerPhoto: './images/Album-Corvum.jpeg',
      descriptionDesigner: [
        'Since childhood Album was always drawn to the world of art and visual expression.',
        'In time, he was led towards 3D and design, becoming fascinated by the ability to be able to give life to drawings and digital form.',
        'Album centers his designs around bold styles, colours, and then contrasting this through unifying patterns and extra magnification of select details',
      ],
      designerCountry: 'Ukraine',
      designerCountryFlagIcon: './images/icons/ukraine.png',
      designerSocialMedia: List([
        {
          name: 'instagram',
          href: 'https://www.instagram.com/vlad.voronin.33/ ',
        },
      ]),
    },
    {
      id: '5',
      designerName: 'Xander Smith',
      designerPhoto: './images/Xander-Designer.jpeg',
      descriptionDesigner: [
        'Xander is a founding member and the Lead Digital Artist at Aliza Technologies, where they are working to use AI and deep-learning techniques for animation and character design.',
        'He has a background working as a concept artist in film and television.',
        'Some of his favorite projects include American Horror Story, Aquaman, Godzilla vs. King Kong, and Star Wars: The Mandalorian.',
        'He is excited about the future intersection of character design, deep-learning, and digital fashion',
      ],
      designerCountry: 'United States',
      designerCountryFlagIcon: './images/icons/usa.png',
      designerSocialMedia: List([
        {
          name: 'website',
          href: 'https://www.xandersmithdesign.com/',
        },
      ]),
    },
    {
      id: '20',
      designerName: 'Gwen Kim (JAK 3D)',
      designerPhoto: './images/Gwen photo.jpeg',
      descriptionDesigner: [
        'Gwen aims to bring out minor cultural sensibilities and incorporate them into her fashion. It all started with her preference and interest in Asian visual culture. ',
        'Her works have won her awards in illustrations and other design fields. She is now working with a variety of brands to further highlight her appearance as a digital designer, where she also collaborates regularly across projects in the gaming industry.',
      ],
      designerCountry: 'South Korea',
      designerCountryFlagIcon: './images/icons/southkorea.png',
      designerSocialMedia: List([
        {
          name: 'instagram',
          href: 'https://www.instagram.com/jak_3d/',
        },
      ]),
    },
    {
      id: '21',
      designerName: 'Sasa3dimensions',
      designerPhoto: './images/Elisa photo.jpeg',
      descriptionDesigner: [
        'Elisa is an Italian fashion designer who discovered in 3D, not only an innovative method of design, but a real means of communication.',
        'In 3D she is able to achieve full self expression and create a whole world of meaning and detail around her creations— giving life to something completely new. When she was young she used to steal from her mother’s wardrobe some old forwards or tiny pieces of fabric in order to create the look of her imagination. Years later and nothing has changed. It has just evolved in a constant exchange of impressions and knowledge.',
      ],
      designerCountry: 'Italy',
      designerCountryFlagIcon: './images/icons/italy.png',
      designerSocialMedia: List([
        {
          name: 'instagram',
          href: 'https://www.instagram.com/sasa3dimensions/',
        },
      ]),
    },
    {
      id: '22',
      designerName: 'Alyona Briukhanova',
      designerPhoto: './images/alyona photo.jpeg',
      descriptionDesigner: [
        'Alyona is an independent fashion stylist and visual merchandiser who has been working in 3D innovative technologies and fashion since 2007.',
        'She blends her international work experience with a BA degree in Fashion Styling. In September 2020 she launched a digital styling project — DGTL Stylist. She was also the the Digital-Only Fashion Contest 2020 Gran Prix Winner.',
      ],
      designerCountry: 'Ukraine',
      designerCountryFlagIcon: './images/icons/ukraine.png',
      designerSocialMedia: List([
        {
          name: 'instagram',
          href: 'https://www.instagram.com/dgtl_stylist/',
        },
      ]),
    },
    {
      id: '23',
      designerName: 'Alexander Kurmanin',
      designerPhoto: './images/alex photo.jpeg',
      descriptionDesigner: [
        'Alexander is a clothing designer who sees a future that is all about 3D and digital. His works focus on painting a unique picture of what our clothes might look like when the boundaries and limitations of the physical world are no longer present. He is certain that digital fashion is what will be worn in 20–30 years.',
      ],
      designerCountry: 'Russia',
      designerCountryFlagIcon: './images/icons/russia.png',
      designerSocialMedia: List([
        {
          name: 'instagram',
          href: 'https://www.instagram.com/kurmanin_tailor/',
        },
      ]),
    },
    {
      id: '24',
      designerName: 'AVA3Ddesigners',
      designerPhoto: './images/1_dZjpCBlRAwo02PM2evsDcQ.jpeg',
      descriptionDesigner: [
        'After years of Mina working and tutoring fashion design and dressmaking, and after years of her friend Pegah map-making and freelancing in fashion design, they decided to join forces as a team to create a new way of offering visual delicacies. They gave life to AVA3Ddesigners, mixing passion for artistic designs with advanced technological instruments, where the middle-eastern taste of colors and designs meets the new era of computer designing.',
      ],
      designerCountry: 'Australia',
      designerCountryFlagIcon: './images/icons/au.png',
      designerSocialMedia: List([
        {
          name: 'instagram',
          href: 'https://www.instagram.com/ava3ddesigners/',
        },
      ]),
    },
    {
      id: '25',
      designerName: 'YeKaterina Burmatnova',
      designerPhoto: './images/1_8-FRZqSRY877n84t9Ey7Cg.jpeg',
      descriptionDesigner: [
        'Yekaterina Burmatnova is a Russian transplant living in NYC. She uses her heritage and the city she lives in to drive and inspire her design aesthetic.',
        'She is a dedicated knitwear and sweaters designer that found an escape from everyday life in 3D design. Besides work, here are a few of her favorite things: hanging out with her 2-year old fur baby, Mango, traveling, baking bread and getting tattoos.',
      ],
      designerCountry: 'United States',
      designerCountryFlagIcon: './images/icons/usa.png',
      designerSocialMedia: List([
        {
          name: 'instagram',
          href: 'https://www.instagram.com/yekaterinab/',
        },
      ]),
    },
    {
      id: '18',
      designerName: 'Mar Guixa Studio',
      designerPhoto: './images/Mar-Guixa-Studio.jpeg',
      descriptionDesigner: [
        'Mar Guixa is the founder of Mar Guixa Studio studio— a design studio based in Barcelona. Mar is an emerging virtual fashion designer who loves the interaction of colors and shapes, quality rather than quantity and bringing unique creative concepts behind digitally constructed garments. She believes that the essence of the fashion industry lies in living constantly between reality and art. She is passionate about art, tech and the exploration of creative’s limit',
      ],
      designerCountry: 'Spain',
      designerCountryFlagIcon: './images/icons/spain.png',
      designerSocialMedia: List([
        {
          name: 'website',
          href: 'https://www.marguixastudio.com/',
        },
      ]),
    },
    {
      id: '27',
      designerName: 'María Ruano',
      designerPhoto: './images/maria photo.jpeg',
      descriptionDesigner: [
        'Maria studied fashion at the IED Istituto Europeo de Madrid.',
        'After finishing her studies, she was the winner of the international young talent competition “My Own Show”, where she was able to present her collections in Milan under the support of Franca Sozzani, Vogue Italia and Alberta Ferretti.',
        'For 6 years she led the relaunch and rebranding of the iconic Spanish brand “Amarras”, before conducting the Hacer Virtual Fashion Project, where she creates collections of virtual garments under the Make brand and collaborates with various brands and fashion platforms, both physical and digital.',
      ],
      designerCountry: 'Spain',
      designerCountryFlagIcon: './images/icons/spain.png',
      designerSocialMedia: List([
        {
          name: 'instagram',
          href: 'https://www.instagram.com/hacer_virtualfashion/',
        },
      ]),
    },
    {
      id: '28',
      designerName: 'Burak Dahan',
      designerPhoto: './images/burak photo.jpeg',
      descriptionDesigner: [
        'Right after graduating from Chemistry in 2012, Burak took a distinct change and followed his calling by studying Fashion Design and started to build up a strong career in the industry. His works were recognized by fashion authorities in many design competitions, where he even became the "Gold Award Winner" at the EURASIA REMIX 2016.',
        'Years later when he was introduced to digital fashion, he fell in love with this new world of design possibilities and expanded his creativity to a new level by escaping from restrictions and norms of the physical world. His works reflect versatility and there is no limit when it comes to his source of inspiration. ',
      ],
      designerCountry: 'Turkey',
      designerCountryFlagIcon: './images/icons/turkey.png',
      designerSocialMedia: List([
        {
          name: 'instagram',
          href: 'https://www.instagram.com/burak.dahan/',
        },
      ]),
    },
    {
      id: '29',
      designerName: 'Rtfkt',
      designerPhoto: './images/Rtfkt.jpeg',
      descriptionDesigner: [
        'RTFKT is a very eclectic, creator led organisation who built their reputation with unique Sneakers, such as the Cybersneaker or NZXT “Gaming Sneaker”.',
        'Formed by three friends at the beginning of the COVID era, RTFKT was born on the metaverse, and this has defined its feel to this day.',
      ],
      designerCountry: 'United States',
      designerCountryFlagIcon: './images/icons/usa.png',
      designerSocialMedia: List([
        {
          name: 'twitter',
          href: 'https://twitter.com/RTFKTstudios',
        },
      ]),
    },
    {
      id: '30',
      designerName: 'DressX',
      designerPhoto: './images/_IHJ1RVX_200x200.jpg',
      descriptionDesigner: [
        "We strongly believe that the amount of clothing produced today is way greater than humanity needs. We share the beauty and excitement that physical fashion creates, but we believe that there are ways to produce less, to produce more sustainably, and not to produce at all. At a current stage of DressX development, we aim to show that some clothes can exist only in their digital versions. Don't shop less, shop digital fashion.",
      ],
      designerCountry: 'United States',
      designerCountryFlagIcon: './images/icons/usa.png',
      designerSocialMedia: List([
        {
          name: 'twitter',
          href: 'https://twitter.com/dressxcom',
        },
      ]),
    },
  ]),
  designerCID: List([
    'QmeDMVjLR9ZdHiHcUtyK9v623WAZtk5L21rT1inJcV6jES',
    'QmXy1644mEhtz3a45NQoG2EYog9VoEekySb5v9cu3XRTao',
    'QmSDMo73zKtn8GNAbtpDTBAo5LA9CDWAYyymrQ66jV1qsy',
    'QmTP3K8PxCQJpEWz37oRrrGYRV8aj843PjMyz6bhxRZt7Y',
    'QmZAbCduSE23mcXWjWzyc9Qq6owHb51etvcf28krit3fAn',
    'QmRtjzoGdf5uxCdwqCU1pHSSghmRLaEmA68CY6FjeHLbRV',
    'QmSyws8iuUDfcnTkX8HdudFauRdYV5tQbTnStnFS3yxUKx',
    'QmUVDtcDmXUf3tqntFkZy5V3QbCX6CTYzMh4JoKoEiFJGa',
    'QmP7pVdaR48NEnu6oHHpXV4xWS6EoNoqhciS9QJutTooyL',
    'QmVMiuW2yMFFQn5awc4Y9tHMY5PE9w2tSX7wRzx3m7ahKk',
    'QmQGMVBs7szFXufsz5nZKNyXsK8fzM8HfH3zkmcip4zfYS',
    'QmZSTP7QuwxmYJXN5gvtYpwaV9DrmBMsVEZagfNQTYxg9g',
    'QmcbuFHsUqhKdh9NgsFzhLdjuFwFeuuUc2QqRY8BrVXqJg',
    'QmXmrAB7WQmo7uXZSyEobfk7gE9CEq1BNXR3Gt7egSusMc',
    'QmXXb7kCf9s4zssDXe2vHsx3JATGDzJCCVNBWmie42jEgU',
    'QmVNeaLgf9NqCuhmqNpYcc4P5pS2Ap7meMSnSyxeaNmeJG',
    'QmTnwJLNJTUZN8SwngUNwsM98ftfkND21AAZpJ4pX1qEzR',
    'QmXLGkBYwPmT46MsxxvLaoNmX6Mr9u3Eurv8WgdR1iZdHd',
    'QmZxXVbwQ3JpgL1byEn9PAPpV4qHQrWkzN2zdDzJ16M193',
    'Qmb9mVa984gARfQj3npaTvxQBuKnXrV6mgYhTwmyvxNhzg',
    'QmQo5QHgjqwAc8D5e38hUMUTPaRxKxvitv8Qhk9EYSseQr',
    'QmecATW8TNkuWzEeBnKmrvBg5kYCtcXfG6dTVMKKRu2rjY',
    'QmSiKL12E9qoWEhPypkKS3n7pEAzyXhZu9dRyVryMmxTBB',
    'QmRw27eghFFWawVPXqEDMke9Euh9Bks9SktoEeVo5BFvwB',
    'QmayYHdVT84cA93pQ3BE7CJRoMuwqXRSYnc1V6yF6VTT6g',
    'QmU5dnPHPp524eYQiQLhKHxntHKwS56yvRwJyCfAue2Bam',
    'QmXx7NwPw5Bg9AgufPt4FNULddKwycovNjwPFWRafJU9SQ',
    'QmSiBqX8C4VszN77ThwDbP1memTSadsmgGVyFr9AmUcMDP',
    'QmaLF9YiYgdyGcS8db8v8B6YxSZ6E4jz73hFsAB4Liagun',
    'QmNcSTL7iDTeyUtX9j7mA2yfm1VvQ3eTZ18Djg2pZ2sSdN',
    'QmQqUTyCA3Lyj3p7SgcqjceYyMDpThAsZXy9sZNXWAfQKq',
    'QmSKUFNmbt6DgnPBorpkTVTJqnW2ZoUTC2TkNXD21KTevP',
    'Qmbpwbegx36odBYuZW5Gozntv6hSXbczKaBCHbcK7XMHZW',
    'QmXXejGdkZcBYUWF3zjdvJnDHEHiq9TBnUddHQYFuU5i9F',
    'QmXd3Ddox6cNFF7qbvCcfHxZYF8LQbUGzFm5abM45wgyry',
    'QmYKmqm4zkQjcC1V1etdFCSe87ATGYuRSt8N7XCeKFNg6d',
    'QmS41KVS7VxeFJz2RFAV5i22ajTVQk82MJCGeBFiK2X5sG',
    'QmNkzTEESsrrwfFBRnEM7u6G4KFoa4BEBD1LGZDsGnJS9K',
    'QmRhJqp9WZ97pvYMvMSaXzrBpcuCoCn4x2A88cujy5KoFR',
    'QmZRuyjPvAmyipY1XLoKQ2wSN27aSU46oRcFTJBhuKXG4Z',
    'QmV2SUf7jkbSUzpSsy1hzzNW6ZV4mjaqtj4gHaGLG7z9Gz',
    'QmWQ7xxgkPgrYRQw81Esz5hPYvwR1AYhr71gUeczD23VDQ',
    'QmZ57y1NDfL4h2vfaYietaXxNrf2hVn4p5sivBEZPdsE2h',
    'QmZSSNjvnHyzy5tRHRE7Xb9W8Muapy9QgwDYrMmpVCM6BH',
    'QmcDajxjNSP744AZJwbgirDAhWnTzHdSpjcHhQb1DDeoDZ',
    'QmVtjWxkwZm2y1aEgExWxWPyDo6MuPAwSPJ1VVt6MH51s5',
    'QmXYDbNHBghTjSt1mggfhWEwK7LCvBchG5KXHTymWZ825W',
    'QmNXGMowThSXJBvz1tsCHP8VpRU5tQ4dVbyHw6szKCwamC',
    'QmYUdQWmAdUuswCAwpAuy2xVrjNGpBHja3KBoxZ9KPNJRA',
    'QmTLVd8Y8f6uy67adMc3ekA7GnWAFYtj2ZkaLS5D4M94gu',
    'QmdsEp9tH9QC4ktAx7LmVUKx1fsbco2dHPH2AgpqG2umm7',
    'QmZrPqEcG6sqaYKfDBMRA1EnwdUauxdhp686yTmR5wVYVY',
    'QmeqmP3WhcmrJz78NWAKj16udjyeJFKeJL6YyPAbXRQhBv',
    'QmdpAGnL7Y6Wr78Cp88nTqH6JbAp8tpemThzANkxPAgqga',
    'QmW8sY16JHBFDRSS7sSfe7TpsvZDVfgmkai7bTDvtByXqD',
    'QmZ4PP2vzEqj9n1kfpC197YkoCdsWvjLG28f8QDP6HCXXd',
    'QmPcjYYUfWtZbxwrQRA5eWibUQCXh5xUQUut36aYABbbvQ',
    'QmeLycuMWqMvWw697sLipcR8zqSif259hQXmJCVRqXfnmE',
    'QmQ124iWZq1j8vYUvoogYAsbezHGihRoGTqFgWA7i8svLf',
    'QmYAhyjpNp674htrNv2KQhowFQjnJDwPdZvvvoRopFRSyc',
    'QmbRYAf6Bh5D3ECByCtvUooQHd1fBbGYGsjHALjADa8sEh',
    'QmNrsQcyELHMgkNkdnbHcuNgyKzWcm5qPuRAzNohtNWjPj',
    'QmNTcaJ6TRKroAb8LS3hjN6XyQeWusbniUVbx53U45kYNF',
    'QmRJhwuNS842D8NHstSaBeRtHrASUAq8LCgHEDVFn8BKjz',
    'QmZPYhqdTqkKxSZCysobV8kSQUjRkvRz3xG92aKbumg15s',
    'QmUDdbRPZNCxBL35yUr9NKyiRieH3dHbr1zR8zkXcQfvyH',
    'Qmb2Q7cMSRrp5zvRLK6NnfgYhrb5E8iBfsjV4ZAEtYHJqs',
    'QmaDh9keCHBjMatNeZ8q4q2tbjcr9Um3VwLZM1TjNsuR6r',
    'QmbiPkTECJamSf9w2vgUM3snCQvJxB1B1NnwAEsSvAToUB',
    'QmeeksvDyu8EDh2XLbEXt2K9EiGxSwffoSZrqtN4B7V9v1',
    'QmTpp2Ne6pHKKDCen1RnFt6NfRdWxRCphvh9avQTa2nsgf',
    'QmSY5VG6Nmq7VTLyTxGUxw6wLZeSEe7WMWrDtSnauyiggK',
    'QmX5m5AqmikvTEPMKDmiYu7oZMD3re7kYWcMi8mpB6znFm',
    'QmPYjhdoJo5qZBcV4PBC3v7y2TuqhYAc9GmuVWpuXbPpR9',
    'QmVRcyMe4wJMz7GmxJdt1HyZYH2LvNNLZoPo4KtRDXctbC',
    'QmShShwG53Ap1bznq779EEfFxxgK31BqWTLqxrhxtKysmx',
    'QmcajcKWBZmx7DxMzMHC6phtzk2UVrHA4NFASrLipvQWp8',
    'QmXYxvLX4Pd95gJ96fyW3nMqFJUsmZMJbeFFTai7bHvQuk',
    'QmaFDPrDjKwgg9g3QDAbegg3sKK23m3dVG4dtaFZtoax2Y',
    'QmbsHz97BVYQQxL32z2SoiuG1CPpLchukYgHcnnVN9fzyX',
    'QmawnazFESAdxT6wA3qfPon13F3V96hdFxnXUAxnz9ZbFd',
    'QmXArwa5f4R6ngDKJpELkrdWjzvuRALcTyjdT96RC9vWg1',
    'QmXsk7LHui9yM6UNdwRGqdt85Wb5N2Ws5LFeU3Pfd3z1PQ',
    'Qmbde1u7NFPuQbYz6DSJ2BdFTw6HLqjTCLxPPqfaQCoNEE',
    'QmUkSyTZtp2UKgmHNeKvJ36Uq8tgVWg3jyU2EDbGkQzBcq',
    'QmZ8LFgJbyMSbYghyvC7DijknJo4NCYYsUZ1F6ZhQYbh72',
    'QmSdgNUSUprH4aJcSx2z77gMtdv4w9reRCp1SMV2sL6Dph',
    'QmfLmJqY37MDANfRJWQ4HNWe4gLUBk4aQ4K43aGSVfYJD2',
    'QmQZTjiyWd5kSqmtXYc1XnFL1PW8YKvL7v69Uqn5X2HYqq',
    'QmRqBBUDSjdHfzTAoKAombFoDE4kU7q3jL6AcfnMd3FidZ',
    'QmbuAZqF6PqGxJk3vcBM5EJyiR3G7B4HRxwRcPRv634BWi',
    'QmV6nf689fo56Qr4XwLFtw4CjhD7Kk2tgceJ1b4ZQLQfhv',
    'QmRitnZxbZkZX2aVzL88GBYK1FNQC2gVeBJrz1NCKqu2ta',
    'QmehtAd3wn9YmqyoZCKpqt6Tov6aLCQ1tmgVoaig3o7TBm',
    'QmXBrWfmnJ6rabDyWQMxxcAsm3CZZqxNTDKUvQdXVYec46',
    'QmUMF2bd2ccgZ6goRLESMfjMcGK1Q3nkJkcYwCz45bAKWk',
    'QmNwf2RVgmZvARwvLkP7VLkb2g5a69pMymEThUgDVpBzmU',
    'QmXdkTgLoD7HrD2qF5EVo9zKqaXeZhBV3wwsZgi6oZRCtw',
    'Qmbf1yrcxwKXquSCQ3MNcv7aUpNNRN9TfHtAePXBD3Jrj6',
    'QmRFQegjML8XdiJnza4f8uJsFPz7VsdNLQYrEw5w5i68F6'
  ]),
});

export default createModule({
  name: 'designer',
  initialState: cloneDeep(DEFAULT_FIELDS),
  transformations: cloneDeep(TransformModules(DEFAULT_FIELDS)),
});
