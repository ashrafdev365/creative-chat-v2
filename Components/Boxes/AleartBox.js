export const Wrong = ({ name, setbox, box }) => {
  return (
    <>
      {box && (
        <div
          className="aleart_div"
          style={{
            backgroundColor: "rgba(255, 99, 71, 0.616)",
            border: `3px solid rgb(255, 99, 71)`,
          }}
        >
          <p>{name}</p>
          <span onClick={() => setbox(false)}>
            <i className="fal fa-times"></i>
          </span>
        </div>
      )}
    </>
  );
};

export const Succes = ({ name, setbox, box }) => {
  return (
    <>
      {box && (
        <div
          className="aleart_div"
          style={{
            backgroundColor: "#46b2ff9c",
            border: `3px solid #41B0FF`,
          }}
        >
          <p>{name}</p>
          <span onClick={() => setbox(false)}>
            <i className="fal fa-times"></i>
          </span>
        </div>
      )}
    </>
  );
};
