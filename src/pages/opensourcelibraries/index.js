import React, { useState, useEffect } from "react";
import CircleMenu from '../../components/circle-menu';
import { Grid } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Popper from '@material-ui/core/Popper';
import InputBase from '@material-ui/core/InputBase';
import Fade from '@material-ui/core/Fade';

import APIService from '@services/api/api.service';

function Libraries(props) {

  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false)

  const [items, setItems] = useState([
    {
        "animation": "",
        "attributes": [
            {
                "type": "Designer ID",
                "value": "DIGITALAX"
            },
            {
                "type": "Degree of Exclusivity",
                "value": "Common"
            },
            {
                "type": "Issue No.",
                "value": "1.1"
            },
            {
                "type": "Unique Traits",
                "value": "DRIP, Metaversal, REP IRL"
            }
        ],
        "description": "Combat mysterious forces across the realms and summon the gods of space and time to level up throughout your Lucid Adventure.",
        "id": "100001",
        "image": "https://digitalax.mypinata.cloud/ipfs/QmNf1BNYkijdoTjXBJEJWDPT7HGv3oJ4gu3vLRVr4hrE4e",
        "name": "Leveling Warrior",
        "tokenUri": "https://digitalax.mypinata.cloud/ipfs/QmRqBBUDSjdHfzTAoKAombFoDE4kU7q3jL6AcfnMd3FidZ"
    },
    {
        "animation": "",
        "attributes": [
            {
                "type": "Designer ID",
                "value": "DIGITALAX"
            },
            {
                "type": "Degree of Exclusivity",
                "value": "Common"
            },
            {
                "type": "Issue No.",
                "value": "1.2"
            },
            {
                "type": "Unique Traits",
                "value": "DRIP, Metaversal, REP IRL"
            }
        ],
        "description": "Enter a virtual world of floating castles amongst endless skies, where golden hue glow's fashion a transform from amateur to pro.",
        "id": "100002",
        "image": "https://digitalax.mypinata.cloud/ipfs/QmZZdUckQZmwsF45MqHFmMNSrKmGrzjkMNc31jubiV4wvj",
        "name": "Sword Art",
        "tokenUri": "https://digitalax.mypinata.cloud/ipfs/QmbuAZqF6PqGxJk3vcBM5EJyiR3G7B4HRxwRcPRv634BWi"
    },
    {
        "animation": "",
        "attributes": [
            {
                "type": "Designer ID",
                "value": "DIGITALAX"
            },
            {
                "type": "Degree of Exclusivity",
                "value": "Common"
            },
            {
                "type": "Issue No.",
                "value": "1.3"
            },
            {
                "type": "Unique Traits",
                "value": "DRIP, Metaversal, REP IRL"
            }
        ],
        "description": "Keep pace with Shibuya Crossing as you begin your quest for GuildMaster and exchange a token of your pledge.",
        "id": "100003",
        "image": "https://gateway.pinata.cloud/ipfs/QmR6jFA6iMH8HGJwvE8JLAGvjecGncRL41Lt9z3nVUHEgq",
        "name": "Tokyo Web",
        "tokenUri": "https://digitalax.mypinata.cloud/ipfs/QmV6nf689fo56Qr4XwLFtw4CjhD7Kk2tgceJ1b4ZQLQfhv"
    }
]);

  async function getData() {
    const result = await APIService.getMaterialVS();    
    if (result && result.digitalaxMaterialV2S) {
      setItems(result.digitalaxMaterialV2S.filter(item => item.image));
    }
  }

  // useEffect(() => {
  //   getData();    
  // }, []);

  // console.log('===items: ', items)

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
        <Grid container item xs={3} justify="center">
          <CircleMenu items={items} />
        </Grid>
        <Grid container item xs={3} justify="center">
          <CircleMenu items={items} />
        </Grid>
        <Grid container item xs={3} justify="center">
          <CircleMenu items={items} direction="Left" />
        </Grid>
        <Grid container item xs={3} justify="center">
          <CircleMenu items={items} direction="Left" />
        </Grid>
      </Grid>
    </div>
  );
}

export default Libraries;
