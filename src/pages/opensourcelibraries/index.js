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

  const [items, setItems] = useState({});

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
            name: rdata["attributes"] && rdata["attributes"].length > 0 && rdata["attributes"][0].value,
            image: rdata["image_url"],
            description: rdata["description"]
          })
        }
      }
      setItems(data);
    }
  }

  useEffect(() => {
    getData();    
  }, []);

  return (
    <div style={{ marginBottom: 30 }}>
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
      </Grid>
    </div>
  );
}

export default Libraries;
