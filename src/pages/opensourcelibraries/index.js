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

  const [items, setItems] = useState({});

  async function getData() {
    const result = await APIService.getMaterialVS();
    const { digitalaxMaterialV2S } = result;
    if (digitalaxMaterialV2S) {
      let data = {};
      for (const item of digitalaxMaterialV2S) {
        const res = await fetch(item.tokenUri);
        const rdata = await res.json();
        if (rdata["image_url"] && rdata["Designer ID"]) {
          const designerId = rdata["Designer ID"];
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
      console.log('==data: ', data, Object.keys(data));
      // setItems(result.digitalaxMaterialV2S.filter(item => item.image));
    }
  }

  useEffect(() => {
    getData();    
  }, []);

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
