import React from 'react';
import "./PopupCss/Popup.css";

const FilterPopup = () => {
  return (
    <>
      <div className="popup-container">
        <div
          className="popup-item-container">
          <div className="popup-head">
            <p className='popup-title'>
              Filter
            </p>
            <span class="material-icons popup-close-btn">
              close
            </span>
          </div>
          <div className="popup-content">

          </div>
        </div>
      </div>
    </>
  )
};

export default FilterPopup;