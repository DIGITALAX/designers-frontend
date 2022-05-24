import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { EXCLUSIVE_RARITY, COMMON_RARITY, SEMI_RARE_RARITY } from '@constants/global.constants';
import secondDesignerData from 'src/data/second-designers.json';

import APIService from '@services/api/api.service';
import api from '@services/api/espa/api.service';

import DesignerProfileTopPart from '@components/DesignerProfile/TopPart';
import DesignerProfileBottomPart from '@components/DesignerProfile/BottomPart';

import styles from './styles.module.scss';

const RARITIES = [COMMON_RARITY, EXCLUSIVE_RARITY, SEMI_RARE_RARITY];

const getRarityNumber = (rarity) => RARITIES.findIndex((item) => item == rarity);

const DesignerPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [designerInfo, setDesignerInfo] = useState(null);
  const [materialList, setMaterialList] = useState([]);
  const [marketplaceItems, setMarketplaceItems] = useState([]);

  async function loadData() {
    const designers = (await api.getAllDesigners()) || [];
    // console.log('designers: ', designers)
    const designer = designers.find(
      (item) =>
        item.designerId.toLowerCase() === id.toLowerCase() ||
        (item.newDesignerID && item.newDesignerID.toLowerCase() === id.toLowerCase())
    );

    setDesignerInfo(designer);

    if (id !== 'F₃Manifesto') {
      const thumbnails = await api.getAllThumbnails();

      const secondaryProducts = secondDesignerData.filter((data) =>
        data.designer.find(
          (designerItem) =>
            designerItem.toLowerCase() === designer.designerId.toLowerCase() ||
            (designer.newDesignerID &&
              designer.newDesignerID.toLowerCase() === designerItem.toLowerCase())
        )
      );

      // console.log('secondaryProducts: ', secondaryProducts)

      const thumbnailObj = {};
      const blockedList = [];
      for (const thumbnail in thumbnails.data) {
        const thumbItem = thumbnails.data[thumbnail];
        thumbnailObj[thumbItem.image_url] = thumbItem.thumbnail_url;
        if (thumbItem.blocked) {
          blockedList.push(thumbItem.image_url);
        }
      }

      console.log('thumbnailObj: ', thumbnailObj);

      // setThumbnailList(thumbnailObj)

      const idLabel = 'Designer ID';

      const result = await APIService.getMaterialVS();
      const { digitalaxMaterialV2S } = result;

      const { digitalaxCollectionGroups } = await APIService.getCollectionGroups();
      const { digitalaxModelCollectionGroups } = await APIService.getModelCollectionGroups();
      // console.log('digitalaxCollectionGroups: ', digitalaxCollectionGroups)
      const auctionItems = [];
      const secondaryAuctions = secondaryProducts.filter((item) => item.isAuction == 1);
      const secondaryCollections = secondaryProducts.filter((item) => item.isAuction == 0);
      digitalaxCollectionGroups.forEach((group) => {
        if (group?.auctions && !(group?.auctions?.length === 1 && group?.auctions[0].id === '0')) {
          auctionItems.push(
            ...group?.auctions
              ?.filter((auctionItem) => {
                return (
                  auctionItem.designer?.name.toLowerCase() ===
                    designer['designerId'].toLowerCase() ||
                  secondaryAuctions.find((secondary) => secondary.id == auctionItem.id)
                );
              })
              .map((item) => {
                // console.log('item: ', item)
                return {
                  ...item.garment,
                  isAuction: 1,
                };
              })
          );
        }
        // console.log('-- current designer: ', designer)
        if (!(group.collections.length === 1 && group.collections[0].id === '0')) {
          group.collections
            .filter((collectionItem) => {
              //   console.log(`designer: ${collectionItem.designer.name.toLowerCase()},current: ${designer['newDesignerID'].toLowerCase()}, check: ${
              //     collectionItem.designer.name.toLowerCase() == designer['newDesignerID'].toLowerCase()
              // } `)
              return (
                collectionItem.designer?.name.toLowerCase() ===
                  designer['designerId'].toLowerCase() ||
                (designer['newDesignerID'] &&
                  designer['newDesignerID'] !== '' &&
                  collectionItem.designer?.name.toLowerCase() ===
                    designer['newDesignerID'].toLowerCase()) ||
                secondaryCollections.find(
                  (secondary) =>
                    secondary.id == collectionItem.id &&
                    secondary.rarity == getRarityNumber(collectionItem.rarity)
                )
              );
            })
            .forEach((item) => {
              auctionItems.push(
                ...item.garments.map((garment) => {
                  return {
                    ...garment,
                    rarity: getRarityNumber(item.rarity),
                    isAuction: 0,
                    id: item.id,
                  };
                })
              );
            });
        }
      });

      digitalaxModelCollectionGroups.forEach((group) => {
        // console.log('-- current designer: ', designer)
        if (!(group.collections.length === 1 && group.collections[0].id === '0')) {
          group.collections
            .filter((collectionItem) => {
              console.log(`collectionItem: `, collectionItem);
              return (
                collectionItem.designer?.name.toLowerCase() ===
                  designer['designerId'].toLowerCase() ||
                (designer['newDesignerID'] &&
                  designer['newDesignerID'] !== '' &&
                  collectionItem.designer?.name.toLowerCase() ===
                    designer['newDesignerID'].toLowerCase()) ||
                secondaryCollections.find(
                  (secondary) =>
                    secondary.id == collectionItem.id &&
                    secondary.rarity == getRarityNumber(collectionItem.rarity)
                )
              );
            })
            .forEach((item) => {
              auctionItems.push(
                ...item.garments.map((garment) => {
                  return {
                    ...garment,
                    isModel: true,
                    rarity: getRarityNumber(item.rarity),
                    isAuction: 0,
                    id: item.id,
                  };
                })
              );
            });
        }
      });

      setMarketplaceItems(auctionItems);
      console.log('auctionItems: ', auctionItems);

      const materials = [];
      console.log('digitalaxMaterialV2S: ', digitalaxMaterialV2S);
      let noThumbnailData = [];
      // console.log('designer id: ', designer)
      if (digitalaxMaterialV2S) {
        for (const item of digitalaxMaterialV2S) {
          if (item.attributes.length <= 0) continue;
          try {
            let imageUrl = null;
            let designerId = null;

            imageUrl = item.image == '' ? null : item.image;
            designerId = item.name == '' ? null : item.name;

            if (!imageUrl || !designerId) {
              const res = await fetch(item.tokenUri);
              // console.log('--- item res: ', res)
              const rdata = await res.json();
              // console.log('--- item rdata: ', rdata)

              if (!rdata['image_url'] || !rdata[idLabel]) continue;
              imageUrl = rdata['image_url'];
              designerId = rdata[idLabel];
            }

            if (
              designer['designerId'].toLowerCase() !== designerId.toLowerCase() &&
              (!designer['newDesignerID'] ||
                designer['newDesignerID'] === '' ||
                designer['newDesignerID'].toLowerCase() !== designerId.toLowerCase())
            )
              continue;

            if (!designerId || designerId === undefined || designerId === '') continue;

            if (blockedList.findIndex((item) => item === imageUrl) < 0) {
              if (designer['newDesignerID'] && designer['newDesignerID'] !== undefined) {
                designerId = designer['newDesignerID'];
              }

              // console.log('--rdata: ', rdata)
              if (materials.findIndex((item) => item.image === imageUrl) >= 0) continue;
              materials.push({
                ...item,
                name:
                  item['attributes'] &&
                  item['attributes'].length > 0 &&
                  item['attributes'][0].value,
                image: imageUrl,
                thumbnail: thumbnailObj ? thumbnailObj[imageUrl] : null,
                description: item['description'],
              });

              setMaterialList([...materials]);
            }
          } catch (exception) {
            console.log('exception: ', exception);
          }
        }
      }
    } else {
      const { digitalaxF3MCollectionGroups } = await APIService.getF3MCollectionGroups();
      const auctionItems = [];
      digitalaxF3MCollectionGroups.forEach((group) => {
        if (!(group.collections.length === 1 && group.collections[0].id === '0')) {
          group.collections.forEach((item) => {
            auctionItems.push(
              ...item.garments.map((garment) => {
                return {
                  ...garment,
                  rarity: getRarityNumber(item.rarity),
                  isAuction: 0,
                  id: item.id,
                };
              })
            );
          });
        }
      });
      setMarketplaceItems(auctionItems);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (!designerInfo) {
    return (
      <div className={styles.beforeLoading}>
        <div className={styles.ldsEllipsis}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <DesignerProfileTopPart
        isEdit={false}
        designerInfo={designerInfo}
        materialList={materialList}
        marketplaceItems={marketplaceItems}
      />
      <DesignerProfileBottomPart designerInfo={designerInfo} isEditable={false} />
    </div>
  );
};

export default DesignerPage;
