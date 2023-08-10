import React from 'react';

function GridSection() {
  return (
    <div className="categories">
      <div className="col">
        <div className="row">
          <img
            className="img"
            src="https://i.pinimg.com/564x/e5/e1/64/e5e164b3ddd0a90a4ca04569e1a3f799.jpg"
            alt=""
          ></img>
        </div>
        <div className="row">
          <img
            className="img"
            src="https://i.pinimg.com/564x/12/f7/23/12f723f4c8e7058f674079f822954c03.jpg"
            alt=""
          ></img>
        </div>
      </div>
      <div className="col">
        <div className="row">
          <img
            className="img"
            src="https://i.pinimg.com/564x/db/df/2c/dbdf2c965f6eebe937cedf8536b9299a.jpg"
            alt=""
          ></img>
        </div>
      </div>
      <div className="col col-l">
        <div className="row">
          <div className="col coli">
            <div className="row">
              <img
                className="img "
                src="https://i.pinimg.com/564x/e5/8e/d8/e58ed814901bd8d705fb26a009a6f2f7.jpg"
                alt=""
              ></img>
            </div>
          </div>
          <div className="col coli">
            <div className="row ">
              <img
                className="img"
                src="https://i.pinimg.com/564x/1d/6d/38/1d6d384a94786af35cffe0db86e103d6.jpg"
                alt=""
              ></img>
            </div>
          </div>
        </div>
        <div className="row ">
          <img
            className="img"
            src="https://i.pinimg.com/564x/1b/33/88/1b33884a18d6971b47d95c28386e1496.jpg"
            alt=""
          ></img>
        </div>
      </div>
    </div>
  );
}

export default GridSection;
