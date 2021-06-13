import React, { useEffect } from "react";
import Icon from '@material-ui/core/Icon';
import { InputBase, Fade, Popper, Tooltip, Button } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import styles from "./styles.module.scss";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

function Input(props) {
  const { label, required, description, value, onChange, disabled = false } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState('');
  const handleHover = (text) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
    setText(text);
    console.log("WOW")
  };

  const handleLeave = () => {
    setAnchorEl(null);
  };
  return (
    <div className="flex flex-col mt-10">
      
      <div className="flex">
        <span className="font-inter font-extrabold text-gray-50 text-sm mb-2">{label}</span>
        {required && 
        <LightTooltip title={description} placement="right">
          <span className="questionMark">?</span>
        </LightTooltip>
        }

      </div>
      <InputBase disabled={disabled} value={value} onChange={onChange} className="pl-3 border-1 border-third bg-white h-9" />
    </div>
  );
}

export default Input;
