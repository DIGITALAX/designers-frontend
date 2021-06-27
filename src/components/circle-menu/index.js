import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Paper } from "@material-ui/core";

const PiePaths = ({ count }) => {
    const endx = Math.cos((360/count-90)*Math.PI/180)*0.5+0.5;
    const endy = Math.sin((360/count-90)*Math.PI/180)*0.5+0.5;
    
    return  (
        <svg height="0" width="0">
            <defs>
                <clipPath clipPathUnits="objectBoundingBox" id={'sector'+count}>
                    { count !== 1 ? (
                        <path fill="none" stroke="#111" d={"M0.5,0.5 L0.5,0 A0.5,0.5 0 0 1 "+endx+' '+endy+" z"}></path>
                    ) : (
                        <path fill="none" stroke="#111" d="M0.5,0.5 L0.5,0 A0.5,0.5 0 1 1 0.49899999999 0 z"></path>
                    ) }
                </clipPath>
            </defs>
        </svg>
    );
}

const Pie = ({ items, keyName, direction = 'Right' }) => {
    const count = items.length;
    const menu = useRef(null);
    const curImage = useRef(null);
    const imgViewer = useRef(null);
    const title = useRef(null);
    const description = useRef(null);
    
    useEffect(() => {
        setTimeout(() => {
            menu.current.classList.toggle("active");
            menu.current.style.transition = "transform .25s ease-out, opacity .25s ease-in";
        }, 1000);
    }, []);

    const hovered = (item) => {
        curImage.current.style.backgroundImage = `url(${item.image})`;
        imgViewer.current.classList.remove('fadeOut' + direction);
        imgViewer.current.classList.add('fadeIn' + direction);
        title.current.innerHTML = "";
        description.current.innerHTML = item.description;
    }

    const hleave = (when, e) => {
        if((when === 1 && (e.relatedTarget && e.relatedTarget.classList.value.search("curImage") === -1 && e.relatedTarget.classList.value.search("imgViewer") === -1)) 
            || (when === 2)) {
            if(curImage.current !== null) {
                imgViewer.current.classList.remove('fadeIn' + direction);
                imgViewer.current.classList.add('fadeOut' + direction);
            }
        }
    }

    return  (
        <div>
            <section>
                <div className="circlemenu_container">
                    <ul className="circlemenu_ul" ref={menu}>
                        {/* <div>
                            { count > 1 && items.map((item, i) =>
                                <div
                                    className="circlemenu_borders"
                                    style={{
                                        height: 184,
                                        transform:"rotate("+((360/count)*i-180)+"deg)"
                                    }}>
                                </div>
                            )}
                        </div> */}
                        
                        { items.map((item, i) =>
                            <li key={i} 
                                style={{ transform : "rotate(-" + (360/count) * i + "deg)" , clipPath: "url(#sector"+count+")"}}
                                onMouseOver={() => hovered(item)}
                                onMouseOut={(e) => hleave(1,e)}
                            >
                                <img className='circlemenu_piece_img' 
                                    style={{ transform : "rotate(" + (360/count) * i + "deg)" }} 
                                    src={item.image}
                                />
                                {/* <span className='circlemenu_piespan'
                                    style={{ right : (count>6) ? 25 + count/2 + "%" : 25 + "%" , top:100/count+"%",transform:"rotate("+180/count + "deg)"}}>
                                    { item.name }
                                </span> */}
                            </li>
                        )}
                    </ul>
                    <PiePaths count={count} />
                </div>
                <Paper className={"circlemenu_imgViewer fadeOut" + direction} 
                    elevation={3} 
                    ref={imgViewer}
                    onMouseLeave={(e) => hleave(2,e)}
                >
                    <div className="circlemenu_curImage"
                        ref={curImage}
                    >
                        <div className="circlemenu_imgTitle" ref={title}></div>
                        <div className="circlemenu_imgDescription" ref={description}></div>
                    </div>
                </Paper>
                <div style={{ color: 'white', textAlign: 'center' }}>{keyName}</div>
            </section>
        </div>
    );
};

export default Pie;