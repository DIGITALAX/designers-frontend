import { useDispatch, useSelector } from 'react-redux';
import Dropdown from '@components/Dropdown';
import { getAccount } from '@selectors/user.selectors';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styles from './styles.module.scss';
import { getUser } from '@helpers/user.helpers';
import { openConnectMetamaskModal, openSignupModal } from '@actions/modals.actions';
import apiService from '@services/api/espa/api.service';
import dressedActions from '@actions/dressed.actions';
import { getChainId, getExchangeRateETH, getMonaPerEth } from '@selectors/global.selectors';
import {
  POLYGON_MAINNET_CHAINID, MUMBAI_TESTNET_CHAINID
} from '@constants/global.constants'

const GetDressed = () => {
  const dispatch = useDispatch();
  const [outfit, setOutfit] = useState([]);
  const [description, setDescription] = useState('');
  const [outfitVersion, setOutfitVersion] = useState(null);
  const [outfitPosition, setOutfitPosition] = useState([]);
  const [outfitRender, setOutfitRender] = useState(null);
  const [outfitCharacter, setOutfitCharacter] = useState(null);
  const [outfitNetwork, setOutfitNetwork] = useState(null);
  const [outfitStake, setOutfitStake] = useState(null);
  const [outfitPeriod, setOutfitPeriod] = useState(null);
  const [amount, setAmount] = useState(null);
  const [outfitPattern, setOutfitPattern] = useState('');
  const [estimatedTimeline, setEstimatedTimeline] = useState(0);
  const account = useSelector(getAccount);
  const chainId = useSelector(getChainId);
  const user = useSelector(getUser);
  const monaPerEth = useSelector(getMonaPerEth);
  const exchangeRateETH = useSelector(getExchangeRateETH);
  const outfits = [
    {
      name: 'Hat',
      img: '/images/dressed/hat 1.png',
    },
    {
      name: 'Dress',
      img: '/images/dressed/dress 1.png',
    },
    {
      name: 'Shirt',
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
    'High fidelity 3D + 2D art style',
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
  const [mainPrice, setMainPrice] = useState(0);
  const [characterPrice, setCharacterPrice] = useState(0);
  const [networkPrice, setNetworkPrice] = useState(0);
  const [periodPrice, setPeriodPrice] = useState(0);
  const [renderPrice, setRenderPrice] = useState(0);
  const [gamePrice, setGamePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isMonaApproved, setIsMonaApproved] = useState(false);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const prices = [
    {
      Hat: 350,
      Dress: 600,
      Shirt: 450,
      Pants: 370,
      Shoes: 350,
      Sunglasses: 200,
      Jewellery: 250,
      Swimwear: 300,
      'Full Outfit': 1600,
    },
    {
      Hat: 110,
      Dress: 350,
      Shirt: 300,
      Pants: 280,
      Shoes: 250,
      Sunglasses: 150,
      Jewellery: 170,
      Swimwear: 150,
      'Full Outfit': 650,
    },
  ];

  console.log('account: ', account)

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

  const checkOutfitVersionType = () => {
    const res = [];
    if (outfitVersion?.includes('High fidelity 3D')) {
      res.push(0);
    }
    if (outfitVersion?.includes('2D art style')) {
      res.push(1);
    }

    return res;
  };

  const calculateTimeline = () => {
    const ids = checkOutfitVersionType();
    let timeline = 0;
    if (ids.includes(0)) {
      timeline = 7;
      if (outfit.includes('Full Outfit') || outfitRender) {
        timeline = 10.5;
      }
      if (outfitCharacter === outfitCharacters[0]) {
        timeline = 14;
      }
      if (outfitPeriod === outfitPeriods[0]) {
        timeline = 4;
      }
    } else if (ids.includes(1)) {
      timeline = 2;
      if (outfitPeriod === outfitPeriods[0]) {
        timeline = 1;
      }
      if (outfitVersion?.includes('game')) {
        timeline = 7;
      }
    } else if (outfitVersion?.includes('game')) {
      timeline = 7;
    }
    setEstimatedTimeline(timeline);
  };

  useEffect(() => {
    calculateTimeline();
  }, [
    outfit,
    outfitVersion,
    outfitCharacter,
    outfitNetwork,
    outfitStake,
    outfitPeriod,
    outfitPosition,
    outfitRender,
  ]);

  const getVal = value => {
    if (isNaN(value)) return 0
    return value
  }

  useEffect(() => {
    setTotalPrice(
      getVal(mainPrice) + getVal(characterPrice) + getVal(networkPrice) + getVal(periodPrice) + getVal(renderPrice) + getVal(gamePrice)
    );
  }, [mainPrice, characterPrice, networkPrice, periodPrice, renderPrice, gamePrice]);

  useEffect(() => {
    if (outfitVersion && outfit.length) {
      let price = 0;
      const ids = checkOutfitVersionType();
      
      ids.forEach((id) => {
        outfit.forEach((fit) => {
          price += getVal(prices[id][fit]);
        });
      });
      
      setMainPrice(price);
    } else {
      setMainPrice(0);
    }
  }, [outfitVersion, outfit]);

  useEffect(() => {
    const ids = checkOutfitVersionType();
    if (outfitCharacter && (ids.includes(0) || ids.includes(1))) {
      if (outfitCharacter === outfitCharacters[0]) {
        let price = 0;
        if (ids.includes(0)) {
          price += 400;
        }
        if (ids.includes(1)) {
          price += 100;
        }
        setCharacterPrice(price);
      } else {
        setCharacterPrice(0);
      }
    } else {
      setCharacterPrice(0);
    }
  }, [outfitCharacter, outfitVersion]);

  useEffect(() => {
    const ids = checkOutfitVersionType();
    if (outfitNetwork && (ids.includes(0) || ids.includes(1))) {
      if (outfitNetwork === outfitNetworks[1]) {
        setNetworkPrice(50 * ids.length);
      } else {
        setNetworkPrice(0);
      }
    } else {
      setNetworkPrice(0);
    }
  }, [outfitNetwork, outfitVersion]);

  useEffect(() => {
    const ids = checkOutfitVersionType();
    if (outfitPeriod && (ids.includes(0) || ids.includes(1))) {
      if (outfitPeriod === outfitPeriods[0]) {
        let price = 0;
        if (ids.includes(0)) {
          price += 300;
        }
        if (ids.includes(1)) {
          price += 20;
        }
        setPeriodPrice(price);
      } else {
        setPeriodPrice(0);
      }
    } else {
      setPeriodPrice(0);
    }
  }, [outfitPeriod, outfitVersion]);

  useEffect(() => {
    const ids = checkOutfitVersionType();
    if (outfitRender && (ids.includes(0) || ids.includes(1))) {
      if (outfitRender !== outfitRenders[0]) {
        if (ids.includes(0)) {
          let prices = [130, 70, 150, 100];
          setRenderPrice(prices[outfitRenders.indexOf(outfitRender) - 1]);
          return;
        }
      }
      setRenderPrice(0);
    } else {
      setRenderPrice(0);
    }
  }, [outfitRender, outfitVersion]);

  useEffect(() => {
    if (outfitPosition && outfitVersion?.includes('game')) {
      const prices = [600, 200, 200, 200, 200, 200];
      let price = 0;
      outfitPosition.forEach((position) => {
        price += prices[outfitPositions.indexOf(position)] * outfit.length;
      });
      setGamePrice(price);
    } else {
      setGamePrice(0);
    }
  }, [outfitPosition, outfit, outfitVersion]);

  useEffect(() => {
    if (!account) return
    dressedActions.isApproved(account, chainId).then(isApproved => {
      setIsMonaApproved(isApproved)
    })
    
  }, [chainId, account])

  const onRequestApprove = async () => {
    // setLoading(true)
    await dressedActions.approveMona(account, chainId)
    const isApproved = await dressedActions.isApproved(account, chainId)
    setIsMonaApproved(isApproved)
  }

  console.log('chainId: ', chainId)


  const onSubmit = async () => {
    if (chainId != POLYGON_MAINNET_CHAINID && chainId != MUMBAI_TESTNET_CHAINID) {
      toast(
        'Please switch to Polygon Network.'
      )
      return;
    }

    if (!account) {
      dispatch(openConnectMetamaskModal());
      return;
    }

    if (!user) {
      dispatch(openSignupModal());
      return;
    }
    if (!mainPrice) {
      window.alert("You must select at least one outfit and outfit version.");
      return;
    }

    if (!isMonaApproved) {
      onRequestApprove();
      return;
    }

    const monaPrice = totalPrice / (monaPerEth * exchangeRateETH);

    try {
      const realPrice = parseFloat(amount) > monaPrice ? amount : monaPrice;

      const res = await apiService.saveDressedInfo({
        wallet: account,
        outfit: outfit,
        outfitPattern,
        description,
        outfitVersion,
        outfitPosition,
        outfitRender,
        outfitCharacter,
        outfitNetwork,
        outfitStake,
        outfitPeriod,
        file1: file1,
        file2: file2,
        file3: file3,
        amount: realPrice,
      });
      
      await dressedActions.sendMona(account, chainId, realPrice);
      setGamePrice(0);
      setTotalPrice(0);
      setRenderPrice(0);
      setPeriodPrice(0);
      setNetworkPrice(0);
      setCharacterPrice(0);
      setMainPrice(0);
    } catch (e) {
      console.log({ e });
    }
  };

  const fileChange = async (e, fileIndex) => {
    let files = e.target.files || e.dataTransfer.files;
    if (files.length === 0) {
      return ;
    }

    const url = await dressedActions.uploadImage(files[0]);

    if (fileIndex === 1) setFile1(url); 
    if (fileIndex === 2) setFile2(url);
    if (fileIndex === 3) setFile3(url);

    return url;
  }

  console.log('totalPrice: ', totalPrice)
  console.log('monaPerEth: ', monaPerEth)
  console.log('exchangeRateETH: ', exchangeRateETH)

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Get Dressed by the GDN for the Metaverse</div>
      <div className={styles.subTitle}>
        Get measured by the web3 tailors. Take a look at the menu of what’s in season and tell us
        how good you want to look. The metaverse awaits your style. After paying for your order 
        the Web3 Tailors will be in contact with you through your connected email.
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
            <div
              className={styles.outfitsItem}
              key={item.name}
              onClick={() => {
                if (outfit.includes(item.name)) {
                  setOutfit(outfit.filter((fit) => fit !== item.name));
                } else {
                  setOutfit([...outfit, item.name]);
                }
              }}
            >
              <div
                className={cn(
                  styles.imageWrapper,
                  outfit.includes(item.name) ? styles.active : styles.deactive
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
        <div className={styles.fileLabel}>
          Upload some reference images & inspiration for your outfit. 
        </div>
        <div className={styles.fileuploads}>
          <button className={styles.fileupload}>
            {file1 ? <img src={file1} /> : <div className={styles.uploadbutton}> file upload </div>}
            <input type="file" onChange={(e) => fileChange(e, 1)} />
          </button>
          <button className={styles.fileupload}>
            {file2 ? <img src={file2} /> : <div className={styles.uploadbutton}> file upload </div>}
            <input type="file" onChange={(e) => fileChange(e, 2)} />
          </button>
          <button className={styles.fileupload}>
            {file3 ? <img src={file3} /> : <div className={styles.uploadbutton}> file upload </div>}
            <input type="file" onChange={(e) => fileChange(e, 3)} />
          </button>
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
                value={outfitCharacter}
                onChange={(v) => setOutfitCharacter(v)}
              />
            </div>
          )}
          <div className={styles.optionItem}>
            <div className={styles.optionLabel}>
              Include pattern, material or texture from the open source 1155 on-chain libraries?
              <span className={styles.tooltip}>
                <img src="/images/dressed/question.png" alt="" />
                <div className={styles.body}>
                  Check out <a href="/" target="_blank">this page here</a> to choose.
                </div>
              </span>
            </div>
            <input
              placeholder="Enter the name/s of the pattern, material, texture from the library. "
              value={outfitPattern}
              onChange={(e) => {
                setOutfitPattern(e.target.value)
              }}
            />
          </div>
          <div className={styles.optionItem}>
            <div className={styles.optionLabel}>
              Estimated Delivery is{' '}
              <span>
                {estimatedTimeline >= 7
                  ? `${estimatedTimeline / 7 === 1 ? '1 week' : `${estimatedTimeline / 7} weeks`}`
                  : `${estimatedTimeline === 1 ? '1 day' : `${estimatedTimeline} days`}`}
              </span>
              . Would you like to accelerate the delivery?
            </div>
            <Dropdown
              options={outfitPeriods}
              value={outfitPeriod}
              onChange={(v) => setOutfitPeriod(v)}
            />
          </div>
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
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.amountLabel}>
          Every item has a reserve price, for your order it is{' '}
          <span>{(totalPrice / (monaPerEth * exchangeRateETH)).toFixed(2)} $MONA</span>, bid up to
          tempt the best tailors!
        </div>
        <input
          type="number"
          step="0.01"
          min={(totalPrice / (monaPerEth * exchangeRateETH)).toFixed(2)}
          className={styles.amount}
          placeholder="Enter an amount above reserve"
          value={amount}
          onBlur={(e) => {
            if (amount < (totalPrice / (monaPerEth * exchangeRateETH)).toFixed(2)) {
              setAmount((totalPrice / (monaPerEth * exchangeRateETH)).toFixed(2));
            }
          }}
          onChange={(e) => {
            setAmount(e.target.value)
          }}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.submitLabel}>Make sure you are connected to Polygon Network. You will be sent an NFT with confirmation of your order and we will be in contact with you soon!</div>
        <button type="button" className={styles.submit} onClick={onSubmit}>
          {
            isMonaApproved
              ? 'Submit Purchase & Get Dressed!'
              : 'Approve Mona Spend'
          }
        </button>
      </div>
    </div>
  );
};

export default GetDressed;
