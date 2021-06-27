import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import CircleMenu from '../../components/circle-menu';
import { Grid } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Popper from '@material-ui/core/Popper';
import InputBase from '@material-ui/core/InputBase';
import Fade from '@material-ui/core/Fade';

import { getAllDesignerCIDs } from '@selectors/designer.selectors';
import APIService from '@services/api/api.service';

function Libraries(props) {

  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false)

  const [items, setItems] = useState({
    "Emma-Jane MacKinnon-Lee": [
        {
            "name": "Pattern",
            "image": "https://digitalax.mypinata.cloud/ipfs/QmPvR5BAnpUFinGcCvQkLcJ5mokomwduPNUp3UXorDMTwD",
            "description": "sdfsd sdfsfs sfsdf "
        }
    ],
    "Maria Pulido": [
        {
            "name": "Pattern",
            "image": "https://digitalax.mypinata.cloud/ipfs/QmTeiSM7FALgcLxtHbfV2TwFzj8pNy8QLV35d5Eu2vwDCh",
            "description": "Poison Ivy Pattern Green Tile."
        },
        {
            "name": "Pattern",
            "image": "https://digitalax.mypinata.cloud/ipfs/QmTeiSM7FALgcLxtHbfV2TwFzj8pNy8QLV35d5Eu2vwDCh",
            "description": "Poison Ivy Pattern Green Tile."
        }
    ],
    "ABigNeonGlitter": [
        {
            "name": "Pattern",
            "image": "https://digitalax.mypinata.cloud/ipfs/QmSKbgpVxmcMRvAcUrABxejnT92Wsg86rw7MskzotsCHJo",
            "description": "This is the first pattern I extracted from a huge 'node' texture/panting made in Blender."
        }
    ],
    "Fabeeo Breen": [
        {
            "name": "Pattern",
            "image": "https://digitalax.mypinata.cloud/ipfs/QmeyZStPtUtb5g9ndudgx3PdTnrxcUhEg4FRWmzrWzJMKL",
            "description": "Ancient CryptoAmber pattern. From stones to data."
        }
    ],
    "Jasmine Beane": [
        {
            "name": "pattern",
            "image": "https://digitalax.mypinata.cloud/ipfs/QmWhdcVSycMYNQ4oDo2D1TVctNySHTSKi3M468EYcbYUAf",
            "description": "Tye dye animal print design with gold lips"
        }
    ],
    "Aisha": [
        {
            "name": "Pattern ",
            "image": "https://digitalax.mypinata.cloud/ipfs/QmSXZjajWAiGRhGuU8NYMmkoRaJYURikeyQaQcPwKmCya4",
            "description": "Burst of colours in a marble pattern"
        }
    ],
    "Majestic Apparell": [
        {
            "name": "Pattern",
            "image": "https://digitalax.mypinata.cloud/ipfs/QmRkvZgafMB6xGUofKLpbFNVEppgcRK88WzVH6iPnhDa67",
            "description": "This pattern features an ash background with dramatic veins in Gray and Subtle golden tones creating an appreciative Luxurious feeling."
        },
        {
            "name": "Pattern",
            "image": "https://digitalax.mypinata.cloud/ipfs/QmRkvZgafMB6xGUofKLpbFNVEppgcRK88WzVH6iPnhDa67",
            "description": "This pattern features an ash background with dramatic veins in Gray and Subtle golden tones creating an appreciative Luxurious feeling."
        },
        {
            "name": "Pattern",
            "image": "https://digitalax.mypinata.cloud/ipfs/QmR2fQg3dEGaMtgZ8ZDjVnmnb5g1U2YfeDVrm659c29Vq3",
            "description": "This pattern features an sky blue background with dramatic veins in Royal Blue and Subtle golden tones creating an appreciative  Luxurious feeling."
        }
    ],
    "Stella Achenbach": [
        {
            "name": "Pattern",
            "image": "https://digitalax.mypinata.cloud/ipfs/QmZ9JAUD464yJH66QJyMJ7qhys5MeMwBsjSBuC1sGAwP4Q",
            "description": "The so-called vanishing twin syndrome inspires my project for this project. The idea of having a twin in your mother’s womb that will not survive the full journey of 9 months is painful yet an organic part of life itself. As a source of inspiration, I used placeholders for\nthe organic flow and the haptics of how something like this must feel if we could remember.\nThis is a four-part series here with:\n01- cyber retro sparkle"
        }
    ],
    "Lorena Bello": [
        {
            "name": "Pattern",
            "image": "https://digitalax.mypinata.cloud/ipfs/Qme47b1HvTAbwzwhoeqmbwmLUg1gDEf4aUaPsTDN5hdniw",
            "description": "Maxi print with abstract flowers, urban and vibrant. Pink Blooms is a digital expressionism artwork based on real bloom pictures. A pattern made to break the reality."
        }
    ]
});

  const designerCIDs = useSelector(getAllDesignerCIDs());

  async function getData() {
    const idLabel = "Designer ID";
    let ids = [];
    for (const cid of designerCIDs) {
      const res = await fetch(`https://digitalax.mypinata.cloud/ipfs/${cid}`);
      const rdata = await res.json();
      ids.push(rdata[idLabel]);
    }
    const result = await APIService.getMaterialVS();
    const { digitalaxMaterialV2S } = result;
    if (digitalaxMaterialV2S) {
      let data = {};
      for (const item of digitalaxMaterialV2S) {
        const res = await fetch(item.tokenUri);
        const rdata = await res.json();
        if (rdata["image_url"] && rdata[idLabel] && ids.includes(rdata[idLabel])) {
          const designerId = rdata[idLabel];
          if (!data[designerId]) {
            data[designerId] = [];
          }
          data[designerId].push({
            name: rdata["attributes"][0].value,
            image: rdata["image_url"],
            description: rdata["description"]
          })
        }
      }
      setItems(data);
      console.log('==data: ', data);
    }
  }

  useEffect(() => {
    // getData();    
  }, []);

  return (
    <div>
      <div className="flex my-5 items-center">
        <img src="/images/on-chain.png" style={{width: "500px", marginLeft: "40px"}} />
        <img src="/images/opensource.png" style={{width: "900px", marginLeft: "50px"}} />
      </div>
      <div className="flex my-5 items-center">
        <img src="/images/llss.png" style={{width: "250px", marginLeft: "40px"}} />
        <img src="/images/nft.png" style={{width: "250px", transform: "rotate(10deg)", marginLeft: "60px"}} />
        <img src="/images/libraries.png" style={{width: "500px", marginLeft: "150px"}} />
      </div>
      <div className="flex justify-center my-10 w-full">
        <img src="/images/texture.png" />
        <img src="/images/material.png" style={{transform: "rotate(4deg)"}}className="mx-10" />
        <img src="/images/pattern.png" />
      </div>
      <div className="flex my-16">
        <img src="/images/designer_contribution.png" className="mx-auto"/>
      </div>
      <Grid container item xs={12}>
        { Object.keys(items).map((key, index) => (
          <Grid container item xs={4} justify="center">
            <CircleMenu items={items[key]} keyName={key} direction={index % 3 < 2 ? "Right" : "Left"} />
          </Grid>
        )) }
        {/* <Grid container item xs={3} justify="center">
          <CircleMenu items={items} />
        </Grid>
        <Grid container item xs={3} justify="center">
          <CircleMenu items={items} direction="Left" />
        </Grid>
        <Grid container item xs={3} justify="center">
          <CircleMenu items={items} direction="Left" />
        </Grid> */}
      </Grid>
    </div>
  );
}

export default Libraries;
