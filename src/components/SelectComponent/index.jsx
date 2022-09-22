import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from 'styled-components';

const SelectContainer = styled.div`

  .select-container-main{
    background: #fff;
    margin-bottom: 15px;

    .MuiOutlinedInput-notchedOutline{
      border: 1px solid #cccccc!important;
      box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
      color: #1a1a1a;
      border-radius: 0;

    }
    #demo-simple-select{
      padding: 11px 14px;
      font-size: 13px;
    }
  }

  .label-text{
    text-align: left;
    font-weight: 555;
    font-size: 14px;
    padding-bottom: 10px;
  }


`;

export default function BasicSelect(props) {

    /**
     * 
     * @param {*
     *      onChange: (),
     *      label,
     *      value,
     *      opitons
     *      optionLabelKey
     *      optionValueKey
     *      opitons
     *      opitons
     *      opitons
     * } props 
     */



  const handleChange = (event) => {
    props.onChange(event.target.value)
  };

  return (
    <SelectContainer>
      {props.label && <div className="hor-row label-text">
          { props.label }
      </div>}
      <Box sx={{ minWidth: 120 }} className = 'select-container-main' >
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.value}
            onChange={handleChange}
          >
            {props.options?.map((item, index)=>(
              <MenuItem value={item[props.optionValueKey || 'value']} key = { 'option' + index }>
                { item[props.optionLabelKey || 'label'] }
              </MenuItem>
            ))}
            
          </Select>
        </FormControl>
      </Box>
    </SelectContainer>
  );
}
