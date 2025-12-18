const TrailSlice = ({ image }) => {
  return (
    <div className="mask-layer">
      <div
        className="image-layer"
        style={{ backgroundImage: `url(${image})` }}
      />
    </div>
  );
};

export default TrailSlice;
