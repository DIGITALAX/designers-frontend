import Dropdown from '@components/Dropdown';
import cn from 'classnames';
import React, { useState } from 'react';
import styles from './styles.module.scss';

const GetDressed = () => {
  const [outfit, setOutfit] = useState(null);
  const [description, setDescription] = useState('');
  const [outfitVersion, setOutfitVersion] = useState(null);
  const [outfitPosition, setOutfitPosition] = useState([]);
  const [outfitRender, setOutfitRender] = useState(null);
  const [outfitChracter, setOutfitCharacter] = useState(null);
  const [outfitNetwork, setOutfitNetwork] = useState(null);
  const [outfitStake, setOutfitStake] = useState(null);
  const [outfitPeriod, setOutfitPeriod] = useState(null);
  const [amount, setAmount] = useState(null);
  const outfits = [
    {
      name: 'Hat',
      img: '/images/dressed/hat 1.png',
    },
    {
      name: 'Dressed',
      img: '/images/dressed/dress 1.png',
    },
    {
      name: 'Shift',
      img: '/images/dressed/casual-t-shirt- 1.png',
    },
    {
      name: 'Pants',
      img: '/images/dressed/trousers 1.png',
    },
    {
      name: 'Shoes',
      img: '/images/dressed/sport-shoe 1.png',
    },
    {
      name: 'Sunglasses',
      img: '/images/dressed/circular-sunglasses 1.png',
    },
    {
      name: 'Jewellery',
      img: '/images/dressed/necklace 1.png',
    },
    {
      name: 'Swimwear',
      img: '/images/dressed/bikini-one-piece-swimwear 1.png',
    },
    {
      name: 'Full Outfit',
      img: '/images/dressed/outfit 1.png',
    },
  ];
  const outfitVersions = [
    'High fidelity 3D, 2D art style + in-game',
    'High fidelity 3D + in-game',
    '2D art style + in-game',
    'In-game/mod only',
    'High fidelity 3D only',
    '2D art style only',
    'High fidelity 3D +2D art style',
  ];
  const outfitPositions = [
    'Decentraland',
    'Cryptovoxels',
    'Roblox',
    'Minecraft',
    'Among Us',
    'Some other game mod I outlined in description box',
  ];
  const outfitRenders = [
    'STILL IMAGE',
    'RUNWAY WALK ANIMATION',
    'TURNTABLE ANIMATION',
    'DANCE ANIMATION',
    'WALK ON SPOT ANIMATION',
  ];
  const outfitCharacters = ['WITH MODEL', 'WITHOUT MODEL'];
  const outfitNetworks = ['Polygon Network', 'Ethereum Network'];
  const outfitStakes = ['YES', 'NO'];
  const outfitPeriods = ['YES', 'No, I’m good'];

  const showOutfitPositions = () => {
    const pos = outfitVersions.indexOf(outfitVersion);
    return pos !== -1 && pos <= 3;
  };

  const showOutfitRenders = () => {
    const pos = outfitVersions.indexOf(outfitVersion);
    return pos === 0 || pos === 1 || pos === 4 || pos === 6;
  };

  const showOutfitCharacters = () => {
    const pos = outfitVersions.indexOf(outfitVersion);
    return pos !== 3 && pos !== -1;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Get Dressed by the GDN for the Metaverse</div>
      <div className={styles.subTitle}>
        Get measured by the web3 tailors. Take a look at the menu of what’s in season and tell us
        how good you want to look. The metaverse awaits your style.
        <span>
          All looks include the 3D source file and are sent as a 721 NFT. If you choose to include
          an open source patterns, materials or textures, 1155 NFTs are also linked under the{' '}
          <a href="https://designers.digitalax.xyz/fractional/" target="_blank" rel="noreferrer">
            {' '}
            Fractional Garment Ownership standard.{' '}
          </a>{' '}
        </span>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>
          Choose the parts of your outfit you’d like to have tailored.
        </div>
        <div className={styles.outfitsWrapper}>
          {outfits.map((item) => (
            <div className={styles.outfitsItem} key={item.name} onClick={() => setOutfit(item)}>
              <div
                className={cn(
                  styles.imageWrapper,
                  outfit?.name === item.name ? styles.active : styles.deactive
                )}
              >
                <img src={item.img} alt="" />
                <div className={styles.outfitName}>{item.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.descriptionLabel}>
          Give us a brief description and overview of how you’d like to be dressed & where we should
          take inspiration from.
        </div>
        <textarea
          className={styles.description}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.optionsWrapper}>
          <div className={styles.optionItem}>
            <div className={styles.optionLabel}>What versions of your outfit would you like?</div>
            <Dropdown
              options={outfitVersions}
              value={outfitVersion}
              onChange={(v) => setOutfitVersion(v)}
            />
          </div>
          {showOutfitPositions() && (
            <div className={styles.optionItem}>
              <div className={styles.optionLabel}>Where would you like to wear your outfit?</div>
              <Dropdown
                multi
                options={outfitPositions}
                value={outfitPosition}
                onChange={(v) => {
                  if (outfitPosition.includes(v))
                    setOutfitPosition([...outfitPosition.filter((position) => position !== v)]);
                  else setOutfitPosition([...outfitPosition, v]);
                }}
              />
            </div>
          )}
          {/* </div>
        <div className={styles.optionsWrapper}> */}
          {showOutfitRenders() && (
            <div className={styles.optionItem}>
              <div className={styles.optionLabel}>
                Would like the high fidelity art collectible version to be still or animation
                render?
              </div>
              <Dropdown
                options={outfitRenders}
                value={outfitRender}
                onChange={(v) => setOutfitRender(v)}
              />
            </div>
          )}
          {showOutfitCharacters() && (
            <div className={styles.optionItem}>
              <div className={styles.optionLabel}>
                Do you want just the garment or it worn by a model/character?
                <span className={styles.tooltip}>
                  <img src="/images/dressed/question.png" alt="" />
                  <div className={styles.body}>
                    This is in reference to the high fidelity 3D or 2D art collectible render.
                  </div>
                </span>
              </div>
              <Dropdown
                options={outfitCharacters}
                value={outfitChracter}
                onChange={(v) => setOutfitCharacter(v)}
              />
            </div>
          )}
          {/* </div>
        <div className={styles.optionsWrapper}> */}
          <div className={styles.optionItem}>
            <div className={styles.optionLabel}>
              Would you like the NFT to be minted on Ethereum or Polygon network?
            </div>
            <Dropdown
              options={outfitNetworks}
              value={outfitNetwork}
              onChange={(v) => setOutfitNetwork(v)}
            />
          </div>
          <div className={styles.optionItem}>
            <div className={styles.optionLabel}>
              Would you like to be able to stake your NFT for crypto yield?
            </div>
            <Dropdown
              options={outfitStakes}
              value={outfitStake}
              onChange={(v) => setOutfitStake(v)}
            />
          </div>
          {/* </div>
        <div className={styles.optionsWrapper}> */}
          <div className={styles.optionItem}>
            <div className={styles.optionLabel}>
              Estimated Delivery is{' '}
              <a
                href="https://docs.google.com/spreadsheets/d/1Bhr7ly9xPXPLpIPNzK8Jaye_0RVyRnazjq-zsBety1I/edit?usp=sharing"
                target="_blank"
                rel="noreferrer"
              >
                2 weeks
              </a>
              . Would you like to accelerate the delivery?
            </div>
            <Dropdown
              options={outfitPeriods}
              value={outfitPeriod}
              onChange={(v) => setOutfitPeriod(v)}
            />
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.amountLabel}>
          Every item has a reserve price, for your order it is{' '}
          <a
            href="https://docs.google.com/spreadsheets/d/1Bhr7ly9xPXPLpIPNzK8Jaye_0RVyRnazjq-zsBety1I/edit?usp=sharing"
            target="_blank"
          >
            2 $MONA
          </a>
          , bid up to tempt the best tailors!
        </div>
        <input
          className={styles.amount}
          placeholder="Enter an amount above reserve"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.submitLabel}>Make sure you are connected to Polygon Network.</div>
        <button type="button" className={styles.submit}>
          Submit Purchase & Get Dressed!
        </button>
      </div>
    </div>
  );
};

export default GetDressed;
