import React, { useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import kebabCase from 'lodash.kebabcase';
import ImportantProductInformation from '@containers/important-product-information';
import SmallPhotoWithText from '@components/small-photo-with-text';
import { getDesignerInfoById } from '@selectors/designer.selectors';
import { getCardProductChartOptions } from '@services/graph.service';
import { create2KURL } from '@services/imgix.service';
import { getImageForCardProduct } from '@helpers/photo.helpers';
import { PRODUCTS } from '@constants/router-constants';
import { useTokenInfo } from '@hooks/token.info.hooks';

// import styles from './styles.module.scss';
// import './styles.modules.css';

const CircleMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const [currentMenuItem, setCurrentMenuItem] = useState(0);
  const arr = [1, 2, 3, 4, 5, 6];
  const menuStyle = (item) => {
    return {
      transform: `rotate(${item * 30 + 30 * (item - 1)}deg)`
    }
  }

  const menuItemStyle = (item) => {
    return {
      transform: `rotate(-${360/arr.length*item}deg)`,
      backgroundImage: `url('/images/designers/item_${item}.jpeg')`
    }
  }

  return (
      <div className="section">
        <div className={cn("menuContainer", { 'active': currentMenuItem != 0 })}>
          <a className={cn("centerBtn", { 'active': menuOpen })} onClick={() => setMenuOpen(!menuOpen)}>+</a>
          {currentMenuItem != 0 && (<a className="closeBtn" onClick={() => setCurrentMenuItem(0)}>🏠</a>)}
          <ul className={cn("menu", { 'active': menuOpen })} style={menuStyle(currentMenuItem)}>
            {arr.map(item => (
              <li
                key={item}
                onClick={() => setCurrentMenuItem(item)}
                // onMouseOver={() => setCurrentImg(item)}
                // onMouseLeave={() => setCurrentImg(0)}
                style={menuItemStyle(item)}>
                <a>
                  <span className="icon">{item}</span>
                </a>
              </li>
            ))}

          </ul>
          <svg height="0" width="0">
            <defs>
              <clipPath clipPathUnits="objectBoundingBox" id="sector">
                <path
                  fill="none"
                  stroke="#111"
                  strokeWidth="1"
                  className="sector"
                  d="M0.5,0.5 l0.5,0 A0.5,0.5 0 0,0 0.75,.066987298 z"
                ></path>
              </clipPath>
            </defs>
          </svg>
        </div>

        <div className={cn("detailContents", { "active": currentMenuItem != 0 })}>
          <div className="bg-gray-400 h-1/2 p-20 text-center">Lorem ipsum dolor sit amet</div>
          <div className="bg-gray-200 h-1/2 p-20 text-center">Lorem ipsum dolor sit amet</div>
        </div>

        {/* <div className={cn("imageContents", { "active": currentImg != 0 })} style={{backgroundIamge: `url('/images/designers/item_${currentImg}.jpeg')`}}>
        </div> */}
        {/* <div className="detailContents">
        <p className="text-white">Its Gold Dev</p>
      </div> */}
    </div>
  );
};

export default CircleMenu;
